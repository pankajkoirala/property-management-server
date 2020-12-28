const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");

const TenantSchema = mongoose.Schema({
  files_list: [
    {
      fileName: { type: String },
      file: { type: String },
    },
  ],
  tenant_phoneNo: {
    type: Number,
    required: true,
  },
  tenant_Name: {
    type: String,
    required: true,
  },

  TenentType: {
    type: String,
    required: true,
  },
  tenant_email: {
    type: String,
    required: true,
  },

  residence: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  TenantId: {
    type: String,
  },
  DateOfBirth_registrationDate: {
    type: Date,
    required: true,
  },
  tenant_GovIdNo: {
    type: String,
    required: true,
  },
  tenant_GovIdNo_expireDate: {
    type: Date,
    required: true,
  },
  tenant_passport_expireDate: {
    type: String,
  },
  tenant_passportNo: {
    type: String,
  },
  tenant_visaNo: {
    type: String,
  },
  tenant_visa_expireDate: {
    type: String,
  },
});

const Tenant = mongoose.model("Tenant", TenantSchema);

const createTenantValidator = (payload) => {
  const schema = Joi.object({
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
      })
    ),
    tenant_Name: Joi.string().required(),
    TenentType: Joi.string().required(),
    tenant_email: Joi.string().required(),
    tenant_phoneNo: Joi.number().required(),
    residence: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    DateOfBirth_registrationDate: Joi.date().required(),
    tenant_GovIdNo: Joi.number().required(),
    TenantId: Joi.string(),

    tenant_GovIdNo_expireDate: Joi.date().required(),
    tenant_passport_expireDate: Joi.string(),
    tenant_passportNo: Joi.string(),
    tenant_visaNo: Joi.string(),
    tenant_visa_expireDate: Joi.string(),
  });
  return schema.validate(payload);
};
const updateTenantValidator = (payload) => {
  const schema = Joi.object({
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
        _id: Joi.string(),
      })
    ),
    tenant_Name: Joi.string().required(),
    TenentType: Joi.string().required(),
    tenant_email: Joi.string().required(),
    tenant_phoneNo: Joi.number().required(),
    residence: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    DateOfBirth_registrationDate: Joi.date().required(),
    tenant_GovIdNo: Joi.number().required(),
    TenantId: Joi.string(),
    tenant_GovIdNo_expireDate: Joi.date().required(),
    tenant_passport_expireDate: Joi.string(),
    tenant_passportNo: Joi.string(),
    tenant_visaNo: Joi.string(),
    tenant_visa_expireDate: Joi.string(),
  });
  return schema.validate(payload);
};
module.exports = {
  Tenant,
  createTenantValidator,
  updateTenantValidator,
};
