import { signup_model } from "../models/signupschema.js";
import mongoose from "mongoose";
import flash from "express-flash-message"


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
export { toAdmin, toClient, fetchusers, DeleteUser,AddUser,editUser };