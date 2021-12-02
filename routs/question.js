const express = require("express");
const admin = require("../services/authentication/admin");
const auth = require("../services/authentication/auth");
const {
  createQuestion,
  updateQuestion,
  newQuestionsVersion,
  removeQuestion,
  findQuestionsByTopic,
  findQuestionsByTopicAndTag,
} = require("../services/mongoose/requestHandlers/question");
const questionRouter = express.Router();

questionRouter.post("/", [auth, admin], async (req, res, next) => {
  try {
    if (req.body._id) res.send(await newQuestionsVersion(req.body));
    else res.send(await createQuestion(req.body));
  } catch (error) {
    next(error);
  }
});

questionRouter.put("/", [auth, admin], async (req, res, next) => {
  try {
    res.send(await updateQuestion(req.body));
  } catch (error) {
    next(error);
  }
});

questionRouter.get("/", [auth, admin], async (req, res, next) => {
  const { topic, tag } = req.query;
  if (topic && tag) res.send(await findQuestionsByTopicAndTag(topic, tag));
  else if (topic) res.send(await findQuestionsByTopic(topic));
  else next("no topic provided");
});

questionRouter.delete("/", [auth, admin], async (req, res, next) =>
  res.send({ ...(await removeQuestion(req.body)), ...req.body })
);

module.exports = questionRouter;
