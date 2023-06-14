const express = require('express');
const studentModel = require('./models/students');
const bodyParser = require('body-parser');

const Mthaapp = express();

Mthaapp.use(bodyParser.json());

Mthaapp.get('/student', (req, res) => {
  const result = studentModel.getStudents();
  res.json(result);
});

// Mthaapp.put('/student', (req, res) => {
//   const updatedStudents = studentModel.putStudents(req.body);
//   res.json(updatedStudents); 
// });

Mthaapp.post('/student', (req, res) => {
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
