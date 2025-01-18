"use strict"
const mysql = require("mysql2");
require("dotenv").config();
require("dotenv").configDotenv();

const pool_connection = mysql.createPool({
    password: process.env.DBMS_CONNECTION_PASSWORD,
    database: process.env.DB,
    user: process.env.DBMS_CONNECTION_USER,
    host: process.env.DBMS_CONNECTION_HOST,
    port: process.env.DBMS_CONNECTION_PORT
});

pool_connection.getConnection((error, connection) => {
    error ? console.log("connection error", error)
        : console.log("Connected to database successfully!");
});

module.exports = pool_connection.promise();