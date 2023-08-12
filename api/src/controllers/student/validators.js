import Joi from 'joi'

export const postStudentBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
})

export const putStudentBodySchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email()
})

export const createStudentEnrollmentBodySchema = Joi.object({
  courseId: Joi.string().uuid().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required()
})
