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

  managementCompany_photo: {
    type: String,
    required: true,
  },
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
    type: Number,
    required: true,
  },
  managementCompany_companyID: {
    type: Number,
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
    managementCompany_photo: Joi.string().required(),
    managementCompany_phoneNo: Joi.number().required(),
    managementCompany_Registeration_Number: Joi.number().required(),
    managementCompany_name: Joi.string().required(),
    managementCompany_Registeration_Date: Joi.date().required(),
    managementCompany_email: Joi.string().required(),
    managementCompany_MobileNumber: Joi.number().required(),
    managementCompany_companyID: Joi.number(),
  });
  return schema.validate(payload);
};
const updateManagementCompanyValidator = (payload) => {
  const schema = Joi.object({
    managementCompany_area: Joi.string().required(),
    managementCompany_city: Joi.string().required(),
    managementCompany_country: Joi.string().required(),
    managementCompany_photo: Joi.string().required(),
    managementCompany_phoneNo: Joi.number().required(),
    managementCompany_Registeration_Number: Joi.number().required(),
    managementCompany_name: Joi.string().required(),
    managementCompany_Registeration_Date: Joi.date().required(),
    managementCompany_email: Joi.string().required(),
    managementCompany_MobileNumber: Joi.number().required(),
    managementCompany_companyID: Joi.number(),
  });
  return schema.validate(payload);
};
module.exports = {
  ManagementCompany,
  CreateManagementCompanyValidator,
  updateManagementCompanyValidator,
};
