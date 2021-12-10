const { model, Schema } = require("mongoose");
const { roles } = require("quizy-yk-common");

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  accounts: [String],
  role: { type: String, enum: roles },
});

const userModel = model("user", userSchema);

module.exports = userModel;
