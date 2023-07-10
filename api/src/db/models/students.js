const { database }  = require("../connections");


const studentDbModel = {
    create: async (fields) => {
        const result = await database.connection.execute('INSERT INTO student(name, email) VALUES(?, ?)', [fields.name, fields.email]);

        return result[0].insertId
    },

    fetchById: async (id) => {
        const result = await database.connection.execute('SELECT * FROM student WHERE id = ?', [id]);

        return result[0][0]
    }
};

module.exports = { studentDbModel }