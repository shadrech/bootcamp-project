import express from 'express'
import JoiValidation from 'express-joi-validation'

const validator = JoiValidation.createValidator({})
const router = express.Router()

import { studentController } from './student.controller'
import * as studentSchemas from './student.schema'
import { courseController } from './course.controller'
import * as courseSchemas from './course.schema'

router.route('/student')
  .get(validator.query(studentSchemas.get), studentController.get)
  .post(validator.body(studentSchemas.post), studentController.post)
router.route('/student/:id')
  .put(validator.body(studentSchemas.put), studentController.put)
router.route('/student/:id/enroll')
  .post(validator.body(studentSchemas.postEnroll), studentController.enroll)
  .put(validator.body(studentSchemas.putEnroll), studentController.putEnroll)

router.route('/course')
  .get(validator.query(courseSchemas.get), courseController.get)
  .post(validator.body(courseSchemas.post), courseController.post)
router.route('/course/:id')
  .get(courseController.getOne)

  export default router;
