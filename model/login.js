const mongoose = require("mongoose");
const Joi = require("joi");
const { string } = require("joi");


const signupSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
  },
  password: {
    type: String,
    required: true,
  },
});
const signup = mongoose.model("signup", signupSchema)

const createSignupValidator = payload =>{
  const schema =Joi.object ( {
      email: Joi.string().required(),
      password: Joi.string().required(),
  });
  return schema.validate(payload);
};
const UpdateSignupValidator = payload =>{
  const schema =Joi.object ( {
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(payload);
};
module.exports = {
  signup,
  createSignupValidator,
  UpdateSignupValidator
};