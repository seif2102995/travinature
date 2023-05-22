import { Router } from "express";
import { renderSignup, renderLogin } from '../controllers/users_controller.js'
// import {
//   validateSignup,
//   signupController,
// } from "../controllers/auth.controller.js";
const router = Router();

router.get("/signup",renderSignup);

// signup page
// router.post("/signup", validateSignup, signupController);

// login page
router.get("/login",renderLogin );



export default router;
