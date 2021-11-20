const { verifyJsonWebToken } = require("../JWT");

const auth = async (req, res, next) => {
  const Token = req.headers[process.env.JWTHeaderName];
  if (!Token) return res.status(401).send("access denied. no token provided");
  try {
    req.user = await verifyJsonWebToken(Token);
    next();
  } catch (err) {
    res.status(401).send("invalid token");
  }
};

module.exports = auth;
