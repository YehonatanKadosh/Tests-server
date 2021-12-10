const { model, Schema } = require("mongoose");
const answersModel = require("./answers");

const queezRecordSchema = new Schema({
  queez: String,
  user: String,
  finalScore: Number,
  questionsAnswered: Number,
  answers: [answersModel.schema],
  date: Date,
});

const queezRecordModel = model("queezRecord", queezRecordSchema);

module.exports = queezRecordModel;
