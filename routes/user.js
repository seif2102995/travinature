import { Router } from "express";
import {handleSignup,login,checkUN,handlefgtpass,validToken,GetUser,logoutUser,ajax1, DeleteUserr,checkout,isAuth} from '../controllers/users.js'
import express from "express";
import {signup_model} from '../models/signupschema.js'
import bodyParser from "body-parser";
import { Tripss } from "../models/tripsSchema.js";
import {Order} from '../models/ordersSchema.js';

const app = express();
const router = Router();
router.use(bodyParser.json());
app.use(express.json());

router.get("/login", (req, res)=> {
  // req.session.user=req.body.username;
  res.render("login", { user: (req.session.user === undefined ? "" : req.session.user) });
});
router.post("/login", login);



// router.post("/login", login,async (req, res)=> {
//   const check = await signup_model.findOne({username:req.body.username});
//   console.log(req.body.username)
//   req.session.user=req.body.username;
//   console.log(req.session.user);
//   res.redirect('/')
//   // res.render('home',{ user: (req.session.user === undefined ? "" : req.session.user) })
//   console.log(user.type);
//   });
router.get("/signup", function (req, res) {
  // req.session.user=req.body.username;
  res.render("signup",{ user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post('/signup',handleSignup)
router.post('/check',ajax1);


router.get('/forget-pass',(req,res)=>{
  res.render('forget-pass')
});
router.post('/forget-pass',handlefgtpass);

router.get('/chat',(req,res)=>{
  res.render('chatbox')
});


router.get('/reset',(req,res)=>{
  res.render('reset')
})
router.post('/reset',validToken);


router.get('/profile', (req, res) => {
  res.render('profile', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get('/success', (req, res) => {
  // Access the GET parameters from the URL
  const email = req.query.email;
  var query = { mail: email };

  signup_model.findOne(query)
    .then(result => {
      req.session.user = result;
      res.render('paymentSucc',{user:req.session.user});
    })
    .catch(err => {
      console.log(err);
    });

  console.log(email); // Output: value1

  // Handle the logic for the /success route
});





router.get('/cancel', (req, res) => {
  // Access the GET parameters from the URL
  const email = req.query.email;
  var query = { mail: email };

  signup_model.findOne(query)
    .then(result => {
      req.session.user = result;
      res.render('paymentCan',{user:req.session.user});
    })
    .catch(err => {
      console.log(err);
    });

  console.log(email); // Output: value1

  // Handle the logic for the /success route
});


router.post('/profile',GetUser);

router.post('/checkout',isAuth,checkout);

router.post('/checkUN', checkUN);

router.get('/logout', logoutUser);
router.post('/delete',DeleteUserr)

router.get("/pack", async function (req, res) {
  try {
    const vac = await Tripss.find();
    const cust = req.session.user;
    console.log(vac + " \nuserrssssssssssss", cust);

    if (!cust ) {
      // Redirect the user or handle the error appropriately
      throw new Error('User not logged in');
    }

    res.render("products", { vac, user: cust });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});



// router.use((req, res, next) => {
//   req.session.user=req.body.username;
//   if (req.session.user !== undefined) 
//   {
//       next();
//   }
//   else {
//       res.render('error', { err: 'You must login to access this page', user: (req.session.user === undefined ? "" : req.session.user) })
//   }
// });




router.get('/orders/:userId', async (req, res) => {
  const userId = req.params.Id;
  const orders = await Order.find({ userId }).populate('tripId').populate('hotelId').populate('roomTypeId').populate('activityId');
  res.render('orders', { orders });
});


export default router;
