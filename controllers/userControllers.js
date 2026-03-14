const bcrypt = require("bcrypt");
const mongoose=require("mongoose")
const ObjectId=mongoose.Types.ObjectId
const userModel = require("../models/userModel");
const { passHash, passVarify } = require("../utils/password");
const tokenGen = require("../utils/token");


const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.status(400).send("User Already Exist");
    }
    const hashpassword = await passHash(password);
    const newUser = await userModel.create({
      username,
      email,
      password: hashpassword,
    });
    const token = await tokenGen({ email });
    res
      .status(200)
      .send({ newUser, token, message: "User Sucessfully Created" });
  } catch (error) {
    res.send("something went wrong");
  }
};

const signIn = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const isExist = await userModel.findOne({ email });
    if (!isExist) {
      return res.status(400).send("User Not Found");
    }
    const varifiedPAssword = await passVarify(password, isExist.password);
    if (varifiedPAssword) {
      const token = await tokenGen({ email });
      return res
        .status(200)
        .send({ token, message: "User Sucessfully Created" });
    } else {
      return res.status(201).send({ token, message: "Invalid Credential" });
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};

const profile=async(req,res)=>{
  const {id}=req.params;
  try {
    const user=await userModel.findById(id)
    res.send(user)
  } catch (error) {
    res.status(400).send({message:"something went wrong"})   ;
  }
}

module.exports = { signUp, signIn,profile };
