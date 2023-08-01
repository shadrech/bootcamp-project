const { database }  = require("../connections");

const enrollmentDbModel = {
    createEnrollment: async function (studentId, courseId, startDate, endDate) {
        const result = await database.connection.execute('INSERT INTO enrollment(studentId, courseId, startDate, endDate) VALUES(?, ?, ?, ?)', [studentId, courseId, startDate, endDate])
      
        return result[0].insertId
    }
};

module.exports = { enrollmentDbModel }