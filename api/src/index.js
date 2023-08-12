import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import expressJoiValidation from 'express-joi-validation'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import database from './db/connection'

import studentController from './controllers/student'
import { postStudentBodySchema, putStudentBodySchema, createStudentEnrollmentBodySchema } from './controllers/student/validators'
import courseController from './controllers/course'
import { postCourseBodySchema } from './controllers/course/validators'

const app = express()
const validator = expressJoiValidation.createValidator({})

async function start() {
  await database.createConnection()
  app.use(bodyParser.json())
  app.use(fileUpload())

  app.route('/students')
    .get(studentController.getStudents)
    .post(validator.body(postStudentBodySchema), studentController.createStudent)
  app.route('/students/:id')
    .get(studentController.getOne)
    .put(validator.body(putStudentBodySchema), studentController.updateOne)
    .delete(studentController.deleteOne)

  app.route('/courses')
    .get(courseController.getCourses)
    .post(validator.body(postCourseBodySchema), courseController.createCourse)
  
  app.route('/students/:studentId/course')
    .post(validator.body(createStudentEnrollmentBodySchema), studentController.createEnrollment)

  app.listen(3000, () => console.log('Server running on port 3000'))
}

start()
