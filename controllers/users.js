import { signup_model } from "../models/signupschema.js";


import bcrypt from 'bcrypt';
// import  google  from 'googleapis';
import nodemailer, { createTransport }   from 'nodemailer'

import {chatt} from "../models/chatBox.js";

// const msg = async(req, res) => {
//   // if (err)
//   //   res.status(500).send(err);
// alert("alo");
//   const amessage = new chatt
//   ({
//       message:req.body.boxx,
//       Fuser_id:req.session.user.id,
//   })
//   amessage.save()
//     .then(result => {
//       location.reload();
//     })
//     .catch(err => {
//       console.log(err);
//     });

// };

let mailTransporter = createTransport({
  service:'gmail',
  auth:{
    user : 'traventure237@gmail.com',
    pass : 'spyuthywqmntwccr'
  }
});

// async function sendEmail() {
//   const clientId = '     ';
//   const clientSecret = ' ';
//   const refreshToken = '  ';

//   const oAuth2Client = new google.auth.OAuth2(
//     clientId,
//     clientSecret,
//     'https://developers.google.com/oauthplayground' // Redirect URL
//   );

const handlefgtpass = async (req, res, next) => {
  const  email = req.body.username;

  console.log('email = ' , email )

  const exist = await signup_model.findOne({  mail: email });

  if (exist) {
    console.log('-----------------Email exists : (' ,email , " )" );
    res.render('reset');
    // Update the token variable in the existing document
    exist.token = Math.floor(10000 + Math.random() * 90000);
    console.log(' the token = ----------------' ,exist.token )
    console.log(exist)
    await exist.save();
    let details = {
      from: 'traventure237@gmail.com',
      to:"seif2102995@miuegypt.edu.eg",
      subject : " password reset ",
      text : "your token for resetting your password is " + exist.token 
    };

    mailTransporter.sendMail(details,(err)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log('mail sent successfully')
      }});


  } 
  if(!exist){
    
    console.log('-------------------------Email does not exist : (' ,email , " )" );
    res.send('email doesnt exist').status(404);
   
  }
};
// Controller for handling the signup form submission
const handleSignup = async (req, res, next) => 
{
  const { password , cpassword } = req.body;
  const saltRounds = 10; // Number of salt rounds to generate
  const data = new signup_model(req.body);
  const email = req.body.email;

  try {
    
  //   const existingUser = await signup_model.findOne({ mail: email });

  //   if (existingUser) {
  //     // Email already exists
  //     return res.status(400).json({ error: 'Email already exists' });
  //   }

    // Validate password and confirm password match
    //if (password !== cpassword) {
      //return res.status(400).json({ error: 'Passwords do not match' });
    //}



    const salt = await bcrypt.genSalt(saltRounds);
    bcrypt.hash(password, salt, async function(err, hashedPassword) {
      if (err) {
        console.log("Error in hash function");
      } else {
        data.password = hashedPassword;

        console.log("The hashed password: ", data.password);

        console.log("Awaiting save...");
        await data.save();
        console.log("Data saved");

        // Continue to the next middleware or redirect to a success page
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


const login=async(req , res )=>{
  try{
    const check = await signup_model.findOne({username:req.body.username});
    const pcomp= await bcrypt.compare(req.body.password,check.password);
    if(check){
      if(pcomp){
        req.session.user=req.body.username;
        // console.log(req.session.user);
        // console.log("from user controller");
        console.log(check);
        // console.log("from user controlelr 2");

        res.render('home',{ user: (req.session.user === undefined ? "" : check) })
      }
    }
  }catch(err){
    console.error(err);
    res.status(500).send("user doesn't exist");
  }
};



const checkUN = (req, res) => {
  var query = { username: req.body.username };
  signup_model.find(query)
      .then(result => {
          if (result.length > 0) {
              res.send('taken');
          }
          else {
              res.send('available');
          }
      })
      .catch(err => {
          console.log(err);
      });
};
export { handleSignup,login,checkUN,handlefgtpass};
