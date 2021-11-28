import pkg from "mongoose";
const { model, Schema } = pkg;

const answerSchema = new Schema({
  content: String,
  isRight: Boolean,
});

const answerModel = model("answer", answerSchema);

export default answerModel;
