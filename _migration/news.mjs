// Copies the news posts from Jekyll's _posts/news to the new site's news collection, and points their links to the
// old docs page at the pages the sections moved to. Run it again when a post is added to _posts/news before the
// cutover. It overwrites the copies, so edit a post in _posts/news until then.
//
//   node _migration/news.mjs

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export const INTRODUCTION = "/docs/overview/introduction/";

// Older posts link to anchors that had already gone from the docs page before the move. These are the pages that
// cover what the posts linked to.
export const RETIRED_ANCHORS = {
    "automatic-subscription-position-persistence-blocking": "/docs/layer-0/durable-subscriptions/",
    "application-service-event-conversion": "/docs/layer-1/cloudevent-conversion/",
    "stream-filtering-and-execute-options": "/docs/layer-0/stream-filtering/",
};

// "/documentation#saga-dsl" and "https://occurrent.org/documentation#saga-dsl" both become the page the section
// moved to. A link to an anchor the move map doesn't know is left alone and returned, so it can be reported.
export function rewriteDocsLinks(text, moveMap, retired = RETIRED_ANCHORS) {
    const unknown = [];
    const rewritten = text.replace(/(?:https?:\/\/(?:www\.)?occurrent\.org)?\/documentation(?:\.html)?(?:#([\w-]+))?(?=[)\s"'>]|$)/g, (link, anchor) => {
        if (anchor === undefined) return INTRODUCTION;
        if (Object.hasOwn(moveMap, anchor)) return moveMap[anchor];
        if (Object.hasOwn(retired, anchor)) return retired[anchor];
        unknown.push(anchor);
        return link;
    });
    return { text: rewritten, unknown };
}

const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
    const root = join(dirname(fileURLToPath(import.meta.url)), "..");
    const moveMap = JSON.parse(readFileSync(join(root, "_migration/move-map.json"), "utf8"));
    const from = join(root, "_posts/news");
    const to = join(root, "site/src/content/news");
    rmSync(to, { recursive: true, force: true });
    mkdirSync(to, { recursive: true });
    const posts = readdirSync(from).filter((name) => name.endsWith(".md"));
    const unknown = [];
    for (const name of posts) {
        const result = rewriteDocsLinks(readFileSync(join(from, name), "utf8"), moveMap);
        unknown.push(...result.unknown.map((anchor) => `${name}: #${anchor}`));
        writeFileSync(join(to, name), result.text);
    }
    console.log(`Copied ${posts.length} news posts to site/src/content/news.`);
    if (unknown.length > 0) {
        console.error(`Links to anchors the move map doesn't know:\n${unknown.join("\n")}`);
        process.exitCode = 1;
    }
}
