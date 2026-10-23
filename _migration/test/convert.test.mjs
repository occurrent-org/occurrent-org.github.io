import { test } from "node:test";
import assert from "node:assert/strict";
import { assignSections, convertAll } from "../convert.mjs";
import { buildInventory } from "../inventory.mjs";

const P = (group, slug, title, source, meta = {}) => ({ group, slug, title, description: `About ${title}`, source, ...meta });

const dependency = (artifact) => `{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>${artifact}</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}
{% capture gradle %}
compile 'org.occurrent:${artifact}:{{site.occurrentversion}}'
{% endcapture %}
{% capture sbt %}
libraryDependencies += "org.occurrent" % "${artifact}" % "{{site.occurrentversion}}"
{% endcapture %}
{% capture grape %}
@Grab(group='org.occurrent', module='${artifact}', version='{{site.occurrentversion}}')
{% endcapture %}
{% capture leiningen %}
[org.occurrent/${artifact} "{{site.occurrentversion}}"]
{% endcapture %}
{% capture buildr %}
'org.occurrent:${artifact}:jar:{{site.occurrentversion}}'
{% endcapture %}
{% capture ivy %}
<dependency org="org.occurrent" name="${artifact}" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}`;

const includes = {
    "macros/inmemory/maven.md": dependency("occurrent-eventstore-inmemory"),
    "macros/inmemory/example.md": `{% capture java %}
EventStore store = new InMemoryEventStore();
{% endcapture %}
{% capture kotlin %}
val store = InMemoryEventStore()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}`,
};
const read = (path) => includes[path];

const docs = [
    "# EventStore {#eventstore}", // 1
    "Writes go to the [in-memory store](#in-memory) of version {{site.occurrentversion}}.", // 2
    "## Write Condition", // 3
    '<div class="comment">Import it from <code>WriteCondition</code>, see <a href="#eventstore">here</a>.</div>', // 4
    "# Stores", // 5
    "## In-Memory {#in-memory}", // 6
    "{% include macros/inmemory/maven.md %}", // 7
    '<a id="old-anchor"></a>Then create it:', // 8
    "{% include macros/inmemory/example.md %}", // 9
].join("\n");

const pageList = [
    P("layer-0", "eventstore", "EventStore", "1-4", { layer: "0" }),
    P("stores", "index", "About stores", "5-5"),
    P("stores", "in-memory", "In-memory event store", "6-9"),
    P("stores", "write-conditions", "Write conditions", "3-3"),
];

const convert = () => convertAll({ docs, inventory: buildInventory(docs, read), pageList, read });
const file = (files, path) => files.find((candidate) => candidate.path === path).content;

test("a section moves to the page whose range holds it, the shortest when two do", () => {
    const assigned = assignSections(buildInventory(docs, read).sections, pageList);
    assert.deepEqual(assigned.get("layer-0/eventstore").map((section) => section.anchor), ["eventstore"]);
    assert.deepEqual(assigned.get("stores/write-conditions").map((section) => section.anchor), ["write-condition"]);
});

test("every old anchor gets a new address", () => {
    const { anchors } = convert();
    assert.deepEqual(Object.fromEntries(anchors), {
        _preamble: "/docs/overview/introduction/",
        starUsLong: "/docs/overview/introduction/#starUsLong",
        starUsShort: "/docs/overview/introduction/#starUsShort",
        starFrame: "/docs/overview/introduction/#starFrame",
        eventstore: "/docs/layer-0/eventstore/",
        stores: "/docs/stores/",
        "in-memory": "/docs/stores/in-memory/",
        "old-anchor": "/docs/stores/in-memory/#old-anchor",
        "write-condition": "/docs/stores/write-conditions/",
    });
});

test("links, the version and asides are rewritten for the new site", () => {
    const content = file(convert().files, "layer-0/eventstore.mdx");
    assert.match(content, /^---\ntitle: "EventStore"\ndescription: "About EventStore"\nsidebar:\n  order: 1\nlayer: "0"\n---\n/);
    assert.match(content, /\[in-memory store\]\(\/docs\/stores\/in-memory\/\) of version %OCCURRENT_VERSION%\./);
    assert.doesNotMatch(content, /# EventStore/);
});

test("comments become notes and keep their inline code and links", () => {
    const content = file(convert().files, "stores/write-conditions.mdx");
    assert.match(content, /:::note\nImport it from `WriteCondition`, see \[here\]\(\/docs\/layer-0\/eventstore\/\)\.\n:::/);
});

test("snippets become tabs, dependency snippets become <Dependency />, anchors stay", () => {
    const content = file(convert().files, "stores/in-memory.mdx");
    assert.match(content, /modules: \[occurrent-eventstore-inmemory\]/);
    assert.match(content, /import Dependency from "..\/..\/..\/..\/components\/Dependency.astro";/);
    assert.match(content, /<Dependency artifact="occurrent-eventstore-inmemory" \/>/);
    assert.match(content, /<a id="old-anchor" \/>Then create it:/);
    assert.match(content, /<Tabs syncKey="lang">\n {2}<TabItem label="Java">\n {4}```java\n {4}EventStore store = new InMemoryEventStore\(\);\n {4}```/);
    assert.match(content, /<TabItem label="Kotlin">\n {4}```kotlin\n {4}val store = InMemoryEventStore\(\)/);
});

test("a dependency snippet that differs from the template keeps its exact text", () => {
    const odd = dependency("occurrent-x").replace("compile 'org.occurrent", "implementation 'org.occurrent");
    const oddDocs = `# Odd {#odd}\n${odd}`;
    const { files } = convertAll({ docs: oddDocs, inventory: buildInventory(oddDocs, read), pageList: [P("stores", "odd", "Odd", "1-40")], read });
    const content = file(files, "stores/odd.mdx");
    assert.doesNotMatch(content, /<Dependency/);
    assert.match(content, /<Tabs syncKey="build-tool">/);
    assert.match(content, /implementation 'org.occurrent:occurrent-x:%OCCURRENT_VERSION%'/);
});
