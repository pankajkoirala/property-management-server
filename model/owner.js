const mongoose = require("mongoose");
const Joi = require("joi");
const { object, string } = require("joi");
const JoiObjectId = require("joi-objectid");
const myJoiObjectId = JoiObjectId(Joi);

const OwnerSchema = mongoose.Schema({
  allPhotos: [
    {
      photoName: { type: String },
      photo: { type: String },
    },
  ],
});

const Owner = mongoose.model("owner", OwnerSchema);

const CreateOwnerValidator = (payload) => {
  const schema = Joi.object({
    allPhotos: Joi.array().items(
      Joi.object({
        photoName: Joi.string(),
        photo: Joi.string(),
      })
    ),
  });
  return schema.validate(payload);
};
const updateOwnerValidator = (payload) => {
  const schema = Joi.object({
    allPhotos: Joi.array().items(
      Joi.object({
        photoName: Joi.string(),
        photo: Joi.string(),
      })
    ),
  });
  return schema.validate(payload);
};

module.exports = {
  Owner,
  updateOwnerValidator,
  CreateOwnerValidator,
};
