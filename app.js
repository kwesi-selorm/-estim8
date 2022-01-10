
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

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

//Global variable
var totalPrice = 0;

// POST method for the add-more button

app.post('/items', function (req, res) {
    var price = req.body.price;
    var quantity = req.body.quantity;
    var newItemPrice = price * quantity;

    totalPrice += newItemPrice;
    console.log(totalPrice);
    // res.sendFile(__dirname + "/index.html");
});

app.post("/calculate", function (req, res) {
    const cost = totalPrice;
    res.render("result", { cost });
})

// Port
app.listen(port, function () {
    console.log("Server listening at port " + port);
})
