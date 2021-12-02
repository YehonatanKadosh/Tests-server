const { genericCreate, genericUpdate } = require("./generiCRUD");
const { tag_validator } = require("queezy-common");
const tagModel = require("../models/tag");

module.exports.createTag = async (tag) =>
  await genericCreate(
    { ...tag, topics: tag.topics.map((topic) => topic._id) },
    tag_validator,
    tagModel
  );

module.exports.findTagsByTopics = async (topics) =>
  await tagModel.find({ topics: { $elemMatch: { $in: topics } } });

module.exports.updateTag = async (_id) =>
  await genericUpdate(_id, {}, tagModel);

module.exports.removeTag = async (_id) =>
  await tagModel.findByIdAndRemove({ _id });
