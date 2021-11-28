const express = require("express");
const topicRouter = express.Router();
const admin = require("../services/authentication/admin");
const auth = require("../services/authentication/auth");
const {
  findAllTopics,
  createTopic,
} = require("../services/mongoose/requestHandlers/topic");

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

module.exports = topicRouter;
