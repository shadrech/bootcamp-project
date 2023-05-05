import { courseModel } from "../db/models/course"

export const courseController = {
  post: (req, res, next) => {
    return courseModel.create(req.body)
      .then(course => res.json({ course }))
      .catch(error => res.status(error?.statusCode ?? 500).json({ error: error.message }));
  },

  get: async (req, res, next) => {
    try {
      const courses = await courseModel.fetch(req.query.keyword)
      return res.json({ courses })
    } catch (error) {
      res.status(error?.statusCode ?? 500).json({ error: error.message })
    }
  },

  getOne: async (req, res, next) => {
    try {
      const course = await courseModel.fetchOne(req.params.id)
      return res.json({ course })
    } catch (error) {
      res.status(error?.statusCode ?? 500).json({ error: error.message })
    }
  },
}
