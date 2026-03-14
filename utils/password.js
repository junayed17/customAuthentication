require("dotenv").config();
const bcrypt = require("bcrypt");

async function passHash(plainPass) {
  const hashPAss = await bcrypt.hash(plainPass, Number(process.env.bycript_S));
  return hashPAss;
}

const passVarify = async (password, hassPass) => {
  const passVarify = await bcrypt.compare(password, hassPass);
  return passVarify;
};

module.exports = { passHash, passVarify };
