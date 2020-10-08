const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");


const TenantSchema = mongoose.Schema({
  tenant_phoneNo: {
    type: Number,
    required: true,
  },
  tenant_firstName:{
      type:String,
      required:true
  },
  tenant_middleName: {
    type: String,
    required: true,
  },
  tenant_lastName: {
    type: String,
    required: true,
  },
  tenant_email: {
    type: String,
    required: true,
  },
 
  address: {
    type: Object,
 
  },
  tenant_photo: {
    type: String,
    required: true,
  },
});

const Tenant = mongoose.model("Tenant", TenantSchema);

const createTenantValidator = payload => {
  const  schema = Joi.object({
    tenant_phoneNo: Joi.number().required(),
    tenant_firstName:Joi.string().required(),
    tenant_middleName: Joi.string()
      .required(),
      tenant_email:Joi.string().required(),
      tenant_lastName: Joi.string().required(),
      address: Joi.object(),
      tenant_photo: Joi.string()

  });
  return schema.validate(payload)
};
const updateTenantValidator = payload => {
  const schema = Joi.object({
    tenant_phoneNo: Joi.number().required(),
    tenant_firstName:Joi.string().required(),
    tenant_middleName: Joi.string()
      .required(),
      tenant_email:Joi.string().required(),

      tenant_lastName: Joi.string().required(),
      address: Joi.object(),
      tenant_photo: Joi.string()
  });
  return schema.validate(payload);
};
module.exports = {
  Tenant,
  createTenantValidator,
  updateTenantValidator
};