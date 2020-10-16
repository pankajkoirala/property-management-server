const mongoose = require("mongoose");
const Joi = require("joi");
const { object, array } = require("joi");



const LeaseSchema = mongoose.Schema({
    chequeList: [{type:Date,type:Number}],

  lease_enterDate:{
      type:Date,
      required:true
  },
  tenants: {
    type: String,
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

  expirationDate:{
    type:Date,
    required:true
},
rentAmount: {
  type: Number,
  required: true,
},
firstDueDate: {
  type: Date,
  required: true,
},
frequency: {
  type: String,
  required: true,
},

gracePeriod:{
  type: Number,
  required: true,
},
late_feeType: {
    type: String,
    required: true,
  },
  lateFeeAmount:{
    type: Number,
    required: true,
  } ,
  securityDeposite:{
    type: Number,
    required: true,
  } ,
  securityfirstDueDate:{
    type: Date,
    required: true,
  } ,
  LeaseId: {
    type: Number,
  },
});

const Lease = mongoose.model("Lease", LeaseSchema);

const createLeaseValidator = payload => {
  const  schema = Joi.object({
    chequeList: Joi.array().items(
        Joi.object({
            issueDate: Joi.date(),
            chequeNo: Joi.number(),
        })
      ),

    tenants:Joi.string().required(),
    lease_Term:Joi.string().required(),
    frequency:Joi.string().required(),
    late_feeType:Joi.string().required(),
    rentAmount: Joi.number().required(),
    gracePeriod: Joi.number().required(),
    lateFeeAmount: Joi.number().required(),
    securityDeposite: Joi.number().required(),
    LeaseId: Joi.number(),
    lease_enterDate: Joi.date().required(),
    commenceDate: Joi.date().required(),
    expirationDate: Joi.date().required(),
    firstDueDate: Joi.date().required(),
    securityfirstDueDate: Joi.date().required(),
  });
  return schema.validate(payload)
};
const updateLeaseValidator = payload => {
  const schema = Joi.object({
    chequeList: Joi.array().items(
        Joi.object({
            issueDate: Joi.date(),
            chequeNo: Joi.number(),
        })
      ),
    tenants:Joi.string().required(),
    lease_Term:Joi.string().required(),
    frequency:Joi.string().required(),
    late_feeType:Joi.string().required(),
    rentAmount: Joi.number().required(),
    gracePeriod: Joi.number().required(),
    lateFeeAmount: Joi.number().required(),
    securityDeposite: Joi.number().required(),
    LeaseId: Joi.number(),
    lease_enterDate: Joi.date().required(),
    commenceDate: Joi.date().required(),
    expirationDate: Joi.date().required(),
    firstDueDate: Joi.date().required(),
    securityfirstDueDate: Joi.date().required(),
  });
  return schema.validate(payload);
};
module.exports = {
  Lease,
  createLeaseValidator,
  updateLeaseValidator
};


