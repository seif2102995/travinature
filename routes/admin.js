import { Router } from 'express';
import { fetchusers,toAdmin,toClient,DeleteUser, AddUser } from '../controllers/Admin-con.js';
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
  router.post("/adduser",AddUser);


 




export default router;
