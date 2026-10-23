import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { sha256 } from "../lib.mjs";
import { verify } from "../verify.mjs";

const javaCode = "EventStore store = new InMemoryEventStore();";
const inventory = {
    anchors: [
        { anchor: "eventstore", kind: "generated", section: "eventstore" },
        { anchor: "in-memory", kind: "explicit", section: "in-memory" },
        { anchor: "old-anchor", kind: "inline", section: "in-memory" },
    ],
    sections: [
        { anchor: "_preamble", words: 0, dependencies: [] },
        { anchor: "eventstore", words: 10, dependencies: [] },
        { anchor: "in-memory", words: 4, dependencies: ["occurrent-eventstore-inmemory"] },
    ],
    codeBlocks: [{ id: "code-001", section: "eventstore", file: null, line: 5, lang: "java", kind: "snippet", sha256: sha256(javaCode) }],
};

const goodMoveMap = {
    _preamble: "/",
    eventstore: "/layer-0/eventstore/#eventstore",
    "in-memory": "/stores/in-memory/#in-memory",
    "old-anchor": "/stores/in-memory/#old-anchor",
};

let siteDir;
let sourcesDir;
const write = (path, content) => {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
};

beforeEach(() => {
    const root = mkdtempSync(join(tmpdir(), "verify-"));
    siteDir = join(root, "dist");
    sourcesDir = join(root, "src");
    write(join(siteDir, "index.html"), "<h1>Occurrent</h1>");
    write(join(siteDir, "layer-0/eventstore/index.html"), `<h2 id="eventstore">EventStore</h2><p>${"word ".repeat(10)}</p>`);
    write(join(siteDir, "stores/in-memory/index.html"), `<h2 id="in-memory">In-memory</h2><p>one two <a id="old-anchor"></a>three four</p>`);
    write(join(sourcesDir, "layer-0/eventstore.mdx"), `## EventStore\n\n\`\`\`java\n${javaCode}\n\`\`\`\n`);
    write(join(sourcesDir, "stores/in-memory.md"), `<Dependency artifact="occurrent-eventstore-inmemory" />\n`);
});

const run = (overrides = {}) => verify({ inventory, moveMap: goodMoveMap, merged: [], siteDir, sourcesDir, ...overrides });
const types = (problems) => problems.map(({ type, anchor }) => `${type}:${anchor}`);

test("passes when everything has a home", () => {
    assert.deepEqual(run(), []);
});

test("an anchor in neither file is unaccounted, in both is ambiguous, unknown keys are reported", () => {
    const { "old-anchor": _, ...withoutOld } = goodMoveMap;
    assert.deepEqual(types(run({ moveMap: withoutOld })), ["unaccounted:old-anchor"]);
    assert.deepEqual(
        types(run({ moveMap: { ...goodMoveMap, typo: "/" }, merged: [{ anchor: "old-anchor", into: "in-memory", reason: "Duplicate" }] })),
        ["ambiguous:old-anchor", "unknown:typo"],
    );
});

test("a merge needs a reason and a target that moved", () => {
    const { "old-anchor": _, ...withoutOld } = goodMoveMap;
    assert.deepEqual(run({ moveMap: withoutOld, merged: [{ anchor: "old-anchor", into: "in-memory", reason: "Same text as #in-memory" }] }), []);
    assert.deepEqual(types(run({ moveMap: withoutOld, merged: [{ anchor: "old-anchor", into: "nowhere", reason: " " }] })), [
        "merge-reason:old-anchor",
        "merge-target:old-anchor",
    ]);
});

test("a target must be a built page that has the id", () => {
    assert.deepEqual(types(run({ moveMap: { ...goodMoveMap, eventstore: "/layer-0/missing/#eventstore" } })), ["target-page:eventstore"]);
    assert.deepEqual(types(run({ moveMap: { ...goodMoveMap, "old-anchor": "/stores/in-memory/#renamed" } })), ["target-anchor:old-anchor"]);
});

test("every code block must be in the sources, unless a merge drops it on purpose", () => {
    write(join(sourcesDir, "layer-0/eventstore.mdx"), "## EventStore\n\n```java\nEventStore store = somethingElse();\n```\n");
    assert.deepEqual(types(run()), ["code:eventstore"]);
    const { "old-anchor": _, ...withoutOld } = goodMoveMap;
    const merged = [{ anchor: "old-anchor", into: "in-memory", reason: "Same example as #in-memory", codeBlocks: ["code-001"] }];
    assert.deepEqual(run({ moveMap: withoutOld, merged }), []);
});

test("every dependency snippet's artifact must be in the sources", () => {
    write(join(sourcesDir, "stores/in-memory.md"), "No dependency here.\n");
    assert.deepEqual(types(run()), ["dependency:null"]);
});

test("every link to another page must be in the sources", () => {
    const links = [{ url: "https://github.com/johanhaleby/occurrent/tree/occurrent-%OCCURRENT_VERSION%/example", line: 3, section: "eventstore" }];
    assert.deepEqual(types(run({ inventory: { ...inventory, links } })), ["link:null"]);
    write(join(sourcesDir, "layer-0/links.md"), "See [the example](https://github.com/johanhaleby/occurrent/tree/occurrent-%OCCURRENT_VERSION%/example).\n");
    assert.deepEqual(run({ inventory: { ...inventory, links } }), []);
});

test("a section may lose up to 10% of its words, not more", () => {
    write(join(siteDir, "layer-0/eventstore/index.html"), `<h2 id="eventstore">EventStore</h2><p>${"word ".repeat(9)}</p>`);
    assert.deepEqual(run(), []);
    write(join(siteDir, "layer-0/eventstore/index.html"), `<h2 id="eventstore">EventStore</h2><p>${"word ".repeat(8)}</p>`);
    assert.deepEqual(types(run()), ["words:eventstore"]);
});

test("a section may give its words away when moved.json says where, with a reason and a real target", () => {
    const shrunk = { ...inventory, sections: inventory.sections.map((section) => (section.anchor === "eventstore" ? { ...section, words: 40 } : section)) };
    assert.deepEqual(types(run({ inventory: shrunk })), ["words:eventstore"]);
    assert.deepEqual(run({ inventory: shrunk, moved: [{ anchor: "eventstore", to: "/stores/in-memory/#in-memory", reason: "Spring Boot text moved" }] }), []);
    assert.deepEqual(types(run({ inventory: shrunk, moved: [{ anchor: "eventstore", to: "/stores/in-memory/#nope", reason: " " }] })), [
        "moved-reason:eventstore",
        "moved-target:eventstore",
    ]);
});

test("with no new site yet, every anchor, code block and dependency is reported", () => {
    const problems = verify({ inventory, moveMap: {}, merged: [], siteDir: join(siteDir, "none"), sourcesDir: join(sourcesDir, "none") });
    assert.deepEqual(types(problems), [
        "unaccounted:eventstore",
        "unaccounted:in-memory",
        "unaccounted:old-anchor",
        "unaccounted:_preamble",
        "code:eventstore",
        "dependency:null",
    ]);
});
