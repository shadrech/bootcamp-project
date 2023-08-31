const { enrollmentDbModel } = require('../../db/models/enrollment')

const enrollmentController = {
    createEnrollment: async (request, response) => {
        const studentId = Number(request.params.studentId)
        const courseId = request.params.courseId
        const { startDate, endDate } = request.body

        const result = await enrollmentDbModel.createEnrollment(studentId, courseId, startDate, endDate)

        response.json({ result })
    }
}

module.exports = { enrollmentController }

