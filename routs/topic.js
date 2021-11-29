const express = require("express");
const topicRouter = express.Router();
const admin = require("../services/authentication/admin");
const auth = require("../services/authentication/auth");
const {
  findAllTopics,
  createTopic,
} = require("../services/mongoose/requestHandlers/topic");
const { findUserById } = require("../services/mongoose/requestHandlers/user");

topicRouter.get("/", [auth, admin], async (req, res, next) =>
  res.send(await findAllTopics())
);

topicRouter.post("/", [auth, admin], async (req, res, next) => {
  try {
    const user = await findUserById(req.user.id);
    const account = user.accounts[0];
    res.send(await createTopic({ ...req.body, account }));
  } catch (error) {
    next(error);
  }
});

module.exports = topicRouter;
