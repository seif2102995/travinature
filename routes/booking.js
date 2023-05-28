import { Router } from "express";


const router = Router();

router.get("/", function (req, res, next) {
  res.render("map",{ user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get("/egypt", function (req, res, next) {
  res.render("eg",{ user: (req.session.user === undefined ? "" : req.session.user) }); 
});

router.get("/argentina", function (req, res, next) {
    res.render("argentina",{ user: (req.session.user === undefined ? "" : req.session.user) });
  });


export default router;
