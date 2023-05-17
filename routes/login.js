import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.post("/", (req, res) => {
      if (req.body.username == "admin") {
        if (req.body.password == "admin") {
          res.render("admin");
        }
      } else if (req.body.username !== "") {
        if (req.body.password !== "") {
          res.render("home");
        }
      } else {
        // errors
      }
    });

export default router;
