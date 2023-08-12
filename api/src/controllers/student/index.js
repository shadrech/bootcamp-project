import { v4 as uuidv4 } from 'uuid'
import studentDbModel from '../../db/models/students'
import S3Upload from '../../packages/s3-upload'

const studentController = {
  getStudents: async (request, response) => {
    const students = await studentDbModel.fetchAll()

    response.json({ students })
  },

  createStudent: async (request, response) => {
    const s3Upload = new S3Upload(process.env.S3_BUCKET_NAME)
    if (!request?.files?.profilePicture) {
      return response.status(400).send('Profile picture is required')
    }

    const pictureName = `${uuidv4()}${request.files.profilePicture.name}`
    const insertId = await studentDbModel.create(request.body, pictureName)
    await s3Upload.uploadToS3(pictureName, request.files.profilePicture.data)

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
    const s3Upload = new S3Upload(process.env.S3_BUCKET_NAME)
    const id = Number(request.params.id)

    let student
    try {
      student = await studentDbModel.fetchById(id)
    } catch (error) {
      return response.status(404).json({ message: error.message })
    }

    const result = await studentDbModel.deleteById(id)
    await s3Upload.deleteObject(student.pictureName)

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

      console.log(error);
      return response.status(500).json({ message: 'Something went wrong' });
    }

    response.json({ success: true })
  },
}

export default studentController
