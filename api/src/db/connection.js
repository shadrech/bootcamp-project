import mysql from 'mysql2/promise'

const database = {
  connection: null,

  async createConnection() {
    console.log('CONNECTING....')
    database.connection = await mysql.createConnection({
      host: process.env.MYSQL_DB_HOST,
      user: 'user',
      database: 'admin',
      password: process.env.MYSQL_DB_PASSWORD
    });
  }
}

export default database
