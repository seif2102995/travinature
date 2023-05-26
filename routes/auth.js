import { Router } from "express";


const router = Router();

// GET home page
router.get("/", function (req, res, next) {
  console.log("index.js: GET /");
  res.render("home",{ user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get("/about", function (req, res, next) {
  res.render("about",{ user: (req.session.user === undefined ? "" : req.session.user) });
});




export default router;
