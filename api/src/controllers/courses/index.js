import { courseDbModel } from "../../db/models/courses.js";

const courseController = {
    getCourse: async (request, response) => {
        const course = await courseDbModel.fetchById(request.params.id);

        response.json({ course });
    },

    getCourses: async (request, response) => {
        const courses = await courseDbModel.fetch();

        response.json({ courses });
    },

    createCourse: async (request, response) => {
        const result = await courseDbModel.create(request.body);
        const course = await courseDbModel.fetchById(result);

        response.json({ course });
    },

    updateCourse: async (request, response) => {
        const result = await courseDbModel.update(request.params.id, request.body);

        response.json({ result });
    },

    deleteCourse: async (request, response) => {
        const result = await courseDbModel.delete(request.params.id);

        response.json({ deletedRows: result.affectedRows });
    }
};

export { courseController };
