import express from "express";
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    title: "This is an Express app",
    subtitle: "using EJS as template engine",
  });
});

app.get("/users/:id/from/:originCity/to/:destinationCity", (req, res) => {
  console.log("param: ", req.params);

  const { originCity, destinationCity } = req.params;
  res.send(`You are flying from ${originCity} to ${destinationCity}`);
});

// Optional parameters
app.get("/invoice/:id?", (req, res) => {
  const id = parseInt(req.params.id);
  if (id) {
    res.send(`You are looking for the invoice with id ${id}`);
  } else {
    res.send(`You are looking for all the invoices`);
  }
});

// Regular expressions
app.get(/.*fly$/, (req, res) => {
  res.send(`Match with any route that ends with fly`);
});

app.get("/msg/:id/:action(edit|delete)", (req, res, next) => {
  res.send(
    `You request the action ${req.params.action} for the message ${req.params.id}`
  );
});

app.get(/^\/films$/, (req, res) => {
  const { category, director } = req.query;
  res.send(
    `You are looking for films with category ${category} and director ${director}`
  );
});

app.listen(port, () => {
  console.log(`Application running in http://localhost:${port}`);
});
