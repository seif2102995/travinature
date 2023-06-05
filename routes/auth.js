import { Router } from "express";
import express from "express";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
// import {conts} from "../models/contryscheme.js"
// import  sortJson from 'sort-json';
let app = express();
const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

 

// // very important 
// // how countries were saved to data base
// // GET home page
// router.get("/", function (req, res, next) {
//   console.log("index.js: GET /");
//   fs.readFile( __dirname + "/" + "countries.json", 'utf8', function (err, data) {
//     data = JSON.parse( data );
//     let temp = data["contries"];
//     for(let index in temp){
//       let obj = temp[index]
//       let cont = new conts(obj);
//       cont.country_name=obj.name;
//       cont.save();
//       // console.log(obj.name);
//       console.log(cont);
//       // const copy = sortJson(obj.name);
//       // console.log(copy);
//     }
//   });
//   res.render("home",{ user: (req.session.user === undefined ? "" : req.session.user) });
// });


router.get("/", function (req, res, next) {
  res.render("home",{ user: (req.session.user === undefined ? "" : req.session.user) });
});
router.get("/about", function (req, res, next) {
  res.render("about",{ user: (req.session.user === undefined ? "" : req.session.user) });
});
router.get("/gallery", function (req, res, next) {
  res.render("gallery",{ user: (req.session.user === undefined ? "" : req.session.user) });
});





export default router;
