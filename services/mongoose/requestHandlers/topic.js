const { genericCreate, genericUpdate } = require("./generiCRUD");
const { topic_validator } = require("quizy-yk-common");
const topicModel = require("../models/topic");
const quizModel = require("../models/quiz");
const questionModel = require("../models/question");
const tagModel = require("../models/tag");

const createTopic = async (topic) =>
  await genericCreate(topic, topic_validator, topicModel);

const findAllTopics = async (accounts) =>
  await topicModel.find({ account: { $in: accounts } });

const findAllTopicsWithStats = async (accounts) => {
  const topics = await findAllTopics(accounts);
  const topicsWithStats = [];

  for (let i = 0; i < topics.length; i++) {
    const id = topics[i]._id.toString();
    const quizzes = await quizModel.aggregate([
      { $match: { topic: id } },
      { $count: "amount" },
    ]);
    const questions = await questionModel.aggregate([
      { $match: { topics: id } },
      { $count: "amount" },
    ]);
    const tags = await tagModel.aggregate([
      { $match: { topics: id } },
      { $count: "amount" },
    ]);
    topicsWithStats.push({
      ...topics[i]._doc,
      quizzes: quizzes.length ? quizzes[0].amount : 0,
      questions: questions.length ? questions[0].amount : 0,
      tags: tags.length ? tags[0].amount : 0,
    });
  }
  return topicsWithStats;
};

const updateTopic = async (_id) => await genericUpdate(_id, {}, topicModel);

const removeTopic = async ({ _id }) =>
  await topicModel.findByIdAndRemove({ _id });

const getTopicsByIds = async (ids) =>
  await topicModel.find({ _id: { $in: ids } });

const getTopicById = async (_id) => await topicModel.findOne({ _id });

module.exports = {
  getTopicById,
  getTopicsByIds,
  removeTopic,
  updateTopic,
  findAllTopicsWithStats,
  createTopic,

  findAllTopics,
};
