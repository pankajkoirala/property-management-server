const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");
const JoiObjectId = require("joi-objectid");
const myJoiObjectId = JoiObjectId(Joi);

const ChequeInfoSchema = mongoose.Schema({
  chequeUpdate_date: {
    type: Date,
    required: true,
  },

  chequeUpdate: {
    type: String,
    required: true,
  },
  chequeUpdate_remarks: {
    type: String,
    required: true,
  },
});

const ChequeInfo = mongoose.model("Chequeinfo", ChequeInfoSchema);

const CreateChequeInfoValidator = (payload) => {
  const schema = Joi.object({
    chequeUpdate_remarks: Joi.string().required(),
    chequeUpdate: Joi.string().required(),
    chequeUpdate_date: Joi.date().required(),
  });
  return schema.validate(payload);
};

module.exports = {
  ChequeInfo,
  CreateChequeInfoValidator,
};
