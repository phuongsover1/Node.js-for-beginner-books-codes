import { save, on } from "./utils.mjs";

on("file:saved", ({ location, data }) => {
  console.log(`File saved at ${location}`);
});

console.log("Saving file");
save("test.txt", "Hello world!").catch("Error saving file");
console.log("The file is being saved but is not blocking the execution..");
