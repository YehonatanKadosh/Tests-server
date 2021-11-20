const bcrypt = require("bcrypt");
let salt = undefined;

const encryptPassword = async (password) => {
  if (salt === undefined) salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// returns boolean value (is it Valid)
const passwordIsValid = async (enteredPassword, savedPassword) =>
  await bcrypt.compare(enteredPassword, savedPassword);

module.exports = { encryptPassword, passwordIsValid };
