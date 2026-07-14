import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'franpier10',
    database: process.env.DB_NAME || 'farmacia', // info minima hasta aca para conectarme a la DB

})