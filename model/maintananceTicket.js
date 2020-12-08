const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");
const JoiObjectId = require("joi-objectid");
const myJoiObjectId = JoiObjectId(Joi);

const MaintananceTicketSchema = mongoose.Schema({
  maintananceTicketIssueDate: {
    type: Date,
    required: true,
  },
  maintananceTicketDueDate: {
    type: Date,
    required: true,
  },
  MaintanancePropertyID: {
    type: mongoose.Schema.ObjectId,
    ref: "Property",
  },
  MaintananceCompanyId: {
    type: mongoose.Schema.ObjectId,
    ref: "maintananceCompany",
  },

  MaintananceCompanyDetailInfo: {
    type: String,
    required: true,
  },

  maintananceTicket_ID: {
    type: String,
  },
  Maintanance_Ticket_picture: {
    type: String,
    required: true,
  },
  maintanance_Amount: {
    type: Number,
    required: true,
  },
});

const MaintananceTicket = mongoose.model(
  "maintananceTicket",
  MaintananceTicketSchema
);

const CreateMaintananceTicketValidator = (payload) => {
  const schema = Joi.object({
    Maintanance_Ticket_picture: Joi.string().required(),
    maintanance_Amount: Joi.number().required(),
    maintananceTicketIssueDate: Joi.date().required(),
    maintananceTicketDueDate: Joi.date().required(),
    MaintanancePropertyID: myJoiObjectId(),
    MaintananceCompanyId: myJoiObjectId(),
    MaintananceCompanyDetailInfo: Joi.string().required(),
    maintananceTicket_ID: Joi.string(),
  });
  return schema.validate(payload);
};
const updateMaintananceTicketValidator = (payload) => {
  const schema = Joi.object({
    Maintanance_Ticket_picture: Joi.string().required(),
    maintanance_Amount: Joi.number().required(),
    maintananceTicketIssueDate: Joi.date().required(),
    maintananceTicketDueDate: Joi.date().required(),
    MaintanancePropertyID: myJoiObjectId(),
    MaintananceCompanyId: myJoiObjectId(),
    MaintananceCompanyDetailInfo: Joi.string().required(),
    maintananceTicket_ID: Joi.string(),
  });
  return schema.validate(payload);
};
module.exports = {
  MaintananceTicket,
  updateMaintananceTicketValidator,
  CreateMaintananceTicketValidator,
};
