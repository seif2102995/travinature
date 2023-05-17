const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const signup_model2 = require("./models/signupschema");


//Read the current directory name

const hostname = "127.0.0.1";
const port = 8080;
const app = express();
const mongoose = require("mongoose");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public/js"));
app.use(express.static("public/resources"));
app.set("view engine", "ejs");
// app.use(express.urlencoded({extended:true})); // for post method
app.use(bodyParser.urlencoded({ extended: true })); // for post method
mongoose
  .connect(
    "mongodb+srv://seif2102995:travi231@travinature.3akvybv.mongodb.net/"
  )
  .then((result) => {
    app.listen(3010);
    console.log("connected to db successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", function (req, res) {
  res.render("home");
});


app.get("/book", function (req, res) {
  res.render("map");
});

app.get("/admin", function (req, res) {
  res.render("admin");
});
app.get("/signup", function (req, res) {
  res.render("signup");
});
app.get("/argentina", function (req, res) {
  res.render("argentina");
});
app.get("/eg", function (req, res) {
  res.render("eg");
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/login", function (req, res) {
  res.render("login");
});
app.post("/login", (req, res) => {
  if (req.body.username == "admin") {
    if (req.body.password == "admin") {
      res.render("admin");
    }
  } else if (req.body.username !== "") {
    if (req.body.password !== "") {
      res.render("home");
    }
  } else {
    // errors
  }
});

app.get("/reports-admin", (req, res) => {
  res.render("reports-admin");
});


app.post("/signup", (req, res) => {
  const signup_data = new signup_model2(req.body);
  const obj = req.body;
  let count = 0;
  for (const key in obj) {
    if (obj[key] !== "") {
      count++;
    }
  }
  console.log("count = " + count);
  if (count == 8) {
    signup_data
      .save()
      .then(() => {
        console.log("saved to db");
      })
      .catch(() => {
        console.log("error");
      });
  }
  console.log(req.body);
});

app.listen(8080);
console.log("listening on port " + port);
