// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210523
// &stockNo=2610

// npm i axios
// 引入 axios
const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");
const mysql = require("mysql");
const Promise = require("bluebird");
require("dotenv").config();

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection = Promise.promisifyAll(connection);
// connection.query(); // callback
// connection.queryAsync(); // async

(async function () {
    try {
        await connection.connectAsync();

        let stockCode = await fs.readFile("stock.txt", "utf8");
        console.log(`讀到的股票代碼: ${stockCode}`);
        let stock = await connection.queryAsync(
            `SELECT stock_id FROM stock WHERE stock_id = ?`,
            [stockCode]
        );
        console.log("確認資料庫資料筆數:" + stock.length);

        if (stock.length <= 0) {
            console.log("開始查詢");
            let response = await axios.get(
                `https://www.twse.com.tw/zh/api/codeQuery?query=${stockCode}`
            );
            let answer = response.data.suggestions.shift();
            let answers = answer.split("\t");
            console.log(answers);
            if (answers.length > 1) {
                console.log(`儲存股票名稱 ${answers[0]} ${answers[1]}`);
                console.log("回傳資料:", answers);
                connection.queryAsync(
                    `INSERT INTO stock (stock_id, stock_name) VALUES (?);`,
                    [answers]
                );
            } else {
                throw "查詢股票名稱錯誤";
            }
        }

        // 表示 stock 裡，已經有該 stock id 跟 name 了
        console.log(`查詢股票成交資料 ${stockCode}`);
        let prices = await axios.get(
            "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
            {
                params: {
                    response: "json",
                    date: moment().format("YYYYMMDD"),
                    stockNo: stockCode,
                },
            }
        );
        if (prices.data.stat !== "OK") {
            throw "查詢股價失敗";
        }
        // 處理資料
        console.log(prices.data.data);
        // 處理多筆資料
        // 民國年
        // '1,639,689,721' 字串、而且有逗號 --> 要處理逗號，然後再轉數字
        // +13.00 不需要先處理 + - 號
        // ["日期","成交股數","成交金額","開盤價","最高價","最低價","收盤價","漲跌價差","成交筆數"]
        // ["110/05/31","184,435,544","3,284,208,706","18.35","18.35","17.50","17.55","-0.55","47,987"]
        // let item = prices.data.data[0];
        /* method 1: Promise.all，每筆資料 insert 的 promise */
        let insertPromises = prices.data.data.map((item) => {
            item = item.map((value) => {
                return value.replace(/,/g, "");
            });
            // 110/05/31 -> 西元年
            // parseInt(date.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")) + 19110000;
            // item[0].replace(/\\/g, "") -> 1100531 -> 20210531 YYYYMMDD -> YYYY-MM-DD YYYY/MM/DD
            // 另一種做法：把[年]加上1911再放回去跟月、日組合
            // date
            item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000; // 取掉斜線 -> 20210531
            item[0] = moment(item[0], "YYYYMMDD").format("YYYY-MM-DD"); // 2021-05-31
            item.unshift(stockCode);

            return connection.queryAsync(
                // ignore 重複時忽略
                "INSERT IGNORE INTO stock_price(stock_id, date, volume, amount,open_price, high_price, low_price, close_price, delta_price, transactions) VALUES (?)", [item]
            );
        });
        // console.log(insertPromises);
        let insertResults = await Promise.all(insertPromises); // 全部做完才通知我
        console.log(insertResults.length);
    } catch (error) {
        console.error("我是 catch");
        console.error(error);
    } finally {
        connection.end();
    }
})();
        
/* method 2: 批次 insert */
let prepareData = prices.data.data.map((item) => {
    item = item.map((value) => {
        return value.replace(/,/g, "");
    });
    // 110/05/31 -> 西元年
    // parseInt(date.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")) + 19110000; 
    // item[0].replace(/\\/g, "") -> 1100531 -> 20210531 YYYYMMDD -> YYYY-MM-DD YYYY/MM/DD
    // 另一種做法：把[年]加上1911再放回去跟月、日組合
    // date
    item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000; // 取掉斜線 -> 20210531
    item[0] = moment(item[0], "YYYYMMDD").format("YYYY-MM-DD"); // 2021-05-31
    item.unshift(stockCode);
    return item;
});
console.log(prepareData);
let insertResult = await connection.queryAsync(
    "INSERT IGNORE INTO stock_price(stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?", [prepareData]
    // [item0Ary, item1Ary, item2Ary, item3Ary] 已經是陣列
    // 只有一筆應拿掉小括號 ()
);
console.log(insertResult);
 } catch (error) {
    console.error("我是 catch");
    console.error(error);
} finally {
    connection.end();
}
}) ();