import * as uuid from 'uuid'
import { connection } from "../connection"
import { ApiError } from '../../utils/api-error'
import { transformJoinedEnrollmentRow } from '../../utils/mappers'

export const studentModel = {
  async create(fields) {
    const [result] = await connection.execute(
      'INSERT INTO student(name, email) VALUES(?, ?)',
      [fields.name, fields.email]
    ).catch(error => {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ApiError(`Email "${fields.email}" already exists`, 409)
      }
    })
    
    const id = result.insertId
    const [rows] = await connection.execute(`SELECT * FROM student WHERE id=?`, [id])

    return rows[0]
  },

  async fetch(name) {
    const query = 'SELECT * FROM `student`'
    const values = []

    if (name) {
      query += " WHERE `name` ILIKE '%?%'"
      values.push(name)
    }

    const [result] = await connection.execute(query, values)
    return result
  },

  async fetchOne(id) {
    const [rows] = await connection.execute(`
      SELECT
        s.*, e.id AS e_id, e.score AS e_score, e.grade AS e_grade, e.courseId AS e_courseId, e.createdAt AS e_createdAt, c.title AS c_title
      FROM student AS s
      INNER JOIN enrollment AS e
      ON s.id = e.studentId
      INNER JOIN course AS c
      ON c.id = e.courseId
      WHERE s.id=?
    `, [id])

    const student = {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      createdAt: rows[0].createdAt,
      enrollments: rows.map(transformJoinedEnrollmentRow)
    }

    return student
  },

  async update(id, fields) {
    const keys = []
    const values = []

    Object.keys(fields).forEach(key => {
      keys.push(`${key}=?`)
      values.push(fields[key])
    })

    values.push(id)

    const result = await connection.execute(
      `UPDATE student SET ${keys.join(',')} WHERE id=?`,
      values
    )

    if (!result[0].affectedRows) {
      throw new ApiError(`Record with id "${id}" does not exist`, 404)
    }

    const [rows] = await connection.execute(`SELECT * FROM student WHERE id=?`, [id])
    return rows[0]
  },

  async addEnrollment(studentId, courseId) {
    await connection.execute(
      'INSERT INTO enrollment(id, studentId, courseId) VALUES(?, ?, ?)',
      [uuid.v4(), studentId, courseId]
    )

    return this.fetchOne(studentId)
  },

  async updateEnrollment(studentId, courseId, score, grade) {
    const result = await connection.execute(
      'UPDATE enrollment SET score=?, grade=? WHERE studentId=? AND courseId=?',
      [score, grade, studentId, courseId]
    )

    if (!result[0].affectedRows) {
      throw new ApiError(`Record with studentId "${studentId}" and courseId "${courseId}" does not exist`, 404)
    }

    return this.fetchOne(studentId)
  }
}
