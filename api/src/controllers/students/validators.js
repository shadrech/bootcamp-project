import Joi from 'joi';

const postStudentBodySchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
  });

  const putStudentBodySchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
  });

  export {
    postStudentBodySchema,
    putStudentBodySchema
  }