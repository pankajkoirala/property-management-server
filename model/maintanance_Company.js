const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");

const MaintananceCompanySchema = mongoose.Schema({
  Company_area: {
    type: String,
    required: true,
  },
  Company_city: {
    type: String,
    required: true,
  },

  Company_country: {
    type: String,
    required: true,
  },

  Company_uploadPhoto: {
    type: String,
    required: true,
  },
  Company_phoneNo: {
    type: Number,
    required: true,
  },
  Company_Registration_Number: {
    type: Number,
    required: true,
  },
  Company_Name: {
    type: String,
    required: true,
  },

  Company_Registeration_Date: {
    type: Date,
    required: true,
  },
  Company_email: {
    type: String,
    required: true,
  },
  Company_Mobile_Number: {
    type: Number,
    required: true,
  },
  Company_ID: {
    type: Number,
  },
});

const MaintananceCompany = mongoose.model(
  "maintananceCompany",
  MaintananceCompanySchema
);

const CreateMaintananceCompanyValidator = (payload) => {
  const schema = Joi.object({
    Company_email: Joi.string().required(),
    Company_Name: Joi.string().required(),
    Company_Mobile_Number: Joi.number().required(),
    Company_Registeration_Date: Joi.date().required(),
    Company_Registration_Number: Joi.number().required(),
    Company_phoneNo: Joi.number().required(),
    Company_uploadPhoto: Joi.string().required(),
    Company_country: Joi.string().required(),
    Company_city: Joi.string().required(),
    Company_area: Joi.string().required(),
    Company_ID: Joi.number(),
  });
  return schema.validate(payload);
};
const updateMaintananceCompanyValidator = (payload) => {
  const schema = Joi.object({
    Company_email: Joi.string().required(),
    Company_Name: Joi.string().required(),
    Company_Mobile_Number: Joi.number().required(),
    Company_Registeration_Date: Joi.date().required(),
    Company_Registration_Number: Joi.number().required(),
    Company_phoneNo: Joi.number().required(),
    Company_uploadPhoto: Joi.string().required(),
    Company_country: Joi.string().required(),
    Company_city: Joi.string().required(),
    Company_area: Joi.string().required(),
    Company_ID: Joi.number(),
  });
  return schema.validate(payload);
};
module.exports = {
  MaintananceCompany,
  CreateMaintananceCompanyValidator,
  updateMaintananceCompanyValidator,
};
