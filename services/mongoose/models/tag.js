const { Schema, model } = require("mongoose");
const Joi = require("joi");

const tagSchema = new Schema({
  name: String,
  topic: String,
});

const tagModel = model("tag", tagSchema);

const tag_validator = Joi.object({
  name: Joi.string().required(),
  topic: Joi.string().required(),
});

module.exports = { tagModel, tagSchema, tag_validator };
