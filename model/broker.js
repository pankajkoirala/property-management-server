const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");

const BrokerSchema = mongoose.Schema({
    broker_phoneNo: {
    type: Number,
    required: true,
  },
  broker_RegistrationNumber: {
    type: Number,
    required: true,
  },
  broker_companyName: {
    type: String,
    required: true,
  },
  broker_companyRegisterDate: {
    type: Date,
    required: true,
  },
  broker_email: {
    type: String,
    required: true,
  },

  street: {
    type: String,
    required: true,
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

  ZipCode: {
    type: Number,
    required: true,
  },
  broker_photo: {
    type: String,
    required: true,
  },
  brokerId: {
    type: Number,
  },
 

});

const Broker = mongoose.model("broker", BrokerSchema);

const createBrokerValidator = (payload) => {
  const schema = Joi.object({
    broker_phoneNo: Joi.number().required(),
    broker_RegistrationNumber: Joi.number().required(),
    broker_companyName: Joi.string().required(),
    broker_companyRegisterDate: Joi.date().required(),
    broker_email: Joi.string().required(),
    brokerId: Joi.number(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    provience: Joi.string().required(),
    ZipCode: Joi.string().required(),
    broker_photo: Joi.string(),




  });
  return schema.validate(payload);
};
const updateBrokerValidator = (payload) => {
  const schema = Joi.object({
    broker_phoneNo: Joi.number().required(),
    broker_RegistrationNumber: Joi.number().required(),
    broker_companyName: Joi.string().required(),
    broker_companyRegisterDate: Joi.date().required(),
    broker_email: Joi.string().required(),
    brokerId: Joi.number(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    provience: Joi.string().required(),
    ZipCode: Joi.string().required(),
    broker_photo: Joi.string(),
  });
  return schema.validate(payload);
};
module.exports = {
    Broker,
    createBrokerValidator,
  updateBrokerValidator,
};
