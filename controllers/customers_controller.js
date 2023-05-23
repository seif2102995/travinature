import {signup_model} from '../models/signupschema.js'
// Controller for handling the signup form submission
const handleSignup = async (req, res, next) => {
    try {
      // Extract data from the request body
     const data  = new signup_model(req.body);
     console.log('awaiting saveeeeeeeeeeeeeeee');
     await data.save();
  
      // Continue to the next middleware or redirect to a success page
    next();
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  export{handleSignup};
  