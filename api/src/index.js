const express = require('express')
const validator = require('express-joi-validation').createValidator({})
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const { createConnection } = require('./db/connection')

const { studentController } = require('./controllers/student')
const { postStudentBodySchema, putStudentBodySchema, createStudentEnrollmentBodySchema } = require('./controllers/student/validators')
const { courseController } = require('./controllers/course')
const { postCourseBodySchema } = require('./controllers/course/validators')
const app = express()

async function start() {
  await createConnection()
  app.use(bodyParser.json())
  app.use(fileUpload())

  app.route('/students')
    .get(studentController.getStudents)
    .post(validator.body(postStudentBodySchema), studentController.createStudent)
  app.route('/students/:id')
    .get(studentController.getOne)
    .put(validator.body(putStudentBodySchema), studentController.updateOne)
    .delete(studentController.deleteOne)
  app.route('/students/:id/picture')
    .post(studentController.uploadProfilePicture)

  app.route('/courses')
    .get(courseController.getCourses)
    .post(validator.body(postCourseBodySchema), courseController.createCourse)
  
  app.route('/student/:studentId/course/:courseId')
    .post(validator.body(createStudentEnrollmentBodySchema), studentController.createEnrollment)

  app.listen(3000, () => console.log('Server running on port 3000'))
}

start()
