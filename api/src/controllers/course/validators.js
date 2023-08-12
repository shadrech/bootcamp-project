import Joi from 'joi'

export const postCourseBodySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  imageUrl: Joi.string(),
})
