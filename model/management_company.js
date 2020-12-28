const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");

const ManagementCompanySchema = mongoose.Schema({
  managementCompany_residence: {
    type: String,
    required: true,
  },
  managementCompany_city: {
    type: String,
    required: true,
  },

  managementCompany_country: {
    type: String,
    required: true,
  },

  files_list: [
    {
      fileName: { type: String },
      file: { type: String },
    },
  ],
  managementCompany_phoneNo: {
    type: Number,
    required: true,
  },
  managementCompany_name: {
    type: String,
    required: true,
  },

  managementCompany_Registeration_Date: {
    type: Date,
    required: true,
  },
  managementCompany_email: {
    type: String,
    required: true,
  },
  managementCompany_MobileNumber: {
    type: Number,
    required: true,
  },
  managementCompany_Registeration_Number: {
    type: String,
    required: true,
  },
  managementCompany_companyID: {
    type: String,
  },
});

const ManagementCompany = mongoose.model(
  "managementCompany",
  ManagementCompanySchema
);

const CreateManagementCompanyValidator = (payload) => {
  const schema = Joi.object({
    managementCompany_residence: Joi.string().required(),
    managementCompany_city: Joi.string().required(),
    managementCompany_country: Joi.string().required(),
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
      })
    ),
    managementCompany_phoneNo: Joi.number().required(),
    managementCompany_Registeration_Number: Joi.string().required(),
    managementCompany_name: Joi.string().required(),
    managementCompany_Registeration_Date: Joi.date().required(),
    managementCompany_email: Joi.string().required(),
    managementCompany_MobileNumber: Joi.number().required(),
    managementCompany_companyID: Joi.string(),
  });
  return schema.validate(payload);
};
const updateManagementCompanyValidator = (payload) => {
  const schema = Joi.object({
    managementCompany_residence: Joi.string().required(),
    managementCompany_city: Joi.string().required(),
    managementCompany_country: Joi.string().required(),
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
        _id: Joi.string(),
      })
    ),
    managementCompany_phoneNo: Joi.number().required(),
    managementCompany_Registeration_Number: Joi.string().required(),
    managementCompany_name: Joi.string().required(),
    managementCompany_Registeration_Date: Joi.date().required(),
    managementCompany_email: Joi.string().required(),
    managementCompany_MobileNumber: Joi.number().required(),
    managementCompany_companyID: Joi.string(),
  });
  return schema.validate(payload);
};
module.exports = {
  ManagementCompany,
  CreateManagementCompanyValidator,
  updateManagementCompanyValidator,
};
