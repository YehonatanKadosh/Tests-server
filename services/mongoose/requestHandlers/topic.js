const { genericCreate, genericUpdate } = require("./generiCRUD");
const { topicModel, topic_validator } = require("../models/topic");

const createTopic = async (topic) =>
  await genericCreate(topic, topic_validator, topicModel);

const findAllTopics = async () => await topicModel.find({});

const updateTopic = async (_id) => await genericUpdate(_id, {}, topicModel);

const removeTopic = async (_id) => await topicModel.findByIdAndRemove({ _id });

module.exports = {
  createTopic,
  removeTopic,
  findAllTopics,
  updateTopic,
};
