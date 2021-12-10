const { genericCreate, genericUpdate } = require("./generiCRUD");
const { topic_validator } = require("quizy-yk-common");
const topicModel = require("../models/topic");

module.exports.createTopic = async (topic) =>
  await genericCreate(topic, topic_validator, topicModel);

module.exports.findAllTopics = async () => await topicModel.find({});

module.exports.updateTopic = async (_id) =>
  await genericUpdate(_id, {}, topicModel);

module.exports.removeTopic = async (_id) =>
  await topicModel.findByIdAndRemove({ _id });

module.exports.getTopicsByIds = async (ids) =>
  await topicModel.find({ _id: { $in: ids } });

module.exports.getTopicById = async (_id) => await topicModel.findOne({ _id });
