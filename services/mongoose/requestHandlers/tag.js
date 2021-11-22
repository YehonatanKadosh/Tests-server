const { genericCreate, genericUpdate } = require("./generiCRUD");
const { tagModel, tag_validator } = require("../models/tag");

const createTag = async (tag) =>
  await genericCreate(tag, tag_validator, tagModel);

const findAllTags = async () => await tagModel.find({});

const updateTag = async (_id) => await genericUpdate(_id, {}, tagModel);

const removeTag = async (_id) => await tagModel.findByIdAndRemove({ _id });

module.exports = {
  createTag,
  removeTag,
  findAllTags,
  updateTag,
};
