// Checks the built site before it goes live. Every internal link and asset on every page must resolve to a built
// file, and every address the Jekyll site serves today must still exist: /, /documentation, /news/ and each news
// post at its .html address.
//
//   node _migration/check-links.mjs [--site site/dist]

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const htmlFiles = (dir) =>
    readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) return htmlFiles(path);
        return name.endsWith(".html") ? [path] : [];
    });

// "/docs/x/" -> docs/x/index.html, "/news/a.html" -> news/a.html, "/documentation" -> documentation/index.html.
export function resolves(siteDir, url) {
    const path = decodeURIComponent(url.split(/[?#]/)[0]);
    const candidates = path.endsWith("/") ? [join(path, "index.html")] : [path, `${path}.html`, join(path, "index.html")];
    return candidates.some((candidate) => existsSync(join(siteDir, candidate)) && statSync(join(siteDir, candidate)).isFile());
}

export function oldAddresses(postsDir) {
    const posts = readdirSync(postsDir)
        .map((name) => name.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/))
        .filter(Boolean)
        .map(([, year, month, day, name]) => `/news/${year}/${month}/${day}/${name}.html`);
    return ["/", "/documentation", "/documentation.html", "/news/", ...posts];
}

export function checkLinks(siteDir, postsDir) {
    const problems = [];
    for (const file of htmlFiles(siteDir)) {
        const html = readFileSync(file, "utf8");
        for (const [, url] of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g)) {
            if (!resolves(siteDir, url)) problems.push(`${file.slice(siteDir.length)} links to ${url}, which isn't built`);
        }
    }
    for (const url of oldAddresses(postsDir)) {
        if (!resolves(siteDir, url)) problems.push(`${url} is served today but isn't built`);
    }
    return [...new Set(problems)];
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
    const root = join(dirname(fileURLToPath(import.meta.url)), "..");
    const siteIndex = process.argv.indexOf("--site");
    const siteDir = siteIndex > 0 ? process.argv[siteIndex + 1] : join(root, "site/dist");
    const problems = checkLinks(siteDir, join(root, "_posts/news"));
    if (problems.length === 0) console.log("Every internal link resolves, and every address served today still exists.");
    else {
        console.error(`${problems.join("\n")}\n\n${problems.length} problems.`);
        process.exitCode = 1;
    }
}
