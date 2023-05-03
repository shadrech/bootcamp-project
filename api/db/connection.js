import mysql from 'mysql2/promise';
import dotenv from "dotenv"

dotenv.config()

export let connection

export async function createConnection() {
  connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
  });
}
