import { genericCreate, genericUpdate } from "./generiCRUD.js";
import { tagModel, tag_validator } from "queezy-common";

export const createTag = async (tag) =>
  await genericCreate(
    { ...tag, topics: tag.topics.map((topic) => topic._id) },
    tag_validator,
    tagModel
  );

export const findAllTags = async () => await tagModel.find({});

export const updateTag = async (_id) => await genericUpdate(_id, {}, tagModel);

export const removeTag = async (_id) =>
  await tagModel.findByIdAndRemove({ _id });
