const { model, Schema } = require("mongoose");
const { questionTypes, orientationTypes } = require("..");
const answerModule = require("./answer");

const questionSchema = new Schema({
  type: { type: String, enum: questionTypes },
  question: String,
  context: String,
  answers: [{ type: answerModule.schema }],
  orientation: {
    type: String,
    enum: orientationTypes,
    default: orientationTypes.Horizontal,
  },
  tags: [{ type: String }],
  topics: [{ type: String }],
  lastUpdated: Date,
  version: Number,
});

const questionModel = model("question", questionSchema);

module.exports = questionModel;