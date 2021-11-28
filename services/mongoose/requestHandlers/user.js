import { genericCreate, genericGet, genericUpdate } from "./generiCRUD.js";
import { encryptPassword } from "../../bcrypt.js";
import { userModel, user_validator, roles } from "queezy-common";

export const findUserById = async (_id) => await genericGet(_id, userModel);

export const findUserByEmail = async (email) =>
  await userModel.findOne({ email });

export const createUser = async (user) =>
  await genericCreate(
    {
      ...user,
      password: await encryptPassword(user.password),
      role: roles.User,
    },
    user_validator,
    userModel
  );

export const removeUser = async (_id) => await userModel.deleteOne({ _id });

export const findAllUsers = async () => await userModel.find({});

export const updateUser = async (_id) =>
  await genericUpdate(_id, {}, userModel);
