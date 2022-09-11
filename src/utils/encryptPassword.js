const bcrypt = require("bcrypt");

const saltRounds = 10;

const hasMyPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const passwordMatch = async (providedPassword, userPassword) => {
  return await bcrypt.compare(providedPassword, userPassword);
};
module.exports = { hasMyPassword, passwordMatch };
