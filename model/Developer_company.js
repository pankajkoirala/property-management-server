const mongoose = require("mongoose");
const Joi = require("joi");

const DeveloperCompanySchema = mongoose.Schema({
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
    type: Number,
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
    type: Number,
    required: true,
  },

  DeveloperCompany_Name: {
    type: String,
    required: true,
  },

  DeveloperCompany_phoneNo: {
    type: Number,
    required: true,
  },
  DeveloperCompany_photo: {
    type: String,
    required: true,
  },
  DeveloperCompany_ID: {
    type: String,
  },
});

const DeveloperCompany = mongoose.model(
  "DeveloperCompany",
  DeveloperCompanySchema
);

const DeveloperCompanyCreate = (payload) => {
  const schema = Joi.object({
    Developer_area: Joi.string().required(),
    Developer_city: Joi.string().required(),
    Developer_country: Joi.string().required(),
    DeveloperCompany_photo: Joi.string().required(),
    DeveloperCompany_phoneNo: Joi.number().required(),
    DeveloperCompany_Name: Joi.string().required(),
    DeveloperCompany_RegisterationDate: Joi.date().required(),
    DeveloperCompany_email: Joi.string().required(),
    DeveloperCompany_MobileNumber: Joi.number().required(),
    DeveloperCompany_ID: Joi.string(),
    DeveloperCompany_RegisterationNumber: Joi.number().required(),
  });
  return schema.validate(payload);
};
const DeveloperCompanyValidator = (payload) => {
  const schema = Joi.object({
    Developer_area: Joi.string().required(),
    Developer_city: Joi.string().required(),
    Developer_country: Joi.string().required(),
    DeveloperCompany_photo: Joi.string().required(),
    DeveloperCompany_phoneNo: Joi.number().required(),
    DeveloperCompany_Name: Joi.string().required(),
    DeveloperCompany_RegisterationDate: Joi.date().required(),
    DeveloperCompany_email: Joi.string().required(),
    DeveloperCompany_MobileNumber: Joi.number().required(),
    DeveloperCompany_ID: Joi.string(),
    DeveloperCompany_RegisterationNumber: Joi.number().required(),
  });
  return schema.validate(payload);
};
module.exports = {
  DeveloperCompany,
  DeveloperCompanyValidator,
  DeveloperCompanyCreate,
};
