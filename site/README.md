# Writing pages for occurrent.org

This is the Starlight site published at [occurrent.org](https://occurrent.org). The [README in the repository root](../README.md) says how it is built and published.

## Run it locally

You need Node 24 or later.

```bash
cd site
npm install
npm run dev
```

Open http://localhost:4321. Pages reload when you save a file.

Search, the news posts at their `.html` addresses, the `.md` copy of each page and `llms.txt` are only built by a full build:

```bash
npm run build
npm run preview
```

## Where things are

* `src/content/docs/docs/` holds the pages, one directory per sidebar group. A page's place in its group comes from `sidebar.order` in its front matter.
* Front matter says what a page is about: `layer` (`"0"`, `"1"`, `"spring-boot"` or `"3"`), `stack` (`plain-java`, `spring-data`, `spring-boot`), `model` (`blocking`, `reactive`) and `modules`. They show as badges under the title, and in the page's Markdown copy.
* `<Dependency artifact="occurrent-eventstore-inmemory" />` renders the dependency snippet for every build tool. Add `scope="test"` for a test dependency. The version comes from `src/version.mjs`.
* Java and Kotlin examples go in `<Tabs syncKey="lang">`, so the reader's choice holds across pages.
* Write the Occurrent version as `%OCCURRENT_VERSION%`, in text, code or a link. The build fills it in from `src/version.mjs`.
* Asides use Starlight's `:::note` and `:::caution`.
* The first time a page mentions a type, an annotation or a feature that has its own page, link it to that page, for example `` [`ApplicationService`](/docs/layer-1/application-service/) ``. Later mentions on the same page stay plain.
* A feature that shipped in a given release gets `addedIn: "x.y.z"` in the front matter of its page, or `<HeadingBadge text="Added in x.y.z" />` right after its heading text, with no space before it.
* `astro.config.mjs` defines the sidebar groups, and the `llms.txt` files built from them.
* `src/content/news/` holds the release posts, and `src/pages/news/` renders them.

The content moved over from the single page the docs used to be, `pages/docs/docs.md` on the old Jekyll site. The move happened in pull request [#93](https://github.com/occurrent-org/occurrent-org.github.io/pull/93).
