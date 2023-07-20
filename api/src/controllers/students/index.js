import { studentDbModel } from "../../db/models/students.js";

const studentController = {
    getStudent: async (request, response) => {
        const student = await studentDbModel.fetchById(request.params.id);

        response.json({ student });
    },

    getStudents: async (request, response) => {
        const students = await studentDbModel.fetch();
        response.json ({ students });
    } ,

    createStudent: async (request, response) => {
        const result = await studentDbModel.create(request.body);
        const student = await studentDbModel.fetchById(result);

        response.json({ student });
    },

    updateStudent: async (request, response) => {
        const result = await studentDbModel.update(request.params.id, request.body);

        response.json({ result });
    },

    deleteStudent: async (request, response) => {
        const result = await studentDbModel.delete(request.params.id);

        response.json({ deletedRows: result.affectedRows });
    }
}

export { studentController };