const Joi = require('joi')

const postEnrollmentBodySchema = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
})


module.exports = {
    postEnrollmentBodySchema,
}
