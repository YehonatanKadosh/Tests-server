const { model, Schema } = require("mongoose");
const { roles } = require("queezy-common");

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
