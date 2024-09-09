import { EventEmitter } from "node:events";

const emitter = new EventEmitter();

emitter.on("message", (message) => {
  console.log(`Message received: ${message}`);
});

emitter.emit("message", "Hello world!");
