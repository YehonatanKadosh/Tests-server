const { roles } = require("quizy-yk-common");

const admin = (req, res, next) => {
  if (req.user.role === roles.Admin) next();
  else res.status(401).send("access denied");
};

module.exports = admin;
