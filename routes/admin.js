import { Router } from 'express';
import { fetchusers,toAdmin,toClient,DeleteUser, AddUser,editUser,editpost,AddTrip,GetTrips,DeleteTrip,editTrip } from '../controllers/Admin-con.js';
import { signup_model } from '../models/signupschema.js';
import {conts} from "../models/contryscheme.js"
var router = Router();


// router.use((req, res, next) => 
// {
//   if (req.session.user !== undefined && req.session.user.type == 'admin') {
//       next();
//   }
//   else {
//       res.render('error', { user: (req.session.user === undefined ? "" : req.session.user) })
//   }
// });
router.get("/", function (req, res, next) {
    res.render("admin", { user: (req.session.user === undefined ? "" : req.session.user) });
  });
  router.get("/reports", function (req, res, next) {
    res.render("reports-admin", { user: (req.session.user === undefined ? "" : req.session.user) });
  });
  router.get("/trips", async function (req, res, next) {
    const countries = await conts.find();
    res.render("trips" , {countries});
  });
  router.get("/adduser", function (req, res, next) {
    res.render("adduser", { user: (req.session.user === undefined ? "" : req.session.user) });
  });

  router.get("/addtrips", function (req, res, next) {
    res.render("addtrips", { user: (req.session.user === undefined ? "" : req.session.user) });
  });
  


  router.get("/viewTrips",GetTrips);
  router.get("/customers",fetchusers);
  router.get("/toAdmin/:id", toAdmin);
  router.get("/toClient/:id", toClient);
  router.get("/delete/:id", DeleteUser);
  router.get("/edituser/:id",editUser);
  router.get("/editTrip/:id",editTrip);
  router.post("/adduser",AddUser);
  router.post("/addtrips",AddTrip);
  router.post("/edituser/:id",editpost);
  router.get("/deleteTrip/:id", DeleteTrip);



  // router.post("/edituser/:id",(req,res,next)=>{
  //   signup_model.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
  //   .then((customer) => {
  //     if (!customer) {
  //       console.log("something went wrong updating the data");
  //       return res.redirect("/admin/customers"); // Redirect to an error page if customer not found
  //     }
    
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.redirect("error"); // Redirect to an error page if an error occurs
  //   });
  // });
  // router.post("/edituser/:id", function (req, res, next) {
  //   console.log(req.params.id);
  //   signup_model.findOneAndUpdate(
  //     { _id: req.params.id },
  //     req.body,
  //     { new: true },
  //     (err, docs) => {
  //       if (err) {
  //         console.log("Can't update data");
  //       } else {
  //         res.redirect("/admin/customers"); // Redirect to the users list 
  //       }
  //     }
  //   );
  // });
  
  



 




export default router;
