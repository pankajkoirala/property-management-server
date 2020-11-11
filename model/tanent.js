const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");

const TenantSchema = mongoose.Schema({
  tenant_phoneNo: {
    type: Number,
    required: true,
  },
  tenant_Name: {
    type: String,
    required: true,
  },

  company_Name: {
    type: String,
    required: true,
  },
  tenant_email: {
    type: String,
    required: true,
  },

  area: {
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

  tenant_photo: {
    type: String,
    required: true,
  },
  tenant_EId_photo: {
    type: String,
    required: true,
  },
  TenantId: {
    type: Number,
  },
  DateOfBirth_registrationDate: {
    type: Date,
    required: true,
  },
  tenant_GovIdNo: {
    type: Number,
    required: true,
  },
  tenant_DrivingLicenceNo: {
    type: Number,
    required: true,
  },
  tenant_TradeLicense_photo: {
    type: String,
    required: true,
  },
  tenant_IdentityLetter_photo: {
    type: String,
    required: true,
  },
  tenant_SK_Properties_photo: {
    type: String,
    required: true,
  },
  tenant_POA_photo: {
    type: String,
    required: true,
  },
});

const Tenant = mongoose.model("Tenant", TenantSchema);

const createTenantValidator = (payload) => {
  const schema = Joi.object({
    tenant_Name: Joi.string().required(),
    company_Name: Joi.string().required(),
    tenant_email: Joi.string().required(),
    tenant_phoneNo: Joi.number().required(),
    area: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),

    DateOfBirth_registrationDate: Joi.date().required(),
    tenant_GovIdNo: Joi.number().required(),
    tenant_DrivingLicenceNo: Joi.number().required(),
    tenant_photo: Joi.string(),
    tenant_TradeLicense_photo: Joi.string(),
    tenant_EId_photo: Joi.string(),
    tenant_IdentityLetter_photo: Joi.string(),
    tenant_SK_Properties_photo: Joi.string(),
    tenant_POA_photo: Joi.string(),
    TenantId: Joi.number(),
  });
  return schema.validate(payload);
};
const updateTenantValidator = (payload) => {
  const schema = Joi.object({
    tenant_Name: Joi.string().required(),
    company_Name: Joi.string().required(),
    tenant_email: Joi.string().required(),
    tenant_phoneNo: Joi.number().required(),
    area: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),

    DateOfBirth_registrationDate: Joi.date().required(),
    tenant_GovIdNo: Joi.number().required(),
    tenant_DrivingLicenceNo: Joi.number().required(),
    tenant_photo: Joi.string(),
    tenant_TradeLicense_photo: Joi.string(),
    tenant_EId_photo: Joi.string(),
    tenant_IdentityLetter_photo: Joi.string(),
    tenant_SK_Properties_photo: Joi.string(),
    tenant_POA_photo: Joi.string(),
    TenantId: Joi.number(),
  });
  return schema.validate(payload);
};
module.exports = {
  Tenant,
  createTenantValidator,
  updateTenantValidator,
};
