// Puts a line at the top of each page that says what the page is about: its layer, stack, programming model, the
// version that added it and its modules, taken from the front matter. It is part of the content rather than the page
// chrome, so the Markdown copy of the page that AI tools read carries it too.

const LAYERS = {
    0: ["Layer 0: CloudEvents", "/docs/layer-0/"],
    1: ["Layer 1: Domain events", "/docs/layer-1/"],
    "spring-boot": ["Spring Boot", "/docs/spring-boot/"],
    3: ["Layer 3: Your own framework", "/docs/layer-3/your-own-framework/"],
};
const STACKS = { "plain-java": "Plain Java", "spring-data": "Spring Data", "spring-boot": "Spring Boot" };
const MODELS = { blocking: "Blocking", reactive: "Reactive" };

const SEPARATOR = `<span class="page-meta-separator"> · </span>`;

const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const badge = (text, kind) => `<span class="page-meta-badge page-meta-${kind}">${escape(text)}</span>`;

export function pageMeta(frontmatter) {
    const parts = [];
    if (frontmatter.layer !== undefined) {
        const [label, href] = LAYERS[frontmatter.layer];
        parts.push(`<a href="${href}">${badge(label, "layer")}</a>`);
    }
    for (const stack of frontmatter.stack ?? []) {
        if (!(frontmatter.layer === "spring-boot" && stack === "spring-boot")) parts.push(badge(STACKS[stack], "stack"));
    }
    for (const model of frontmatter.model ?? []) parts.push(badge(MODELS[model], "model"));
    if (frontmatter.addedIn !== undefined) parts.push(badge(`Added in ${frontmatter.addedIn}`, "added"));
    const modules = (frontmatter.modules ?? []).map((module) => `<code>${escape(module)}</code>`);
    if (parts.length === 0 && modules.length === 0) return null;
    if (modules.length > 0) parts.push(`<span class="page-meta-modules">Modules: ${modules.join(", ")}</span>`);
    // The separators are hidden on the page, where the badges stand apart, but keep the Markdown copy readable.
    return `<p class="page-meta">${parts.join(SEPARATOR)}</p>`;
}

export default function remarkPageMeta() {
    return (tree, file) => {
        const html = pageMeta(file.data.astro?.frontmatter ?? {});
        if (html) tree.children.unshift({ type: "html", value: html });
    };
}
