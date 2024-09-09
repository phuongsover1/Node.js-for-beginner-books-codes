export const sum = (a, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Please provide a valid number");
  }
  return a + b;
};
export const multiply = (a, b) => a * b;
export const subtract = (a, b) => a - b;
