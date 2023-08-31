const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const validator = require('express-joi-validation').createValidator({})
const { database } = require('./db/connections')
const { studentController } = require('./controllers/student')
const { postStudentBodySchema, putStudentBodySchema } = require('./controllers/student/validators')
const { courseController } = require('./controllers/course')
const { postCourseBodySchema, putCourseBodySchema } = require('./controllers/course/validators')
const { postEnrollmentBodySchema } = require('./controllers/enrollement/validators')
const { enrollmentController } = require('./controllers/enrollement')

const app = express()

async function start() {
  await database.createConnection()

  app.use(bodyParser.json())
  app.use(fileUpload())
  


  app.route('/students')
    .get(studentController.getStudents)
    .post(validator.body(postStudentBodySchema), studentController.createStudent)
  app.route('/student/:id')
    .get(studentController.getOne)
    .put(validator.body(putStudentBodySchema), studentController.updateOne)
    .delete(studentController.deleteOne)

  app.route('/courses')
    .get(courseController.getCourses)
    .post(validator.body(postCourseBodySchema), courseController.createCourse)
  app.route('/courses/:id')
    .get(courseController.getOne)
    .put(validator.body(putCourseBodySchema), courseController.updateOne)
    .delete(courseController.deleteOne)
  
  app.route('/student/:studentId/course/:courseId')
    .post(validator.body(postEnrollmentBodySchema), enrollmentController.createEnrollment)

  app.listen(3000, () => {
      console.log("Server running on port 3000!")
  })
}

start()
