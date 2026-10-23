# Docs migration checks

The docs are moving from the single page `pages/docs/docs.md` to the multi-page site in `site/`. These scripts moved the content and make sure nothing on today's page got lost on the way. The directory starts with an underscore so Jekyll leaves it out of the site.

The content has moved. Write new docs in `site/`. `docs.md` stays until the new site goes live, and CI fails if it gets something the new site lacks, so a change to `docs.md` needs the same change in `site/`.

## How the content moved

`convert.mjs` made the pages in `site/src/content/docs/docs/` from `docs.md`. `pages.mjs` lists every page with the lines of `docs.md` it is made from. A section moves to the page whose range holds its heading, and to the shorter range when two do. For each page the converter:

* inlines the included macros, and turns the Java/Kotlin snippets into `<Tabs syncKey="lang">` and the dependency snippets into `<Dependency />` (or into tabs with the exact text, if one differs from what the component renders)
* writes the version as `%OCCURRENT_VERSION%`, which the site fills in from `_config.yml`
* turns `<div class="comment">` into a `:::note` aside and `<div class="notification">` into `:::caution`
* drops the section's first heading, since the page title replaces it, and moves the other headings up so the page starts at h2
* rewrites links to old anchors into links to the new pages, and writes `move-map.json`

It goes through HTML on the way, so that kramdown's inline HTML becomes plain Markdown.

The pages have been edited since, so don't run it again over them. It is kept to show how the pages came about, and to convert a held docs branch that changed `docs.md`: run it with `--dry-run` to check that it still converts, or run it in a scratch copy and carry the changed sections over by hand. Pages in `HAND_PORTED` in `convert.mjs` were written by hand and are never overwritten.

```bash
(cd _migration && npm ci)
node _migration/convert.mjs
```

## What they check

`inventory.mjs` reads `pages/docs/docs.md` and the macros it includes, and lists everything a reader can see or link to:

* one section per heading, with its word count, plus the text before the first heading
* every anchor: generated heading ids, explicit `{#id}` anchors and `<a id>` tags
* every code block, both fenced blocks and the Java/Kotlin pairs from `docsSnippet.html`, with a hash of its content
* every dependency snippet, by its `artifactId`
* every include

Run `node _migration/inventory.mjs` for the totals, or add `--out inventory.json` to look at the whole list. It is built from `docs.md` on every run, so it is never out of date.

`check-against-jekyll.mjs` compares that list with the page Jekyll builds. The anchors must match one to one, and the number of `<pre>` blocks on the page must match the code blocks and dependency snippets the inventory counted. If this fails after a docs change, the parser in `lib.mjs` is wrong, not the docs.

`verify.mjs` checks the new site against the inventory:

* every old anchor is in `move-map.json`, which maps it to its new URL, or in `merged.json`, which records a section merged into another because it said the same thing, with the reason
* every new URL is a built page that has the anchor
* every code block's content is in the new site's sources, unless a merge in `merged.json` lists it under `codeBlocks`
* every dependency's `artifactId` is in the new site's sources
* every link to another page or site is in the new site's sources
* no section has lost more than 10% of its words

`move-map.json` will also drive the redirects, so an old link like `/documentation#saga-dsl` keeps working.

## Running them

```bash
(cd _migration && npm ci)
node --test '_migration/test/*.test.mjs'
bundle exec jekyll build -d _site
node _migration/check-against-jekyll.mjs _site/documentation.html
(cd site && npm ci && npm run build)
node _migration/verify.mjs
```

`verify.mjs` reads the new site's sources from `site/src/content/docs` and the built pages from `site/dist`. An old anchor for a section that became a whole page maps to the page itself, with no `#`. Add `--report` to list every problem without failing.

CI runs all of this on every pull request, and a gap fails the build.
