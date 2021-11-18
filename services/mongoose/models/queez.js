const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { languages } = require("../enums");

const queezSchema = new Schema({
  language: { type: String, enum: languages },
  name: { type: String, maxlength: 200 },
  questions: [{ type: String }],
  introduction: String,
  queezenerEmail: String,
  passingScore: Number,
  answersReview: Boolean,
  certificateURL: String,
  topic: String,
  successMessage: String,
  failMessage: String,

  // mailing handler
  successEmailSubject: String,
  successEmailMessage: String,
  failEmailSubject: String,
  failEmailMessage: String,
});

const queezModel = model("queez", queezSchema);

const queez_validator = Joi.object({
  language: Joi.string()
    .valid(...Object.values(languages))
    .required(),
  name: Joi.string().max(200).required(),
  questions: Joi.array().items(Joi.string()),
  introduction: Joi.string().required(),
  queezenerEmail: Joi.string().email().required(),
  passingScore: Joi.number().required(),
  answersReview: Joi.boolean().required(),
  certificateURL: Joi.string().required(),
  topic: Joi.string().required(),
  successMessage: Joi.string().required(),
  failMessage: Joi.string().required(),

  // mailing handler
  successEmailSubject: Joi.string().required(),
  successEmailMessage: Joi.string().required(),
  failEmailSubject: Joi.string().required(),
  failEmailMessage: Joi.string().required(),
});

module.exports = { queezModel, queezSchema, queez_validator };
