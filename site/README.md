# occurrent.org, the new site

This is the Starlight site that will replace the Jekyll site in the repository root. It isn't live yet. Until the switch, GitHub Pages keeps serving the Jekyll site, which leaves this directory out.

## Run it locally

You need Node 24 or later.

```bash
cd site
npm install
npm run dev
```

Open http://localhost:4321. Pages reload when you save a file.

Search, the `.md` copy of each page and `llms.txt` are only built by a full build:

```bash
npm run build
npm run preview
```

## Where things are

* `src/content/docs/docs/` holds the pages, one directory per sidebar group. A page's place in its group comes from `sidebar.order` in its front matter.
* Front matter says what a page is about: `layer` (`"0"`, `"1"`, `"spring-boot"` or `"3"`), `stack` (`plain-java`, `spring-data`, `spring-boot`), `model` (`blocking`, `reactive`) and `modules`. They show as badges under the title, and in the page's Markdown copy.
* `<Dependency artifact="occurrent-eventstore-inmemory" />` renders the dependency snippet for every build tool. Add `scope="test"` for a test dependency. The version comes from `occurrentversion` in the root `_config.yml`.
* Java and Kotlin examples go in `<Tabs syncKey="lang">`, so the reader's choice holds across pages.
* `astro.config.mjs` defines the sidebar groups, and the `llms.txt` files built from them.

Most pages are placeholders until the content moves over from `pages/docs/docs.md`. See `_migration/README.md` for the checks that make sure nothing is lost on the way.
