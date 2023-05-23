import { Router } from 'express';
import { fetchusers } from '../controllers/customers_controller.js';
var router = Router();


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
