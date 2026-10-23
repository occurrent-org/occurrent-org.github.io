// Checks the inventory (see inventory.mjs) against the page Jekyll actually builds, so the inventory's idea of what
// the page holds is the real one: the same anchors, and one code block for every <pre> on the page. Ids that come
// from the layout or the hand-written menu rather than the docs text are ignored.
//
//   node _migration/check-against-jekyll.mjs <path to the built documentation.html>

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { htmlIds } from "./lib.mjs";
import { currentInventory } from "./inventory.mjs";

const filesUnder = (dir) =>
    readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        return statSync(path).isDirectory() ? filesUnder(path) : [path];
    });

// Jekyll renders one <pre> per code block, and one per build tool (seven) for each dependency snippet.
export const PRE_PER_DEPENDENCY_SNIPPET = 7;

export function checkAgainstJekyll({ inventory, html, chromeIds }) {
    const built = new Set(htmlIds(html));
    const inventoried = new Set(inventory.anchors.map(({ anchor }) => anchor));
    const problems = [];
    for (const anchor of inventoried) {
        if (!built.has(anchor)) problems.push(`#${anchor} is in the inventory but not on the built page`);
    }
    for (const id of built) {
        if (!inventoried.has(id) && !chromeIds.has(id)) problems.push(`#${id} is on the built page but not in the inventory`);
    }
    const pre = (html.match(/<pre[\s>]/g) ?? []).length;
    const dependencySnippets = inventory.includes.filter((include) => include.dependencies.length > 0).length;
    const expected = inventory.codeBlocks.length + PRE_PER_DEPENDENCY_SNIPPET * dependencySnippets;
    if (pre !== expected) {
        problems.push(`The built page has ${pre} code blocks, the inventory accounts for ${expected} (${inventory.codeBlocks.length} code blocks and ${dependencySnippets} dependency snippets)`);
    }
    return problems;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const htmlPath = process.argv[2];
    if (!htmlPath || !existsSync(htmlPath)) {
        console.error("Usage: node _migration/check-against-jekyll.mjs <path to the built documentation.html>");
        process.exit(2);
    }
    const repo = join(dirname(fileURLToPath(import.meta.url)), "..");
    const inventory = currentInventory();
    const docsLines = readFileSync(join(repo, "pages/docs/docs.md"), "utf8").split("\n");
    const chrome = [
        ...["_layouts", "_includes"].flatMap((dir) => filesUnder(join(repo, dir))).map((file) => readFileSync(file, "utf8")),
        ...inventory.excluded.map(({ startLine, endLine }) => docsLines.slice(startLine - 1, endLine).join("\n")),
    ];
    const chromeIds = new Set(chrome.flatMap(htmlIds));
    const problems = checkAgainstJekyll({ inventory, html: readFileSync(htmlPath, "utf8"), chromeIds });
    for (const problem of problems) console.log(problem);
    console.log(problems.length === 0 ? `The inventory matches the built page: ${inventory.anchors.length} anchors, ${inventory.codeBlocks.length} code blocks, ${inventory.includes.filter((include) => include.dependencies.length > 0).length} dependency snippets.` : `\n${problems.length} problems.`);
    process.exit(problems.length === 0 ? 0 : 1);
}
