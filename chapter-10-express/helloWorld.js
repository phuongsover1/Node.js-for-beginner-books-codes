import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World from Express");
});

app.listen(PORT, () => {
  console.log(`Hello World app listening on port ${PORT}`);
});
