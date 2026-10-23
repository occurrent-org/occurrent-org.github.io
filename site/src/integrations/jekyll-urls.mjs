// Keeps the addresses the Jekyll site had. Astro builds every page as a directory with an index.html, but Jekyll
// served /news/2021/01/06/0_5_0.html and /documentation.html, and links to those exist all over the web.
//
// After the build, each news post moves from /news/2021/01/06/0_5_0/index.html to /news/2021/01/06/0_5_0.html, the
// sitemap follows, and /documentation/index.html is copied to /documentation.html.
import { copyFileSync, existsSync, readFileSync, readdirSync, renameSync, rmdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const subdirectories = (dir) => readdirSync(dir).filter((name) => statSync(join(dir, name)).isDirectory());

export default function jekyllUrls() {
    return {
        name: "jekyll-urls",
        hooks: {
            "astro:build:done": ({ dir }) => {
                const out = fileURLToPath(dir);
                const news = join(out, "news");
                for (const year of subdirectories(news).filter((name) => /^\d{4}$/.test(name))) {
                    for (const month of subdirectories(join(news, year))) {
                        for (const day of subdirectories(join(news, year, month))) {
                            for (const name of subdirectories(join(news, year, month, day))) {
                                const post = join(news, year, month, day, name);
                                renameSync(join(post, "index.html"), `${post}.html`);
                                rmdirSync(post);
                            }
                        }
                    }
                }
                for (const sitemap of readdirSync(out).filter((name) => /^sitemap-\d+\.xml$/.test(name))) {
                    const path = join(out, sitemap);
                    writeFileSync(path, readFileSync(path, "utf8").replace(/(\/news\/\d{4}\/\d{2}\/\d{2}\/[^/<]+)\/</g, "$1.html<"));
                }
                if (existsSync(join(out, "documentation/index.html"))) copyFileSync(join(out, "documentation/index.html"), join(out, "documentation.html"));
            },
        },
    };
}
