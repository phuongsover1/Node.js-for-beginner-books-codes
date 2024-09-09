import { createRequire } from "module";
const require = createRequire(import.meta.url);
const user = require("./user.json");
console.log(user);
