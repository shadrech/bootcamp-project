const Joi = require('joi')

const postStudentBodySchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
})

const putStudentBodySchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
})


module.exports = {
    postStudentBodySchema,
    putStudentBodySchema
}
