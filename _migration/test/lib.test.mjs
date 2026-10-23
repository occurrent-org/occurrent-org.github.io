import { test } from "node:test";
import assert from "node:assert/strict";
import { countWords, createSlugger, htmlIds, normalizeCode, parseDocs, sectionWordsInHtml, sha256, sourceCodeHashes } from "../lib.mjs";

test("slugs follow kramdown's GFM ids, numbering duplicates", () => {
    const slug = createSlugger();
    assert.equal(slug("Getting Started"), "getting-started");
    assert.equal(slug("Getting Started"), "getting-started-1");
    assert.equal(slug("Getting Started"), "getting-started-2");
    assert.equal(slug("The `Decider` interface"), "the-decider-interface");
    assert.equal(slug("Subscription Life-cycle & Testing (Blocking)"), "subscription-life-cycle--testing-blocking");
    assert.equal(slug("Upgrading to 0.34.0"), "upgrading-to-0340");
    assert.equal(slug("Spring Boot Starter"), "spring-boot-starter");
});

test("code that differs only in whitespace hashes the same", () => {
    const a = normalizeCode("\n    val x = 1  \n      call(x)\n\n");
    const b = normalizeCode("val x = 1\n  call(x)");
    assert.equal(a, b);
    assert.notEqual(normalizeCode("val x = 1"), normalizeCode("val x = 2"));
});

test("words leave out comments, Liquid, tags and link targets", () => {
    assert.equal(countWords("Read [the docs](https://example.com/a/b) now"), 4);
    assert.equal(countWords("<div class=\"comment\">Two words</div>"), 2);
    assert.equal(countWords("{% include x.md %} {{site.occurrentversion}} <!-- hidden words --> one"), 1);
    assert.equal(countWords("## Heading {#explicit-id}"), 1);
});

const page = `---
layout: default
title: Documentation
---

<div id="spy-nav" class="left-menu" markdown="1">
* [Introduction](#introduction)
</div>

<span id="star">Star us</span>

# Introduction

Occurrent is a library.

## How it is Layered {#layers}

Layers explained here.

#### Java<a id="decider-java"></a>

Some text <a id="inline-anchor"></a> here.

~~~java
var x = 1;
~~~

{% capture java %}
EventStore store = new InMemoryEventStore();
{% endcapture %}
{% capture kotlin %}
val store = InMemoryEventStore()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}

# Introduction

{% include macros/eventstore/maven.md %}
{% include macros/warning.md %}
`;

const includes = {
    "macros/eventstore/maven.md": `{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>occurrent-eventstore-inmemory</artifactId>
</dependency>
{% endcapture %}
{% capture gradle %}
implementation 'org.occurrent:occurrent-eventstore-inmemory'
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle %}`,
    "macros/warning.md": `<div class="comment">Mind the oplog size.</div>
{% capture java %}
warn();
{% endcapture %}
{% include macros/docsSnippet.html java=java %}`,
};
const readInclude = (path) => {
    if (!(path in includes)) throw new Error(`No include ${path}`);
    return includes[path];
};

test("parseDocs finds every section, anchor, code block, dependency and include", () => {
    const { sections, anchors, codeBlocks, includes: found, excluded } = parseDocs(page, readInclude);

    assert.deepEqual(excluded, [{ startLine: 6, endLine: 8, reason: "Hand-written navigation menu. The new site generates its sidebar." }]);
    assert.deepEqual(sections.map(({ anchor }) => anchor), ["_preamble", "introduction", "layers", "java", "introduction-1"]);
    assert.equal(sections[0].words, 2, "the preamble keeps its text, the menu is left out");

    assert.deepEqual(
        anchors.map(({ anchor, kind, section }) => [anchor, kind, section]),
        [
            ["star", "html", "_preamble"],
            ["introduction", "generated", "introduction"],
            ["layers", "explicit", "layers"],
            ["java", "generated", "java"],
            ["decider-java", "inline", "java"],
            ["inline-anchor", "inline", "java"],
            ["introduction-1", "generated", "introduction-1"],
        ],
    );

    assert.deepEqual(
        codeBlocks.map(({ id, section, lang, kind, file }) => [id, section, lang, kind, file]),
        [
            ["code-001", "java", "java", "fenced", null],
            ["code-002", "java", "java", "snippet", null],
            ["code-003", "java", "kotlin", "snippet", null],
            ["code-004", "introduction-1", "java", "snippet", "_includes/macros/warning.md"],
        ],
    );
    assert.equal(codeBlocks[1].sha256, sha256("EventStore store = new InMemoryEventStore();"));

    const last = sections.at(-1);
    assert.deepEqual(last.dependencies, ["occurrent-eventstore-inmemory"]);
    assert.equal(last.words, 4, "an included macro's words count towards the section that includes it");
    assert.deepEqual(found.map(({ path, section }) => [path, section]), [
        ["macros/eventstore/maven.md", "introduction-1"],
        ["macros/warning.md", "introduction-1"],
    ]);
    assert.deepEqual(found[0].dependencies, ["occurrent-eventstore-inmemory"]);
    assert.deepEqual(found[1].codeBlocks, ["code-004"]);
});

test("parseDocs refuses input it cannot account for", () => {
    assert.throws(() => parseDocs("# A\n\n~~~java\nnever closed\n", readInclude), /Unclosed code fence starting at line 3/);
    assert.throws(() => parseDocs("# A\n{% capture java %}\nx\n", readInclude), /Unclosed capture starting at line 2/);
    assert.throws(() => parseDocs("# A\n{% include missing.md %}\n", readInclude), /No include missing.md/);
    const cyclic = (path) => `{% include ${path === "a.md" ? "b.md" : "a.md"} %}`;
    assert.throws(() => parseDocs("# A\n{% include a.md %}\n", cyclic), /Include cycle: a.md -> b.md -> a.md/);
});

test("the new site's code is found in markdown and MDX, indented or not", () => {
    const mdx = `<Tabs syncKey="lang">
  <TabItem label="Java">
    \`\`\`java
    EventStore store = new InMemoryEventStore();
    \`\`\`
  </TabItem>
</Tabs>`;
    assert.deepEqual(sourceCodeHashes(mdx), [sha256("EventStore store = new InMemoryEventStore();")]);
});

test("section words in built HTML stop at the next heading and skip code", () => {
    const html = `<h2 id="one">One</h2><p>Three words here</p><pre><code>not counted</code></pre><h3 id="two">Two</h3><p>Other</p>`;
    assert.equal(sectionWordsInHtml(html, "one"), 3);
    assert.equal(sectionWordsInHtml(html, "two"), 1);
    assert.equal(sectionWordsInHtml(html, "missing"), null);
    assert.deepEqual(htmlIds(html), ["one", "two"]);
});
