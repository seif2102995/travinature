
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from"express-session";
import fileUpload from 'express-fileupload';

import home_router from "./routes/auth.js";
import user_router from "./routes/user.js";
import booking_router from "./routes/booking.js";
import admin_router from "./routes/admin.js";


// const Publishable_key=process.env.stripePublickey;
// const secret_key=process.env.stripeSecretKey;


const hostname = "127.0.0.1";
const port = 8080;
//Read the current directory name
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
console.log(`Project Root dir : ${__dirname}`);

let app = express();

// for auto refresh
//const path = require("path");
import livereload from 'livereload';
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
import connectLivereload from 'connect-livereload';
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(fileUpload());
app.use(logger("common"));
app.use(express.json());
app.use(session({
  secret:'key to sign the cookie',
}))


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); // for post method

mongoose
  .connect(
    "mongodb+srv://seif2102995:travi231@travinature.3akvybv.mongodb.net/"
    //"mongodb+srv://gello:123@cluster0.cwjp9ft.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port);
    console.log("connected to db successfully ------------------------------------------------");
  })
  .catch((err) => {
    console.log(err+'------------------------------------------------------------------------');
  });
//setup cookie parser middleware
app.use(cookieParser());
//setup static folder for serving static files in Express
app.use(express.static(path.join(__dirname, 'public')));

//setup routes
app.use('/', home_router);
app.use('/user', user_router);
app.use('/book', booking_router);
app.use('/admin', admin_router);



// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
    
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//   });

// 404 page
app.use((req, res) => {
  res.status(404).render('error',{ user: (req.session.user === undefined ? "" : req.session.user) });
});

//app.listen(8080);
console.log("listening on port " + port);
// export default app;