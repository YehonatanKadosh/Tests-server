const express = require("express");
const { newJsonWebToken } = require("../services/JWT");
const { user_validator } = require("../services/mongoose/models/user");
const {
  createUser,
  findUserById,
  findUserByEmail,
} = require("../services/mongoose/requestHandlers/user");
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
    if (error.code === 11000) res.status(422).send("Email already exist!");
    else next(error);
  }
});

module.exports = signupRouter;
