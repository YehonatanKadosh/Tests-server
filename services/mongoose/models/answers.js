const { model, Schema } = require("mongoose");

const answersSchema = new Schema({
  question: String,
  answers: [String],
});

const answersModel = model("answers", answersSchema);

module.exports = answersModel;
