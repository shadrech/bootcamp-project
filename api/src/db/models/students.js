import { database } from '../connection.js';

const studentDbModel = {
  async create(fields) {
    if (!fields || !fields.name || !fields.email) {
      throw new Error('Invalid fields for student creation');
    }

    try {
      const result = await database.connection.execute('INSERT INTO student(name, email) VALUES(?, ?)', [fields.name, fields.email]);
      return result[0].insertId;
    } catch (error) {
      throw new Error('Failed to create student');
    }
  },

  async fetchById(id) {
    try {
      const result = await database.connection.execute(
        `SELECT student.*, 
              (SELECT JSON_ARRAYAGG(JSON_OBJECT('courseId', course.id, 'title', course.title, 'description', course.description, 'startDate', enrollment.startDate, 'endDate', enrollment.endDate, 'score', enrollment.score, 'grade', enrollment.grade)) 
               FROM course 
               JOIN enrollment ON course.id = enrollment.courseId 
               WHERE enrollment.studentId = student.id) AS enrolled_courses 
       FROM student 
       WHERE student.id = ?`,
        [id]
      );
      return result[0][0];
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch student by ID');
    }
  },

  async fetch() {
    try {
      const result = await database.connection.execute('SELECT * FROM student');
      console.log(result)
      return result[0];
    } catch (error) {
      throw new Error('Failed to fetch students');
    }
  },

  async update(id, fields) {
    if (!id || !fields) {
      throw new Error('Invalid parameters for student update');
    }

    const { name, email } = fields;
    if (!name && !email) {
      throw new Error('No fields to update');
    }

    let updateQuery = 'UPDATE student SET';

    const updateParams = [];
    if (name) {
      updateQuery += ' name = ?,';
      updateParams.push(name);
    }
    if (email) {
      updateQuery += ' email = ?,';
      updateParams.push(email);
    }

    updateQuery = updateQuery.slice(0, -1);
    updateQuery += ' WHERE id = ?';
    updateParams.push(id);

    try {
      const result = await database.connection.execute(updateQuery, updateParams);
      return result[0];
    } catch (error) {
      throw new Error('Failed to update student');
    }
  },

  async delete(id) {
    if (!id) {
      throw new Error('Invalid student ID');
    }

    try {
      const result = await database.connection.execute('DELETE FROM student WHERE id = ?', [id]);
      return result[0];
    } catch (error) {
      throw new Error('Failed to delete student');
    }
  },
};

export { studentDbModel };
