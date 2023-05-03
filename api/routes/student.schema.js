const Joi = require('joi')

module.exports.post = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
})

module.exports.get = Joi.object({
  name: Joi.string().optional()
})

module.exports.put = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
})
