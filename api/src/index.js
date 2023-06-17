const express = require('express')
const validator = require('express-joi-validation').createValidator({})
const bodyParser = require('body-parser')
const Joi = require('joi')

const studentModel = require('./models/student')

const app = express()

const postStudentBodySchema = Joi.object({
  name: Joi.string().required(),
})

app.use(bodyParser.json())

app.get('/students', (request, response) => {
  const data = studentModel.getStudents()
  response.json(data)
})

app.post('/students', validator.body(postStudentBodySchema), (request, response) => {
  const result = studentModel.createStudent(request.body)
  response.json(result)
})

app.put('/students/:id', (request, response) => {
  const result = studentModel.updateStudent(Number(request.params.id), request.body)
  response.json(result)
})

app.delete('/students/:id', (request, response) => {
  const result = studentModel.deleteStudent(Number(request.params.id))
  response.json(result)
})

app.listen(3000, () => console.log('Server running on port 3000'))
