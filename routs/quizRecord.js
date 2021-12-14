const express = require("express");
const auth = require("../services/authentication/auth");
const admin = require("../services/authentication/admin");
const {
  createQuizRecord,
  getQuizRecords,
} = require("../services/mongoose/requestHandlers/quizRecord");
const quizRecordRouter = express.Router();

quizRecordRouter.post("/", [auth], async (req, res, next) => {
  try {
    res.send(await createQuizRecord(req.body, req.user.id));
  } catch (error) {
    next(error);
  }
});

quizRecordRouter.get("/", [auth, admin], async (req, res, next) => {
  try {
    const { id, dateRange } = req.query;
    if (!id) next("no id provided");
    else res.send(await getQuizRecords(id, dateRange));
  } catch (error) {
    next(error);
  }
});

module.exports = quizRecordRouter;
