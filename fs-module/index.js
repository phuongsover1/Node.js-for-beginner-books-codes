import { readFile } from "node:fs";

readFile("hello.txt", (err, content) => {
  if (err) {
    console.error("OMG, there is an error: ", err);
    return;
  }

  console.log(`File content: ${content}`);
  // File content: Hello world
});
