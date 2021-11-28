import pkg from "mongoose";
const { model, Schema } = pkg;
const accountSchema = new Schema({
  name: { type: String, unique: true },
});

const accountModel = model("account", accountSchema);

export default accountModel;
