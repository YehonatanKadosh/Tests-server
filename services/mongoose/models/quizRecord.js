const { model, Schema } = require("mongoose");
const answersModel = require("./answers");

const quizRecordSchema = new Schema({
  quiz: String,
  user: String,
  finalScore: Number,
  questionsAnswered: Number,
  answers: [answersModel.schema],
  date: Date,
});

const quizRecordModel = model("quizRecord", quizRecordSchema);

module.exports = quizRecordModel;
