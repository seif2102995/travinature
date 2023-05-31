import { Router } from 'express';
import { fetchusers,toAdmin,toClient,DeleteUser, AddUser,editUser } from '../controllers/Admin-con.js';
import { signup_model } from '../models/signupschema.js';
var router = Router();


// router.use((req, res, next) => 
// {
//   if (req.session.user !== undefined && req.session.user.Type === 'admin') {
//       next();
//   }
//   else {
//       res.render('error', { user: (req.session.user === undefined ? "" : req.session.user) })
//   }
// });
router.get("/", function (req, res, next) {
    res.render("admin");
  });
  router.get("/reports", function (req, res, next) {
    res.render("reports-admin");
  });
  router.get("/trips", function (req, res, next) {
    res.render("trips");
  });
  router.get("/adduser", function (req, res, next) {
    res.render("adduser");
  });
 
  


  
  router.get("/customers",fetchusers);
  router.get("/toAdmin/:id", toAdmin);
  router.get("/toClient/:id", toClient);
  router.get("/delete/:id", DeleteUser);
  router.get("/edituser/:id",editUser);
  router.post("/adduser",AddUser);
  router.post("/edituser/:id",(req,res,next)=>{
    signup_model.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
    .then((customer) => {
      if (!customer) {
        console.log("something went wrong updating the data");
        return res.redirect("/admin/customers"); // Redirect to an error page if customer not found
      }
    
    })
    .catch((error) => {
      console.error(error);
      res.redirect("error"); // Redirect to an error page if an error occurs
    });
  });

  



 




export default router;
