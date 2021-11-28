import express from "express";
import auth from "../services/authentication/auth.js";
import { newJsonWebToken } from "../services/JWT.js";
import login from "../services/mongoose/requestHandlers/login.js";
const loginRouter = express.Router();
import { login_validator } from "queezy-common";
import { findUserById } from "../services/mongoose/requestHandlers/user.js";

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

export default loginRouter;
