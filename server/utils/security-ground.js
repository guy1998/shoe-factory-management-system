const bcrypt = require("bcrypt");

const passwordHasher = (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};

const passwordVerifier = (realPassword, testedPassword) => {
  return bcrypt.compareSync(testedPassword, realPassword);
};

module.exports = {
  passwordHasher,
  passwordVerifier,
};
