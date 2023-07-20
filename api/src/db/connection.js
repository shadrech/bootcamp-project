import mysql from 'mysql2/promise';

const database = {
  connection: null,
  async createConnection() {
    database.connection = await mysql.createConnection({
      host: 'localhost',
      user: 'user',
      password: 'password',
      database: 'admin',
    });
  }
};

export { database };
