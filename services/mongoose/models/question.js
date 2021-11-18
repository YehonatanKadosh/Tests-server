const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { questionTypes, orientationTypes } = require("../enums");
const { answerSchema, answer_validator } = require("./answer");

const questionSchema = new Schema({
  type: { type: String, enum: questionTypes },
  question: String,
  context: String,
  answers: [{ type: answerSchema }],
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

const question_validator = Joi.object({
  type: Joi.string()
    .valid(...Object.values(questionTypes))
    .required(),
  question: Joi.string().required(),
  context: Joi.string().required(),
  answers: answer_validator,
  orientation: Joi.string()
    .valid(...Object.values(orientationTypes))
    .required(),
  tags: Joi.array().items(Joi.string()),
  topics: Joi.array().items(Joi.string()).min(1),
  lastUpdated: Joi.date().required(),
  version: Joi.number().default(1),
});

module.exports = { questionModel, questionSchema, question_validator };
