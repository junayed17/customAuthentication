const userModel = require("../models/userModel");
const { jwttokenvarify } = require("../utils/token");

require("express");

const tokenVarify = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(403).send({
        message: "Unauthorized Access",
      });
    }
    const token = authorization.split(" ")[1];
    if (!authorization) {
      return res.status(403).send({
        message: "Unauthorized Access",
      });
    }
    const aftertokenVarify = await jwttokenvarify(token);
    req.userEmail = aftertokenVarify.email;

    next();
  } catch (error) {
    res.status(400).send({
      message: "something went wrong",
    });
  }
};

module.exports = tokenVarify;
