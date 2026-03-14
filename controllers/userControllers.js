const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const userModel = require("../models/userModel");
const { passHash, passVarify } = require("../utils/password");
const {tokenGen} = require("../utils/token");

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
    console.log("Iam working",email);
    const payload = { email };
    const token = await tokenGen(payload);
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
    console.log(varifiedPAssword);

    if (!varifiedPAssword) {
      return res.status(400).send({ message: "Invalid Credential" });
    }
    console.log("iam working before");
    
    const token = await tokenGen({ email });
    console.log(token);

    res.status(200).json({
      token,
      message: "Login successful",
      // optionally: user: { id: isExist._id, username: isExist.username, email }
    });
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};

const profile = async (req, res) => {
  const { id } = req.params;
  const email=req.userEmail;
  
  try {
    const user = await userModel.findOne({email});
    res.send(user);
  } catch (error) {
    res.status(400).send({ message: "something went wrong" });
  }
};

module.exports = { signUp, signIn, profile };
