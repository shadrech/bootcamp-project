const { response, request } = require('express')
const express = require('express')
const studentModel = require('./models/students')
const bodyParser = require('body-parser')
const validator = require('express-joi-validation').createValidator({})
const Joi = require('joi')
const { database } = require('./db/connections')

const app = express()

async function start(){
  await database.createConnection()
  const postStudentBodySchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2}),
    age: Joi.number().integer().min(16).max(60)
  })

  app.use(bodyParser.json())


  app.get('/students', (request, response) => {
    const data = studentModel.getStudents()
    response.json(data)
  })

  app.post('/student', validator.body(postStudentBodySchema), async (request, response) => {
    const result = await studentModel.createStudent(request.body)
    response.json(result)
  })

  app.put('/students/:id', (request, response) => {
    const result = studentModel.updateStudent(Number(request.params.id), request.body)
    response.json(result)
  })

  app.delete('/students/:id', (request, response) => {
    const result = studentModel.deleteStudent(Number(request.params.id), request.body)
    response.json(result)
  })


  app.listen(3000, () => {
      console.log("Server running on port 3000!")
  })
}

start()