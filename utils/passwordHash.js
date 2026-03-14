require("dotenv").config();
const bcrypt = require("bcrypt");
async function passHash(plainPass) {
  const hashPAss = await bcrypt.hash(plainPass, Number(process.env.bycript_S));
  return hashPAss;
}

module.exports = { passHash };
