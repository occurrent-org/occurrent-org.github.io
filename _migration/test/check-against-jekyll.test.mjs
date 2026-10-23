import { test } from "node:test";
import assert from "node:assert/strict";
import { checkAgainstJekyll } from "../check-against-jekyll.mjs";

const inventory = {
    anchors: [{ anchor: "introduction" }, { anchor: "layers" }],
    codeBlocks: [{ id: "code-001" }],
    includes: [{ path: "macros/maven.md", dependencies: ["occurrent-eventstore-inmemory"] }, { path: "macros/warning.md", dependencies: [] }],
};
const pre = (count) => "<pre><code>x</code></pre>".repeat(count);

test("passes when the built page has the inventoried ids and code blocks, plus layout ids", () => {
    const html = `<nav id="spy-nav"></nav><h1 id="introduction">Introduction</h1><h2 id="layers">Layers</h2>${pre(8)}`;
    assert.deepEqual(checkAgainstJekyll({ inventory, html, chromeIds: new Set(["spy-nav"]) }), []);
});

test("reports anchors the page lacks, content ids the inventory missed, and code it did not count", () => {
    const html = `<h1 id="introduction">Introduction</h1><h2 id="surprise">Surprise</h2>${pre(9)}`;
    assert.deepEqual(checkAgainstJekyll({ inventory, html, chromeIds: new Set() }), [
        "#layers is in the inventory but not on the built page",
        "#surprise is on the built page but not in the inventory",
        "The built page has 9 code blocks, the inventory accounts for 8 (1 code blocks and 1 dependency snippets)",
    ]);
});
