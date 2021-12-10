const { roles } = require("quizy-yk-common");

const user = (req, res, next) => {
  if (req.user.role === roles.User) next();
  else res.status(401).send("Content for users only");
};

module.exports = user;
