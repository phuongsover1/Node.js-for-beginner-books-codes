import { createServer } from "node:http";

const port = 3000;
const server = createServer();

server.on("request", (request, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>This is my first HTTP server in Node.js. Yay</h1>");
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
