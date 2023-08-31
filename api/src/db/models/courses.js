const { database }  = require("../connections");
const short = require('short-uuid')

const courseDbModel = {
    create: async function (fields) {
        const id = short.generate();
        const queryAdditions = ['id', 'title'];
        const parameters = [id, fields.title]

        if (fields.description) {
            queryAdditions.push('description');
            parameters.push(fields.description)
        }

        if (fields.imageUrl) {
            queryAdditions.push('imageUrl');
            parameters.push(fields.imageUrl)
        }

        const questionMarks = queryAdditions.map(() => '?')
            .join(',')
        
        const query = `INSERT INTO course(${queryAdditions.join(',')}) VALUES(${questionMarks})`;

        await database.connection.execute(query, parameters)

        return id;
    },

    fetchById: async (id) => {
        const result = await database.connection.execute('SELECT * FROM course WHERE id = ?', [id]);

        return result[0][0]
    },

    fetchAll: async function () {
        const result = await database.connection.execute('SELECT * FROM course');

        return result[0]
    },

    deleteById: async function (id) {
        const result = await database.connection.execute('DELETE FROM course WHERE id = ?', [id]);

        return result[0]
    },

    updateOne: async function (id, params) {
        let query = 'UPDATE course SET ';
        const arguments = [];
        const parameters = [];

        if (params.title) {
            arguments.push('title = ? ')
            parameters.push(params.title)
        }

        if (params.description) {
            arguments.push('description = ? ')
            parameters.push(params.description)
        }

        if (params.imageUrl) {
            arguments.push('imageUrl = ? ')
            parameters.push(params.imageUrl)
        }

        query += arguments.join(', ')

        query += 'WHERE id = ?';
        parameters.push(id)

        const result = await database.connection.execute(query, parameters);
        return result[0]
    }
};

module.exports = { courseDbModel }