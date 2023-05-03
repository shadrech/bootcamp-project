const connection = require("../connection")

module.exports = {
  async create(fields) {
    const result = await connection.execute(
      'INSERT INTO student(name, email) VALUES(?, ?)',
      [fields.name, fields.email]
    )
    console.log('CREATY--->', result)

    return result[0]
  },

  async fetch(name) {
    const query = 'SELECT * FROM `student`'
    const values = []

    if (name) {
      query += " WHERE `name` ILIKE '%?%'"
      values.push(name)
    }

    const result = await connection.execute(query, values)
    console.log('RES--->', result)
    return result[0]
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
    console.log('UPDATE--->', result)
    const [rows] = await connection.execute(`SELECT * FROM student WHERE id=?`, [id])
    return rows[0]
  }
}
