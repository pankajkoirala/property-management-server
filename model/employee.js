const mongoose = require("mongoose");
const Joi = require("joi");
const { object } = require("joi");

const EmployeeSchema = mongoose.Schema({
  employee_area: {
    type: String,
    required: true,
  },
  employee_city: {
    type: String,
    required: true,
  },

  employee_country: {
    type: String,
    required: true,
  },
  employee_DOB: {
    type: Date,
    required: true,
  },

  files_list: [
    {
      fileName: { type: String },
      file: { type: String },
    },
  ],
  employee_phoneNo: {
    type: Number,
    required: true,
  },
  employee_firstName: {
    type: String,
    required: true,
  },

  employee_middleName: {
    type: String,
  },
  employee_lastName: {
    type: String,
    required: true,
  },
  employee_email: {
    type: String,
    required: true,
  },
  employee_post: {
    type: String,
    required: true,
  },
  Employee_ID: {
    type: String,
  },
});

const Employee = mongoose.model("employee", EmployeeSchema);

const CreateEmployeeValidator = (payload) => {
  const schema = Joi.object({
    employee_area: Joi.string().required(),
    employee_city: Joi.string().required(),
    employee_country: Joi.string().required(),
    employee_DOB: Joi.date().required(),
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
      })
    ),
    employee_phoneNo: Joi.number().required(),
    employee_firstName: Joi.string().required(),
    employee_middleName: Joi.string(),
    employee_lastName: Joi.string().required(),
    employee_email: Joi.string().required(),
    employee_post: Joi.string().required(),
    Employee_ID: Joi.string(),
  });
  return schema.validate(payload);
};
const updateEmployeeValidator = (payload) => {
  const schema = Joi.object({
    employee_area: Joi.string().required(),
    employee_city: Joi.string().required(),
    employee_country: Joi.string().required(),
    employee_DOB: Joi.date().required(),
    files_list: Joi.array().items(
      Joi.object({
        fileName: Joi.string(),
        file: Joi.string(),
        _id: Joi.string(),
      })
    ),
    employee_phoneNo: Joi.number().required(),
    employee_firstName: Joi.string().required(),
    employee_middleName: Joi.string(),
    employee_lastName: Joi.string().required(),
    employee_email: Joi.string().required(),
    employee_post: Joi.string().required(),
    Employee_ID: Joi.string(),
  });
  return schema.validate(payload);
};
module.exports = {
  Employee,
  CreateEmployeeValidator,
  updateEmployeeValidator,
};
