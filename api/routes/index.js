const router = require("express").Router();
const validator = require('express-joi-validation').createValidator({})

const studentController = require("./student.controller");
const studentSchemas = require("./student.schema");

router.route("/student")
  .get(validator.query(studentSchemas.get), studentController.get)
  .post(validator.body(studentSchemas.post), studentController.post)

router.route("/student/:id")
  .put(validator.body(studentSchemas.put), studentController.put)

module.exports = router;
