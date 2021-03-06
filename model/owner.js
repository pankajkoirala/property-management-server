const mongoose = require("mongoose");
const Joi = require("joi");
const { object, string } = require("joi");
const JoiObjectId = require("joi-objectid");
const myJoiObjectId = JoiObjectId(Joi);

const OwnerSchema = mongoose.Schema({
  owner_area: {
    type: String,
    required: true,
  },
  owner_city: {
    type: String,
    required: true,
  },

  owner_country: {
    type: String,
    required: true,
  },
  owner_DOB: {
    type: Date,
    required: true,
  },

  files_list: [
    {
      fileName: { type: String },
      file: { type: String },
    },
  ],
  owner_phoneNo: {
    type: String,
    required: true,
  },

  owner_Name: {
    type: String,
    required: true,
  },

  owner_Type: {
    type: String,
  },
  owner_GovID_RegNo: {
    type: String,
    required: true,
  },
  owner_email: {
    type: String,
    required: true,
  },
  // owner_property: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Property",
  // },
  owner_ID: {
    type: String,
  },
  remark: {
    type: String,
  },
});

const Owner = mongoose.model("Owner", OwnerSchema);

const CreateOwnerValidator = (payload) => {
  const schema = Joi.object({
    owner_area: Joi.string().required(),
    owner_city: Joi.string().required(),
    owner_country: Joi.string().required(),
    owner_DOB: Joi.date().required(),
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
      })
    ),
    remark: Joi.string(),

    owner_phoneNo: Joi.string().required(),
    owner_Name: Joi.string().required(),
    owner_Type: Joi.string().required(),
    owner_GovID_RegNo: Joi.string().required(),
    owner_email: Joi.string().required(),
    //owner_property: myJoiObjectId(),
    owner_ID: Joi.string(),
  });
  return schema.validate(payload);
};
const updateOwnerValidator = (payload) => {
  const schema = Joi.object({
    owner_area: Joi.string().required(),
    owner_city: Joi.string().required(),
    owner_country: Joi.string().required(),
    owner_DOB: Joi.date().required(),
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
        _id: Joi.string(),
      })
    ),
    remark: Joi.string(),

    owner_phoneNo: Joi.string().required(),
    owner_Name: Joi.string().required(),
    owner_Type: Joi.string().required(),
    owner_GovID_RegNo: Joi.string().required(),
    owner_email: Joi.string().required(),
    //owner_property: myJoiObjectId(),
    owner_ID: Joi.string(),
  });
  return schema.validate(payload);
};

module.exports = {
  Owner,
  updateOwnerValidator,
  CreateOwnerValidator,
};
