const express = require('express')
const app = express()

const name = 'Eliel'

app.get('/student', function (req, res) {
  res.send(`My name is ${name}`)
})

app.listen(3000, () => {
    console.log("Server running on port 3000!")
})