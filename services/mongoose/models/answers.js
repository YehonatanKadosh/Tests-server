const { model, Schema } = require("mongoose");

const answersSchema = new Schema({
  question: String,
  answers: [String],
});

const answersModel = model("answer", answersSchema);

module.exports = answersModel;
