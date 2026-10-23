import { test } from "node:test";
import assert from "node:assert/strict";
import { rewriteDocsLinks } from "../news.mjs";

const moveMap = { "saga-dsl": "/docs/layer-1/sagas/", snapshots: "/docs/layer-1/snapshots/" };

test("links to the old docs page point to where the section moved", () => {
    const { text, unknown } = rewriteDocsLinks(
        "See [sagas](/documentation#saga-dsl), [snapshots](https://occurrent.org/documentation#snapshots) and [the docs](/documentation).",
        moveMap,
    );
    assert.equal(text, "See [sagas](/docs/layer-1/sagas/), [snapshots](/docs/layer-1/snapshots/) and [the docs](/docs/overview/introduction/).");
    assert.deepEqual(unknown, []);
});

test("a link to an anchor the move map doesn't know is kept and reported", () => {
    const { text, unknown } = rewriteDocsLinks("[gone](/documentation#gone)", moveMap, {});
    assert.equal(text, "[gone](/documentation#gone)");
    assert.deepEqual(unknown, ["gone"]);
});

test("other occurrent.org links are left alone", () => {
    const input = "[0.5.0](https://occurrent.org/news/2021/01/06/0_5_0.html) and /documentation-guide";
    assert.equal(rewriteDocsLinks(input, moveMap).text, input);
});
