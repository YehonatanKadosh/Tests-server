import bcrypt from "bcrypt";
let salt = undefined;

export const encryptPassword = async (password) => {
  if (salt === undefined) salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// returns boolean value (is it Valid)
export const passwordIsValid = async (enteredPassword, savedPassword) =>
  await bcrypt.compare(enteredPassword, savedPassword);
