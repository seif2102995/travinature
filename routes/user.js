import { Router } from "express";
import {handleSignup,login} from '../controllers/customers_controller.js'
import {signup_model} from '../models/signupschema.js'
const router = Router();

router.get("/signup", function (req, res) {
  res.render("signup");
});
router.post('/signup' ,handleSignup,(req,res)=>{
  res.render('login')
  console.log('in routerrrrrrrrrrrrrrrr + ');
});

// signup page
// router.post("/signup", validateSignup, signupController);

// login page

router.get("/login", (req, res)=> {
  res.render("login");
});
router.post("/login", login, (req, res)=> {

});



export default router;
