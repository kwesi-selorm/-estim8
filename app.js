//jshint esversion:6

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

// Use bodyParser
const bodyParser = require("body-parser");
app.use("/", bodyParser.urlencoded({ extended: true }));

// Use static files
app.use(express.static(__dirname + "/public"));

//EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

//Global variables
let currency_symbol = [];
let totalPrice = 0;
let amountToPay = [];

// Render home page
app.get("/", function (req, res) {
  res.render("index");
});

// POST method for the add-more button
app.post("/", function (req, res) {
  let currency = req.body.currency;
  let price = req.body.price;
  let quantity = req.body.quantity;
  let newItemPrice = price * quantity;

  amountToPay.push(newItemPrice);

  currency_symbol.push(currency);
  totalPrice += newItemPrice;

  res.redirect("/items");
});

//Render items page
app.get("/items", function (req, res) {
  let symbol = currency_symbol[0];
  res.render("items", { symbol: symbol });
});

//Calculate total cost
app.post("/result", function (req, res) {
  let symbol = currency_symbol[0];
  let cost = totalPrice;

  res.render("result", { symbol: symbol, cost: cost });
});

// Port
app.listen(port, function () {
  console.log("Server listening at port " + port);
});
