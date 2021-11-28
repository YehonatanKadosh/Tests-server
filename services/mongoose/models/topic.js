import pkg from "mongoose";
const { model, Schema } = pkg;

const topicSchema = new Schema({
  name: { type: String },
  account: { type: String },
});

const topicModel = model("topic", topicSchema);

export default topicModel;
