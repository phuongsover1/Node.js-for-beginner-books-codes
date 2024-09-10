import { URL } from "node:url";

const myUrl = new URL(
  "https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash"
);

console.log(myUrl.hash); // #hash
console.log(myUrl.host); // sub.example.com:8080
console.log(myUrl.hostname); // sub.example.com
console.log(myUrl.username);
