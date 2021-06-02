const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid");
const myJoiObjectId = JoiObjectId(Joi);
const { object } = require("joi");

const ChequeSchema = mongoose.Schema({
  cheque_amount: {
    type: Number,
  },
  cheque_bankName: {
    type: String,
  },
  cheque_status: {
    type: String,
  },
  cheque_issueDate: {
    type: Date,
  },
  entryDate: {
    type: Date,
  },

  cheque_remarks: {
    type: String,
  },

  cheque_number: {
    type: String,
  },

  cheque_picture_back: {
    type: String,
  },
  cheque_picture_front: {
    type: String,
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
  },
  cheque_clearDate: {
    type: String,
  },
  cheque_bouncedDate: {
    type: String,
  },
  cheque_holdDate: {
    type: String,
  },

  cheque_recivedDate: {
    type: Date,
  },
  vat_amount: {
    type: Number,
  },
  securityDeposite: {
    type: Number,
  },
  miscellaneous_amount: {
    type: Number,
  },
  Cheque_ID: {
    type: String,
  },
  ChequeListNo: {
    type: String,
  },
  Transaction_Type: {
    type: String,
  },
  depositeBank: {
    type: String,
  },
});

const Cheque = mongoose.model("Cheque", ChequeSchema);

const createChequeValidator = (payload) => {
  const schema = Joi.object({
    cheque_amount: Joi.number(),
    cheque_number: Joi.string(),
    cheque_status: Joi.string(),
    cheque_bankName: Joi.string(),
    cheque_issueDate: Joi.date(),
    entryDate: Joi.date(),
    cheque_remarks: Joi.string(),
    cheque_picture_back: Joi.string(),
    cheque_picture_front: Joi.string(),
    ChequeListNo: Joi.string(),
    securityDeposite: Joi.number(),
    lease_property: myJoiObjectId(),
    cheque_depositeDate: Joi.date(),
    cheque_clearDate: Joi.string(),
    cheque_bouncedDate: Joi.string(),
    cheque_holdDate: Joi.string(),
    cheque_recivedDate: Joi.date(),
    vat_amount: Joi.number(),
    miscellaneous_amount: Joi.number(),
    Cheque_ID: Joi.string(),
    property_id: myJoiObjectId(),
    Transaction_Type: Joi.string(),
    depositeBank: Joi.string(),
  });
  return schema.validate(payload);
};
const updateChequeValidator = (payload) => {
  const schema = Joi.object({
    cheque_number: Joi.string(),
    cheque_amount: Joi.number(),
    cheque_status: Joi.string(),
    cheque_issueDate: Joi.date(),
    entryDate: Joi.date(),
    cheque_remarks: Joi.string(),
    cheque_picture_back: Joi.string(),
    cheque_picture_front: Joi.string(),
    cheque_bankName: Joi.string(),
    lease_property: myJoiObjectId(),
    cheque_depositeDate: Joi.date(),
    cheque_clearDate: Joi.string(),
    cheque_bouncedDate: Joi.string(),
    cheque_holdDate: Joi.string(),
    cheque_recivedDate: Joi.date(),
    vat_amount: Joi.number(),
    miscellaneous_amount: Joi.number(),
    Cheque_ID: Joi.string(),
    property_id: myJoiObjectId(),
    ChequeListNo: Joi.string(),
    securityDeposite: Joi.number(),
    Transaction_Type: Joi.string(),
    depositeBank: Joi.string(),
  });
  return schema.validate(payload);
};
module.exports = {
  Cheque,
  updateChequeValidator,
  createChequeValidator,
};
