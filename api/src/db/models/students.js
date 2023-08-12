import database from '../connection'

class StudentDBModel {
  async create(fields, pictureName) {
    const result = await database.connection.execute('INSERT INTO student(name, email, pictureName) VALUES(?, ?, ?)', [fields.name, fields.email, pictureName]);

    return result[0].insertId
  }

  async fetchById(id) {
    const result = await database.connection.execute(`
      SELECT *
      FROM student AS s
      LEFT JOIN enrollment AS e
      ON s.id = e.studentId
      WHERE s.id = ?
    `, [id]);

    if (result[0].length == 0) {
      throw new Error(`Student with id "${id}" not found`);
    }

    const student = {
      id: result[0][0].id,
      name: result[0][0].name,
      email: result[0][0].email,
      pictureName: result[0][0].pictureName,
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
  }

  async fetchAll() {
    const result = await database.connection.execute('SELECT * FROM student');
    return result[0]
  }

  async deleteById(id) {
    const result = await database.connection.execute('DELETE FROM student WHERE id = ?', [id]);
    return result[0]
  }

  async updateOne(id, params) {
    let query = 'UPDATE student SET ';
    const args = [];
    const parameters = [];

    if (params.name) {
      args.push('name = ?')
      parameters.push(params.name)
    }
    if (params.email) {
      args.push('email = ?')
      parameters.push(params.email)
    }

    query += args.join(',')

    query += ' WHERE id = ?';
    parameters.push(id)

    const result = await database.connection.execute(query, parameters);
    return result[0]
  }

  async createEnrollment(studentId, courseId, startDate, endDate) {
    const result = await database.connection.execute('INSERT INTO enrollment(studentId, courseId, startDate, endDate) VALUES(?, ?, ?, ?)', [studentId, courseId, startDate, endDate]);

    return result[0].insertId
  }
}

const studentDbModel = new StudentDBModel()
export default studentDbModel
