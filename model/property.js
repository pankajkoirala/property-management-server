const mongoose = require("mongoose");
const Joi = require("joi");


const PropertySchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  cost:{
      type:Number,
      required:true
  },
  size: {
    type: Number,
    required: true,
  },
  NoOfRoom: {
    type: Number,
    required: true,
  },
  NoOfToilet: {
    type: Number,
    required: true,
  },
 
  condition: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const Property = mongoose.model("Property", PropertySchema);

const createPropertyValidator = payload => {
  const  schema = Joi.object({
    type: Joi.string().required(),
    cost:Joi.number().required(),
    size: Joi.number()
      .required(),
      NoOfRoom: Joi.number().required(),
      NoOfToilet: Joi.number().required(),
      condition: Joi.string().required(),
      photo:  Joi.string(),

  });
  return schema.validate(payload)
};
const updatePropertyValidator = payload => {
  const schema = Joi.object({
    type: Joi.string().required(),
    cost:Joi.number().required(),
    size: Joi.number()
      .required(),
      NoOfRoom: Joi.number().required(),
      NoOfToilet: Joi.number().required(),
      condition: Joi.string().required(),
      photo:  Joi.string(),
  });
  return schema.validate(payload);
};
module.exports = {
  Property,
  createPropertyValidator,
  updatePropertyValidator
};