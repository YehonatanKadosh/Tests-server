import pkg from "mongoose";
const { model, Schema } = pkg;
import { roles } from "queezy-common";

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

export default userModel;
