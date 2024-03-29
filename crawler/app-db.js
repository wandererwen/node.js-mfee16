/* url */
// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210528
// &stockNo=2610

// 引入 axios
const axios = require("axios").default;
// 從 stock.txt 讀取股票代碼
const fs = require("fs/promises");
const mysql = require("mysql");

// db connection with mysql, password removed
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stock',
});

connection.connect();

fs.readFile("stock.txt", "utf8")
    .then((stockCode) => {
        console.log(`讀到的股票代碼: ${stockCode}`);
        // 用股票代碼查詢股票名稱
        // https://www.twse.com.tw/zh/api/codeQuery?query=2330
        return axios.get(
            `https://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`
        );
    })
    .then(function (response) {
        console.log(response.data);
        // [ '2330\t台積電', '2330R\t台積甲', '2330T\t台積丙' ] - 有資料
        // [ '(無符合之代碼或名稱)' ] - 無資料
        /* method 1 */
        let answer = response.data.suggestions.shift();
        let answers = answer.split("\t");
        console.log(answers);
        if (answers.length > 1) {
            connection.query(`INSERT INTO stock (stock_id, stock_name) VALUES ('${answers[0]}', '${answers[1]}');`,
                function (error, result) {
                    if (error) {
                        throw error;
                    }
                    console.log(result);
                })
            // answers[0] 2330, answers[1] 台積電
        } else {
            console.log(answers[1]); // undefined
            throw "查不到名稱";
        }

        /* method 2 */
        // let answer = response.data.suggestions
        //     .map((item) => {
        //         return item.split("\t");
        //     })
        //     .find((item) => {
        //         return item[0] === stockCode;
        //     });
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        connection.end(); // 養成關掉資料庫的好的習慣，以免爆炸
    });

