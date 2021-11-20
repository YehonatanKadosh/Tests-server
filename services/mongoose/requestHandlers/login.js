const { passwordIsValid } = require("../../bcrypt");
const { findUserByEmail } = require("./user");

const login = ({ email, password }) =>
  new Promise(async (resolve, reject) => {
    const user = await findUserByEmail(email);
    if (!user) reject("email doesn't exist");
    else {
      if (await passwordIsValid(password, user.password)) resolve(user);
      else reject("password is incorrect");
    }
  });

module.exports = login;
