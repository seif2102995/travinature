import { Router } from "express";


const router = Router();

// GET home page
router.get("/", function (req, res, next) {
  console.log("index.js: GET /");
  res.render("home");
});

router.get("/about", function (req, res, next) {
  res.render("about", { title: "Signup page", errors: [] });
});




export default router;
