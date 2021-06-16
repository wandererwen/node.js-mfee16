/* url */
// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210528
// &stockNo=2610

// npm i axios -> 需要安裝因是第三方套件
// 引入 axios
const axios = require("axios");
const fs = require("fs/promises");
const mysql = require("mysql");
const Promise = require("bluebird");
require('dotenv').config();

/* db connection using mysql, password removed */
// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'stock',
// });

/* db connection with dotenv to hide confidential info */
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// due to mysql is callback-based, use bluebird to promisify
connection = Promise.promisifyAll(connection);

(async function () {
  try {
    await connection.connectAsync();
    /* read data 1: fs.readFile */
    let stockCode = await fs.readFile("stock.txt", "utf8");
    /* read data 2: .env */
    // let stockCode = process.env.STOCK;

    // check data exist in db or not
    let result = await connection.queryAsync(
      /* select query 1 */
      // `SELECT stock_id FROM stock WHERE stock_id = ${stockCode}`
      
      /* select query 2: with placeholder value */
        `SELECT stock_id FROM stock WHERE stock_id = ?`, [stockCode]
    );
    console.log("確認資料庫資料筆數:" + stockCode.length);
    console.log(result);

    // if not get data via api
    if (result.length === 0) {
      console.log("開始查詢")
      let response = await axios.get(
        `https://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`
      );
      console.log(response);
      let answer = response.data.suggestions.shift();
      let answers = answer.split("\t");
      if (answers.length > 1) {
        console.log(`儲存股票名稱 ${answers[0]} ${answers[1]}`);
        console.log("回傳資料:", answers);
        // insert data to db
        connection.queryAsync(
          /* insert query 1: */
          // `INSERT INTO stock (stock_id, stock_name) VALUES ('${answers[0]}', '${answers[1]}')`
          
          /* insert query 2: using placeholder value */
          `INSERT INTO stock (stock_id, stock_name) VALUES (?);`,
          [answers]
          /* 本來寫法但因 answers 本身為陣列可直接使用 */
          //`INSERT INTO stock (stock_id, stock_name) VALUES (?);`, [[answers[0], [answers][1]] 
        );
      }
    } else {
      console.log("資料已存在");
    }
  }
  catch (error) {
    console.error(error);
  } finally {
    connection.endAsync();
  }
})();



