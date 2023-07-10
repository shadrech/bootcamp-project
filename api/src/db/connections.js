const mysql = require("mysql2/promise")


const database = {
  connection: null,
  async createConnection() {
    database.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'user',
      database: 'admin',
      password: 'password'
    })
  }
}

module.exports = {
    database
}