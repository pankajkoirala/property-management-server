const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid");
const myJoiObjectId = JoiObjectId(Joi);
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
  files_list: [
    {
      fileName: { type: String },
      file: { type: String },
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
    type: String,
  },
  property_community: {
    type: String,
    required: true,
  },
  plot_no: {
    type: String,
    required: true,
  },
  building_Number: {
    type: String,
    required: true,
  },

  building_floorNumber: {
    type: String,
    required: true,
  },
  Makani_Number: {
    type: String,
  },
  Property_Area: {
    type: Number,
    required: true,
  },

  Property_Premise_Number: {
    type: String,
    required: true,
  },
  Property_ownerName: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Owner",
    },
  ],
  developerCompany: {
    type: mongoose.Schema.ObjectId,
    ref: "DeveloperCompany",
  },
  managementCompany: {
    type: mongoose.Schema.ObjectId,
    ref: "managementCompany",
  },
  unitNo: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
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
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
      })
    ),
    Property_ownerName: Joi.array().items(myJoiObjectId()),
    property_type: Joi.string().required(),
    property_price: Joi.number().required(),
    area: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    referenceNO: Joi.string(),
    property_community: Joi.string().required(),
    plot_no: Joi.string().required(),
    building_Number: Joi.string().required(),
    building_floorNumber: Joi.string().required(),
    Property_Premise_Number: Joi.string().required(),
    Makani_Number: Joi.string(),
    Property_Area: Joi.number().required(),
    developerCompany: myJoiObjectId(),
    managementCompany: myJoiObjectId(),
    unitNo:Joi.string().required(),
    remark: Joi.string(),

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
        _id: Joi.string(),
      })
    ),
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
        _id: Joi.string(),
      })
    ),
    Property_ownerName: Joi.array().items(myJoiObjectId()),
    property_type: Joi.string().required(),
    property_price: Joi.number().required(),
    area: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    referenceNO: Joi.string(),
    property_community: Joi.string().required(),
    plot_no: Joi.string().required(),
    building_Number: Joi.string().required(),
    building_floorNumber: Joi.string().required(),
    Property_Premise_Number: Joi.string().required(),
    Makani_Number: Joi.string(),
    Property_Area: Joi.number().required(),
    developerCompany: myJoiObjectId(),
    managementCompany: myJoiObjectId(),
    unitNo:Joi.string().required(),
    remark: Joi.string(),

  });
  return schema.validate(payload);
};
module.exports = {
  Property,
  createPropertyValidator,
  updatePropertyValidator,
};
