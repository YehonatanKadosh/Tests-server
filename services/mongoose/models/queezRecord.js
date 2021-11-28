import pkg from "mongoose";
const { model, Schema } = pkg;

const queezRecordSchema = new Schema({
  queez: String,
  user: String,
  finalScore: Number,
  questionsAnswered: Number,
  Answers: [[{ type: String }]],
  date: Date,
});

const queezRecordModel = model("queezRecord", queezRecordSchema);

export default queezRecordModel;
