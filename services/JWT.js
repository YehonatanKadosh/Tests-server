import jwt from "jsonwebtoken";

export const newJsonWebToken = ({ id, role }) =>
  jwt.sign({ id, role }, process.env.JSONWEBTOKENS);

export const verifyJsonWebToken = async (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JSONWEBTOKENS, (err, decoded) => {
      if (decoded) res(decoded);
      else rej(err);
    });
  });
};
