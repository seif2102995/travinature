import mongoose from "mongoose";

const schema = mongoose.Schema;

const signup_schema = new schema({
        firstname: String,
        lastname: String,
        username: String,
        password: String,
        mail: String,
        phone: String,
        dob: String,
        cpassword: String,
        type:String,  //aaml input type hidden value client
        token : Number
});

const signup_model = mongoose.model("signup", signup_schema);

// module.exports = signup_model;

export { signup_model };
