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
  managementCompanyId: {
    type: mongoose.Schema.ObjectId,
    ref: "managementCompany",
  },

  MaintananceCompanyDetailInfo: {
    type: String,
    required: true,
  },

  maintananceTicket_ID: {
    type: Number,
  },
});

const MaintananceTicket = mongoose.model(
  "maintananceTicket",
  MaintananceTicketSchema
);

const CreateMaintananceTicketValidator = (payload) => {
  const schema = Joi.object({
    maintananceTicketIssueDate: Joi.date().required(),
    maintananceTicketDueDate: Joi.date().required(),
    MaintanancePropertyID: myJoiObjectId(),
    MaintananceCompanyId: myJoiObjectId(),
    managementCompanyId: myJoiObjectId(),

    MaintananceCompanyDetailInfo: Joi.string().required(),
    maintananceTicket_ID: Joi.number(),
  });
  return schema.validate(payload);
};
const updateMaintananceTicketValidator = (payload) => {
  const schema = Joi.object({
    maintananceTicketIssueDate: Joi.date().required(),
    maintananceTicketDueDate: Joi.date().required(),
    MaintanancePropertyID: myJoiObjectId(),
    MaintananceCompanyId: myJoiObjectId(),
    managementCompanyId: myJoiObjectId(),
    MaintananceCompanyDetailInfo: Joi.string().required(),
    maintananceTicket_ID: Joi.number(),
  });
  return schema.validate(payload);
};
module.exports = {
  MaintananceTicket,
  updateMaintananceTicketValidator,
  CreateMaintananceTicketValidator,
};
