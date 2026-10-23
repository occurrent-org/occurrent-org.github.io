# Docs migration checks

The docs are moving from the single page `pages/docs/docs.md` to a multi-page site. These scripts make sure nothing on today's page gets lost on the way. The directory starts with an underscore so Jekyll leaves it out of the site.

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
* no section has lost more than 10% of its words

`move-map.json` also drives the redirects, so an old link like `/documentation#saga-dsl` keeps working.

## Running them

```bash
node --test '_migration/test/*.test.mjs'
bundle exec jekyll build -d _site
node _migration/check-against-jekyll.mjs _site/documentation.html
node _migration/verify.mjs --report
```

CI runs all of this on every pull request. `verify.mjs` runs with `--report` until the content has moved to the new site, because until then every anchor is reported as missing. Once the content is in, CI drops `--report` and a gap fails the build.
