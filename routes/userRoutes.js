const express= require("express");
const { signUp, signIn, profile } = require("../controllers/userControllers");


const userRouter=express.Router();

userRouter.post("/signup",signUp);
userRouter.post("/signin",signIn);
userRouter.get("/profile/:id",profile);

module.exports=userRouter;
