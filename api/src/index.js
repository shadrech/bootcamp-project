const express = require('express');
const studentModel = require('./models/students');
const bodyParser = require('body-parser');
const validator = require('express-joi-validation').createValidator({});
const Joi = require('joi');

const Mthaapp = express();

Mthaapp.use(bodyParser.json());

const studentSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email().required()
});

Mthaapp.get('/student', (req, res) => {
  const result = studentModel.getStudents();
  res.json(result);
});

// Mthaapp.put('/student', (req, res) => {
//   const updatedStudents = studentModel.putStudents(req.body);
//   res.json(updatedStudents); 
// });

Mthaapp.post('/student', validator.body(studentSchema), (req, res) => {
  const createdStudents = studentModel.postStudents(req.body);
  res.json(createdStudents); 
});

Mthaapp.put('/student/:id', (req, res) => {
  const { id } = req.params;
  const result = studentModel.putStudents(Number(id), req.body);
  res.json(result);
});

Mthaapp.delete('/student/:id', (req, res) => {
  const { id } = req.params;
  const result = studentModel.deleteStudents(Number(id), req.body);
  res.json(result);
});


const port = 3000;

Mthaapp.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
