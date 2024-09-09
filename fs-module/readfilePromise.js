import { readFile } from "node:fs/promises";

readFile("hello.txt")
  .then((content) => console.log(`File content: ${content}`))
  .catch((err) => console.log("OMG, there is an error: ", err));
