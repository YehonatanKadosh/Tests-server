const { model, Schema } = require("mongoose");

const tagSchema = new Schema({
  name: { type: String, unique: true },
  topics: [{ type: String }],
});

const tagModel = model("tag", tagSchema);

module.exports = tagModel;
