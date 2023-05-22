import { Router } from "express";
// import {
//   validateSignup,
//   signupController,
// } from "../controllers/auth.controller.js";

const router = Router();

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

// signup page
// router.post("/signup", validateSignup, signupController);

// login page
router.get("/login", function (req, res, next) {
  res.render("login");
});



export default router;
