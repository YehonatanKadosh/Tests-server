const { quizRecord_validator } = require("quizy-yk-common");
const quizModel = require("../models/quiz");
const quizRecordModel = require("../models/quizRecord");
const { genericCreate } = require("./generiCRUD");
const { findQuizById, getQuizzesReady } = require("./quiz");
const { findUserById } = require("./user");
const sendEmail = require("../../sendGrid/send");

const calculateFinalScore = (storedQuestions, answeredQuestions) => {
  let score = 0;
  let questionWeight = 100 / storedQuestions.length;
  for (let question_i = 0; question_i < storedQuestions.length; question_i++) {
    let AnsweredCorrectly = true;
    const storedQuestion = storedQuestions[question_i];
    const answeredQuestion = answeredQuestions.find(
      (q) => q._id === storedQuestion._id.toString()
    );
    for (
      let answer_i = 0;
      answer_i < storedQuestion.answers.length;
      answer_i++
    ) {
      const storedAnswer = storedQuestion.answers[answer_i]._doc;
      const answeredAnswer = answeredQuestion.answers.find(
        (a) => a._id === storedAnswer._id.toString()
      );
      if (storedAnswer.isRight !== answeredAnswer.isRight) {
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
        question: question._id,
        answers: question.answers.filter((a) => a.isRight).map((a) => a._id),
      });
      if (index === questions.length) res(answers);
    });
  });

const getRecordsReady = async (records) => {
  const Records = [];
  const quizzesIDs = records.map((r) => r.quiz);
  const Quizzes = await quizModel.find({ _id: { $in: quizzesIDs } });
  const ReadyQuizzes = await getQuizzesReady(Quizzes);
  for (let i = 0; i < records.length; i++) {
    const { firstName, lastName, email, phoneNumber, _id } = await findUserById(
      records[i]._doc.user
    );
    Records.push({
      ...records[i]._doc,
      quiz: ReadyQuizzes.find((q) => q._id.toString() === records[i]._doc.quiz),
      user: { firstName, lastName, email, phoneNumber, _id },
    });
  }
  return Records;
};

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

      // send Email
      const {
        passingScore,
        successEmailSubject,
        failEmailSubject,
        successEmailMessage,
        failEmailMessage,
      } = storedQuiz;
      const passed = finalScore >= passingScore;
      const storedUser = await findUserById(user);
      const message = {
        to: storedUser.email,
        from: "jacojacoj3@gmail.com",
        subject: passed ? successEmailSubject : failEmailSubject,
        html: `<div style="text-align: center;">
                <div>
                  Passing Grade: <strong>${passingScore}</strong>
                </div>
                <div>
                  ${passed ? successEmailMessage : failEmailMessage}
                </div>
                <div style="color: ${passed ? "green" : "red"};">
                  <strong>Grade: ${finalScore}</strong>
                </div>
              </div>`,
      };
      sendEmail(message);

      // create new record
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

module.exports.getStudentRecords = async (_id) => {
  const records = await quizRecordModel.find({ user: _id });
  return await getRecordsReady(records);
};

module.exports.getQuizRecords = async (_id, dateRange) => {
  const filter = { quiz: _id };
  if (dateRange) {
    filter.date = {};
    if (dateRange[0] !== "null") filter.date.$gte = dateRange[0];
    if (dateRange[1] !== "null") filter.date.$lt = dateRange[1];
  }
  const records = await quizRecordModel.find(filter);
  return await getRecordsReady(records);
};
