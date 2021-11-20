const { roles } = require("../mongoose/enums");

const admin = (req, res, next) => {
  if (req.user.role !== roles.Admin) res.status(401).send("access denied");
  else next();
};

module.exports = admin;
