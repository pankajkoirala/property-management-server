const mongoose = require("mongoose");
const Joi = require("joi");
const JoiObjectId = require("joi-objectid");
const myJoiObjectId = JoiObjectId(Joi);
const { object } = require("joi");

const LeaseSchema = mongoose.Schema({
  files_list: [
    {
      fileName: { type: String },
      file: { type: String },
    },
  ],

  lease_enterDate: {
    type: Date,
    required: true,
  },

  lease_Term: {
    type: String,
    required: true,
  },
  commenceDate: {
    type: Date,
    required: true,
  },

  expirationDate: {
    type: Date,
    required: true,
  },
  rentAmount: {
    type: Number,
    required: true,
  },

  frequency: {
    type: String,
    required: true,
  },

  securityDeposite: {
    type: Number,
    required: true,
  },

  LeaseId: {
    type: String,
  },
  property: {
    type: mongoose.Schema.ObjectId,
    ref: "Property",
  },

  tenants: {
    type: mongoose.Schema.ObjectId,
    ref: "Tenant",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  VAT_Amount: {
    type: Number,
    required: true,
  },
  remark: {
    type: String,
  },
});


const Lease = mongoose.model("Lease", LeaseSchema);

const createLeaseValidator = (payload) => {
  const schema = Joi.object({
    // chequeList: Joi.array().items(myJoiObjectId()),
    tenants: myJoiObjectId(),
    lease_Term: Joi.string().required(),
    frequency: Joi.string().required(),
    rentAmount: Joi.number().required(),
    remark: Joi.string(),

    securityDeposite: Joi.number().required(),
    LeaseId: Joi.string(),
    lease_enterDate: Joi.date().required(),
    commenceDate: Joi.date().required(),
    expirationDate: Joi.date().required(),
    totalAmount:Joi.number().required(),
    VAT_Amount:Joi.number().required(),
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
      })
    ),
    property: myJoiObjectId(),
  });
  return schema.validate(payload);
};
const updateLeaseValidator = (payload) => {
  const schema = Joi.object({
    // chequeList: Joi.array().items(myJoiObjectId()),
    remark: Joi.string(),

    tenants: myJoiObjectId(),
    lease_Term: Joi.string().required(),
    frequency: Joi.string().required(),
    rentAmount: Joi.number().required(),
    securityDeposite: Joi.number().required(),
    LeaseId: Joi.string(),
    lease_enterDate: Joi.date().required(),
    commenceDate: Joi.date().required(),
    expirationDate: Joi.date().required(),
    totalAmount:Joi.number().required(),
    VAT_Amount:Joi.number().required(),
    property: myJoiObjectId(),
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
        _id: Joi.string(),
      })
    ),
  });
  return schema.validate(payload);
};
module.exports = {
  Lease,
  createLeaseValidator,
  updateLeaseValidator,
};
