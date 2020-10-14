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
 
 
  street:{
    type:String,
    required:true
},
city: {
  type: String,
  required: true,
},
provience: {
  type: String,
  required: true,
},
country: {
  type: String,
  required: true,
},

ZipCode:{
  type: Number,
  required: true,
},
  tenant_photo: {
    type: String,
    required: true,
  },
  tenant_GovId:{
    type: String,
    required: true,
  } ,
  TenantId: {
    type: Number,
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
      tenant_photo: Joi.string(),
      tenant_GovId: Joi.string(),
      TenantId: Joi.number(),
      street:Joi.string().required(),
      city:Joi.string().required(),
      country:Joi.string().required(),
      provience:Joi.string().required(),
      ZipCode:Joi.string().required(),
    TenantId: Joi.number(),



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
      tenant_photo: Joi.string(),
      tenant_GovId: Joi.string(),

      street:Joi.string().required(),
      city:Joi.string().required(),
      country:Joi.string().required(),
      provience:Joi.string().required(),
      ZipCode:Joi.string().required()
  });
  return schema.validate(payload);
};
module.exports = {
  Tenant,
  createTenantValidator,
  updateTenantValidator
};


