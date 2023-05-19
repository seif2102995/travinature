// import mongoose from "mongoose";
// const schema = mongoose.Schema;

const signup_schema = new schema({
    firstname : String,
    lastname : String,
    username : String,
    password : String,
    mail : String,
    phone : String,
    dob : Date,
    cpassword : String
});

const signup_model = mongoose.model('signup', signup_schema);

// module.exports = signup_model;

// export default signup_model
