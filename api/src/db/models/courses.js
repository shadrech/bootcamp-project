import { v4 } from 'uuid'
import db from '../connection'

const courseDbModel = {
  create: async function (fields) {
    const id = v4();
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

  fetchAll: async function () {
    const result = await db.connection.execute('SELECT * FROM course');
    return result[0]
  },
}

export default courseDbModel
