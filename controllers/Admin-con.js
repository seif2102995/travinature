import { signup_model } from "../models/signupschema.js";
import { Tripss } from "../models/tripsSchema.js";
import  path  from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const AddUser = (req, res) => {

  let imgFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
  }
  imgFile = req.files.img;
  uploadPath = path.join(__dirname, '../public/resources/' + req.body.uname + path.extname(imgFile.name));

  // Use the mv() method to place the file somewhere on your server
  imgFile.mv(uploadPath, function (err) {
      if (err)
          res.status(500).send(err);

          const auser = new signup_model({
            firstname: req.body.fname,
            password: req.body.pass,
            type: req.body.type,
            lastname: req.body.lname,
            mail: req.body.email,
            phone: req.body.ph,
            dob: req.body.age,
            username:req.body.uname,
            image: req.body.uname +  path.extname(imgFile.name),

          })
          auser.save()
            .then(result => {
              res.redirect('/admin/customers');
            })
            .catch(err => {
              console.log(err);
            });
  });



};

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

  const newt = new Tripss({
    name: req.body.gov,
    price: req.body.price,
    description: req.body.desc
  })
  newt.save()
    .then(result => {
      res.redirect('/admin');
    })
    .catch(err => {
      console.log(err);
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
export { toAdmin, toClient, fetchusers, DeleteUser,AddUser,editUser,editpost,AddTrip,GetTrips,DeleteTrip,editTrip };