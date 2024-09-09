const { sayGoodbye } = require("./utils.cjs");
import("./utils.mjs").then(({ sayHello }) => {
  sayHello();
  sayGoodbye();
});
