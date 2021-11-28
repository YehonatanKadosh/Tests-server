import express from "express";
const topicRouter = express.Router();
import admin from "../services/authentication/admin.js";
import auth from "../services/authentication/auth.js";
import {
  findAllTopics,
  createTopic,
} from "../services/mongoose/requestHandlers/topic.js";

topicRouter.get("/", [auth, admin], async (req, res, next) =>
  res.send(await findAllTopics())
);

topicRouter.post("/", [auth, admin], async (req, res, next) => {
  try {
    res.send(await createTopic(req.body));
  } catch (error) {
    next(error);
  }
});

export default topicRouter;
