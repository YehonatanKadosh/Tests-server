const { userModel, user_validator } = require("../models/user");
const { genericCreate, genericGet, genericUpdate } = require("./generiCRUD");
const { encryptPassword } = require("../../bcrypt");
const { roles } = require("../enums");

const findUserById = async (_id) => await genericGet(_id, userModel);

const findUserByEmail = async (email) => await userModel.findOne({ email });

const createUser = async (user) =>
  await genericCreate(
    {
      ...user,
      password: await encryptPassword(user.password),
      role: roles.User,
    },
    user_validator,
    userModel
  );

const removeUser = async (_id) => await userModel.deleteOne({ _id });

const findAllUsers = async () => await userModel.find({});

const updateUser = async (_id) => await genericUpdate(_id, {}, userModel);

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  removeUser,
  findAllUsers,
  updateUser,
};
