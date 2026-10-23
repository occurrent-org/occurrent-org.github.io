// Moves the content of pages/docs/docs.md onto the pages of the new site.
//
//   node _migration/convert.mjs [--dry-run]
//
// pages.mjs says which lines of docs.md each page is made from. For every page this script takes those sections,
// resolves the Liquid (included macros, Java/Kotlin snippets, dependency snippets, the version), turns the result
// into MDX, and writes it to site/src/content/docs/docs/<group>/<slug>.mdx. Links between sections become links
// between pages, and move-map.json records where every old anchor ended up. Pages in HAND_PORTED are converted to
// work out their anchors but not written, because they have been edited by hand since.
//
// Kramdown and CommonMark differ in small ways, so the Markdown goes through HTML and back: parse it, let the raw
// HTML (asides, inline code, anchors) become real elements, and write the tree out as MDX. verify.mjs checks the
// result against the inventory of docs.md.

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import GithubSlugger from "github-slugger";
import { defaultHandlers, toMdast } from "hast-util-to-mdast";
import { toString } from "mdast-util-to-string";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { currentInventory, readInclude } from "./inventory.mjs";
import { CLOUDEVENTS_SPEC, normalizeCode } from "./lib.mjs";
import { pages } from "./pages.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, "..");
const docsDir = join(repo, "site/src/content/docs/docs");

export const HAND_PORTED = ["overview/layers"];
export const VERSION_TOKEN = "%OCCURRENT_VERSION%";

const HEADING = /^(#{1,6})\s+(.*?)\s*$/;
const EXPLICIT_ID = /\s*\{#([^}]+)\}\s*$/;
const FENCE = /^(\s*)(`{3,}|~{3,})(.*)$/;
const CAPTURE_START = /^\s*\{% capture (\w+) %\}\s*$/;
const CAPTURE_END = /^\s*\{% endcapture %\}\s*$/;
const INCLUDE = /^(\s*)\{% include (\S+)(.*?)%\}\s*$/;
const isFenceEnd = (line, marker) => line.trim().startsWith(marker) && line.trim().replace(/[`~]/g, "") === "";

const pageId = (page) => `${page.group}/${page.slug}`;
const pageUrl = (page) => (page.slug === "index" ? `/docs/${page.group}/` : `/docs/${page.group}/${page.slug}/`);

// "296-315, 7557" -> [{from: 296, to: 315}]. Single lines are notes for the Spring Boot clean-up.
const rangesOf = (page) =>
    page.source
        .split(",")
        .map((part) => part.trim())
        .filter((part) => /^\d+-\d+$/.test(part))
        .map((part) => {
            const [from, to] = part.split("-").map(Number);
            return { from, to };
        });

// The page a section of docs.md moves to: the one whose range holds its heading, the shortest if several do.
export function assignSections(sections, pageList) {
    const ranges = pageList.flatMap((page) => rangesOf(page).map((range) => ({ ...range, page })));
    const assigned = new Map(pageList.map((page) => [pageId(page), []]));
    for (const section of sections) {
        if (section.anchor === "_preamble") continue;
        const holding = ranges.filter(({ from, to }) => section.line >= from && section.line <= to);
        if (holding.length === 0) throw new Error(`No page holds #${section.anchor} (line ${section.line}). Add it to pages.mjs.`);
        holding.sort((a, b) => a.to - a.from - (b.to - b.from));
        assigned.get(pageId(holding[0].page)).push(section);
    }
    return assigned;
}

// Resolves the Liquid in a piece of docs.md, line by line. Java/Kotlin snippets and dependency snippets become
// placeholder elements that the HTML to MDX step turns into components. Headings get a marker so that the
// converted heading can be matched with the section it came from.
function resolveLiquid(lines, context, { inInclude = false } = {}) {
    const out = [];
    let fence = null;
    let capture = null;
    let captures = new Map();
    lines.forEach((rawLine, index) => {
        const line = rawLine
            .replaceAll("{{site.occurrentversion}}", VERSION_TOKEN)
            .replaceAll("{{cloudevents_spec}}", CLOUDEVENTS_SPEC);
        if (fence) {
            out.push(line);
            if (isFenceEnd(line, fence)) fence = null;
            return;
        }
        if (capture) {
            if (CAPTURE_END.test(line)) {
                captures.set(capture.name, capture.body.join("\n"));
                capture = null;
            } else {
                capture.body.push(line);
            }
            return;
        }
        const captureStart = line.match(CAPTURE_START);
        if (captureStart) {
            capture = { name: captureStart[1], body: [] };
            return;
        }
        const fenceStart = line.match(FENCE);
        if (fenceStart) {
            fence = fenceStart[2];
            out.push(line);
            return;
        }
        if (/^\s*\{% assign /.test(line)) return;
        // Includes are only ever indented as part of a paragraph (see "1\. **NativeMongoCheckpointStorage**"), where
        // kramdown ignores the indent, so it is dropped here too rather than turning the snippet into a code block.
        const include = line.match(INCLUDE);
        if (include) {
            const path = include[2];
            if (path === "macros/docsSnippet.html") {
                const id = context.components.push({ type: "snippet", java: captures.get("java"), kotlin: captures.get("kotlin") }) - 1;
                out.push("", `<occ-component data-id="${id}"></occ-component>`, "");
            } else if (path === "macros/mavenSnippet.html") {
                const id = context.components.push({ type: "dependency", captures: Object.fromEntries(captures) }) - 1;
                out.push("", `<occ-component data-id="${id}"></occ-component>`, "");
            } else if (path === "notificationBanner.html") {
                // The banner is commented out in full. It has nothing to show.
            } else {
                const included = resolveLiquid(context.read(path).replace(/\r\n/g, "\n").split("\n"), context, { inInclude: true });
                out.push(...included);
            }
            captures = new Map();
            return;
        }
        if (line.includes("{%") || line.includes("{{")) throw new Error(`Unhandled Liquid: ${line}`);
        const heading = line.match(HEADING);
        if (heading) {
            if (inInclude) throw new Error(`A heading in an included file is not supported: ${line}`);
            const marker = context.headings.push(context.lineOf(index)) - 1;
            out.push(`${heading[1]} ${heading[2].replace(EXPLICIT_ID, "")} OCCHEADING${marker}`);
            return;
        }
        out.push(line);
    });
    if (fence || capture) throw new Error("Unclosed code fence or capture");
    if (captures.size > 0) throw new Error(`Captures that no include uses: ${[...captures.keys()].join(", ")}`);
    return out;
}

const attribute = (name, value) => ({ type: "mdxJsxAttribute", name, value });
const jsx = (name, attributes, children = []) => ({ type: "mdxJsxFlowElement", name, attributes, children });
const codeNode = (lang, body) => ({ type: "code", lang, meta: null, value: normalizeCode(body) });

const DEPENDENCY_TOOLS = [
    ["maven", "Maven", "xml"],
    ["gradle", "Gradle", "groovy"],
    ["sbt", "SBT", "scala"],
    ["grape", "Grape", "groovy"],
    ["leiningen", "Leiningen", "clojure"],
    ["buildr", "Buildr", "ruby"],
    ["ivy", "Ivy", "xml"],
];

// What the Dependency component renders, written the way the old snippets write it, to tell whether a snippet can
// become <Dependency />. Keep in step with site/src/components/Dependency.astro.
export function dependencyTemplate(artifact, test) {
    const version = VERSION_TOKEN;
    return {
        maven: `<dependency>\n    <groupId>org.occurrent</groupId>\n    <artifactId>${artifact}</artifactId>\n    <version>${version}</version>${test ? "\n    <scope>test</scope>" : ""}\n</dependency>`,
        gradle: `${test ? "testImplementation" : "compile"} 'org.occurrent:${artifact}:${version}'`,
        sbt: `libraryDependencies += "org.occurrent" % "${artifact}" % "${version}"${test ? " % Test" : ""}`,
        grape: `@Grab(group='org.occurrent', module='${artifact}', version='${version}')`,
        leiningen: `[org.occurrent/${artifact} "${version}"]`,
        buildr: `'org.occurrent:${artifact}:jar:${version}'`,
        ivy: `<dependency org="org.occurrent" name="${artifact}" rev="${version}"${test ? ' conf="test"' : ""} />`,
    };
}

function dependencyNode(captures, context) {
    const artifacts = [...(captures.maven ?? "").matchAll(/<artifactId>([^<]+)<\/artifactId>/g)].map((match) => match[1].trim());
    context.modules.push(...artifacts);
    if (artifacts.length === 1) {
        for (const test of [false, true]) {
            const template = dependencyTemplate(artifacts[0], test);
            if (DEPENDENCY_TOOLS.every(([key]) => normalizeCode(captures[key] ?? "") === normalizeCode(template[key]))) {
                context.imports.add("Dependency");
                return jsx("Dependency", [attribute("artifact", artifacts[0]), ...(test ? [attribute("scope", "test")] : [])]);
            }
        }
    }
    // Anything else keeps its exact text, in the same tabs.
    context.imports.add("Tabs");
    const items = DEPENDENCY_TOOLS.filter(([key]) => captures[key] !== undefined).map(([key, label, lang]) =>
        jsx("TabItem", [attribute("label", label)], [codeNode(lang, captures[key])]),
    );
    return jsx("Tabs", [attribute("syncKey", "build-tool")], items);
}

function snippetNode({ java, kotlin }, context) {
    context.imports.add("Tabs");
    const items = [];
    if (java !== undefined) items.push(jsx("TabItem", [attribute("label", "Java")], [codeNode("java", java)]));
    if (kotlin !== undefined) items.push(jsx("TabItem", [attribute("label", "Kotlin")], [codeNode("kotlin", kotlin)]));
    return jsx("Tabs", [attribute("syncKey", "lang")], items);
}

const hasClass = (node, name) => (node.properties?.className ?? []).includes(name);

// HTML to MDX: the old page's asides become Starlight asides, placeholders become components, and anchors that
// aren't headings stay as anchors.
const handlers = (context) => ({
    "occ-component": (state, node) => {
        const component = context.components[Number(node.properties.dataId)];
        const result = component.type === "snippet" ? snippetNode(component, context) : dependencyNode(component.captures, context);
        state.patch(node, result);
        return result;
    },
    div: (state, node) => {
        const kind = hasClass(node, "comment") ? "note" : hasClass(node, "notification") ? "caution" : null;
        if (kind === null) return defaultHandlers.div(state, node);
        const result = { type: "containerDirective", name: kind, attributes: {}, children: state.toFlow(state.all(node)) };
        state.patch(node, result);
        return result;
    },
    a: (state, node) => {
        if (node.properties.href !== undefined || node.properties.id === undefined) return defaultHandlers.a(state, node);
        if (node.children.length > 0) throw new Error(`An anchor with content: #${node.properties.id}`);
        const result = { type: "mdxJsxTextElement", name: "a", attributes: [attribute("id", String(node.properties.id))], children: [] };
        state.patch(node, result);
        return result;
    },
});

const toHast = unified().use(remarkParse).use(remarkGfm).use(remarkRehype, { allowDangerousHtml: true }).use(rehypeRaw);
const stringifier = unified().use(remarkStringify, { bullet: "*", emphasis: "_", fences: true, rule: "-", listItemIndent: "one" }).use(remarkGfm, { tablePipeAlign: false }).use(remarkMdx).use(remarkDirective);

// Converts one page's share of docs.md to an MDX tree. Returns the tree, the old anchors on it and the modules its
// dependency snippets name. Links are left pointing at old anchors, for resolveLinks to rewrite.
export function convertPage(page, sections, docsLines, read = readInclude) {
    const context = { components: [], headings: [], imports: new Set(), modules: [], lineOf: null, read };
    const lines = [];
    const lineNumbers = [];
    for (const section of sections) {
        for (let line = section.line; line <= section.endLine; line++) {
            lines.push(docsLines[line - 1] ?? "");
            lineNumbers.push(line);
        }
    }
    context.lineOf = (index) => lineNumbers[index];
    const markdown = resolveLiquid(lines, context).join("\n");

    const hast = toHast.runSync(toHast.parse(markdown));
    const tree = toMdast(hast, { handlers: handlers(context) });

    // Match the headings with their sections, take the first one off (the page title replaces it) and level the rest
    // so the page's first section starts at h2.
    const sectionByLine = new Map(sections.map((section) => [section.line, section]));
    const headings = [];
    visit(tree, "heading", (node) => {
        const last = node.children[node.children.length - 1];
        const match = last?.type === "text" ? last.value.match(/\s*OCCHEADING(\d+)$/) : null;
        if (!match) throw new Error(`A heading without its marker on ${pageId(page)}: ${toString(node)}`);
        last.value = last.value.slice(0, match.index);
        if (last.value === "") node.children.pop();
        const section = sectionByLine.get(context.headings[Number(match[1])]);
        if (!section) throw new Error(`A heading that starts no section on ${pageId(page)}: ${toString(node)}`);
        headings.push({ node, section });
    });
    if (headings.length === 0 || headings[0].section !== sections[0]) throw new Error(`${pageId(page)} doesn't start with a heading`);
    const top = headings[0].node.depth;
    tree.children.splice(tree.children.indexOf(headings[0].node), 1);
    const anchors = new Map([[headings[0].section.anchor, pageUrl(page)]]);
    const slugger = new GithubSlugger();
    for (const { node, section } of headings.slice(1)) {
        node.depth = Math.min(6, Math.max(2, node.depth - top + 1));
        anchors.set(section.anchor, `${pageUrl(page)}#${slugger.slug(toString(node))}`);
    }
    visit(tree, "mdxJsxTextElement", (node) => {
        if (node.name === "a") anchors.set(node.attributes[0].value, `${pageUrl(page)}#${node.attributes[0].value}`);
    });
    return { tree, anchors, imports: context.imports, modules: [...new Set(context.modules)] };
}

export function resolveLinks(tree, anchors, page) {
    visit(tree, "link", (node) => {
        if (!node.url.startsWith("#")) return;
        const target = anchors.get(node.url.slice(1));
        if (target === undefined) throw new Error(`${pageId(page)} links to #${node.url.slice(1)}, which is not an anchor on the old page`);
        node.url = target;
    });
}

const yamlString = (value) => JSON.stringify(value);

export function frontMatter(page, order, modules) {
    const lines = [`title: ${yamlString(page.title)}`, `description: ${yamlString(page.description)}`, `sidebar:\n  order: ${order}`];
    if (page.layer) lines.push(`layer: ${yamlString(page.layer)}`);
    if (page.stack) lines.push(`stack: [${page.stack.join(", ")}]`);
    if (page.model) lines.push(`model: [${page.model.join(", ")}]`);
    if (modules.length > 0) lines.push(`modules: [${modules.join(", ")}]`);
    return `---\n${lines.join("\n")}\n---\n`;
}

const IMPORTS = {
    Tabs: `import { TabItem, Tabs } from "@astrojs/starlight/components";`,
    Dependency: `import Dependency from "../../../../components/Dependency.astro";`,
    StarUs: `import StarUs from "../../../../components/StarUs.astro";`,
};

// The text before the first heading of docs.md: the version line and the "star us" box. They open the introduction.
const PREAMBLE = `The documentation is always for the latest version of Occurrent, currently \`${VERSION_TOKEN}\`.\n\n<StarUs />\n`;

export function convertAll({ docs, inventory, pageList = pages, read = readInclude }) {
    const docsLines = docs.replace(/\r\n/g, "\n").split("\n");
    const assigned = assignSections(inventory.sections, pageList);
    const converted = [];
    const anchors = new Map([["_preamble", "/docs/overview/introduction/"]]);
    for (const anchor of ["starUsLong", "starUsShort", "starFrame"]) anchors.set(anchor, `/docs/overview/introduction/#${anchor}`);
    const order = {};
    for (const page of pageList) {
        order[page.group] = page.slug === "index" ? 0 : (order[page.group] ?? 0) + 1;
        const sections = assigned.get(pageId(page));
        if (sections.length === 0) continue;
        const result = convertPage(page, sections, docsLines, read);
        for (const [anchor, url] of result.anchors) {
            if (anchors.has(anchor)) throw new Error(`#${anchor} lands on two pages`);
            anchors.set(anchor, url);
        }
        converted.push({ page, order: order[page.group], ...result });
    }
    const files = [];
    for (const { page, order: pageOrder, tree, imports, modules } of converted) {
        resolveLinks(tree, anchors, page);
        const preamble = pageId(page) === "overview/introduction" ? PREAMBLE : "";
        if (preamble) imports.add("StarUs");
        const importLines = [...imports].sort().map((name) => IMPORTS[name]);
        // Turning Markdown into HTML percent-encodes the token's last "%" in a link target, so undo that.
        const body = String(stringifier.stringify(tree)).replaceAll(`${VERSION_TOKEN}25`, VERSION_TOKEN);
        if (/occ-component|OCCHEADING|\{%|\{\{/.test(body)) throw new Error(`${pageId(page)} still has Liquid or a placeholder in it`);
        const importBlock = importLines.length > 0 ? `${importLines.join("\n")}\n` : "";
        const content = [frontMatter(page, pageOrder, modules), importBlock, preamble, body].filter((part) => part !== "").join("\n");
        files.push({ page, path: `${pageId(page)}.mdx`, content });
    }
    return { files, anchors };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const docs = readFileSync(join(repo, "pages/docs/docs.md"), "utf8");
    const { files, anchors } = convertAll({ docs, inventory: currentInventory() });
    const dryRun = process.argv.includes("--dry-run");
    let written = 0;
    for (const { page, path, content } of files) {
        if (HAND_PORTED.includes(pageId(page))) continue;
        if (dryRun) continue;
        const target = join(docsDir, path);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, content);
        const stub = target.replace(/\.mdx$/, ".md");
        if (existsSync(stub)) rmSync(stub);
        written++;
    }
    const moveMap = Object.fromEntries([...anchors].sort(([a], [b]) => a.localeCompare(b)));
    if (!dryRun) writeFileSync(join(here, "move-map.json"), `${JSON.stringify(moveMap, null, 2)}\n`);
    console.log(`${dryRun ? "Would write" : "Wrote"} ${dryRun ? files.length : written} pages and ${anchors.size} anchors in move-map.json.`);
}
