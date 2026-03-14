const express= require("express");
const { signUp, signIn, profile } = require("../controllers/userControllers");
const tokenVarify = require("../middleware/tokenVarify");


const userRouter=express.Router();

userRouter.post("/signup",signUp);
userRouter.post("/signin",signIn);
userRouter.get("/profile/:id",tokenVarify,profile);

module.exports=userRouter;
