import { Router } from "express";
import {handleSignup,login,checkUN,handlefgtpass,validToken} from '../controllers/users.js'
import {signup_model} from '../models/signupschema.js'
import bodyParser from "body-parser";

const router = Router();
router.use(bodyParser.json());


router.get("/login", (req, res)=> {
  req.session.user=req.body.username;
  res.render("login", { user: (req.session.user === undefined ? "" : req.session.user) });
});
router.post("/login", login,async (req, res)=> {
  const check = await signup_model.findOne({username:req.body.username});
  req.session.user=req.body.username;
  res.render('home',{ user: (req.session.user === undefined ? "" : check) })
  });
router.get("/signup", function (req, res) {
  req.session.user=req.body.username;
  res.render("signup",{ user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post('/signup' ,handleSignup, async (req,res)=>{
  const check = await signup_model.findOne({username:req.body.username});
  req.session.user=req.body.username;
  res.render('home',{ user: (req.session.user === undefined ? "" : check) })
});

router.get('/forget-pass',(req,res)=>{
  res.render('forget-pass')
})
router.post('/forget-pass',handlefgtpass)

router.get('/reset',(req,res)=>{
  res.render('reset')
})
router.post('/reset',validToken)


router.post('/checkUN', checkUN);



// check if logged in
router.use((req, res, next) => {
  req.session.user=req.body.username;
  if (req.session.user !== undefined) 
  {
      next();
  }
  else {
      res.render('error', { err: 'You must login to access this page', user: (req.session.user === undefined ? "" : req.session.user) })
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy();
  res.render('/');
});


export default router;
