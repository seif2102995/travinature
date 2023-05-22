import { Router } from "express";


const router = Router();

router.get("/", function (req, res, next) {
  res.render("map");
});

router.get("/egypt", function (req, res, next) {
  res.render("eg");
});

router.get("/argentina", function (req, res, next) {
    res.render("argentina");
  });







export default router;
