const { Schema, model } = require("mongoose");
const Joi = require("joi");

const queezRecordSchema = new Schema({
  queez: String,
  user: String,
  finalScore: Number,
  questionsAnswered: Number,
  Answers: [[{ type: String }]],
  date: Date,
});

const queezRecordModel = model("queezRecord", queezRecordSchema);

const queezRecord_validator = Joi.object({
  queez: Joi.string().required(),
  user: Joi.string().required(),
  finalScore: Joi.number().required(),
  questionsAnswered: Joi.number().required(),
  date: Joi.date().required(),

  // [ q1[ answer's, Ids ], q2[answer's, Ids] ]
  Answers: Joi.array().items(Joi.array().items(Joi.string())),
});

module.exports = { queezRecordModel, queezRecordSchema, queezRecord_validator };
