import { readFileSync } from "node:fs";

try {
  const content = readFileSync("hello.txxt");
  console.log(`File content: ${content}`);
} catch (err) {
  const a = 3;
  console.error("OMG. there is an error: ", err, a);
}
