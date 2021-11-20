const genericGet = async (_id, mongoModel) => await mongoModel.findOne({ _id });

const genericUpdate = async (_id, updateFilter, mongoModel) =>
  await mongoModel.updateOne({ _id }, updateFilter);

const genericCreate = async (model_arguments, validator, mongoModel) => {
  await validator.validateAsync(model_arguments);
  return await (await new mongoModel(model_arguments)).save();
};

module.exports = { genericGet, genericUpdate, genericCreate };
