const db = require('../connection')

const studentDbModel = {
  create: async function (fields) {
    const result = await db.connection.execute('INSERT INTO student(name, email) VALUES(?, ?)', [fields.name, fields.email]);

    return result[0].insertId
  },

  fetchById: async function (id) {
    const result = await db.connection.execute('SELECT * FROM student WHERE id = ?', [id]);
    return result[0][0]
  },
}

module.exports = {
  studentDbModel
}
