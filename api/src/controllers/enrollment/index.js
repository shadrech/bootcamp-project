import { enrollmentDbModel } from "../../db/models/enrollments.js";

const enrollmentController = {
    getEnrollment: async (request, response) => {
        const enrollment = await enrollmentDbModel.fetchById(request.params.id);

        response.json({ enrollment });
    },

    getEnrollments: async (request, response) => {
        const enrollments = await enrollmentDbModel.fetch();

        response.json({ enrollments });
    },

    createEnrollment: async (request, response) => {
        const result = await enrollmentDbModel.create(request.body);
        const enrollment = await enrollmentDbModel.fetchById(result);

        response.json({ enrollment });
    },

    updateEnrollment: async (request, response) => {
        await enrollmentDbModel.update(request.params.id, request.body);
        const enrollment = await enrollmentDbModel.fetchById(request.params.id);

        response.json({ enrollment });
    },

    deleteEnrollment: async (request, response) => {
        const result = await enrollmentDbModel.delete(request.params.id);

        response.json({ deletedRows: result.affectedRows });
    }
};

export { enrollmentController };
