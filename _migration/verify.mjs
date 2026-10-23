// Checks that the new site has a home for everything in the inventory of today's docs page (see inventory.mjs).
//
//   node _migration/verify.mjs [--site site/dist] [--sources site/src/content/docs] [--report]
//
// Every old anchor must be in move-map.json (old anchor -> new URL) or in merged.json (a deliberate merge of
// duplicated content, with a reason). Every target must exist in the built site, every code block must appear in
// the site's sources, every dependency snippet's artifactId and every link to another page must appear in the
// sources, and no section may lose more than 10% of its words. With --report the problems are printed but the
// exit code stays 0.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { htmlIds, sectionWordsInHtml, sourceCodeHashes } from "./lib.mjs";
import { currentInventory } from "./inventory.mjs";

export const MAX_WORD_LOSS = 0.1;

const listFiles = (dir, extensions) => {
    if (!existsSync(dir)) return [];
    return readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) return listFiles(path, extensions);
        return extensions.some((extension) => name.endsWith(extension)) ? [path] : [];
    });
};

// "/layer-1/projections/#the-projection-annotation" -> the built file and the fragment.
const resolveTarget = (siteDir, url) => {
    const [path, fragment = null] = url.split("#");
    const relative = path.replace(/^\//, "");
    const file = relative === "" || relative.endsWith("/") ? join(siteDir, relative, "index.html") : join(siteDir, relative);
    return { file, fragment };
};

export function verify({ inventory, moveMap, merged, siteDir, sourcesDir }) {
    const problems = [];
    const known = new Set(inventory.anchors.map(({ anchor }) => anchor));
    if (inventory.sections.some(({ anchor }) => anchor === "_preamble")) known.add("_preamble");
    const mergedByAnchor = new Map(merged.map((entry) => [entry.anchor, entry]));

    for (const anchor of known) {
        const moved = Object.hasOwn(moveMap, anchor);
        const isMerged = mergedByAnchor.has(anchor);
        if (!moved && !isMerged) problems.push({ type: "unaccounted", anchor, message: `#${anchor} has no entry in move-map.json or merged.json` });
        if (moved && isMerged) problems.push({ type: "ambiguous", anchor, message: `#${anchor} is in both move-map.json and merged.json` });
    }
    for (const anchor of [...Object.keys(moveMap), ...mergedByAnchor.keys()]) {
        if (!known.has(anchor)) problems.push({ type: "unknown", anchor, message: `#${anchor} is mapped but is not an anchor on today's docs page` });
    }
    for (const entry of merged) {
        if (!entry.reason?.trim()) problems.push({ type: "merge-reason", anchor: entry.anchor, message: `#${entry.anchor} is merged without a reason` });
        if (!Object.hasOwn(moveMap, entry.into)) problems.push({ type: "merge-target", anchor: entry.anchor, message: `#${entry.anchor} is merged into #${entry.into}, which is not in move-map.json` });
    }

    const pages = new Map();
    const page = (file) => {
        if (!pages.has(file)) pages.set(file, existsSync(file) ? readFileSync(file, "utf8") : null);
        return pages.get(file);
    };
    for (const [anchor, url] of Object.entries(moveMap)) {
        const { file, fragment } = resolveTarget(siteDir, url);
        const html = page(file);
        if (html === null) {
            problems.push({ type: "target-page", anchor, message: `#${anchor} moves to ${url}, but ${file} does not exist` });
        } else if (fragment !== null && !htmlIds(html).includes(fragment)) {
            problems.push({ type: "target-anchor", anchor, message: `#${anchor} moves to ${url}, but the page has no id "${fragment}"` });
        }
    }

    const sources = listFiles(sourcesDir, [".md", ".mdx"]).map((file) => readFileSync(file, "utf8"));
    const hashes = new Set(sources.flatMap(sourceCodeHashes));
    const allSources = sources.join("\n");
    const droppedCode = new Set(merged.flatMap((entry) => entry.codeBlocks ?? []));
    for (const block of inventory.codeBlocks) {
        if (!hashes.has(block.sha256) && !droppedCode.has(block.id)) {
            const where = block.file ? `${block.file}:${block.line}` : `docs.md:${block.line}`;
            problems.push({ type: "code", anchor: block.section, message: `${block.id} (${block.lang ?? "no language"}, ${where}) is not in the site's sources` });
        }
    }
    for (const artifactId of new Set(inventory.sections.flatMap((section) => section.dependencies))) {
        if (!allSources.includes(artifactId)) problems.push({ type: "dependency", anchor: null, message: `Dependency ${artifactId} is not in the site's sources` });
    }

    for (const url of new Set((inventory.links ?? []).map((link) => link.url))) {
        if (!allSources.includes(url)) problems.push({ type: "link", anchor: null, message: `The link to ${url} is not in the site's sources` });
    }

    for (const section of inventory.sections) {
        const url = moveMap[section.anchor];
        if (url === undefined || section.words === 0) continue;
        const { file, fragment } = resolveTarget(siteDir, url);
        const html = page(file);
        if (html === null || fragment === null) continue;
        const words = sectionWordsInHtml(html, fragment);
        if (words !== null && words < section.words * (1 - MAX_WORD_LOSS)) {
            problems.push({ type: "words", anchor: section.anchor, message: `#${section.anchor} had ${section.words} words, ${url} has ${words}` });
        }
    }

    return problems;
}

const summarize = (problems) => {
    const counts = {};
    for (const { type } of problems) counts[type] = (counts[type] ?? 0) + 1;
    return Object.entries(counts).map(([type, count]) => `${type}: ${count}`).join(", ");
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const here = dirname(fileURLToPath(import.meta.url));
    const repo = join(here, "..");
    const option = (name, fallback) => {
        const index = process.argv.indexOf(name);
        return index < 0 ? fallback : process.argv[index + 1];
    };
    const readJson = (name) => JSON.parse(readFileSync(join(here, name), "utf8"));
    const problems = verify({
        inventory: currentInventory(),
        moveMap: readJson("move-map.json"),
        merged: readJson("merged.json"),
        siteDir: join(repo, option("--site", "site/dist")),
        sourcesDir: join(repo, option("--sources", "site/src/content/docs")),
    });
    const report = process.argv.includes("--report");
    if (problems.length === 0) {
        console.log("Everything on today's docs page has a home in the new site.");
    } else {
        for (const { message } of problems) console.log(message);
        console.log(`\n${problems.length} problems (${summarize(problems)})${report ? ". Report only, not failing." : "."}`);
    }
    process.exit(problems.length > 0 && !report ? 1 : 0);
}
