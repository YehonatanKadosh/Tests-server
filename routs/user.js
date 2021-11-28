import express from "express";
import admin from "../services/authentication/admin.js";
import auth from "../services/authentication/auth.js";
import { findAllUsers } from "../services/mongoose/requestHandlers/user.js";
const userRouter = express.Router();

userRouter.get("/", [auth, admin], async (req, res, next) =>
  res.send(await findAllUsers())
);

export default userRouter;
