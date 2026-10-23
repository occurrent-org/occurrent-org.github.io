// Shared parsing for the docs migration scripts. Everything here is pure, so the tests can feed it small inputs.

import { createHash } from "node:crypto";

export const sha256 = (text) => createHash("sha256").update(text).digest("hex");

// The heading id kramdown's GFM parser generates, which is what GitHub Pages renders.
// Duplicates get -1, -2, ... in document order.
export function createSlugger() {
    const seen = new Map();
    return (text) => {
        const base = text.toLowerCase().replace(/[^\p{L}\p{M}\p{N}\p{Pc}\- \t]/gu, "").replace(/[ \t]/g, "-");
        const count = seen.get(base) ?? 0;
        seen.set(base, count + 1);
        return count === 0 ? base : `${base}-${count}`;
    };
}

// Code is compared by content only: trailing whitespace, surrounding blank lines and common indentation don't count.
export function normalizeCode(code) {
    const lines = code.replace(/\r\n/g, "\n").split("\n").map((line) => line.replace(/\s+$/, ""));
    while (lines.length > 0 && lines[0] === "") lines.shift();
    while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
    const indents = lines.filter((line) => line !== "").map((line) => line.match(/^ */)[0].length);
    const indent = indents.length === 0 ? 0 : Math.min(...indents);
    return lines.map((line) => line.slice(indent)).join("\n");
}

// Prose words only: comments, Liquid tags, HTML tags, link targets and markdown punctuation are not words.
export function countWords(prose) {
    const text = prose
        .replace(/<!--[\s\S]*?-->/g, " ")
        .replace(/\{%[\s\S]*?%\}/g, " ")
        .replace(/\{\{[\s\S]*?\}\}/g, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\]\([^)]*\)/g, "] ")
        .replace(/\{#[^}]*\}/g, " ");
    return (text.match(/[\p{L}\p{N}][\p{L}\p{N}'._-]*/gu) ?? []).length;
}

const HEADING = /^(#{1,6})\s+(.*?)\s*$/;
const EXPLICIT_ID = /\s*\{#([^}]+)\}\s*$/;
const HTML_ID = /\sid="([^"]+)"/g;
const FENCE = /^(\s*)(`{3,}|~{3,})(.*)$/;
const CAPTURE_START = /^\s*\{% capture (\w+) %\}\s*$/;
const CAPTURE_END = /^\s*\{% endcapture %\}\s*$/;
const INCLUDE = /\{% include (\S+)(.*?)%\}/g;
const NAV_START = /<div id="spy-nav"/;
const DEPENDENCY_TEMPLATE = "macros/mavenSnippet.html";

const isFenceEnd = (line, marker) => line.trim().startsWith(marker) && line.trim().replace(/[`~]/g, "") === "";

// Walks kramdown + Liquid source line by line and reports what it finds, in order:
// headings, prose lines, code (fenced blocks, and Liquid captures handed to a snippet include),
// dependency snippets, includes of other files, and the hand-written navigation menu.
function walk(source, on) {
    const lines = source.replace(/\r\n/g, "\n").split("\n");
    let fence = null;
    let capture = null;
    let captures = new Map();
    let nav = null;
    let frontMatter = lines[0] === "---";

    const flushCaptures = () => {
        for (const { name, body, line } of captures.values()) on.code({ lang: name, kind: "capture", body, line });
        captures = new Map();
    };

    lines.forEach((line, i) => {
        const lineNo = i + 1;
        if (frontMatter) {
            if (i > 0 && line === "---") frontMatter = false;
            return;
        }
        if (nav) {
            if (/^<\/div>\s*$/.test(line)) {
                on.excluded({ startLine: nav, endLine: lineNo, reason: "Hand-written navigation menu. The new site generates its sidebar." });
                nav = null;
            }
            return;
        }
        if (fence) {
            if (isFenceEnd(line, fence.marker)) {
                on.code({ lang: fence.lang, kind: "fenced", body: fence.body.join("\n"), line: fence.line });
                fence = null;
            } else {
                fence.body.push(line);
            }
            return;
        }
        if (capture) {
            if (CAPTURE_END.test(line)) {
                captures.set(capture.name, { name: capture.name, body: capture.body.join("\n"), line: capture.line });
                capture = null;
            } else {
                capture.body.push(line);
            }
            return;
        }
        if (NAV_START.test(line)) {
            nav = lineNo;
            return;
        }
        const captureStart = line.match(CAPTURE_START);
        if (captureStart) {
            capture = { name: captureStart[1], line: lineNo, body: [] };
            return;
        }
        const fenceStart = line.match(FENCE);
        if (fenceStart) {
            fence = { marker: fenceStart[2], lang: fenceStart[3].trim() || null, line: lineNo, body: [] };
            return;
        }

        for (const match of line.matchAll(INCLUDE)) {
            const path = match[1];
            const params = [...match[2].matchAll(/(\w+)=(\w+)/g)].map((m) => ({ name: m[1], variable: m[2] }));
            const used = params.filter(({ variable }) => captures.has(variable));
            if (path === DEPENDENCY_TEMPLATE) {
                const maven = captures.get("maven")?.body ?? "";
                on.dependency({ artifactIds: [...maven.matchAll(/<artifactId>([^<]+)<\/artifactId>/g)].map((m) => m[1].trim()), line: lineNo });
            } else if (used.length > 0) {
                for (const { name, variable } of used) {
                    const { body, line: captureLine } = captures.get(variable);
                    on.code({ lang: name, kind: "snippet", body, line: captureLine });
                }
            } else {
                on.include({ path, line: lineNo });
            }
            captures = new Map();
        }
        if (/\{% include /.test(line)) return;

        const heading = line.match(HEADING);
        if (heading) {
            on.heading({ level: heading[1].length, text: heading[2], line: lineNo });
            return;
        }
        on.prose({ text: line, line: lineNo });
    });

    if (fence) throw new Error(`Unclosed code fence starting at line ${fence.line}`);
    if (capture) throw new Error(`Unclosed capture starting at line ${capture.line}`);
    if (nav) throw new Error(`Unclosed navigation menu starting at line ${nav}`);
    flushCaptures();
}

// Turns the kramdown source of the docs page into the units the migration has to account for:
// sections (one per heading, plus the text before the first heading), anchors, code blocks and includes.
// readInclude(path) returns the source of a file under _includes. The content of included macros
// counts towards the section that includes it, since that is where a reader sees it.
export function parseDocs(source, readInclude) {
    const slug = createSlugger();
    const sections = [];
    const anchors = [];
    const codeBlocks = [];
    const includes = [];
    const excluded = [];

    const newSection = (fields) => ({ ...fields, endLine: 0, words: 0, codeBlocks: [], dependencies: [], includes: [] });
    const preamble = newSection({ anchor: "_preamble", title: "(text before the first heading)", level: 0, line: 1 });
    let section = preamble;
    let prose = [];

    const closeSection = (endLine) => {
        section.endLine = endLine;
        section.words += countWords(prose.join("\n"));
        prose = [];
        const empty = section.words === 0 && section.codeBlocks.length === 0 && section.includes.length === 0 && section.dependencies.length === 0;
        if (section !== preamble || !empty) sections.push(section);
    };
    const addCode = ({ lang, kind, body, line }, file) => {
        const id = `code-${String(codeBlocks.length + 1).padStart(3, "0")}`;
        codeBlocks.push({ id, section: section.anchor, file: file ?? null, line, lang, kind, sha256: sha256(normalizeCode(body)) });
        section.codeBlocks.push(id);
        return id;
    };
    const addIds = (text, line) => {
        for (const match of text.matchAll(HTML_ID)) {
            anchors.push({ anchor: match[1], kind: text.includes(`<a id="${match[1]}"></a>`) ? "inline" : "html", line, section: section.anchor });
        }
    };

    // An included file is walked the same way. Its headings, if any, are kept as prose.
    const addInclude = ({ path, line }, stack) => {
        if (stack.includes(path)) throw new Error(`Include cycle: ${[...stack, path].join(" -> ")}`);
        const record = { path, line, section: section.anchor, words: 0, codeBlocks: [], dependencies: [] };
        includes.push(record);
        section.includes.push(path);
        const included = readInclude(path);
        const words = [];
        walk(included, {
            heading: ({ text }) => words.push(text),
            prose: ({ text }) => words.push(text),
            code: (code) => record.codeBlocks.push(addCode(code, `_includes/${path}`)),
            dependency: ({ artifactIds }) => {
                record.dependencies.push(...artifactIds);
                section.dependencies.push(...artifactIds);
            },
            include: (nested) => addInclude(nested, [...stack, path]),
            excluded: () => {},
        });
        record.words = countWords(words.join("\n"));
        section.words += record.words;
    };

    walk(source, {
        heading: ({ level, text, line }) => {
            closeSection(line - 1);
            const explicit = text.match(EXPLICIT_ID);
            const withoutId = explicit ? text.replace(EXPLICIT_ID, "") : text;
            const title = withoutId.replace(/<[^>]+>/g, "").trim();
            const anchor = explicit ? explicit[1] : slug(title);
            section = newSection({ anchor, title, level, line });
            anchors.push({ anchor, kind: explicit ? "explicit" : "generated", line, section: anchor });
            addIds(withoutId, line);
        },
        prose: ({ text, line }) => {
            addIds(text, line);
            prose.push(text);
        },
        code: (code) => addCode(code),
        dependency: ({ artifactIds }) => section.dependencies.push(...artifactIds),
        include: (include) => addInclude(include, []),
        excluded: (range) => excluded.push(range),
    });
    closeSection(source.split("\n").length);

    return { sections, anchors, codeBlocks, includes, excluded };
}

// The ids a built HTML page offers as link targets.
export function htmlIds(html) {
    return [...html.matchAll(HTML_ID)].map((match) => match[1]);
}

// Fenced code blocks in the markdown or MDX sources of the new site, normalized and hashed.
export function sourceCodeHashes(source) {
    const hashes = [];
    let fence = null;
    for (const line of source.replace(/\r\n/g, "\n").split("\n")) {
        if (fence) {
            if (isFenceEnd(line, fence.marker)) {
                hashes.push(sha256(normalizeCode(fence.body.join("\n"))));
                fence = null;
            } else {
                fence.body.push(line);
            }
            continue;
        }
        const start = line.match(FENCE);
        if (start) fence = { marker: start[2], body: [] };
    }
    return hashes;
}

// Prose words of the section whose heading carries the given id, up to the next heading.
// Code blocks are left out, as they are on the old page.
export function sectionWordsInHtml(html, id) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const heading = html.match(new RegExp(`<h([1-6])[^>]*\\sid="${escaped}"[^>]*>[\\s\\S]*?</h\\1>`));
    if (!heading) return null;
    const rest = html.slice(heading.index + heading[0].length);
    const next = rest.search(/<h[1-6][\s>]/);
    const body = (next < 0 ? rest : rest.slice(0, next))
        .replace(/<pre[\s\S]*?<\/pre>/g, " ")
        .replace(/<script[\s\S]*?<\/script>/g, " ")
        .replace(/<style[\s\S]*?<\/style>/g, " ")
        .replace(/&[a-z#0-9]+;/gi, " ");
    return countWords(body);
}
