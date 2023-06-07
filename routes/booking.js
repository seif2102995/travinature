import { Router } from "express";
import fs from "fs";
import{isAuth}from'../controllers/users.js';

const router = Router();

router.get("/",isAuth, async function (req, res, next) {
  res.render("map",{ user: (req.session.user === undefined ? "" : req.session.user) });
});


router.get("/:class", async function (req, res, next) {
  let x = req.params.class;
  console.log(x);
    fs.readFile(`../travinature/public/countries/${x}.svg`, 'utf8', (err, data) => {
        if (err) res.render("map",{ user: (req.session.user === undefined ? "" : req.session.user) });
        // console.log(data); // Log the SVG file contents to the console
        res.render("country", { user: (req.session.user === undefined ? "" : data) });
      });
  // res.render("home",{ user: (req.session.user === undefined ? "" : req.session.user) });
});






// router.get("/argentina", function (req, res, next) {
//     res.render("argentina",{ user: (req.session.user === undefined ? "" : req.session.user) });
//   });


export default router;
