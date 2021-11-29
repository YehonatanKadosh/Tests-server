const { genericCreate, genericUpdate } = require("./generiCRUD");
const { topic_validator } = require("queezy-common");
const topicModel = require("../models/topic");

module.exports.createTopic = async (topic) =>
  await genericCreate(topic, topic_validator, topicModel);

module.exports.findAllTopics = async () => await topicModel.find({});

module.exports.updateTopic = async (_id) =>
  await genericUpdate(_id, {}, topicModel);

module.exports.removeTopic = async (_id) =>
  await topicModel.findByIdAndRemove({ _id });
