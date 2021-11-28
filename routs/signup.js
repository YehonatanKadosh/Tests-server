import express from "express";
import { newJsonWebToken } from "../services/JWT.js";
import { createUser } from "../services/mongoose/requestHandlers/user.js";
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

export default signupRouter;
