import { signup_model } from "../models/signupschema.js";
import { Tripss } from "../models/tripsSchema.js";
import  path  from "path";

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
  // if (err)
  //   res.status(500).send(err);

  const auser = new signup_model({
    firstname: req.body.fname,
    password: req.body.pass,
    type: req.body.type,
    lastname: req.body.lname,
    mail: req.body.email,
    phone: req.body.ph,
    dob: req.body.age,
    username:req.body.uname
  })
  auser.save()
    .then(result => {
      res.redirect('/admin/customers');
    })
    .catch(err => {
      console.log(err);
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
    await signup_model.findOneAndUpdate({
      firstname: req.body.fname,
      password: req.body.pass,
      type: req.body.type,
      lastname: req.body.lname,
      mail: req.body.email,
      phone: req.body.ph,
      dob: req.body.age,
      username:req.body.uname
    }).where(req.params.id);
    res.redirect("/admin/customers");
  }
  catch(err)
  {
    console.log(err);
  }
}

//------------------>TRIPS CRUD
const AddTrip = (req, res) => {
  // if (err)
  //   res.status(500).send(err);

  const newt = new Tripss({
    name: req.body.dest,
    price: req.body.price,
    description: req.body.descr
   
  })
  newt.save()
    .then(result => {
      res.redirect('/admin/customers');
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

export { toAdmin, toClient, fetchusers, DeleteUser,AddUser,editUser,editpost,AddTrip,GetTrips };