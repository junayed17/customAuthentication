const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { passHash } = require("../utils/passwordHash");
const tokenGen = require("../utils/token");

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.status(400).send("User Already Exist");
    }
  const hashpassword=await passHash(password);
  const newUser =await userModel.create({
      username,
      email,
      password: hashpassword,
    });
  const token=await tokenGen({email})
    res.status(200).send({newUser,token,message:"User Sucessfully Created"});
  } catch (error) {
    res.send("something went wrong");
  }
};

module.exports = { signUp };
