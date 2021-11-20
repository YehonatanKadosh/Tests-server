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
    .length(10)
    .pattern(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    )
    .required(),
  role: Joi.string()
    .valid(...Object.values(roles))
    .required(),
});

module.exports = { userModel, userSchema, user_validator };
