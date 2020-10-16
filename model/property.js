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
 
  bedromArea: {
    type: Number,
    required: true,
  },
  kitchenArea: {
    type: Number,
    required: true,
  },
  hallArea: {
    type: Number,
    required: true,
  },
  bathroomArea: {
    type: Number,
    required: true,
  },
  referenceNO: {
    type: Number,
  },
  NoOfBathroom: {
    type: Number,
    required: true,
  },
  NoOfHall: {
    type: Number,
    required: true,
  },
  NoOfKitchen: {
    type: Number,
    required: true,
  },
  NoOfbedrom: {
    type: Number,
    required: true,
  },
  bathroomRemark: {
    type: String,
    required: true,
  },
  hallRemark: {
    type: String,
    required: true,
  },
  bedroomRemark: {
    type: String,
    required: true,
  },
  kitchenRemark: {
    type: String,
    required: true,
  },
  Parking: {
    type: String,
    required: true,
  },
  Swimming: {
    type: String,
    required: true,
  },
  Balcony: {
    type: String,
    required: true,
  },
  Smoking: {
    type: String,
    required: true,
  },
  PetAllowed: {
    type: String,
    required: true,
  },
  Garden: {
    type: String,
    required: true,
  },
});




const Property = mongoose.model("Property", PropertySchema);

const createPropertyValidator = (payload) => {
  const schema = Joi.object({
    property_type: Joi.string().required(),
    property_price: Joi.number().required(),
    property_status: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    photo: Joi.string(),
    referenceNO: Joi.number(),
    Parking: Joi.string().required(),
    Swimming: Joi.string().required(),
    Balcony: Joi.string().required(),
    Smoking: Joi.string().required(),
    PetAllowed: Joi.string().required(),
    Garden: Joi.string().required(),
    kitchenRemark: Joi.string().required(),
    bedroomRemark: Joi.string().required(),
    hallRemark: Joi.string().required(),
    bathroomRemark: Joi.string().required(),
    bedromArea: Joi.number().required(),
    kitchenArea: Joi.number().required(),
    hallArea: Joi.number().required(),
    bathroomArea: Joi.number().required(),
    NoOfBathroom: Joi.number().required(),
    NoOfHall: Joi.number().required(),
    NoOfKitchen: Joi.number().required(),
    NoOfbedrom: Joi.number().required(),

  });
  return schema.validate(payload);
};
const updatePropertyValidator = (payload) => {
  const schema = Joi.object({
    property_type: Joi.string().required(),
    property_price: Joi.number().required(),
    property_status: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    photo: Joi.string(),
    referenceNO: Joi.number(),
    Parking: Joi.string().required(),
    Swimming: Joi.string().required(),
    Balcony: Joi.string().required(),
    Smoking: Joi.string().required(),
    PetAllowed: Joi.string().required(),
    Garden: Joi.string().required(),
    kitchenRemark: Joi.string().required(),
    bedroomRemark: Joi.string().required(),
    hallRemark: Joi.string().required(),
    bathroomRemark: Joi.string().required(),
    bedromArea: Joi.number().required(),
    kitchenArea: Joi.number().required(),
    hallArea: Joi.number().required(),
    bathroomArea: Joi.number().required(),
    NoOfBathroom: Joi.number().required(),
    NoOfHall: Joi.number().required(),
    NoOfKitchen: Joi.number().required(),
    NoOfbedrom: Joi.number().required(),
  });
  return schema.validate(payload);
};
module.exports = {
  Property,
  createPropertyValidator,
  updatePropertyValidator,
};
