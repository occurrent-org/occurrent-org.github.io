import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

// Every page says which layer, stack and programming model it is about, which modules it needs, and for a newer
// feature, the version that added it.
// remark-page-meta.mjs shows this under the page title, so it also ends up in the page's Markdown copy.
export const collections = {
    docs: defineCollection({
        loader: docsLoader(),
        schema: docsSchema({
            extend: z.object({
                layer: z.enum(["0", "1", "spring-boot", "3"]).optional(),
                stack: z.array(z.enum(["plain-java", "spring-data", "spring-boot"])).optional(),
                model: z.array(z.enum(["blocking", "reactive"])).optional(),
                modules: z.array(z.string()).optional(),
                addedIn: z.string().optional(),
            }),
        }),
    }),
    // The release posts, copied from Jekyll's _posts/news by _migration/news.mjs.
    news: defineCollection({
        loader: glob({ pattern: "*.md", base: "./src/content/news" }),
        schema: z.object({
            title: z.string(),
            version: z.string(),
            date: z.coerce.date(),
            summary: z.string(),
            hidewhatsoccurrent: z.boolean().optional(),
        }),
    }),
};
