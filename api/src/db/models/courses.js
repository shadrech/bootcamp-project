const { v4: uuidv4 } = require('uuid');
const db = require('../connection')

const courseDbModel = {
  create: async function (fields) {
    const id = uuidv4();
    const queryAdditions = ['id', 'title'];
    const parameters = [id, fields.title];

    if (fields.description) {
      queryAdditions.push('description');
      parameters.push(fields.description);
    }

    if (fields.imageUrl) {
      queryAdditions.push('imageUrl');
      parameters.push(fields.imageUrl)
    }

    const questionMarks = queryAdditions.map(() => '?') // [?, ?, ? ...]
      .join(',') // "?,?,?"

    const query = `INSERT INTO course(${queryAdditions.join(',')}) VALUES(${questionMarks})`;

    await db.connection.execute(query, parameters);

    return id;
  },

  fetchById: async function (id) {
    const result = await db.connection.execute('SELECT * FROM course WHERE id = ?', [id]);
    return result[0][0]
  },
}

module.exports = {
  courseDbModel
}
