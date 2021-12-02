const { genericCreate } = require("./generiCRUD");
const { question_validator } = require("queezy-common");
const questionModel = require("../models/question");

const createQuestion = async (question) =>
  await genericCreate(
    { ...question, replaced: false },
    question_validator,
    questionModel
  );

const findQuestionsByTopic = async (topic) =>
  await questionModel.find({ topics: topic, replaced: false });

const updateQuestion = async (newquestion) => {
  const question = await questionModel.findOne({ _id: newquestion._id });
  Object.assign(question, newquestion);
  return await question.save();
};

const newQuestionsVersion = async (Q) => {
  const oldQ = await questionModel.findOne({ _id: Q._id });
  oldQ.replaced = true;
  await oldQ.save();
  const {
    type,
    question,
    context,
    answers,
    orientation,
    tags,
    topics,
    lastUpdated,
    version,
  } = Q;
  return await createQuestion({
    type,
    question,
    context,
    answers,
    orientation,
    tags,
    topics,
    lastUpdated,
    version,
  });
};

const removeQuestion = async ({ _id }) =>
  await questionModel.findByIdAndRemove({ _id });

module.exports = {
  createQuestion,
  newQuestionsVersion,
  updateQuestion,
  removeQuestion,
  updateQuestion,
  findQuestionsByTopic,
};
