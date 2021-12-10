const { quizRecord_validator } = require("quizy-yk-common");
const quizRecordModel = require("../models/quizRecord");
const { genericCreate } = require("./generiCRUD");
const { findQuizById } = require("./quiz");

const calculateFinalScore = (storedQuestions, answeredQuestions) => {
  let score = 0;
  let questionWeight = 100 / storedQuestions.length;
  for (let question_i = 0; question_i < storedQuestions.length; question_i++) {
    let AnsweredCorrectly = true;
    const storedQuestion = storedQuestions[question_i];
    const answeredQuestion = answeredQuestions[question_i];
    for (
      let answer_i = 0;
      answer_i < storedQuestion.answers.length;
      answer_i++
    ) {
      const storedAnswer = storedQuestion.answers[answer_i].isRight;
      const answeredAnswer = answeredQuestion.answers[answer_i].isRight;
      if (storedAnswer !== answeredAnswer) {
        AnsweredCorrectly = false;
        break;
      }
    }
    if (AnsweredCorrectly) score += questionWeight;
  }
  return score;
};

const getAnswers = async (questions) =>
  new Promise((res, rej) => {
    const answers = [];
    let index = 0;
    questions.forEach((question) => {
      index++;
      answers.push({
        question: questions._id,
        answers: question.answers.filter((a) => a.isRight).map((a) => a._id),
      });
      if (index === questions.length) res(answers);
    });
  });

module.exports.createQuizRecord = (requestBody, user) =>
  new Promise(async (res, rej) => {
    try {
      await quizRecord_validator.validate(requestBody);
      const { quiz, date } = requestBody;
      const { _id, questions, answersReview } = quiz;
      let questionsAnswered = 0;
      const answers = await getAnswers(questions);
      for (let question_i = 0; question_i < answers.length; question_i++)
        if (answers[question_i].answers.length) questionsAnswered += 1;
      const storedQuiz = await findQuizById(_id);
      const finalScore = calculateFinalScore(storedQuiz.questions, questions);
      const newQuizRecord = await genericCreate(
        {
          quiz: _id,
          user,
          finalScore,
          questionsAnswered,
          answers,
          date,
        },
        undefined,
        quizRecordModel
      );
      if (answersReview) res({ ...newQuizRecord._doc, quiz: storedQuiz });
      else res(newQuizRecord._doc);
    } catch (error) {
      rej(error);
    }
  });
