const { model, Schema } = require("mongoose");
const { languages } = require("quizy-yk-common");

const quizSchema = new Schema({
  language: { type: String, enum: languages },
  name: { type: String, maxlength: 200 },
  questions: [{ type: String }],
  introduction: String,
  quizenerEmail: String,
  passingScore: Number,
  answersReview: Boolean,
  certificateURL: String,
  topic: String,
  successMessage: String,
  failMessage: String,
  version: Number,
  replaced: Boolean,

  // mailing handler
  successEmailSubject: String,
  successEmailMessage: String,
  failEmailSubject: String,
  failEmailMessage: String,
});

const quizModel = model("quiz", quizSchema);

module.exports = quizModel;
