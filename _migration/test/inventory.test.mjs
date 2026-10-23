import { test } from "node:test";
import assert from "node:assert/strict";
import { buildInventory, currentInventory } from "../inventory.mjs";

test("totals add up the parsed units", () => {
    const { totals } = buildInventory("# A\n\nOne two.\n\n~~~java\nx();\n~~~\n\n## B\n\nThree.\n", () => "");
    assert.deepEqual(totals, { sections: 2, anchors: 2, codeBlocks: 1, fencedCodeBlocks: 1, snippetCodeBlocks: 0, includes: 0, dependencies: 0, words: 3 });
});

test("today's docs page parses", () => {
    const { totals } = currentInventory();
    assert.ok(totals.sections > 300 && totals.anchors > 300 && totals.codeBlocks > 400, JSON.stringify(totals));
});
