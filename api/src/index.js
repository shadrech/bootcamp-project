const express = require('express')
const validator = require('express-joi-validation').createValidator({})
const bodyParser = require('body-parser')

const { createConnection } = require('./db/connection')

const { studentController } = require('./controllers/student')
const { postStudentBodySchema, putStudentBodySchema } = require('./controllers/student/validators')
const { courseController } = require('./controllers/course')
const { postCourseBodySchema } = require('./controllers/course/validators')


const app = express()

async function start() {
  await createConnection()
 
  app.use(bodyParser.json())

  app.route('/students')
  .get(studentController.getStudents)
  .post(validator.body(postStudentBodySchema), studentController.createStudent)
app.route('/students/:id')
  .get(studentController.getOne)
  .put(validator.body(putStudentBodySchema), studentController.updateOne)
  .delete(studentController.deleteOne)

app.route('/courses')
  .post(validator.body(postCourseBodySchema), courseController.createCourse)
  .get(courseController.getCourses)

  app.route('/courses/:id')
  .get(courseController.getOneCourse)
    

app.post('/students/:courseId/course', courseController.linkStudentToCourse);




  app.listen(3000, () => console.log('Server running on port 3000'))
}

start()
