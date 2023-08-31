const { database }  = require("../connections");


const studentDbModel = {
    create: async function (fields) {
        const result = await database.connection.execute('INSERT INTO student(name, email, pictureName) VALUES(?, ?, ?)', [fields.name, fields.email, pictureName]);

        return result[0].insertId
    },

    fetchById: async (id) => {
        const result = await database.connection.execute(`SELECT * FROM student AS s INNER JOIN enrollment AS e ON s.id = e.studentId WHERE s.id = ?`, [id]);

        if (result[0].length == 0) {
            throw new Error(`Student with id "${id}" not found`);
        }

        const student = {
            id: result[0][0].id,
            name: result[0][0].name,
            email: result[0][0].email,
            pictureName: result[0][0].pictureName,
            createdAt: result[0][0].createdAt,
            enrollemts: result[0]
            .filter((row) => row.studentId != null)
            .map(row => {
                return {
                    studentId: row.studentId,
                    courseId: row.courseId,
                    grade: row.grade,
                    score: row.score,
                    startDate: row.startDate,
                    endDate: row.endDate,
                }
            })
        }

        return student
    },

    fetchAll: async function () {
        const result = await database.connection.execute('SELECT * FROM student');

        return result[0]
    },

    deleteById: async function (id) {
        const result = await database.connection.execute('DELETE FROM student WHERE id = ?', [id]);

        return result[0]
    },

    updateOne: async function (id, params) {
        let query = 'UPDATE student SET ';
        const arguments = [];
        const parameters = [];

        if (params.name) {
            arguments.push('name = ?')
            parameters.push(params.name)
        }

        if (params.email) {
            arguments.push('email = ? ')
            parameters.push(params.email)
        }

        query += arguments.join(', ')

        query += 'WHERE id = ?';
        parameters.push(id)

        const result = await database.connection.execute(query, parameters);
        return result[0]
    },
};

module.exports = { studentDbModel }