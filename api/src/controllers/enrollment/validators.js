import Joi from 'joi';

const postEnrollmentSchema = Joi.object({
    courseId: Joi.string().required(),
    studentId: Joi.number().required(),
    endDate: Joi.date()
});

const putEnrollmentSchema = Joi.object({
    score: Joi.number(),
    grade: Joi.string().valid('A', 'B', 'C', 'D', 'E', 'F'),
    endDate: Joi.date()
});

export {
    postEnrollmentSchema,
    putEnrollmentSchema
};
