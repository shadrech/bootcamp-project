import express from 'express';
import { createValidator } from 'express-joi-validation';
import bodyParser from 'body-parser';
import { database } from './db/connection.js';
import { studentController } from './controllers/students/index.js';
import { postStudentBodySchema, putStudentBodySchema } from './controllers/students/validators.js';
import { putCourseBodySchema, postCourseBodySchema } from './controllers/courses/validators.js';
import { courseController } from './controllers/courses/index.js';
import { enrollmentController } from './controllers/enrollment/index.js';
import { postEnrollmentSchema, putEnrollmentSchema } from './controllers/enrollment/validators.js';

const app = express();
const validator = createValidator({});

async function start() {
  await database.createConnection();

  app.use(bodyParser.json());

  app.route('/students')
    .get(studentController.getStudents)
    .post(validator.body(postStudentBodySchema), studentController.createStudent);

  app.route('/students/:id')
    .put(validator.body(putStudentBodySchema), studentController.updateStudent)
    .delete(studentController.deleteStudent)
    .get(studentController.getStudent);

  app.route('/courses')
    .get(courseController.getCourses)
    .post(validator.body(postCourseBodySchema), courseController.createCourse);

  app.route('/courses/:id')
    .put(validator.body(putCourseBodySchema), courseController.updateCourse)
    .delete(courseController.deleteCourse)
    .get(courseController.getCourse);

  app.route('/enrollments')
    .get(enrollmentController.getEnrollments)
    .post(validator.body(postEnrollmentSchema), enrollmentController.createEnrollment);

  app.route('/enrollments/:id')
    .put(validator.body(putEnrollmentSchema), enrollmentController.updateEnrollment)
    .delete(enrollmentController.deleteEnrollment)
    .get(enrollmentController.getEnrollment);

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

start();
