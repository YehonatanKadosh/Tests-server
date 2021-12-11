const { genericCreate } = require("./generiCRUD");
const { quiz_validator } = require("quizy-yk-common");
const quizModel = require("../models/quiz");
const { getTopicById } = require("./topic");
const { getQuestionsByIds, getQuestionsReady } = require("./question");

const createQuiz = async (quiz) =>
  await getQuizReady(
    await genericCreate({ ...quiz, replaced: false }, quiz_validator, quizModel)
  );

const findQuizById = (_id) =>
  new Promise(async (res, rej) => {
    try {
      const Quiz = await quizModel.findOne({ _id });
      res(await getQuizReady(Quiz));
    } catch (error) {
      rej({ message: "Quiz not found", context: _id });
    }
  });

const getQuizReadyForTest = (quiz) => {
  const questions = [];
  for (let i = 0; i < quiz.questions.length; i++) {
    const originalAnswers = quiz.questions[i].answers;
    const answers = [];
    for (let j = 0; j < originalAnswers.length; j++) {
      answers.push({ ...originalAnswers[j]._doc, isRight: false });
    }
    questions.push({ ...quiz.questions[i], answers });
  }
  return { ...quiz, questions };
};

const getQuizReady = async (Quiz) => {
  const Questions = await getQuestionsByIds(Quiz.questions);
  const topic = await getTopicById(Quiz.topic);
  return {
    ...Quiz._doc,
    questions: await getQuestionsReady(Questions),
    topic,
  };
};

const getQuizzesReady = async (Quizzes) =>
  new Promise(async (res, rej) => {
    try {
      const ReadyQuizzes = [];
      let index = 0;
      Quizzes.forEach(async (Q) => {
        ReadyQuizzes.push(await getQuizReady(Q));
        index += 1;
        if (index === Quizzes.length) res(ReadyQuizzes);
      });
    } catch (error) {
      rej(error);
    }
  });

const findQuizzes = async ({ topic, partialName }) => {
  if (!topic && !partialName) return [];
  const search = { replaced: false };
  if (topic) search.topic = topic;
  if (partialName) search.name = new RegExp(`${partialName}`, "i");
  const Quizzes = await quizModel.find(search);
  if (!Quizzes.length) return Quizzes;
  else return await getQuizzesReady(Quizzes);
};

const updateQuiz = async (newquiz) => {
  const quiz = await quizModel.findOne({ _id: newquiz._id });
  Object.assign(quiz, newquiz);
  return await getQuizReady(await quiz.save());
};

const newQuizsVersion = async (Q) => {
  const oldQ = await quizModel.findOne({ _id: Q._id });
  oldQ.replaced = true;
  await oldQ.save();
  const {
    language,
    name,
    questions,
    introduction,
    quizenerEmail,
    passingScore,
    answersReview,
    certificateURL,
    topic,
    successMessage,
    failMessage,
    version,
    successEmailSubject,
    successEmailMessage,
    failEmailSubject,
    failEmailMessage,
  } = Q;
  return await createQuiz({
    language,
    name,
    questions,
    introduction,
    quizenerEmail,
    passingScore,
    answersReview,
    certificateURL,
    topic,
    successMessage,
    failMessage,
    version,
    successEmailSubject,
    successEmailMessage,
    failEmailSubject,
    failEmailMessage,
  });
};

const removeQuiz = async ({ _id }) =>
  await quizModel.findByIdAndRemove({ _id });

module.exports = {
  createQuiz,
  newQuizsVersion,
  updateQuiz,
  removeQuiz,
  updateQuiz,
  findQuizzes,
  findQuizById,
  getQuizReadyForTest,
};
