import courseDbModel from '../../db/models/courses'

const courseController = {
  async createCourse(request, response) {
    const id = await courseDbModel.create(request.body);
    const course = await courseDbModel.fetchById(id);

    response.json({ course });
  },

  getCourses: async (request, response) => {
    const courses = await courseDbModel.fetchAll()

    response.json({ courses })
  },
}

export default courseController
