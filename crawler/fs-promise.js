const axios = require("axios");
// 引入 promise 版的 fs
const fs = require("fs/promises");
const moment = require("moment");

// 因有fs promise版本，不需要自己包 (v10 and above)
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

// 因為是 promise 版本，所以會回傳 promise 物件
fs.readFile("stock.txt", "utf8")
    .then((stockCode) => {
        console.log("stockCode", stockCode)
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
