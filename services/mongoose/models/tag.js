import pkg from "mongoose";
const { model, Schema } = pkg;

const tagSchema = new Schema({
  name: { type: String, unique: true },
  topics: [{ type: String }],
});

const tagModel = model("tag", tagSchema);

export default tagModel;
