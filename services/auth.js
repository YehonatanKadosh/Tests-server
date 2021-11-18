const { verifyJsonWebToken } = require("./JWT");

module.exports = async (req, res, next) => {
  const Token = req.header(process.env.JWTHeaderName);
  if (!Token) return res.status(401).send("access denied. no token provided");
  try {
    req.id = await verifyJsonWebToken(Token);
    next();
  } catch (err) {
    next("invalid token");
  }
};
