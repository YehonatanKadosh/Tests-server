const { genericCreate, genericGet, genericUpdate } = require("./generiCRUD");
const { encryptPassword } = require("../../bcrypt");
const { roles, user_validator } = require("queezy-common");
const userModel = require("../models/user");

module.exports.findUserById = async (_id) => await genericGet(_id, userModel);

module.exports.findUserByEmail = async (email) =>
  await userModel.findOne({ email });

module.exports.createUser = async (user) =>
  await genericCreate(
    {
      ...user,
      password: await encryptPassword(user.password),
      role: roles.User,
    },
    user_validator,
    userModel
  );

module.exports.removeUser = async (_id) => await userModel.deleteOne({ _id });

module.exports.findAllUsers = async () => await userModel.find({});

module.exports.updateUser = async (_id) =>
  await genericUpdate(_id, {}, userModel);
