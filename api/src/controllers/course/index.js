const { request, response } = require('express');
const { courseDbModel } = require('../../db/models/courses');

const courseController = {
    getCourses: async (request, response) => {
        const courses = await courseDbModel.fetchAll()

        response.json({ courses })
    },

    createCourse: async (request, response) => {
        const insertId = await courseDbModel.create(request.body)
        const course = await courseDbModel.fetchById(insertId)


        response.json({ course })
    },

    getOne: async (request, response) => {
        const course = await courseDbModel.fetchById(Number(request.params.id));

        response.json({ course })
    },

    updateOne: async (request, response) => { 
        const id = Number(request.params.id);
        await courseDbModel.updateOne(id, request.body)
        const course = await courseDbModel.fetchById(id)

        response.json({ course });
    },

    deleteOne: async (request, response) => {
        const result = await courseDbModel.deleteById(request.params.id);

        response.json({ deletedRows: result.affectedRows })
    }
}

module.exports = {
    courseController
}