import { Router } from "express";
import {handleSignup} from '../controllers/customers_controller.js'
import {signup_model} from '../models/signupschema.js'
const router = Router();

router.get("/signup", function (req, res, next) {
  res.render("signup");
});
router.post('/signup' ,handleSignup,(req,res)=>{
  res.render('login')
  console.log('in routerrrrrrrrrrrrrrrr + ');
});

// signup page
// router.post("/signup", validateSignup, signupController);

// login page
router.get("/login", function (req, res, next) {
  res.render("login");
});



export default router;
