module.exports.genericGet = async (_id, mongoModel) =>
  await mongoModel.findOne({ _id });

module.exports.genericUpdate = async (_id, updateFilter, mongoModel) =>
  await mongoModel.updateOne({ _id }, updateFilter);

module.exports.genericCreate = async (
  model_arguments,
  validator,
  mongoModel
) => {
  await validator.validate(model_arguments);
  return await (await new mongoModel(model_arguments)).save();
};
