import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Adding application middleware
app.use(bodyParser.json());

app.post("/echo", (req, res) => {
  // Echo the request body
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
