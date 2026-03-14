require("express")
var jwt = require("jsonwebtoken");

const tokenGen=async(userData)=>{
const token = jwt.sign(userData,process.env.JWT_S);
return token;
}



module.exports=tokenGen;