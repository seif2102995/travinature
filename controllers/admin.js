import { signup_model } from "../models/signupschema.js";

const fetchusers = async (req, res, next) => {
    try {
      const users = await signup_model.find();
      console.log(users + " \nuserrssssssssssss");
      res.render("customers-admin", { users });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  };

  const toAdmin = (req, res) => {
    signup_model.findByIdAndUpdate(req.params.id, { type: 'admin' })
        .then(result => {
            res.redirect('/admin/customers-admin')
        })
        .catch(err => {
            console.log(err);
        });
  };


  const toClient = (req, res) => {
    signup_model.findByIdAndUpdate(req.params.id, { type: 'client' })
        .then(result => {
            res.redirect('/admin/customers-admin')
        })
        .catch(err => {
            console.log(err);
        });
  };

  const DeleteUser = (req, res) => {
    Employees.findByIdAndDelete(req.params.id)
      .then(result => 
        {
          if (err)
          {
           throw err;
         }
         res.redirect('/admin/viewAll');
      })
      .catch(err => {
        console.log(err);
      });
  };

  export{toAdmin,toClient,fetchusers,DeleteUser};