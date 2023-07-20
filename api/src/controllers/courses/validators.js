import Joi from "joi";

const postCourseBodySchema = Joi.object({
  title: Joi.string().required(),
  imageUrl: Joi.string(),
  description: Joi.string(),
});

const putCourseBodySchema = Joi.object({
  title: Joi.string(),
  imageUrl: Joi.string(),
  description: Joi.string(),
});

export { postCourseBodySchema, putCourseBodySchema };