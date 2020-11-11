const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid");
const myJoiObjectId = JoiObjectId(Joi);
const { object } = require("joi");

const ImageUploadSchema = mongoose.Schema({
  image: {
    type: String,
  },
});

const imageUpload = mongoose.model("imageUpload", ImageUploadSchema);

const createImageUploadValidator = (payload) => {
  const schema = Joi.object({
    image: Joi.string(),
  });
  return schema.validate(payload);
};
const updateChequeValidator = (payload) => {
  const schema = Joi.object({
    cheque_number: Joi.number().required(),
    cheque_amount: Joi.number().required(),
    cheque_status: Joi.string().required(),
    cheque_issueDate: Joi.date().required(),
    cheque_entryDate: Joi.date().required(),
    cheque_remarks: Joi.string().required(),
    cheque_picture: Joi.string().required(),
    cheque_bankName: Joi.string().required(),
    lease_property: myJoiObjectId(),
  });
  return schema.validate(payload);
};
module.exports = {
  imageUpload,
  updateChequeValidator,
  createImageUploadValidator,
};
