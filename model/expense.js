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
  Maintanance_ticketID: {
    type: mongoose.Schema.ObjectId,
    ref: "maintananceTicket",
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
    expenseInvoiceNumber: Joi.string().required(),
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
    expenseInvoiceNumber: Joi.string().required(),
  });
  return schema.validate(payload);
};

module.exports = {
  Expense,
  updateExpenseValidator,
  CreateExpenseValidator,
};
