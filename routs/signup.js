const express = require("express");
const { createUser } = require("../services/mongoose/requestHandlers/user");
const signupRouter = express.Router();

signupRouter.post("/", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    const jwt = newJsonWebToken(user);
    const { firstName, lastName, role } = user;
    res
      .header(process.env.JWTHeaderName, jwt)
      .send({ firstName, lastName, role });
  } catch (error) {
    next(error);
  }
});

module.exports = signupRouter;
