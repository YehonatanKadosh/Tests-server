const jwt = require("jsonwebtoken");

const newJsonWebToken = function ({ id, email, role }) {
  return jwt.sign(arguments[0], process.env.JSONWEBTOKENS);
};

const verifyJsonWebToken = async (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JSONWEBTOKENS, (err, decoded) => {
      if (decoded) res(decoded);
      else rej(err);
    });
  });
};

module.exports = { newJsonWebToken, verifyJsonWebToken };
