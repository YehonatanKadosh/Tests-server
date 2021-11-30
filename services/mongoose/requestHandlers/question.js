const { genericCreate, genericUpdate } = require("./generiCRUD");
const { question_validator } = require("queezy-common");
const questionModel = require("../models/question");

module.exports.createQuestion = async (question) =>
  await genericCreate(question, question_validator, questionModel);

module.exports.findAllQuestions = async () => await questionModel.find({});

module.exports.updateQuestion = async (_id) =>
  await genericUpdate(_id, {}, questionModel);

module.exports.removeQuestion = async (_id) =>
  await questionModel.findByIdAndRemove({ _id });
