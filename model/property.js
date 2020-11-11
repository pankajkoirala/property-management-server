const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");

const PropertySchema = mongoose.Schema({
  facilities: [
    {
      heading: { type: String },
      unit: { type: Number },
      remark: { type: String },
      facilitiesId: { type: String },
    },
  ],
  property_type: {
    type: String,
    required: true,
  },
  property_price: {
    type: Number,
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

  referenceNO: {
    type: Number,
  },
  property_community: {
    type: String,
    required: true,
  },
  building_Name: {
    type: String,
    required: true,
  },
  building_Number: {
    type: Number,
    required: true,
  },
  plot_Number: {
    type: Number,
    required: true,
  },
  building_floorNumber: {
    type: Number,
    required: true,
  },
  Muncipality_Number: {
    type: Number,
    required: true,
  },
  Property_Area: {
    type: Number,
    required: true,
  },
  Parking_Number: {
    type: Number,
    required: true,
  },
  Property_Premise_Number: {
    type: Number,
    required: true,
  },

  Title_Deed_Photo: {
    type: String,
    // required: true,
  },
  photo: {
    type: String,
    //required: true,
  },
});

const Property = mongoose.model("Property", PropertySchema);

const createPropertyValidator = (payload) => {
  const schema = Joi.object({
    facilities: Joi.array().items(
      Joi.object({
        heading: Joi.string(),
        unit: Joi.number(),
        remark: Joi.string(),

        facilitiesId: Joi.string(),
      })
    ),
    Parking_Number: Joi.number().required(),
    property_type: Joi.string().required(),
    property_price: Joi.number().required(),
    area: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    photo: Joi.string(),
    referenceNO: Joi.number(),
    property_community: Joi.string().required(),
    building_Name: Joi.string().required(),
    building_Number: Joi.number().required(),
    plot_Number: Joi.number().required(),
    building_floorNumber: Joi.number().required(),
    Property_Premise_Number: Joi.number().required(),
    Title_Deed_Photo: Joi.string(),
    Muncipality_Number: Joi.number().required(),
    Property_Area: Joi.number().required(),
  });

  return schema.validate(payload);
};
const updatePropertyValidator = (payload) => {
  const schema = Joi.object({
    facilities: Joi.array().items(
      Joi.object({
        heading: Joi.string(),
        unit: Joi.number(),
        remark: Joi.string(),

        facilitiesId: Joi.string(),
      })
    ),
    Parking_Number: Joi.number().required(),
    property_type: Joi.string().required(),
    property_price: Joi.number().required(),
    area: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    photo: Joi.string(),
    referenceNO: Joi.number(),
    property_community: Joi.string().required(),
    building_Name: Joi.string().required(),
    building_Number: Joi.number().required(),
    plot_Number: Joi.number().required(),
    building_floorNumber: Joi.number().required(),
    Property_Premise_Number: Joi.number().required(),
    Title_Deed_Photo: Joi.string(),
    Muncipality_Number: Joi.number().required(),
    Property_Area: Joi.number().required(),
  });
  return schema.validate(payload);
};
module.exports = {
  Property,
  createPropertyValidator,
  updatePropertyValidator,
};
