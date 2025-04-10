const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    email : {
        type : String,
        trim : true,
        unique : true,
        required : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    }
}, {timestamps : true})

module.exports = mongoose.model("User", user);