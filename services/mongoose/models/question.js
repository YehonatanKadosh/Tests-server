import pkg from "mongoose";
const { model, Schema } = pkg;
import { questionTypes, orientationTypes } from "../index.js";
import answerModule from "./answer.js";

const questionSchema = new Schema({
  type: { type: String, enum: questionTypes },
  question: String,
  context: String,
  answers: [{ type: answerModule.schema }],
  orientation: {
    type: String,
    enum: orientationTypes,
    default: orientationTypes.Horizontal,
  },
  tags: [{ type: String }],
  topics: [{ type: String }],
  lastUpdated: Date,
  version: Number,
});

const questionModel = model("question", questionSchema);

export default questionModel;
