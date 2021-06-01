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
  },
  tenant_Name: {
    type: String,
  },

  TenentType: {
    type: String,
  },
  tenant_email: {
    type: String,
  },

  area: {
    type: String,
  },
  city: {
    type: String,
  },

  country: {
    type: String,
  },

  TenantId: {
    type: String,
  },
  DateOfBirth_registrationDate: {
    type: Date,
  },
  tenant_GovIdNo: {
    type: String,
  },
  tenant_GovIdNo_expireDate: {
    type: Date,
  },
  tenant_passport_expireDate: {
    type: Date,
  },
  tenant_passportNo: {
    type: String,
  },
  tenant_visaNo: {
    type: String,
  },
  tenant_visa_expireDate: {
    type: Date,
  },
  tenant_companyName: {
    type: String,
  },
  tenant_companyAuthorizePerson: {
    type: String,
  },
  tenant_companyIssuingDate: {
    type: Date,
  },
  tenant_companyExpireDate: {
    type: Date,
  },
  tenant_companyAuthorizePersonDesignation: {
    type: String,
  },
  tenant_companyTradeLicenseNo: {
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
    tenant_Name: Joi.string(),
    TenentType: Joi.string(),
    tenant_email: Joi.string(),
    tenant_phoneNo: Joi.number(),
    area: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    DateOfBirth_registrationDate: Joi.date(),
    tenant_GovIdNo: Joi.number(),
    TenantId: Joi.string(),

    tenant_GovIdNo_expireDate: Joi.date(),
    tenant_passport_expireDate: Joi.string(),
    tenant_passportNo: Joi.string(),
    tenant_visaNo: Joi.string(),
    tenant_visa_expireDate: Joi.string(),
    tenant_companyName: Joi.string(),
    tenant_companyAuthorizePerson: Joi.string(),
    tenant_companyIssuingDate: Joi.date(),
    tenant_companyExpireDate: Joi.date(),
    tenant_companyAuthorizePersonDesignation: Joi.string(),
    tenant_companyTradeLicenseNo: Joi.string(),
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
    tenant_Name: Joi.string(),
    TenentType: Joi.string(),
    tenant_email: Joi.string(),
    tenant_phoneNo: Joi.number(),
    area: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    DateOfBirth_registrationDate: Joi.date(),
    tenant_GovIdNo: Joi.number(),
    TenantId: Joi.string(),
    tenant_GovIdNo_expireDate: Joi.date(),
    tenant_passport_expireDate: Joi.string(),
    tenant_passportNo: Joi.string(),
    tenant_visaNo: Joi.string(),
    tenant_visa_expireDate: Joi.string(),
    tenant_companyName: Joi.string(),
    tenant_companyAuthorizePerson: Joi.string(),
    tenant_companyIssuingDate: Joi.date(),
    tenant_companyExpireDate: Joi.date(),
    tenant_companyAuthorizePersonDesignation: Joi.string(),
    tenant_companyTradeLicenseNo: Joi.string(),
  });
  return schema.validate(payload);
};
module.exports = {
  Tenant,
  createTenantValidator,
  updateTenantValidator,
};
