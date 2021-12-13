const { genericCreate } = require("./generiCRUD");
const { question_validator } = require("quizy-yk-common");
const questionModel = require("../models/question");
const { getTopicsByIds } = require("./topic");
const { getTagsByIds } = require("./tag");

const createQuestion = async (question) =>
  await getQuestionReady(
    await genericCreate(
      { ...question, replaced: false },
      question_validator,
      questionModel
    )
  );

const getQuestionReady = async (Question) => {
  const tags = await getTagsByIds(Question.tags);
  const topics = await getTopicsByIds(Question.topics);
  return { ...Question._doc, tags, topics };
};

const getQuestionsReady = async (Questions) =>
  new Promise(async (res, rej) => {
    try {
      const ReadyQuestions = [];
      let index = 0;
      Questions.forEach(async (Q) => {
        ReadyQuestions.push(await getQuestionReady(Q));
        index += 1;
        if (index === Questions.length) res(ReadyQuestions);
      });
    } catch (error) {
      rej(error);
    }
  });

const findQuestions = async ({ topic, tag, partialQuestion }) => {
  if (!topic && !tag && !partialQuestion) return [];
  const search = { replaced: false };
  if (topic) search.topics = topic;
  if (tag) search.tags = tag;
  if (partialQuestion) search.question = new RegExp(`${partialQuestion}`, "i");
  const Questions = await questionModel.find(search);
  if (!Questions.length) return Questions;
  else return await getQuestionsReady(Questions);
};

const updateQuestion = async (newquestion) => {
  const question = await questionModel.findOne({ _id: newquestion._id });
  Object.assign(question, newquestion);
  return await getQuestionReady(await question.save());
};

const newQuestionsVersion = async (Q) => {
  await removeQuestion(Q);
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

  const newQuestion = await createQuestion({
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
  return newQuestion;
};

const getQuestionsByIds = async (ids) =>
  await questionModel.find({ _id: { $in: ids } });

const removeQuestion = async ({ _id }) => {
  const oldQ = await questionModel.findOne({ _id });
  oldQ.replaced = true;
  return await oldQ.save();
};
module.exports = {
  createQuestion,
  newQuestionsVersion,
  updateQuestion,
  removeQuestion,
  updateQuestion,
  findQuestions,
  getQuestionsByIds,
  getQuestionsReady,
};
