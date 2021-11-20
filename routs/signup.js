const express = require("express");
const { newJsonWebToken } = require("../services/JWT");
const { createUser } = require("../services/mongoose/requestHandlers/user");
const signupRouter = express.Router();

signupRouter.post("/", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    const jwt = newJsonWebToken(user);
    const { firstName, lastName, role } = user;
    res
      .cookie(process.env.JWTHeaderName, jwt)
      .send({ firstName, lastName, role });
  } catch (error) {
    next(error);
  }
});

module.exports = signupRouter;
