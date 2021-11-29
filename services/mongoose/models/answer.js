const { model, Schema } = require("mongoose");

const answerSchema = new Schema({
  content: String,
  isRight: Boolean,
});

const answerModel = model("answer", answerSchema);

module.exports = answerModel;
