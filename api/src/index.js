const express = require('express')
const bodyParser = require('body-parser')

const studentModel = require('./models/student')

const app = express()

app.use(bodyParser.json())

app.get('/students', (request, response) => {
  const data = studentModel.getStudents()
  response.json(data)
})

app.post('/students', (request, response) => {
  const result = studentModel.createStudent(request.body)
  response.json(result)
})

app.listen(3000, () => console.log('Server running on port 3000'))
