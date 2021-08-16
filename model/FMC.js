const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid");
const myJoiObjectId = JoiObjectId(Joi);
const { object } = require("joi");

const FMCSchema = mongoose.Schema({

  property: {
    type: mongoose.Schema.ObjectId,
    ref: "Property",
  },
  management_Companies: {
    type: mongoose.Schema.ObjectId,
    ref: "managementCompany",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  quarter: {
    type: String
  },
  entry_date: {
    type: Date
  },
  remark: {
    type: String,
  },
  file1: {
    type: String,
  },
  file2: {
    type: String,
  },
  fmcInvoice_Date: {
    type: String,
  },
});


const FMC = mongoose.model("FMC", FMCSchema);

const createFMCValidator = (payload) => {
  const schema = Joi.object({


    property: myJoiObjectId(),
    management_Companies: myJoiObjectId(),
    totalAmount: Joi.number().required(),
    quarter: Joi.string().required(),
    entry_date: Joi.date().required(),
    remark: Joi.string(),
    file1: Joi.string(),
    file2: Joi.string(),
    fmcInvoice_Date: Joi.string(),
  });
  return schema.validate(payload);
};
const updateFMCValidator = (payload) => {
  const schema = Joi.object({

    property: myJoiObjectId(),
    quarter: Joi.string().required(),
    management_Companies: myJoiObjectId(),
    totalAmount: Joi.number().required(),
    entry_date: Joi.date().required(),
    remark: Joi.string(),
    file1: Joi.string(),
    file2: Joi.string(),
    fmcInvoice_Date: Joi.string(),

  });
  return schema.validate(payload);
};
module.exports = {
  FMC,
  createFMCValidator,
  updateFMCValidator
};
