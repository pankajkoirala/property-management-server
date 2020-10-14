const mongoose = require("mongoose");
const Joi = require("joi");
const { string } = require("joi");

const PropertySchema = mongoose.Schema({
  property_type: {
    type: String,
    required: true,
  },
  property_price: {
    type: Number,
    required: true,
  },
  property_status: {
    type: String,
    required: true,
  },
  BHK: {
    type: String,
    required: true,
  },
  toilet: {
    type: Number,
    required: true,
  },

  photo: {
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
  country: {
    type: String,
    required: true,
  },
  referenceNO: {
    type: Number,
  },
});

const Property = mongoose.model("Property", PropertySchema);

const createPropertyValidator = (payload) => {
  const schema = Joi.object({
    property_type: Joi.string().required(),
    property_price: Joi.number().required(),
    property_status: Joi.string().required(),
    BHK: Joi.string().required(),
    toilet: Joi.number().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    photo: Joi.string(),
    referenceNO: Joi.number(),
  });
  return schema.validate(payload);
};
const updatePropertyValidator = (payload) => {
  const schema = Joi.object({
    property_type: Joi.string().required(),
    property_price: Joi.number().required(),
    property_status: Joi.string().required(),
    BHK: Joi.string().required(),
    toilet: Joi.number().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    photo: Joi.string(),
    referenceNO: Joi.number(),

  });
  return schema.validate(payload);
};
module.exports = {
  Property,
  createPropertyValidator,
  updatePropertyValidator,
};
