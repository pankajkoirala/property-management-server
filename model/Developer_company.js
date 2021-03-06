const mongoose = require("mongoose");
const Joi = require("joi");

const DeveloperCompanySchema = mongoose.Schema({
  files_list: [
    {
      fileName: { type: String },
      file: { type: String },
    },
  ],
  Developer_country: {
    type: String,
    required: true,
  },

  Developer_area: {
    type: String,
    required: true,
  },
  Developer_city: {
    type: String,
    required: true,
  },

  DeveloperCompany_MobileNumber: {
    type: String,
    required: true,
  },
  DeveloperCompany_email: {
    type: String,
    required: true,
  },

  DeveloperCompany_RegisterationDate: {
    type: Date,
    required: true,
  },
  DeveloperCompany_RegisterationNumber: {
    type: String,
    required: true,
  },

  DeveloperCompany_Name: {
    type: String,
    required: true,
  },

  DeveloperCompany_phoneNo: {
    type: String,
    required: true,
  },

  DeveloperCompany_ID: {
    type: String,
  },
  remark: {
    type: String,
  },
});

const DeveloperCompany = mongoose.model(
  "DeveloperCompany",
  DeveloperCompanySchema
);

const DeveloperCompanyCreate = (payload) => {
  const schema = Joi.object({
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
      })
    ),
    remark: Joi.string(),

    Developer_area: Joi.string().required(),
    Developer_city: Joi.string().required(),
    Developer_country: Joi.string().required(),
    DeveloperCompany_phoneNo: Joi.string().required(),
    DeveloperCompany_Name: Joi.string().required(),
    DeveloperCompany_RegisterationDate: Joi.date().required(),
    DeveloperCompany_email: Joi.string().required(),
    DeveloperCompany_MobileNumber: Joi.string().required(),
    DeveloperCompany_ID: Joi.string(),
    DeveloperCompany_RegisterationNumber: Joi.string().required(),
  });
  return schema.validate(payload);
};
const DeveloperCompanyValidator = (payload) => {
  const schema = Joi.object({
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
        _id: Joi.string(),
      })
    ),
    remark: Joi.string(),

    Developer_area: Joi.string().required(),
    Developer_city: Joi.string().required(),
    Developer_country: Joi.string().required(),
    DeveloperCompany_phoneNo: Joi.string().required(),
    DeveloperCompany_Name: Joi.string().required(),
    DeveloperCompany_RegisterationDate: Joi.date().required(),
    DeveloperCompany_email: Joi.string().required(),
    DeveloperCompany_MobileNumber: Joi.string().required(),
    DeveloperCompany_ID: Joi.string(),
    DeveloperCompany_RegisterationNumber: Joi.string().required(),
  });
  return schema.validate(payload);
};
module.exports = {
  DeveloperCompany,
  DeveloperCompanyValidator,
  DeveloperCompanyCreate,
};
