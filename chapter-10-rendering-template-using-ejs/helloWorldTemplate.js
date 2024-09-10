import express from "express";
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("index", {
//     title: "This is an Express app",
//     subtitle: "using EJS as template engine",
//   });
// });

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

// Query params
app.get(/^\/films$/, (req, res) => {
  const { category, director } = req.query;
  res.send(
    `You are looking for films with category ${category} and director ${director}`
  );
});

// The important of order
app.get("/users/me", (req, res) => {
  res.send("You are looking for the current user");
});

app.get("/users/:id", (req, res) => {
  res.send(`You are looking for the user with id ${req.params.id}`);
});

// Header management
// app.get("/", (req, res, next) => {
//   res.set({
//     "Content-Type": "text/html",
//     "x-powered-by": "Unicorns and rainbows",
//   });

//   res.removeHeader("x-powered-by");
//   res.send("<h1>Hello World</h1>");
// });

// Status codes
// app.get("/", (req, res, next) => {
//   res.status(200);
//   res.send("<h1>Hello World</h1>");
// });

// Chaining method
// app.get("/", (req, res, next) => {
//   res.status(200).set("Content-Type", "text/html").send("<h1>Hello World</h1>");
// });

// Sending status codes only
// app.get("/", (req, res, next) => {
//   res.sendStatus(500);
// });

// Redirects
app.get("/", (req, res, next) => {
  res.redirect(301, "https://ulisesgascon.com/");
});

app.listen(port, () => {
  console.log(`Application running in http://localhost:${port}`);
});
