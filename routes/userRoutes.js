const express= require("express");
const { signUp } = require("../controllers/userControllers");


const userRouter=express.Router();

userRouter.post("/signup",signUp);

module.exports=userRouter;
