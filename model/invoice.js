const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");

const InvoiceSchema = mongoose.Schema({
  chequeMongoId: {
    type: String,
    required: true,
  },
  invoicePhoto: {
    type: String,
    required: true,
  },
  InvoiceId: {
    type: String,
    required: true,
  },
  invoiceIssueDate: {
    type: Date,
    required: true,
  },

  chequeNumber: {
    type: String,
    required: true,
  },
  lease_id: {
    type: String,
    required: true,
  },
  propertyId: {
    type: String,
    required: true,
  },
});

const Invoice = mongoose.model("invoice", InvoiceSchema);

const createInvoiceValidator = (payload) => {
  const schema = Joi.object({
    chequeMongoId: Joi.string().required(),
    invoicePhoto: Joi.string().required(),
    InvoiceId: Joi.string().required(),
    invoiceIssueDate: Joi.date().required(),
    chequeNumber: Joi.string().required(),
    lease_id: Joi.string().required(),
    propertyId: Joi.string().required(),
  });
  return schema.validate(payload);
};
const updateInvoiceValidator = (payload) => {
  const schema = Joi.object({
    chequeMongoId: Joi.string().required(),
    invoicePhoto: Joi.string().required(),
    InvoiceId: Joi.string().required(),
    invoiceIssueDate: Joi.date().required(),
    chequeNumber: Joi.string().required(),
    lease_id: Joi.string().required(),
    propertyId: Joi.string().required(),
  });

  return schema.validate(payload);
};
module.exports = {
  Invoice,
  createInvoiceValidator,
  updateInvoiceValidator,
};
