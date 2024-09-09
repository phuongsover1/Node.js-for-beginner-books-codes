import { sum, multiply } from "../utils.js";

describe("Utils Test Suite: sum", () => {
  it("Should sum two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });
});

describe("Utils Test Suite: multiply", () => {
  it("Should multiply two numbers", () => {
    expect(multiply(5, 3)).toBe(14);
  });
});
