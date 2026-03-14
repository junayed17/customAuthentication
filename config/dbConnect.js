require("dotenv").config();
const mongoose = require("mongoose");


const dbConnect = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports=dbConnect;
