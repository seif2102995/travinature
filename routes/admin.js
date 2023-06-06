import { Router } from 'express';
import { fetchusers,toAdmin,toClient,DeleteUser, AddUser,editUser,editpost,AddTrip,GetTrips,DeleteTrip,editTrip,editTripPost ,ajax2,isAuthAdmin} from '../controllers/Admin-con.js';
import { signup_model } from '../models/signupschema.js';
import {conts} from "../models/contryscheme.js"
var router = Router();



router.get("/",isAuthAdmin, function (req, res, next) {
    res.render("admin", { user: (req.session.user === undefined ? "" : req.session.user) });
  });
  router.get("/reports",isAuthAdmin, function (req, res, next) {
    res.render("reports-admin", { user: (req.session.user === undefined ? "" : req.session.user) });
  });
  router.get("/trips", isAuthAdmin,async function (req, res, next) {
    const countries = await conts.find();
    res.render("trips" , {countries});
  });
  router.get("/adduser",isAuthAdmin,function (req, res, next) {
    res.render("adduser", { user: (req.session.user === undefined ? "" : req.session.user) });
  });
  router.post('/check123',ajax2);

  router.get("/addtrips",isAuthAdmin, function (req, res, next) {
    res.render("addtrips", { user: (req.session.user === undefined ? "" : req.session.user) });
  });
  


  router.get("/viewTrips",isAuthAdmin,GetTrips);
  router.get("/customers",isAuthAdmin,fetchusers);
  router.get("/toAdmin/:id", toAdmin);
  router.get("/toClient/:id", toClient);
  router.get("/delete/:id", DeleteUser);
  router.get("/edituser/:id",editUser);
  router.get("/editTrip/:id",editTrip);
  router.post("/editTrip/:id",editTripPost);
  router.post("/adduser",AddUser);
  router.post("/addtrips",AddTrip);
  router.post("/edituser/:id",editpost);
  router.get("/deleteTrip/:id", DeleteTrip);



  


export default router;
