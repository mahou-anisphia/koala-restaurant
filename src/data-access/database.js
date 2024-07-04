require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: process.env.CONNECTION_LIMIT,
  host: process.env.DB_ENDPOINT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on("connection", (connection) => {
  console.log("New connection established with ID " + connection.threadId);
});

pool.on("acquire", (connection) => {
  console.log("Connection %d acquired", connection.threadId);
});

pool.on("release", (connection) => {
  console.log("Connection %d released", connection.threadId);
});

module.exports = pool;
