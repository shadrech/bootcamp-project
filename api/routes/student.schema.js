import Joi from 'joi'

export const post = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
})

export const get = Joi.object({
  name: Joi.string().optional()
})

export const put = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
})

export const postEnroll = Joi.object({
  courseId: Joi.string().uuid().required()
})

export const putEnroll = Joi.object({
  score: Joi.number().min(0).required(),
  grade: Joi.string().allow('A', 'B', 'C', 'D', 'E', 'F').required(),
  courseId: Joi.string().uuid().required()
})
