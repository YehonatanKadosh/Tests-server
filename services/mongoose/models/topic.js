const { model, Schema } = require("mongoose");

const topicSchema = new Schema({
  name: { type: String },
  account: { type: String },
});

const topicModel = model("topic", topicSchema);

module.exports = topicModel;
