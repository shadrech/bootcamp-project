const Joi = require('joi')

const postStudentBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
})
const putStudentBodySchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email()
})
const createStudentEnrollmentBodySchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required()
})

module.exports = {
  postStudentBodySchema,
  putStudentBodySchema,
  createStudentEnrollmentBodySchema
}
