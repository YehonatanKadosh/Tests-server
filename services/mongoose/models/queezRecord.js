const { model, Schema } = require("mongoose");

const queezRecordSchema = new Schema({
  queez: String,
  user: String,
  finalScore: Number,
  questionsAnswered: Number,
  Answers: [[{ type: String }]],
  date: Date,
});

const queezRecordModel = model("queezRecord", queezRecordSchema);

module.exports = queezRecordModel;
