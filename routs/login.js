const express = require("express");
const auth = require("../services/authentication/auth");
const { newJsonWebToken } = require("../services/JWT");
const login = require("../services/mongoose/requestHandlers/login");
const loginRouter = express.Router();
const { login_validator } = require("quizy-yk-common");
const { findUserById } = require("../services/mongoose/requestHandlers/user");

loginRouter.post("/", async (req, res, next) => {
  try {
    await login_validator.validate(req.body);
    const user = await login(req.body);
    const jwt = newJsonWebToken(user);
    const { firstName, lastName, role } = user;
    res
      .header(process.env.JWTHeaderName, jwt)
      .send({ firstName, lastName, role });
  } catch (error) {
    next(error);
  }
});

loginRouter.get("/", auth, async (req, res, next) => {
  const user = await findUserById(req.user.id);
  const { firstName, lastName, role } = user;
  res.send({ firstName, lastName, role });
});

module.exports = loginRouter;
