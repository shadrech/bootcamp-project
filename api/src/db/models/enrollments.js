import { database } from '../connection.js';
import { v4 as uuidv4 } from 'uuid';

const enrollmentDbModel = {
    async create(fields) {
        const { studentId, courseId, endDate } = fields;
        const id = uuidv4();
        const values = [id];

        let query = 'INSERT INTO enrollment(id';
        let placeholders = '(?';

        if (studentId) {
            query += ', studentId';
            placeholders += ', ?';
            values.push(studentId);
        }

        if (courseId) {
            query += ', courseId';
            placeholders += ', ?';
            values.push(courseId);
        }

        if (endDate) {
            query += ', endDate';
            placeholders += ', ?';
            values.push(endDate);
        }

        query += ') VALUES ' + placeholders + ')';

        try {
            await database.connection.execute(query, values);
            return id;
        } catch (err) {
            console.error('Error while creating enrollment:', err);
            throw err; // Rethrow the error to handle it at a higher level
        }
    },

    async fetchById(id) {
        try {
            const result = await database.connection.execute('SELECT * FROM enrollment WHERE id = ?', [id]);
            return result[0][0];
        } catch (err) {
            console.error('Error while fetching enrollment by ID:', err);
            throw err;
        }
    },

    async fetch() {
        try {
            const result = await database.connection.execute('SELECT * FROM enrollment');
            return result[0];
        } catch (err) {
            console.error('Error while fetching enrollments:', err);
            throw err;
        }
    },

    async update(id, fields) {
        const { score, grade, endDate } = fields;
        let updateQuery = 'UPDATE enrollment SET';
        const updateParams = [];

        if (score) {
            updateQuery += ' score = ?,';
            updateParams.push(score);
        }
        if (grade) {
            updateQuery += ' grade = ?,';
            updateParams.push(grade);
        }
        if (endDate) {
            updateQuery += ' endDate = ?,';
            updateParams.push(endDate);
        }

        updateQuery = updateQuery.slice(0, -1);
        updateQuery += ' WHERE id = ?';
        updateParams.push(id);

        try {
            const result = await database.connection.execute(updateQuery, updateParams);
            console.log(result);
            return result[0];
        } catch (err) {
            console.error('Error while updating enrollment:', err);
            throw err;
        }
    },

    async delete(id) {
        try {
            const result = await database.connection.execute('DELETE FROM enrollment WHERE id = ?', [id]);
            return result[0];
        } catch (err) {
            console.error('Error while deleting enrollment:', err);
            throw err;
        }
    },
};

export { enrollmentDbModel };
