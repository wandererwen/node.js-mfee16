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

// db connection, password removed
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'stock',
});

// mysql is callback-based, use bluebird to promisify
connection = Promise.promisifyAll(connection);

(async function () {
  try {
    await connection.connectAsync();
    let stockCode = await fs.readFile("stock.txt", "utf8");
    // check data exist in db or not
    let result = await connection.queryAsync(
      `SELECT stock_id FROM stock WHERE stock_id = ${stockCode}`
    );
    console.log(result);
    // if not get data via api
    if (result.length === 0) {
      let response = await axios.get(
        `https://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`
      );
      console.log(response);
      let answer = response.data.suggestions.shift();
      let answers = answer.split("\t");
      if (answers.length > 1) {
        // insert data to db
        connection.queryAsync(
          `INSERT INTO stock (stock_id, stock_name) VALUES ('${answers[0]}', '${answers[1]}')`
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



