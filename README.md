# occurrent.org

This repository holds the website and documentation for [Occurrent](https://github.com/johanhaleby/occurrent), published at [occurrent.org](https://occurrent.org).

Pull requests that add tutorials or fix mistakes in the docs are very welcome.

## Run it locally

You need Node 24 or later.

```bash
cd site
npm install
npm run dev
```

Open http://localhost:4321. Pages reload when you save a file.

Search, the news posts at their `.html` addresses, the `.md` copy of each page and `llms.txt` only exist in a full build:

```bash
npm run build
npm run preview
```

## Where things are

The site is built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build), and lives in `site/`.

* `site/src/content/docs/index.mdx` is the landing page.
* `site/src/content/docs/docs/` holds the documentation, one directory per sidebar group.
* `site/src/content/news/` holds the release posts. A post's file name gives its address, so `2021-01-06-0_5_0.md` is published at `/news/2021/01/06/0_5_0.html`.
* `site/src/version.mjs` holds the Occurrent version the docs describe.
* `site/public/` holds files served as they are, such as images.

[`site/README.md`](site/README.md) explains how to write a page.

## Publishing

Every push to `main` builds the site and publishes it to GitHub Pages, see `.github/workflows/deploy-site.yml`. Before it publishes, the build fails on a broken internal link, and `npm run check-links` fails if a link on the built site leads nowhere or an address the old site served is gone. Pull requests run the same checks.

## Links from the old site

The docs used to be one long page at `/documentation`. A link to one of its sections, such as `/documentation#saga-dsl`, still works: `site/src/pages/documentation.astro` sends it to the page the section moved to, using `site/src/data/old-docs-anchors.json`.
