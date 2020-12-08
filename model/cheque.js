const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid");
const myJoiObjectId = JoiObjectId(Joi);
const { object } = require("joi");

const ChequeSchema = mongoose.Schema({
  cheque_amount: {
    type: Number,
    required: true,
  },
  cheque_bankName: {
    type: String,
    required: true,
  },
  cheque_status: {
    type: String,
    required: true,
  },
  cheque_issueDate: {
    type: Date,
    required: true,
  },
  cheque_entryDate: {
    type: Date,
    required: true,
  },

  cheque_remarks: {
    type: String,
  },

  cheque_number: {
    type: String,
    required: true,
  },

  cheque_picture_back: {
    type: String,
    required: true,
  },
  cheque_picture_front: {
    type: String,
    required: true,
  },
  lease_property: {
    type: mongoose.Schema.ObjectId,
    ref: "Lease",
  },
  property_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Property",
  },

  cheque_depositeDate: {
    type: Date,
    required: true,
  },
  cheque_clearDate: {
    type: String,
    required: true,
  },
  cheque_bouncedDate: {
    type: String,
    required: true,
  },
  cheque_holdDate: {
    type: String,
    required: true,
  },

  cheque_recivedDate: {
    type: Date,
    required: true,
  },
  vat_amount: {
    type: Number,
    required: true,
  },
  miscellaneous_amount: {
    type: Number,
    required: true,
  },
  Cheque_ID: {
    type: String,
  },
});

const Cheque = mongoose.model("Cheque", ChequeSchema);

const createChequeValidator = (payload) => {
  const schema = Joi.object({
    cheque_amount: Joi.number().required(),
    cheque_number: Joi.string().required(),
    cheque_status: Joi.string().required(),
    cheque_bankName: Joi.string().required(),
    cheque_issueDate: Joi.date().required(),
    cheque_entryDate: Joi.date().required(),
    cheque_remarks: Joi.string(),

    cheque_picture_back: Joi.string().required(),
    cheque_picture_front: Joi.string().required(),

    lease_property: myJoiObjectId(),
    cheque_depositeDate: Joi.date().required(),
    cheque_clearDate: Joi.string().required(),
    cheque_bouncedDate: Joi.string().required(),
    cheque_holdDate: Joi.string().required(),
    cheque_recivedDate: Joi.date().required(),
    vat_amount: Joi.number().required(),
    miscellaneous_amount: Joi.number().required(),
    Cheque_ID: Joi.string(),
    property_id: myJoiObjectId(),
  });
  return schema.validate(payload);
};
const updateChequeValidator = (payload) => {
  const schema = Joi.object({
    cheque_number: Joi.string().required(),
    cheque_amount: Joi.number().required(),
    cheque_status: Joi.string().required(),
    cheque_issueDate: Joi.date().required(),
    cheque_entryDate: Joi.date().required(),
    cheque_remarks: Joi.string(),
    cheque_picture_back: Joi.string().required(),
    cheque_picture_front: Joi.string().required(),
    cheque_bankName: Joi.string().required(),
    lease_property: myJoiObjectId(),
    cheque_depositeDate: Joi.date().required(),
    cheque_clearDate: Joi.string().required(),
    cheque_bouncedDate: Joi.string().required(),
    cheque_holdDate: Joi.string().required(),
    cheque_recivedDate: Joi.date().required(),
    vat_amount: Joi.number().required(),
    miscellaneous_amount: Joi.number().required(),
    Cheque_ID: Joi.string(),
    property_id: myJoiObjectId(),
  });
  return schema.validate(payload);
};
module.exports = {
  Cheque,
  updateChequeValidator,
  createChequeValidator,
};
