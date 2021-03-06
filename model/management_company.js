const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");

const ManagementCompanySchema = mongoose.Schema({
  managementCompany_area: {
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
    type: String,
    required: true,
  },
  managementCompany_name: {
    type: String,
    required: true,
  },

  managementCompany_email: {
    type: String,
    required: true,
  },
  managementCompany_MobileNumber: {
    type: String,
    required: true,
  },

  managementCompany_companyID: {
    type: String,
  },
  remark: {
    type: String,
  },
});

const ManagementCompany = mongoose.model(
  "managementCompany",
  ManagementCompanySchema
);

const CreateManagementCompanyValidator = (payload) => {
  const schema = Joi.object({
    managementCompany_area: Joi.string().required(),
    managementCompany_city: Joi.string().required(),
    managementCompany_country: Joi.string().required(),
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
      })
    ),
    remark: Joi.string(),

    managementCompany_phoneNo: Joi.string().required(),
    managementCompany_name: Joi.string().required(),
    managementCompany_email: Joi.string().required(),
    managementCompany_MobileNumber: Joi.string().required(),
    managementCompany_companyID: Joi.string(),
  });
  return schema.validate(payload);
};
const updateManagementCompanyValidator = (payload) => {
  const schema = Joi.object({
    managementCompany_area: Joi.string().required(),
    managementCompany_city: Joi.string().required(),
    managementCompany_country: Joi.string().required(),
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
        _id: Joi.string(),
      })
    ),
    remark: Joi.string(),

    managementCompany_phoneNo: Joi.string().required(),
    managementCompany_name: Joi.string().required(),
    managementCompany_email: Joi.string().required(),
    managementCompany_MobileNumber: Joi.string().required(),
    managementCompany_companyID: Joi.string(),
  });
  return schema.validate(payload);
};
module.exports = {
  ManagementCompany,
  CreateManagementCompanyValidator,
  updateManagementCompanyValidator,
};
