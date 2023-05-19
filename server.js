// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const path = require("path");
// // const routes = require('./routes'); 
// // const signup_model2 = require("./models/signupschema");
// import express from "express";
// import path from "path";
// import cookieParser from "cookie-parser";
// import logger from "morgan";
// import { fileURLToPath } from "url";
// // import signup_model2 from "./models/signupschema"
// import bodyParser from "body-parser";
// import mongoose from "mongoose";


// //Read the current directory name

// const hostname = "127.0.0.1";
// const port = 8080;
// const app = express();
// // const mongoose = require("mongoose");
// // app.set('views', path.join(__dirname,'views'));

// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static("public/js"));
// app.use(express.static("public/resources"));
// app.set("view engine", "ejs");
// app.use(express.json);
// // app.use(express.urlencoded({extended:true})); // for post method
// app.use(bodyParser.urlencoded({ extended: true })); // for post method
// mongoose
//   .connect(
//     "mongodb+srv://seif2102995:travi231@travinature.3akvybv.mongodb.net/"
//   )
//   .then((result) => {
//     app.listen(3010);
//     console.log("connected to db successfully");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//   app.use('/',home_router );

// // app.get("/", function (req, res) {
// //   res.render("home");
// // });


// // app.get("/book", function (req, res) {
// //   res.render("map");
// // });

// // app.get("/admin", function (req, res) {
// //   res.render("admin");
// // });
// // app.get("/signup", function (req, res) {
// //   res.render("signup");
// // });
// // app.get("/argentina", function (req, res) {
// //   res.render("argentina");
// // });
// // app.get("/eg", function (req, res) {
// //   res.render("eg");
// // });
// // app.get("/about", function (req, res) {
// //   res.render("about");
// // });
// // app.get("/login", function (req, res) {
// //   res.render("login");
// // });
// // app.post("/login", (req, res) => {
// //   if (req.body.username == "admin") {
// //     if (req.body.password == "admin") {
// //       res.render("admin");
// //     }
// //   } else if (req.body.username !== "") {
// //     if (req.body.password !== "") {
// //       res.render("home");
// //     }
// //   } else {
// //     // errors
// //   }
// // });

// // app.get("/reports-admin", (req, res) => {
// //   res.render("reports-admin");
// // });


// // app.post("/signup", (req, res) => {
// //   const signup_data = new signup_model2(req.body);
// //   const obj = req.body;
// //   let count = 0;
// //   for (const key in obj) {
// //     if (obj[key] !== "") {
// //       count++;
// //     }
// //   }
// //   console.log("count = " + count);
// //   if (count == 8) {
// //     signup_data
// //       .save()
// //       .then(() => {
// //         console.log("saved to db");
// //       })
// //       .catch(() => {
// //         console.log("error");
// //       });
// //   }
// //   console.log(req.body);
// // });

// // app.listen(8080);
// // console.log("listening on port " + port);
// export default app; 
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import home_router from "./routes/home.js";
import login_router from "./routes/login.js";
import about_router from "./routes/about.js";
import map_router from "./routes/map.js";
import admin_router from "./routes/admin.js";
import signup_router from "./routes/signup.js";
import arg_router from "./routes/argentina.js";
import eg_router from "./routes/eg.js";
import trips_router from "./routes/trips.js";





const hostname = "127.0.0.1";
const port = 8080;
//Read the current directory name
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
console.log(`Project Root dir : ${__dirname}`);

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("common"));
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
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
//setup cookie parser middleware
app.use(cookieParser());
//setup static folder for serving static files in Express
app.use(express.static(path.join(__dirname, 'public')));

//setup routes
app.use('/', home_router);
app.use('/login', login_router);
app.use('/book', map_router);
app.use('/signup', signup_router);
app.use('/admin', admin_router);
app.use('/about', about_router);
app.use('/argentina', arg_router);
app.use('/eg', eg_router);
app.use('/trips', trips_router);





// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(8080);
console.log("listening on port " + port);
// export default app;