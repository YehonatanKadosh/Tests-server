const { Schema, model } = require("mongoose");
const Joi = require("joi");

const topicSchema = new Schema({
  name: String,
});

const topicModel = model("topic", topicSchema);

const topic_validator = Joi.object({
  name: Joi.string().required(),
});

module.exports = { topicModel, topicSchema, topic_validator };
