import { signup_model } from "../models/signupschema.js";
// Controller for handling the signup form submission
const handleSignup = async (req, res, next) => {
  try {
    // Extract data from the request body
    const data = new signup_model(req.body);
    console.log("awaiting saveeeeeeeeeeeeeeee");
    await data.save();
    // Continue to the next middleware or redirect to a success page
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  
  }
};
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

const login=async(req , res )=>{
  try{
    const check = await signup_model.findOne({username:req.body.username})
    if(check.password===req.body.password){
      res.render("home");
    }
  }catch(err){
    console.error(err);
    res.status(500).send("user doesn't exist");
  }
}
export { handleSignup, fetchusers ,login};
