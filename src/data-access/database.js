// dbConfig.js
require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_ENDPOINT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as ID " + connection.threadId);
});

module.exports = connection;
