const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const dbConnect = require("./config/dbConnect");

app.use(cors());
app.use(express.json())

const port = process.env.PORT;

dbConnect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});



app.use("/api/auth",userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
