# Repository guide

This is [occurrent.org](https://occurrent.org), the website and documentation for [Occurrent](https://github.com/johanhaleby/occurrent). It is an Astro Starlight site in `site/`. [`README.md`](README.md) says how to run it and where things are, and [`site/README.md`](site/README.md) says how to write a page. Read both before you change anything.

## Checking a change

From `site/`, run `npm test`, `npm run build` and `npm run check-links`. The build fails on a broken internal link, including a link to a heading that no longer exists. `check-links` fails if a link on the built site leads nowhere, or if an address the old Jekyll site served is gone. Look at a changed page in `npm run preview` before you call it done.

## "Added in" labels

When a feature first ships in a release, mark it with the version. For a whole page, set `addedIn: "0.31.0"` in its front matter. For a section, put `<HeadingBadge text="Added in 0.31.0" />` straight after the heading text, with no space before it, so the heading's id stays the same. Do the same when you rewrite a section to describe newly added first-class support.

## Old anchors

`site/src/data/old-docs-anchors.json` maps every anchor on the old single docs page to its new address, and `/documentation#anchor` links all over the web depend on it. When you rename or move a page or a heading that an entry points to, update the entry.

## Prose voice

Human-facing prose (documentation, news posts, PR descriptions) follows Johan's writing style: direct, concrete, no corporate filler. Do not use em-dashes, en-dashes, or semicolons in prose, recast with commas, periods, or parentheses. Johan drives this with the `johan-writing` skill.

## Writing for people

**Write the pages and the news posts the way you would explain the change to another developer out loud.** Plain words, no term standing in for a plain statement the reader can act on, and nothing beyond what they need in order to act. A paragraph that needs a second reading gets rewritten, not extended.

## Release workflow

Documentation for an unreleased Occurrent feature lives on its own branch, one branch and pull request per feature, and is held until the matching library release ships. `main` is what occurrent.org shows, and every push to it publishes, so do not push feature documentation straight to `main`. A release bumps `site/src/version.mjs` and adds a post to `site/src/content/news/`.
