const express = require("express");
const admin = require("../services/authentication/admin");
const auth = require("../services/authentication/auth");
const { findAllUsers } = require("../services/mongoose/requestHandlers/user");
const userRouter = express.Router();

userRouter.get("/", [auth, admin], async (req, res, next) =>
  res.send(await findAllUsers())
);

module.exports = userRouter;
