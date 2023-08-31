const S3Upload = require('../../packages/s3-upload');
const { studentDbModel } = require('../../db/models/students');
const short = require('short-uuid');


const studentController = {
    getStudents: async (request, response) => {
        const students = await studentDbModel.fetchAll()

        response.json({ students })
    },

    createStudent: async (request, response) => {
        const s3Upload = new S3Upload(process.env.S3_BUCKET_NAME)
        if (!request?.files?.profilePicture) {
          return response.status(400).send('Profile picture is required!')
        }

        //const pictureName = `${short()}${request.files.profilePicture.name}`
        const insertId = await studentDbModel.create(request.body, profilePicture)
        await s3Upload.uploadToS3(pictureName, request.files.profilePicture.data)

        const student = await studentDbModel.fetchById(insertId)

        response.json({ student })
    },

    getOne: async (request, response) => {
        const student = await studentDbModel.fetchById(Number(request.params.id));

        response.json({ student })
    },

    updateOne: async (request, response) => { 
        const id = Number(request.params.id);
        await studentDbModel.updateOne(id, request.body)
        const student = await studentDbModel.fetchById(id)

        response.json({ student });
    },

    deleteOne: async (request, response) => {
        const result = await studentDbModel.deleteById(Number(request.params.id));

        response.json({ deletedRows: result.affectedRows })
    },
}

module.exports = {
    studentController
}