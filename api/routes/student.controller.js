const studentModel = require("../db/models/student");

module.exports = {
  post: (req, res, next) => {
    studentModel.create(req.body)
      .then(student => res.json({ student }))
      .catch(error => res.status(500).json(error));
  },

  get: async (req, res, next) => {
    try {
      const students = await studentModel.fetch(req.query.name)
      return res.json({ students })
    } catch (error) {
      res.status(500).json(err)
    }
  },

  put: async (req, res, next) => {
    try {
      const student = await studentModel.update(req.params.id, req.body)
      return res.json({ student })
    } catch (error) {
      res.status(500).json(err)
    }
  },
}
