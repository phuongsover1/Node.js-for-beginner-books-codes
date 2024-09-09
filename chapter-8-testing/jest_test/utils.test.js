import { sum, multiply } from "../utils.js";

describe("Utils Test Suite: sum", () => {
  it("Should sum two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("Should throw an error if we don't provide a valid number", () => {
    expect(() => sum("1", 2)).toThrow("Please provide a valid number");
  });
});

describe("Utils Test Suite: multiply", () => {
  it("Should multiply two numbers", () => {
    expect(multiply(5, 3)).toBe(15);
  });
});
