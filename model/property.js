const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");

const PropertySchema = mongoose.Schema({
  property_type: {
    type: String,
    required: true,
  },
  property_price: {
    type: Number,
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

  bedroomArea: {
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
  NoOfbedroom: {
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
  //down
  Balcony_Area: {
    type: Number,
    required: true,
  },
  NoOfBalcony: {
    type: Number,
    required: true,
  },
  BalconyRemark: {
    type: String,
    required: true,
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
  Property_Premise_Number: {
    type: Number,
    required: true,
  },
  Parking_1: {
    type: String,
    required: true,
  },Parking_2: {
    type: String,
    required: true,
  },Parking_3: {
    type: String,
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
    property_type: Joi.string().required(),
    property_price: Joi.number().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    photo: Joi.string(),
    referenceNO: Joi.number(),
    Parking: Joi.string().required(),
    Swimming: Joi.string().required(),
    Smoking: Joi.string().required(),
    PetAllowed: Joi.string().required(),
    Garden: Joi.string().required(),
    kitchenRemark: Joi.string().required(),
    bedroomRemark: Joi.string().required(),
    hallRemark: Joi.string().required(),
    bathroomRemark: Joi.string().required(),
    bedroomArea: Joi.number().required(),
    kitchenArea: Joi.number().required(),
    hallArea: Joi.number().required(),
    bathroomArea: Joi.number().required(),
    NoOfBathroom: Joi.number().required(),
    NoOfHall: Joi.number().required(),
    NoOfKitchen: Joi.number().required(),
    NoOfbedroom: Joi.number().required(),
    Balcony_Area: Joi.number().required(),
    NoOfBalcony: Joi.number().required(),
    BalconyRemark: Joi.string().required(),
    property_community: Joi.string().required(),
    building_Name: Joi.string().required(),
    building_Number: Joi.number().required(),
    plot_Number: Joi.number().required(),
    building_floorNumber: Joi.number().required(),
    Property_Premise_Number: Joi.number().required(),
    Title_Deed_Photo: Joi.string(),
    Muncipality_Number: Joi.number().required(),
    Property_Area: Joi.number().required(),
    Parking_1: Joi.string().required(),
    Parking_2: Joi.string().required(),
    Parking_3: Joi.string().required(),


  });
  

  return schema.validate(payload);
};
const updatePropertyValidator = (payload) => {
  const schema = Joi.object({
    property_type: Joi.string().required(),
    property_price: Joi.number().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    referenceNO: Joi.number(),
    Parking: Joi.string().required(),
    Swimming: Joi.string().required(),
    Smoking: Joi.string().required(),
    PetAllowed: Joi.string().required(),
    Garden: Joi.string().required(),
    kitchenRemark: Joi.string().required(),
    bedroomRemark: Joi.string().required(),
    hallRemark: Joi.string().required(),
    bathroomRemark: Joi.string().required(),
    bedroomArea: Joi.number().required(),
    kitchenArea: Joi.number().required(),
    hallArea: Joi.number().required(),
    bathroomArea: Joi.number().required(),
    NoOfBathroom: Joi.number().required(),
    NoOfHall: Joi.number().required(),
    NoOfKitchen: Joi.number().required(),
    NoOfbedroom: Joi.number().required(),
    Balcony_Area: Joi.number().required(),
    NoOfBalcony: Joi.number().required(),
    BalconyRemark: Joi.string().required(),
    property_community: Joi.string().required(),
    building_Name: Joi.string().required(),
    building_Number: Joi.number().required(),
    plot_Number: Joi.number().required(),
    building_floorNumber: Joi.number().required(),
    Property_Premise_Number: Joi.number().required(),
    Muncipality_Number: Joi.number().required(),
    Property_Area: Joi.number().required(),
    Title_Deed_Photo: Joi.string(),
    photo: Joi.string(),
    Parking_1: Joi.string().required(),
    Parking_2: Joi.string().required(),
    Parking_3: Joi.string().required(),
  });
  return schema.validate(payload);
};
module.exports = {
  Property,
  createPropertyValidator,
  updatePropertyValidator,
};
