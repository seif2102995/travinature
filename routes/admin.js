import { Router } from 'express';
import { fetchusers } from '../controllers/customers_controller.js';
var router = Router();


router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.Type === 'admin') {
      next();
  }
  else {
      res.render('err', { err: 'You are not an Admin',user: (req.session.user === undefined ? "" : req.session.user) })
  }
});
router.get("/", function (req, res, next) {
    res.render("admin");
  });
  router.get("/reports", function (req, res, next) {
    res.render("reports-admin");
  });
  router.get("/trips", function (req, res, next) {
    res.render("trips");
  });
  router.get("/customers",fetchusers);


export default router;
