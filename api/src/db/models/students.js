const db = require('../connection')

const studentDbModel = {
  create: async function (fields, pictureName) {
    const result = await db.connection.execute('INSERT INTO student(name, email, pictureName) VALUES(?, ?, ?)', [fields.name, fields.email, pictureName]);

    return result[0].insertId
  },

  fetchById: async function (id) {
    const result = await db.connection.execute(`
      SELECT *
      FROM student AS s
      LEFT JOIN enrollment AS e
      ON s.id = e.studentId
      WHERE s.id = ?
    `, [id]);

    const student = {
      id: result[0][0].id,
      name: result[0][0].name,
      email: result[0][0].email,
      createdAt: result[0][0].createdAt,
      enrollments: result[0]
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
    const result = await db.connection.execute('SELECT * FROM student');
    return result[0]
  },

  deleteById: async function (id) {
    const result = await db.connection.execute('DELETE FROM student WHERE id = ?', [id]);
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
      arguments.push('email = ?')
      parameters.push(params.email)
    }

    query += arguments.join(',')

    query += ' WHERE id = ?';
    parameters.push(id)

    const result = await db.connection.execute(query, parameters);
    return result[0]
  },

  createEnrollment: async function (studentId, courseId, startDate, endDate) {
    const result = await db.connection.execute('INSERT INTO enrollment(studentId, courseId, startDate, endDate) VALUES(?, ?, ?, ?)', [studentId, courseId, startDate, endDate]);

    return result[0].insertId
  },
}

module.exports = {
  studentDbModel
}
