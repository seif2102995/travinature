import { Router } from "express";
import {handleSignup,login,checkUN} from '../controllers/users.js'
import {signup_model} from '../models/signupschema.js'
import bodyParser from "body-parser";
const router = Router();
router.use(bodyParser.json());



router.get("/login", (req, res)=> {
  res.render("login", { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get("/signup", function (req, res) {
  res.render("signup",{ user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post('/signup' ,handleSignup,(req,res)=>{
  res.render('login')
  console.log('in routerrrrrrrrrrrrrrrr + ');
});


router.post('/checkUN', checkUN);



// check if logged in
router.use((req, res, next) => {
  if (req.session.user !== undefined) 
  {
      next();
  }
  else {
      res.render('error', { err: 'You must login to access this page', user: (req.session.user === undefined ? "" : req.session.user) })
  }
});
router.post("/login", login, (req, res)=> {

});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


export default router;
