import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkLinks } from "./check-links.mjs";

const write = (dir, path, content = "") => {
    mkdirSync(join(dir, path, ".."), { recursive: true });
    writeFileSync(join(dir, path), content);
};

test("a broken internal link and a missing old address are reported", () => {
    const site = mkdtempSync(join(tmpdir(), "site-"));
    const posts = mkdtempSync(join(tmpdir(), "posts-"));
    write(posts, "2021-01-06-0_5_0.md");
    write(posts, "2021-02-01-0_6_0.md");
    write(site, "index.html", '<a href="/docs/a/#x">a</a> <a href="/docs/gone/">gone</a> <a href="//cdn.example/x.js">cdn</a>');
    write(site, "docs/a/index.html");
    write(site, "documentation/index.html");
    write(site, "documentation.html");
    write(site, "news/index.html");
    write(site, "news/2021/01/06/0_5_0.html");
    assert.deepEqual(checkLinks(site, posts), ["/index.html links to /docs/gone/, which isn't built", "/news/2021/02/01/0_6_0.html was served by the old site but isn't built"]);
});
