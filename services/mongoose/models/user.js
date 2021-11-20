const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { roles } = require("../enums");

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  role: { type: String, enum: roles },
});

const userModel = model("user", userSchema);

const user_validator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^\+?(972|0)(-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/)
    .required(),
  role: Joi.string()
    .valid(...Object.values(roles))
    .required(),
});

module.exports = { userModel, userSchema, user_validator };
