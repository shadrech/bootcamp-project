const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { studentDbModel } = require('../../db/models/students');

const studentController = {
  getStudents: async (request, response) => {
    const students = await studentDbModel.fetchAll()

    response.json({ students })
  },

  createStudent: async (request, response) => {
    const insertId = await studentDbModel.create(request.body)
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
    const courseId = request.params.courseId
    const { startDate, endDate } = request.body

    const result = await studentDbModel.createEnrollment(studentId, courseId, startDate, endDate)

    response.json({ result })
  },

  uploadProfilePicture: async (request, response) => {
    const client = new S3Client({
      region: 'eu-west-1',
      credentials: {
        accessKeyId: '<ACCESS_KEY_HERE>',
        secretAccessKey: '<SECRET_ACCESS_HERE>'
      }
    });
    // const id = Number(request.params.id);

    const command = new PutObjectCommand({
      Bucket: 'codemonya',
      Key: request.files.profile.name,
      Body: request.files.profile.data
    })

    await client.send(command);

    response.json({ success: true })
  },
}

module.exports = {
  studentController
}
