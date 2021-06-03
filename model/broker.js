const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");

const BrokerSchema = mongoose.Schema({
  files_list: [
    {
      fileName: { type: String },
      file: { type: String },
    },
  ],
  broker_phoneNo: {
    type: Number,
    required: true,
  },
  broker_RegistrationNumber: {
    type: String,
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
  brokerType: {
    type: String,
    required: true,
  },

  brokerId: {
    type: String,
  },
  remark: {
    type: String,
  },
});

const Broker = mongoose.model("broker", BrokerSchema);

const createBrokerValidator = (payload) => {
  const schema = Joi.object({
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
      })
    ),
    remark: Joi.string(),

    broker_phoneNo: Joi.number().required(),
    broker_RegistrationNumber: Joi.string().required(),
    broker_companyName: Joi.string().required(),
    broker_companyRegisterDate: Joi.date().required(),
    broker_email: Joi.string().required(),
    brokerId: Joi.string(),
    area: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    brokerType: Joi.string().required(),
  });
  return schema.validate(payload);
};
const updateBrokerValidator = (payload) => {
  const schema = Joi.object({
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
        _id: Joi.string(),
      })
    ),
    remark: Joi.string(),

    broker_phoneNo: Joi.number().required(),
    broker_RegistrationNumber: Joi.string().required(),
    broker_companyName: Joi.string().required(),
    broker_companyRegisterDate: Joi.date().required(),
    broker_email: Joi.string().required(),
    brokerId: Joi.string(),
    area: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    brokerType: Joi.string().required(),
  });

  return schema.validate(payload);
};
module.exports = {
  Broker,
  createBrokerValidator,
  updateBrokerValidator,
};
