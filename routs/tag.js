import express from "express";
import admin from "../services/authentication/admin.js";
import auth from "../services/authentication/auth.js";
import {
  findAllTags,
  createTag,
} from "../services/mongoose/requestHandlers/tag.js";
const tagRouter = express.Router();

tagRouter.get("/", [auth, admin], async (req, res, next) =>
  res.send(await findAllTags())
);

tagRouter.post("/", [auth, admin], async (req, res, next) => {
  try {
    res.send(await createTag(req.body));
  } catch (error) {
    next(error);
  }
});

export default tagRouter;
