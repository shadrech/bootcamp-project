import { database } from '../connection.js';
import { v4 as uuidv4 } from 'uuid';

const courseDbModel = {
  async create(fields) {
    const { title, description, imageUrl } = fields;
    const id = uuidv4();
    const values = [id];

    let query = 'INSERT INTO course(id';
    let placeholders = '(?';

    if (title) {
      query += ', title';
      placeholders += ', ?';
      values.push(title);
    }

    if (description) {
      query += ', description';
      placeholders += ', ?';
      values.push(description);
    }

    if (imageUrl) {
      query += ', imageUrl';
      placeholders += ', ?';
      values.push(imageUrl);
    }

    query += ') VALUES ' + placeholders + ')';

    try {
      await database.connection.execute(query, values);
      return id;
    } catch (err) {
      console.error('Error while creating course:', err);
      throw err;
    }
  },

  async fetchById(id) {
    try {
      const result = await database.connection.execute('SELECT * FROM course WHERE id = ?', [id]);
      return result[0][0];
    } catch (err) {
      console.error('Error while fetching course by ID:', err);
      throw err;
    }
  },

  async fetch() {
    try {
      const result = await database.connection.execute('SELECT * FROM course');
      return result[0];
    } catch (err) {
      console.error('Error while fetching courses:', err);
      throw err;
    }
  },

  async update(id, fields) {
    const { title, description, imageUrl } = fields;
    let updateQuery = 'UPDATE course SET';

    const updateParams = [];
    if (title) {
      updateQuery += ' title = ?,';
      updateParams.push(title);
    }
    if (description) {
      updateQuery += ' description = ?,';
      updateParams.push(description);
    }
    if (imageUrl) {
      updateQuery += ' imageUrl = ?,';
      updateParams.push(imageUrl);
    }

    updateQuery = updateQuery.slice(0, -1);
    updateQuery += ' WHERE id = ?';
    updateParams.push(id);

    try {
      const result = await database.connection.execute(updateQuery, updateParams);
      return result[0];
    } catch (err) {
      console.error('Error while updating course:', err);
      throw err;
    }
  },

  async delete(id) {
    try {
      const result = await database.connection.execute('DELETE FROM course WHERE id = ?', [id]);
      return result[0];
    } catch (err) {
      console.error('Error while deleting course:', err);
      throw err;
    }
  },
};

export { courseDbModel };
