# Repository guide

This is [occurrent.org](https://occurrent.org), the documentation site for [Occurrent](https://github.com/johanhaleby/occurrent). It is a Jekyll site. The main documentation page is `pages/docs/docs.md`, rendered at `/documentation`, and release announcements live under `_posts/news/`.

## "Added in vX.Y.Z" version labels

The documentation marks when a feature first shipped with a small "Added in vX.Y.Z" badge next to its heading (the Query DSL heading is an example). These labels come from the `addedTags` map in `js/_partials/main.js`, and only run on the `/documentation` page.

Each entry maps a section's HTML id to the version that introduced it:

```js
"saga-dsl" : "0.31.0",
```

The id is the one kramdown generates from the heading text, lowercased with spaces turned into hyphens, so `## Saga DSL` becomes `saga-dsl`. When a heading sets an explicit `{#anchor}`, use that anchor instead. A label whose id matches no element on the page is skipped, so an entry can be added before its section merges without breaking the page.

When you document a feature that ships in a release, add its id and version here. Do the same when you rewrite an existing section to describe newly added first-class support, as the `## Snapshots` section was for 0.31.0.

## Prose voice

Human-facing prose (documentation, news posts, PR descriptions) follows Johan's writing style: direct, concrete, no corporate filler. Do not use em-dashes, en-dashes, or semicolons in prose, recast with commas, periods, or parentheses. Johan drives this with the `johan-writing` skill.

## Release workflow

Documentation for an unreleased Occurrent feature lives on its own branch, one branch and pull request per feature, and is held until the matching library release ships. `main` tracks the released site, so do not push feature documentation straight to `main`.
