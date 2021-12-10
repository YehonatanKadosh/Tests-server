const express = require("express");
const auth = require("../services/authentication/auth");
const {
  createQuizRecord,
} = require("../services/mongoose/requestHandlers/quizRecord");
const quizRecordRouter = express.Router();

quizRecordRouter.post("/", [auth], async (req, res, next) => {
  try {
    res.send(await createQuizRecord(req.body, req.user.id));
  } catch (error) {
    next(error);
  }
});

module.exports = quizRecordRouter;
