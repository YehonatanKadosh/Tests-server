const express = require("express");
const admin = require("../services/authentication/admin");
const auth = require("../services/authentication/auth");
const {
  createQuestion,
  findAllQuestions,
} = require("../services/mongoose/requestHandlers/question");
const questionRouter = express.Router();

questionRouter.post("/", [auth, admin], async (req, res, next) => {
  try {
    res.send(await createQuestion(req.body));
  } catch (error) {
    next(error);
  }
});

questionRouter.get("/", [auth, admin], async (req, res, next) =>
  res.send(await findAllQuestions())
);

module.exports = questionRouter;
