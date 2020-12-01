const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");
const JoiObjectId = require("joi-objectid");
const myJoiObjectId = JoiObjectId(Joi);

const ExpenseSchema = mongoose.Schema({
  expense_list: [
    {
      expenseHead: { type: String },
      expenseAmount: { type: Number },
      expenseId: { type: String },
    },
  ],
  expense_EntryDate: {
    type: Date,
    required: true,
  },
  Expense_Remark: {
    type: String,
  },
  expenseInvoiceNumber: {
    type: String,
    required: true,
  },
  invoicePhoto: {
    type: String,
    required: true,
  },
  Maintanance_ticketID: {
    type: mongoose.Schema.ObjectId,
    ref: "maintananceTicket",
  },
  property_ID: {
    type: mongoose.Schema.ObjectId,
    ref: "Property",
  },

  Expense_ID: {
    type: String,
  },
  expense_Type: {
    type: String,
    required: true,
  },
});

const Expense = mongoose.model("expense", ExpenseSchema);

const CreateExpenseValidator = (payload) => {
  const schema = Joi.object({
    expense_list: Joi.array().items(
      Joi.object({
        expenseHead: Joi.string(),
        expenseAmount: Joi.number(),
        expenseId: Joi.string(),
      })
    ),
    expense_EntryDate: Joi.date().required(),
    Expense_Remark: Joi.string(),
    Maintanance_ticketID: myJoiObjectId(),
    property_ID: myJoiObjectId(),
    expenseInvoiceNumber: Joi.string().required(),
    Expense_ID: Joi.string(),
    invoicePhoto: Joi.string().required(),
    expense_Type: Joi.string().required(),
  });
  return schema.validate(payload);
};
const updateExpenseValidator = (payload) => {
  const schema = Joi.object({
    expense_list: Joi.array().items(
      Joi.object({
        expenseHead: Joi.string(),
        expenseAmount: Joi.number(),
        expenseId: Joi.string(),
      })
    ),
    expense_EntryDate: Joi.date().required(),
    Expense_Remark: Joi.string(),
    Maintanance_ticketID: myJoiObjectId(),
    property_ID: myJoiObjectId(),

    expenseInvoiceNumber: Joi.string().required(),
    Expense_ID: Joi.string(),
    invoicePhoto: Joi.string().required(),
    expense_Type: Joi.string().required(),
  });
  return schema.validate(payload);
};

module.exports = {
  Expense,
  updateExpenseValidator,
  CreateExpenseValidator,
};
