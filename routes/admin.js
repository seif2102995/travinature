import { Router } from 'express';

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
  router.get("/customers", function (req, res, next) {
    res.render("customers-admin");
  });


export default router;
