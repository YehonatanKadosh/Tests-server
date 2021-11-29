const { model, Schema } = require("mongoose");
const accountSchema = new Schema({
  name: { type: String, unique: true },
});

const accountModel = model("account", accountSchema);

module.exports = accountModel;
