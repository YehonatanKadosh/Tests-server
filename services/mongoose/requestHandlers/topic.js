import { genericCreate, genericUpdate } from "./generiCRUD.js";
import { topicModel, topic_validator } from "queezy-common";

export const createTopic = async (topic) =>
  await genericCreate(topic, topic_validator, topicModel);

export const findAllTopics = async () => await topicModel.find({});

export const updateTopic = async (_id) =>
  await genericUpdate(_id, {}, topicModel);

export const removeTopic = async (_id) =>
  await topicModel.findByIdAndRemove({ _id });
