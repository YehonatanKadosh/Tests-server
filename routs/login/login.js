const express = require("express");
const auth = require("../../services/authentication/auth");
const { newJsonWebToken } = require("../../services/JWT");
const login = require("../../services/mongoose/requestHandlers/login");
const loginRouter = express.Router();
const login_validator = require("./login.validator");
const {
  findUserById,
} = require("../../services/mongoose/requestHandlers/user");

loginRouter.post("/", async (req, res, next) => {
  try {
    await login_validator.validateAsync(req.body);
    const { email, password, rememberMe } = req.body;
    const user = await login({ email, password });
    const jwt = newJsonWebToken(user);
    const { firstName, lastName, role } = user;
    if (rememberMe)
      res.cookie(process.env.JWTHeaderName, jwt, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: true,
      });
    else res.cookie(process.env.JWTHeaderName, jwt);
    res.send({ firstName, lastName, role });
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
