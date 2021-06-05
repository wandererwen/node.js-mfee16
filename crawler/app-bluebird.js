const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const Promise = require("bluebird"); // 覆蓋原生函式
// console.log(Promise); 
// const Promise = require("bluebird");

/* 因用bluebird，不需要自己包 */
// function readFilePromise() {
//     return new Promise((resolve, reject) => {
//         fs.readFile("stock.txt", "utf8", (err, data) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(data);
//         });
//     });
// }

/* 方法1：一個函式一個函式包 */
// 用 bluebird 包 callback 版本的 readFile
// const readFileBlue = Promise.promisify(fs.readFile);

/* 方法2：整個 fs 都包起來 */
// 把 fs 所有的 function 都包成 promise
// 但是原生的函式名稱後面會被加上 Async
const fsBlue = Promise.promisifyAll(fs);
// fsBlue.readFileAsync

fsBlue
.readFileAsync("stock.txt", "utf-8")
    .then((stockCode) => {
        console.log("stockCode:", stockCode);
        return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
            params: {
                response: JSON,
                date: moment().format("YYYYMMDD"),
                stockNo: stockCode,
            },
        });
    })
    .then((response) => {
        if (response.data.stat === "OK") {
            console.log(response.data.date);
            console.log(response.data.title);
        }
    })
    .catch((error) => {
        console.log(error);
    })
    .then(function () {
        // always executed
    });
