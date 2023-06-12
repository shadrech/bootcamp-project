const { response, request } = require('express')
const express = require('express')
const studentModel = require('./models/students')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())


app.get('/students', (request, response) => {
  const data = studentModel.getStudents()
  response.json(data)
})

app.post('/students', (request, response) => {
  const result = studentModel.createStudents(request.body)
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
