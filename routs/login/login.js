const express = require("express");
const { newJsonWebToken } = require("../../services/JWT");
const login = require("../../services/mongoose/requestHandlers/login");
const loginRouter = express.Router();
const login_validator = require("./login.validator");

loginRouter.post("/", async (req, res, next) => {
  try {
    await login_validator.validateAsync(req.body);
    const user = await login(req.body);
    const jwt = newJsonWebToken(user);
    const { firstName, lastName, role } = user;
    res
      .cookie(process.env.JWTHeaderName, jwt)
      .send({ firstName, lastName, role });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
