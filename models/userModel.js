const express=require("express")
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema =schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel=mongoose.model("users",userSchema);
module.exports=userModel;
