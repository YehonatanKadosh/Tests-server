const jwt = require("jsonwebtoken");

module.exports.newJsonWebToken = ({ id, role }) =>
  jwt.sign({ id, role }, process.env.JSONWEBTOKENS);

module.exports.verifyJsonWebToken = async (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JSONWEBTOKENS, (err, decoded) => {
      if (decoded) res(decoded);
      else rej(err);
    });
  });
};
