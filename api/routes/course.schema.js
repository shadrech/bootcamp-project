import Joi from 'joi'

export const post = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  imageUrl: Joi.string().uri({ relativeOnly: true }),
})

export const get = Joi.object({
  keyword: Joi.string().optional()
})
