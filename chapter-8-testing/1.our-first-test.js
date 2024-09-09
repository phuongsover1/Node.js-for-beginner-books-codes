import { describe, it } from "node:test";
import assert from "node:assert";

const sum = (a, b) => a + b;
desctibe("Utils Test Suite", () => {
  it("Should sum two numbers", () => {
    assert.strictEqual(sum(1, 2), 3);
  });
});
