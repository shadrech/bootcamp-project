const db = require('../connection');

const enrollmentDbModel = {
    createEnrollment: async function (studentId, courseId) {
      const result = await db.connection.execute('INSERT INTO enrollment(studentId, courseId) VALUES(?, ?)', [studentId, courseId]);
      return result[0].insertId;
    },
  };
  
  module.exports = {
    enrollmentDbModel,
  };