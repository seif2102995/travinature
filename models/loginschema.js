const mongoose = require ('mongoose');
const schema = mongoose.Schema;

const login_schema = new schema({
    username : String,
    password : String
});

const login_model = mongoose.model('login', login_schema);

module.exports = login_model;
