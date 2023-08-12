const { v4: uuidv4 } = require('uuid');
const { studentDbModel } = require('../../db/models/students');
const s3Upload = require('../../packages/s3-upload')

const studentController = {
  getStudents: async (request, response) => {
    const students = await studentDbModel.fetchAll()

    response.json({ students })
  },

  createStudent: async (request, response) => {
    if (!request.files.profilePicture) {
      response.status(400).send('Profile picture is required')
    }

    const pictureName = `${uuidv4()}${request.files.profilePicture.name}`
    const insertId = await studentDbModel.create(request.body, pictureName)
    await s3Upload.uploadToS3('codemonya', pictureName, request.files.profilePicture.data)

    const student = await studentDbModel.fetchById(insertId)

    response.json({ student })
  },

  getOne: async (request, response) => {
    const student = await studentDbModel.fetchById(Number(request.params.id))

    response.json({ student })
  },

  updateOne: async (request, response) => {
    const id = Number(request.params.id);
    await studentDbModel.updateOne(id, request.body)
    const student = await studentDbModel.fetchById(id)

    response.json({ student })
  },

  deleteOne: async (request, response) => {
    const result = await studentDbModel.deleteById(Number(request.params.id))
    response.json({ deletedRows: result.affectedRows })
  },

  createEnrollment: async (request, response) => {
    const studentId = Number(request.params.studentId)
    const { startDate, endDate, courseId } = request.body

    try {
      await studentDbModel.createEnrollment(studentId, courseId, startDate, endDate)
    } catch (error) {
      // way to catch errors when studentId/courseId deosnt match any record in database
      if (error.message == 'Cannot add or update a child row: a foreign key constraint fails (`admin`.`enrollment`, CONSTRAINT `FK_enrollment_courseId` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE)') {
        return response.status(404).json({ error: 'Course not found' });
      }

      if (error.message == 'Cannot add or update a child row: a foreign key constraint fails (`admin`.`enrollment`, CONSTRAINT `FK_enrollment_studentId` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE CASCADE)') {
        return response.status(404).json({ error: 'Student not found' });
      }
    }

    response.json({ success: true })
  },
}

module.exports = {
  studentController
}
