const Joi = require('joi')

const postCourseBodySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    imageUrl: Joi.string(),
})

const putCourseBodySchema = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    imageUrl: Joi.string(),
})


module.exports = {
    postCourseBodySchema,
    putCourseBodySchema
}
