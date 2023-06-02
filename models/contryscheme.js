import mongoose from "mongoose";

const schema = mongoose.Schema;

const contry_schema = new schema({
    country_name:String
});

const conts = mongoose.model("Countries", contry_schema);

// module.exports = signup_model;

export { conts };
