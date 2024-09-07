const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requred:true,
    },
    email:{
        type:String,
        requred:true,
        unique:true,
    },
    password:{
        type:String,
        requred:true
    }
},{timestamps:true
});

const User = mongoose.model("users",userSchema);

module.exports = User;