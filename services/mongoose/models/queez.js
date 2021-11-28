import pkg from "mongoose";
const { model, Schema } = pkg;
import { languages } from "../index.js";

const queezSchema = new Schema({
  language: { type: String, enum: languages },
  name: { type: String, maxlength: 200 },
  questions: [{ type: String }],
  introduction: String,
  queezenerEmail: String,
  passingScore: Number,
  answersReview: Boolean,
  certificateURL: String,
  topic: String,
  successMessage: String,
  failMessage: String,
  version: Number,

  // mailing handler
  successEmailSubject: String,
  successEmailMessage: String,
  failEmailSubject: String,
  failEmailMessage: String,
});

const queezModel = model("queez", queezSchema);

export default queezModel;
