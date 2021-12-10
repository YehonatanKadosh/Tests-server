const express = require("express");
const admin = require("../services/authentication/admin");
const auth = require("../services/authentication/auth");
const user = require("../services/authentication/user");
const {
  newQuizsVersion,
  createQuiz,
  updateQuiz,
  findQuizsByTopic,
  removeQuiz,
  findQuizById,
  getQuizReadyForTest,
} = require("../services/mongoose/requestHandlers/quiz");
const quizRouter = express.Router();

quizRouter.post("/", [auth, admin], async (req, res, next) => {
  try {
    if (req.body._id) res.send(await newQuizsVersion(req.body));
    else res.send(await createQuiz(req.body));
  } catch (error) {
    next(error);
  }
});

quizRouter.put("/", [auth, admin], async (req, res, next) => {
  try {
    res.send(await updateQuiz(req.body));
  } catch (error) {
    next(error);
  }
});

quizRouter.get("/byTopic", [auth, admin], async (req, res, next) => {
  const { topic } = req.query;
  if (topic) res.send(await findQuizsByTopic(topic));
  else next("no topic provided");
});

quizRouter.get("/", [auth], async (req, res, next) => {
  const { id } = req.query;
  if (id) {
    try {
      const Quiz = await findQuizById(id);
      res.send(getQuizReadyForTest(Quiz));
    } catch (error) {
      next(error);
    }
  } else next("no id provided");
});

quizRouter.delete("/", [auth, admin], async (req, res, next) =>
  res.send({ ...(await removeQuiz(req.body)), ...req.body })
);

module.exports = quizRouter;