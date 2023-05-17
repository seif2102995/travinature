import { Router } from 'express';
var router = Router();
// const signup_model2 = require("./models/signupschema");
// import signup_model2 from "../models/signupschema.js"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post("/", (req, res) => {
  const signup_data = new signup_model2(req.body);
  const obj = req.body;
  let count = 0;
  for (const key in obj) {
    if (obj[key] !== "") {
      count++;
    }
  }
  console.log("count = " + count);
  if (count == 8) {
    signup_data
      .save()
      .then(() => {
        console.log("saved to db");
      })
      .catch(() => {
        console.log("error");
      });
  }
  console.log(req.body);
});

export default router;
