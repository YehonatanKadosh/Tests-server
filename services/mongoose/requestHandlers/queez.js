const { genericCreate } = require("./generiCRUD");
const { queez_validator } = require("queezy-common");
const queezModel = require("../models/queez");
const { getTopicById } = require("./topic");
const { getQuestionsByIds, getQuestionsReady } = require("./question");

const createQueez = async (queez) =>
  await getQueezReady(
    await genericCreate(
      { ...queez, replaced: false },
      queez_validator,
      queezModel
    )
  );

const findQueezsByTopic = async (topic) => {
  const Queezes = await queezModel.find({ topic, replaced: false });
  if (!Queezes.length) return Queezes;
  return await getQueezesReady(Queezes);
};

const getQueezReady = async (Queez) => {
  const Questions = await getQuestionsByIds(Queez.questions);
  const topic = await getTopicById(Queez.topic);
  return {
    ...Queez._doc,
    questions: await getQuestionsReady(Questions),
    topic,
  };
};

const getQueezesReady = async (Queezes) =>
  new Promise(async (res, rej) => {
    try {
      const ReadyQueezes = [];
      let index = 0;
      Queezes.forEach(async (Q) => {
        ReadyQueezes.push(await getQueezReady(Q));
        index += 1;
        if (index === Queezes.length) res(ReadyQueezes);
      });
    } catch (error) {
      rej(error);
    }
  });

const updateQueez = async (newqueez) => {
  const queez = await queezModel.findOne({ _id: newqueez._id });
  Object.assign(queez, newqueez);
  return await getQueezReady(await queez.save());
};

const newQueezsVersion = async (Q) => {
  const oldQ = await queezModel.findOne({ _id: Q._id });
  oldQ.replaced = true;
  await oldQ.save();
  const {
    language,
    name,
    questions,
    introduction,
    queezenerEmail,
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
  return await createQueez({
    language,
    name,
    questions,
    introduction,
    queezenerEmail,
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

const removeQueez = async ({ _id }) =>
  await queezModel.findByIdAndRemove({ _id });

module.exports = {
  createQueez,
  newQueezsVersion,
  updateQueez,
  removeQueez,
  updateQueez,
  findQueezsByTopic,
};
