import * as uuid from 'uuid'
import { connection } from "../connection"
import { ApiError } from '../../utils/api-error'
import { transformJoinedEnrollmentRow } from '../../utils/mappers'

export const courseModel = {
  async create(fields) {
    const id = uuid.v4()
    const [result] = await connection.execute(
      'INSERT INTO course(id, title, description, imageUrl) VALUES(?, ?, ?, ?)',
      [id, fields.title, fields.description || null, fields.imageUrl || null]
    )
    
    const [rows] = await connection.execute(`SELECT * FROM course WHERE id=?`, [id])

    return rows[0]
  },

  async fetch(keyword) {
    const query = 'SELECT * FROM `course`'
    const values = []

    if (keyword) {
      query += " WHERE title ILIKE '%?%' OR description ILIKE '%?%'"
      values.push(keyword)
    }

    const [result] = await connection.execute(query, values)
    return result
  },

  async fetchOne(id) {
    const [result] = await connection.execute('SELECT * FROM course WHERE id=?', [id])
    return result[0]
  },
}
