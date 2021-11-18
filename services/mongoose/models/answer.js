const { Schema, model } = require("mongoose");
const Joi = require("joi");

const answerSchema = new Schema({
  content: String,
  isRight: Boolean,
});

const answerModel = model("answer", answerSchema);

const answer_validator = Joi.object({
  content: Joi.string().required(),
  isRight: Joi.boolean().required(),
});

module.exports = { answerModel, answerSchema, answer_validator };
