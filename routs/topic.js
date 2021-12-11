const express = require("express");
const topicRouter = express.Router();
const admin = require("../services/authentication/admin");
const auth = require("../services/authentication/auth");
const {
  createTopic,
  findAllTopics,
  findAllTopicsWithStats,
  removeTopic,
} = require("../services/mongoose/requestHandlers/topic");
const { findUserById } = require("../services/mongoose/requestHandlers/user");

topicRouter.get("/", [auth, admin], async (req, res, next) => {
  const user = await findUserById(req.user.id);
  if (!user) next("user not found");
  res.send(await findAllTopics(user.accounts));
});

topicRouter.get("/withStats", [auth, admin], async (req, res, next) => {
  const user = await findUserById(req.user.id);
  if (!user) next("user not found");
  res.send(await findAllTopicsWithStats(user.accounts));
});

topicRouter.post("/", [auth, admin], async (req, res, next) => {
  try {
    const user = await findUserById(req.user.id);
    const account = user.accounts[0];
    res.send(await createTopic({ ...req.body, account }));
  } catch (error) {
    next(error);
  }
});

topicRouter.delete("/", [auth, admin], async (req, res, next) =>
  res.send({ ...(await removeTopic(req.body)), ...req.body })
);

module.exports = topicRouter;
