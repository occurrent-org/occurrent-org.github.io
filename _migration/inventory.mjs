// Lists every section, anchor, code block and include of today's docs page, the units the migration must account for.
//
//   node _migration/inventory.mjs                  prints the totals
//   node _migration/inventory.mjs --out <file>     also writes the full inventory as JSON, for a closer look
//
// The inventory is built from pages/docs/docs.md every time rather than committed, so it can never be out of date
// and held documentation branches don't conflict on a generated file.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { parseDocs } from "./lib.mjs";

const repo = join(dirname(fileURLToPath(import.meta.url)), "..");

export const readInclude = (path) => readFileSync(join(repo, "_includes", path), "utf8");

export function buildInventory(source, read = readInclude) {
    const { sections, anchors, codeBlocks, includes, excluded, links } = parseDocs(source, read);
    const totals = {
        sections: sections.length,
        anchors: anchors.length,
        codeBlocks: codeBlocks.length,
        fencedCodeBlocks: codeBlocks.filter((block) => block.kind === "fenced").length,
        snippetCodeBlocks: codeBlocks.filter((block) => block.kind === "snippet").length,
        includes: includes.length,
        dependencies: new Set(sections.flatMap((section) => section.dependencies)).size,
        links: new Set(links.map((link) => link.url)).size,
        words: sections.reduce((sum, section) => sum + section.words, 0),
    };
    return { source: "pages/docs/docs.md", totals, excluded, sections, anchors, codeBlocks, includes, links };
}

export const currentInventory = () => buildInventory(readFileSync(join(repo, "pages/docs/docs.md"), "utf8"));

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const inventory = currentInventory();
    console.log(JSON.stringify(inventory.totals, null, 2));
    const out = process.argv.indexOf("--out");
    if (out >= 0) {
        writeFileSync(process.argv[out + 1], `${JSON.stringify(inventory, null, 2)}\n`);
        console.log(`Wrote ${process.argv[out + 1]}`);
    }
}
