require("express")
var jwt = require("jsonwebtoken");

const tokenGen=async(userData)=>{
  console.log(userData);
  
const token = jwt.sign(userData,process.env.JWT_S);
return token;
}
const jwttokenvarify=async(token)=>{

  
  const decoded = jwt.verify(token, process.env.JWT_S);
  return decoded;
}


module.exports={tokenGen,jwttokenvarify};