const bcrypt = require("bcrypt");
let salt = undefined;

module.exports.encryptPassword = async (password) => {
  if (salt === undefined) salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// returns boolean value (is it Valid)
module.exports.passwordIsValid = async (enteredPassword, savedPassword) =>
  await bcrypt.compare(enteredPassword, savedPassword);
