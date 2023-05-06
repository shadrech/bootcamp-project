import { studentModel } from "../db/models/student"

export const studentController = {
  post: (req, res, next) => {
    studentModel.create(req.body)
      .then(student => res.json({ student }))
      .catch(error => res.status(error?.statusCode ?? 500).json({ error: error.message }));
  },

  get: async (req, res, next) => {
    try {
      const students = await studentModel.fetch(req.query.name)
      return res.json({ students })
    } catch (error) {
      res.status(error?.statusCode ?? 500).json({ error: error.message })
    }
  },

  getOne: async (req, res, next) => {
    try {
      const student = await studentModel.fetchOne(req.params.id)
      return res.json({ student })
    } catch (error) {
      res.status(error?.statusCode ?? 500).json({ error: error.message })
    }
  },

  put: async (req, res, next) => {
    try {
      const student = await studentModel.update(req.params.id, req.body)
      return res.json({ student })
    } catch (error) {
      res.status(error?.statusCode ?? 500).json({ error: error.message })
    }
  },

  delete: async (req, res, next) => {
    try {
      await studentModel.deleteOne(req.params.id)
      return res.status(200).end()
    } catch (error) {
      res.status(error?.statusCode ?? 500).json({ error: error.message })
    }
  },

  enroll: async (req, res, next) => {
    try {
      const student = await studentModel.addEnrollment(req.params.id, req.body.courseId)
      return res.json({ student })
    } catch (error) {
      res.status(error?.statusCode ?? 500).json({ error: error.message })
    }
  },

  putEnroll: async (req, res, next) => {
    try {
      const student = await studentModel.updateEnrollment(req.params.id, req.body.courseId, req.body.score, req.body.grade)
      return res.json({ student })
    } catch (error) {
      res.status(error?.statusCode ?? 500).json({ error: error.message })
    }
  },
}
