import { Router } from "express";
import fs from "fs";

const router = Router();

router.get("/", function (req, res, next) {
  res.render("map",{ user: (req.session.user === undefined ? "" : req.session.user) });
});

// router.get("/country", function (req, res, next) {
//   fs.readFile('../travinature/routes/ao.svg', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data); // Log the SVG file contents to the console
//     res.render("country",{data});
//   });
// });

router.get("/argentina", function (req, res, next) {
    res.render("argentina",{ user: (req.session.user === undefined ? "" : req.session.user) });
  });


export default router;
