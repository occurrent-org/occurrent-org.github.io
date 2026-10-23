import { getCollection, type CollectionEntry } from "astro:content";

export type NewsPost = CollectionEntry<"news">;

// A post keeps the address Jekyll gave it, /news/2021/01/06/0_5_0.html, so links to it from elsewhere still work.
// The route builds /news/2021/01/06/0_5_0/, and the news-html integration moves it to the .html file after the build.
// The dev server only knows the route's own address.
export function postParams(post: NewsPost) {
    const [, year, month, day, name] = post.id.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/)!;
    return { year, month, day, name };
}

export function postUrl(post: NewsPost) {
    const { year, month, day, name } = postParams(post);
    return import.meta.env.DEV ? `/news/${year}/${month}/${day}/${name}/` : `/news/${year}/${month}/${day}/${name}.html`;
}

export async function newsPosts() {
    return (await getCollection("news")).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const formatDate = (date: Date) => date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
