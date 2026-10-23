import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import starlightLlmActions from "starlight-llm-actions";
import remarkPageMeta from "./src/plugins/remark-page-meta.mjs";
import remarkVersion from "./src/plugins/remark-version.mjs";
import jekyllUrls from "./src/integrations/jekyll-urls.mjs";

// The sidebar is the layer model. Each group lists the pages in its directory, ordered by sidebar.order.
const groups = [
    ["Overview", "overview"],
    ["Layer 0: CloudEvents", "layer-0"],
    ["Layer 1: Domain events", "layer-1"],
    ["Spring Boot", "spring-boot"],
    ["Layer 3: Your own framework", "layer-3"],
    ["Stores and infrastructure", "stores"],
    ["Testing", "testing"],
    ["Extending Occurrent", "extending"],
    ["Upgrading", "upgrading"],
    ["Resources", "resources"],
];

export default defineConfig({
    site: "https://occurrent.org",
    markdown: { remarkPlugins: [remarkVersion, remarkPageMeta] },
    integrations: [
        starlight({
            title: "Occurrent",
            description: "Event sourcing utilities for the JVM, based on the CloudEvents specification.",
            logo: { src: "./src/logo.png", alt: "Occurrent" },
            favicon: "/favicon.png",
            social: [{ icon: "github", label: "GitHub", href: "https://github.com/johanhaleby/occurrent" }],
            editLink: { baseUrl: "https://github.com/occurrent-org/occurrent-org.github.io/edit/main/site/" },
            customCss: ["./src/styles/custom.css"],
            // Groups other than Overview start collapsed. The group of the page you are on always opens.
            sidebar: groups.map(([label, directory], index) => ({ label, collapsed: index > 0, items: [{ autogenerate: { directory: `docs/${directory}` } }] })),
            plugins: [
                // The news pages are Astro pages rather than Starlight content, so the validator can't see them.
                starlightLinksValidator({ exclude: ["/news/", "/news/**/*"] }),
                starlightLlmActions({
                    renderMarkdown: "simple",
                    linkAlternate: true,
                    llmsTxt: {
                        // Earlier patterns come first, so the index follows the sidebar.
                        promote: groups.map(([, directory]) => `docs/${directory}/**`),
                        subsets: groups.slice(1).map(([label, directory]) => ({ label, description: `every page under ${label}`, paths: [`docs/${directory}/**`] })),
                    },
                }),
            ],
        }),
        jekyllUrls(),
    ],
});
