const Joi = require('@hapi/joi');

function registerValidation(data) {
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  })

  return schema.validate(data)
}

function loginValidation(data) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  })

  return schema.validate(data)
}




module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;