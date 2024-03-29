/* install and require mysql, dotenv, bluebird */
const mysql = require("mysql");
const Promise = require("bluebird");
require('dotenv').config();

//設定資料庫連線
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  dateStrings: true,
});
//connection->Promise化
connection = Promise.promisifyAll(connection);

module.exports = connection;
// exports.connection = connection; // 物件底下的屬性


/*
const connection = require("./utils/db");
connection.connection.connectAsync

connection
{
    connection: connection
}

const connection = require("./utils/db");
connection.connectAsync

{...} = connection

*/