const express = require("express");
const admin = require("../services/authentication/admin");
const auth = require("../services/authentication/auth");
const user = require("../services/authentication/user");
const {
  newQuizzesVersion,
  createQuiz,
  updateQuiz,
  findQuizzes,
  removeQuiz,
  findQuizById,
  getQuizReadyForTest,
} = require("../services/mongoose/requestHandlers/quiz");
const quizRouter = express.Router();

quizRouter.post("/", [auth, admin], async (req, res, next) => {
  try {
    if (req.body._id) res.send(await newQuizzesVersion(req.body));
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

quizRouter.get("/withParams", [auth, admin], async (req, res, next) =>
  res.send(await findQuizzes(req.query))
);

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
