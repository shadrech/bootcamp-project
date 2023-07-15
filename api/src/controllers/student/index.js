const { studentDbModel } = require('../../db/models/students');

const studentController = {
  getStudents: async (request, response) => {
    const students = await studentDbModel.fetchAll()

    response.json({ students })
  },

  createStudent: async (request, response) => {
    const insertId = await studentDbModel.create(params)
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
  }
}

module.exports = {
  studentController
}
