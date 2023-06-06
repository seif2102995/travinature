import { signup_model } from "../models/signupschema.js";
import {body,validationResult} from 'express-validator';
import{Tripss} from'../models/tripsSchema.js';

import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51NEZrSBSmlXfR1acKokUt6gxjLNgc1h0hCWF3Iu08TSrthiGWkOqPQddUzsb3BFJrgPhfC1SE0oXZqaKuGqgx3QG00FjWHuR7C');
 

import fs from "fs";
import bcrypt from 'bcrypt';
// import  google  from 'googleapis';
import nodemailer, { createTransport }   from 'nodemailer'
var globalMail ; // m7dsh ymsho yagd3ann

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
globalMail = email ;
console.log('the global mail is : ' , globalMail)
    res.redirect('reset')
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

const validToken = async (req,res,next)=>{
const{token,p_reset} = req.body

const found = await signup_model.findOne({mail:globalMail , token:token});
if(found){
  console.log('the token is valid ')
  const saltRounds = 10;
  try {
    
    const salt = await bcrypt.genSalt(saltRounds);
    bcrypt.hash(p_reset, salt, async function(err, hashedPassword) {
      if (err) {
        console.log("Error in hash function");
      } else {
        found.password = hashedPassword;

        console.log("The hashed password: ", found.password);

        console.log("Awaiting save...");
        console.log('the data = ' , found)
        await found.save();
        console.log("Data saved");

        // Continue to the next middleware or redirect to a success page
       
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }


res.send('valid token')

}
else{
  console.log('invalid token')
  res.send('invalid token')
}


}


// //if (password !== 'password123') {
//   return res.status(401).json({ error: 'Invalid password' });
// }

// Controller for handling the signup form submission
const handleSignup = async (req, res, next) => 
{
  const { password , cpassword } = req.body;
  const saltRounds = 10; // Number of salt rounds to generate
  const data = new signup_model(req.body);
  const email = req.body.email;

  try {
    
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
        req.session.user=data;  
        res.redirect("login")

        // Continue to the next middleware or redirect to a success page
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


const login = async (req, res) => {
  try {
    const check = await signup_model.findOne({ username: req.body.username });
    if (check == null) {
      res.send("NULL");
    } else {
      const pcomp = await bcrypt.compare(req.body.password, check.password);
      if (pcomp) {
        req.session.user = check;
        res.redirect("/")
        // res.render('home',{ user: (req.session.user === undefined ? "" : req.session.user) });
      } else {
        res.send("error");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("user doesn't exist");
  }
};

const isAuth = (req, res, next) => {
  if (req.session.user) {
    // User is logged in, proceed to the next middleware or route handler
    next();
  } else {
    res.redirect('/user/login'); 
  }
};




const ajax1 = async (req, res) => {
  try {
    const { mail } = req.body;

    // Check if the email exists in the database
    const user = await signup_model.findOne({ mail:mail });

    if (user) {
      // Email is already taken
      res.json({ message: 'taken' });
    } else {
      // Email is available
      res.json({ message: 'available' });
    }
  } catch (error) {
    console.error('Error occurred during email validation:', error);
    res.status(500).json({ message: 'Error occurred during validation' });
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

const GetUser = async (req, res) => {
  var query = { username: req.body.username };

  signup_model.findOne(query)
      .then(result => {
          req.session.user = result;
          res.redirect('/user/profile');
      })
      .catch(err => {
          console.log(err);
      });
      
};

const logoutUser=(req,res)=>{
req.session.destroy();
res.redirect('/');
}


const DeleteUserr = (req, res) => {
  const userId = req.session.user._id;
  const userImgPath = req.session.user.img;

  console.log(req.session.user);

  signup_model
    .findByIdAndDelete(userId)
    .then(result => {
      // Delete the user's image file
      // fs.unlink(path.join(__dirname, '../public/resources/', userImgPath), (err) => {
      //   if (err) {
      //     console.log(err);
      //   }
      req.session.destroy();
      res.redirect('/');
      // });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};



const checkEmailAvailability = async (email) => {
  try {
    const user = await signup_model.findOne({ email });
    return user ? false : true;
  } catch (error) {
    console.log('Error checking email availability:', error);
    return false;
  }
};

// const checkout = async (req, res) => {
//   try {
    
//     var query = { name:req.body.act };
//     const result = await Tripss.findOne(query);
//     const sess = req.session.user;
//     console.log(sess);

//     if (!result) {
//       throw new Error('Trip not found');
//     }

//     const roomType = result.hotels.flatMap(hotel => hotel.roomTypes.find(rt => rt.name === name));
//     if (!roomType) {
//       throw new Error('Room type not found');
//     }

//     console.log(roomType.price);
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: result.title,
//             },
//             unit_amount: roomType.price * 100,
//           },
//           quantity: req.body.qunt,
//         },
//       ],
//       mode: 'payment',
//       success_url: `http://127.0.0.1:8080/user/success?email=${req.session.user.mail}`,
//       cancel_url: `http://127.0.0.1:8080/user/?email=${req.session.user.mail}`,
//     });

//     console.log(session.url);
//     res.redirect(303, session.url);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };




// const checkout = async (req, res) => {
//   try {
//     const { act, qunt } = req.body;
//     const query = { "hotels.roomTypes.name": act };
//     const result = await Tripss.findOne(query);
//     const sess = req.session.user;
//     console.log(sess);

//     if (!result) {
//       throw new Error('Trip not found');
//     }

//     const roomType = result.hotels.flatMap(hotel => hotel.roomTypes.find(rt => rt.name === act));
//     if (!roomType) {
//       throw new Error('Room type not found');
//     }

//     console.log(roomType.price);
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: result.title,
//             },
//             unit_amount: 100 * 100,
//           },
//           quantity: qunt,
//         },
//       ],
//       mode: 'payment',
//       success_url: `http://127.0.0.1:8080/user/success?email=${req.session.user.mail}`,
//       cancel_url: `http://127.0.0.1:8080/user/?email=${req.session.user.mail}`,
//     });

//     console.log(session.url);
//     res.redirect(303, session.url);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };


const checkout = async (req, res) => {
  try {
    var query = { name: req.body.act };
    const result = await Tripss.findOne(query);
    const sess = req.session.user;
    // console.log(sess);


   
    if (!result) {
      throw new Error('Trip not found');
    }
     
    const roomTypePrice = req.body.roomTypePrice;
    console.log(roomTypePrice);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: result.title,
            },
            unit_amount: 11122 * 100,
          },
          quantity: req.body.qunt,
        },
      ],
      mode: 'payment',
      success_url: `http://127.0.0.1:8080/user/success?email=${req.session.user.mail}`, // Append user session as a query parameter
      cancel_url: `http://127.0.0.1:8080/user/cancel?email=${req.session.user.mail}`,
    });

    console.log(session.url);
    res.redirect(303, session.url);
    // res.json({ id: session.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};








// const checkout = async (req, res) => {
//   try {
//     const { name, qunt } = req.body;
//     const query = { name };
//     const result = await Tripss.findOne(query);
//     const sess = req.session.user;
//     console.log(sess);

//     if (!result) {
//       throw new Error('Trip not found');
//     }

//     console.log(result.price);
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: result.name,
//             },
//             unit_amount: result.price * 100,
//           },
//           quantity: qunt,
//         },
//       ],
//       mode: 'payment',
//       success_url: `http://127.0.0.1:8080/user/success?email=${req.session.user.mail}`, // Append user session as a query parameter
//       cancel_url: `http://127.0.0.1:8080/user/?email=${req.session.user.mail}`,
//     });

//     console.log(session.url);
//     res.redirect(303, session.url);
//     // res.json({ id: session.id });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// };

const fetchpackages = async (req, res, next) => {
  try {
    const vac = await Tripss.find();
    console.log(vac + " \nuserrssssssssssss");
    res.render("products", { vac });
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};






export { handleSignup,login,checkUN,handlefgtpass,validToken,ajax1,GetUser,logoutUser,DeleteUserr,fetchpackages,checkout,isAuth};
