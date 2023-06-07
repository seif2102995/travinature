import { signup_model } from "../models/signupschema.js";
import { Tripss } from "../models/tripsSchema.js";
import  path  from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { check, validationResult } from 'express-validator';

import mongoose from "mongoose";
import flash from "express-flash-message"

//------------------>USER CRUD
const fetchusers = async (req, res, next) => {
  try {
    const users = await signup_model.find();
    console.log(users + " \nuserrssssssssssss");
    res.render("customers-admin", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const isAuthAdmin = (req, res, next) => {
    if (req.session.user !== undefined && req.session.user.type == 'admin') { 
    next();
  } else {
    res.redirect('error'); 
  }
};

const toAdmin = (req, res) => {
  signup_model.findByIdAndUpdate(req.params.id, { type: 'admin' })
    .then(result => {
      res.redirect('/admin/customers')
    })
    .catch(err => {
      console.log(err);
    });
};


const toClient = (req, res) => {
  signup_model.findByIdAndUpdate(req.params.id, { type: 'client' })
    .then(result => {
      res.redirect('/admin/customers')
    })
    .catch(err => {
      console.log(err);
    });
};

const DeleteUser = (req, res) => {
  signup_model.findByIdAndDelete(req.params.id)
    .then(result => {
      if (err) {
        throw err;
      }
      res.redirect('/admin/viewAll');
    })
    .catch(err => {
      console.log(err);
    });
};

const AddUser = async (req, res,next) => {
  console.log('insideadduser--------------')
  const {password} = req.body;
  const saltRounds = 10; // Number of salt rounds to generate
  const data = new signup_model(req.body);


  try {
    
    const salt = await bcrypt.genSalt(saltRounds);
    bcrypt.hash(password, salt, async function(err, hashedPassword) {
      if (err) 
      {
        console.log("Error in hash function");
      } 
      
      else 
      {
        data.password = hashedPassword;

        console.log("The hashed password: ", data.password);

        console.log("Awaiting save...");
        await data.save();
        console.log("Data saved");
      
        res.redirect("/")

        // Continue to the next middleware or redirect to a success page
        next();
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}



const editUser = async (req,res)=>
{
  console.log(req.params.id);
  signup_model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((customer) => {
      if (!customer) {
        console.log("Can't retrieve data");
        return res.redirect("error"); // Redirect to an error page if customer not found
      }
      res.render("editUsser", { customer: customer });
    })
    .catch((error) => {
      console.error(error);
      res.redirect("error"); // Redirect to an error page if an error occurs
    });


};

const editpost=async(req,res)=>
{
  try{
    await signup_model.findByIdAndUpdate(req.params.id,{
      firstname: req.body.fname,
      password: req.body.pass,
      type: req.body.type,
      lastname: req.body.lname,
      mail: req.body.email,
      phone: req.body.ph,
      dob: req.body.age,
      username:req.body.uname
    });
    res.redirect("/admin/customers");
  }
  catch(err)
  {
    console.log(err);
  }
}

//------------------>TRIPS CRUD


const AddTrip = (req, res) => {
  let imgFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  imgFile = req.files.img;
  uploadPath = path.join(__dirname, '../public/resources/' + req.body.gov + path.extname(imgFile.name));

  imgFile.mv(uploadPath, function (err) {
    if (err)
      res.status(500).send(err);
    const newTrip = new Tripss({
      title: req.body.gov,
      description: req.body.desc,
      image: req.body.gov + path.extname(imgFile.name),
      hotels: [
        {
          name: req.body.hotel1,
          roomTypes: [
            { name: req.body.room1Type1, price: req.body.room1Price1 },
            { name: req.body.room1Type2, price: req.body.room1Price2 },
          ],
          activities: [
            { name: req.body.activity1 },
            { name: req.body.activity2 }
          ]
        },
        {
          name: req.body.hotel2,
          roomTypes: [
            { name: req.body.room2Type1, price: req.body.room2Price1 },
            { name: req.body.room2Type2, price: req.body.room2Price2 },
          ],
          activities: [
            { name: req.body.activity3 },
            { name: req.body.activity4 }
          ]
        },
      ],
    });

    newTrip.save()
      .then(result => {
        res.redirect('/admin');
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
      });
  });
};

const GetTrips = async (req, res, next) => {
  try {
    const vac = await Tripss.find();
    console.log(vac + " \nuserrssssssssssss");
    res.render("viewTrips", { vac });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const DeleteTrip = (req, res) => {
  Tripss.findByIdAndDelete(req.params.id)
    .then(result => {
      if (err) {
        throw err;
      }
      res.redirect('/admin/viewTrips');
    })
    .catch(err => {
      console.log(err);
    });
};
const editTrip = async (req,res)=>
{
  console.log(req.params.id);
  Tripss.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((triip) => {
      if (!triip) {
        console.log("Can't retrieve data");
        return res.redirect("error"); // Redirect to an error page if customer not found
      }
      res.render("editTrips", { triip: triip });
    })
    .catch((error) => {
      console.error(error);
      res.redirect("error"); // Redirect to an error page if an error occurs
    });
    

};

const editTripPost = async (req, res) => {
  try {
    await Tripss.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      'hotels.0.name': req.body.hotel1,
      'hotels.0.roomTypes.0.name':req.body.room1Type1,
      'hotels.0.roomTypes.0.price':req.body.room1Price1,
      'hotels.0.roomTypes.1.name':req.body.room1Type2,
      'hotels.0.roomTypes.1.price':req.body.room1Price2,
      'hotels.0.activities.0.name':req.body.activity1,
      'hotels.0.activities.1.name':req.body.activity2,

      'hotels.1.name': req.body.hotel2,
      'hotels.1.roomTypes.0.name':req.body.room2Type1,
      'hotels.1.roomTypes.0.price':req.body.room2Price1,
      'hotels.1.roomTypes.1.name':req.body.room2Type2,
      'hotels.1.roomTypes.1.price':req.body.room2Price2,
      'hotels.1.activities.0.name':req.body.activity3,
      'hotels.1.activities.1.name':req.body.activity4,

    });

    res.redirect('/admin');
  } catch (err) {
    console.log(err);
  }
};

const ajax2 = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the database
    const user = await signup_model.findOne({ mail:email });

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

const handleAddUser= async(req,res,next)=>{
  console.log('inside handleeeeee user--------------')
  const validationMiddleware = [
    check('firstname').notEmpty().withMessage('First name is required'),
    check('lastname').notEmpty().withMessage('Last name is required'),
    check('mail').notEmpty().withMessage('Email is required'),
    check('phone')
      .notEmpty().withMessage('Phone number is required')
      .isNumeric().withMessage('Phone number must consist of numbers only')
      .isLength({ min: 6 }).withMessage('Phone number must be at least 6 digits long'),
    check('dob')
      .notEmpty().withMessage('Age is required')
      .isNumeric().withMessage('Age must consist of numbers only'),
    check('username').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required'),
  ];
  
  await Promise.all(validationMiddleware.map(field => field.run(req)));  
  //validationMiddleware: array containing the validation middleware functions. 
//map() function is used to iterate over each element of the validationMiddleware 
//field.run() checks on all fields in my req 
// the func returns array of promises



  const errors = validationResult(req); //extract the validation errors from the request after running the validation middleware.
  // It returns a ValidationResult object that contains the validation errors.
  if (!errors.isEmpty()) {
    console.log('errorss ----------------- : ' , errors.array())
    return res.render('adduser-err', { errors: errors.array() });
    
  }
  next()

}




export { toAdmin, toClient, fetchusers, DeleteUser,AddUser,editUser,editpost,AddTrip,GetTrips,DeleteTrip,editTrip,editTripPost,ajax2,isAuthAdmin,handleAddUser };