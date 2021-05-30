/* url */
// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210528
// &stockNo=2610

/* momentjs */
// https://momentjs.com/docs/#/use-it/node-js/
// var moment = require('moment'); // require
// moment().format(); // 

const axios = require("axios").default;
const fs = require("fs");
const moment = require("moment");

// console.log(moment().format()); 2021-05-30T21:52:46+08:00
// console.log(moment().format("YYYYMMDD")) // 20210530

/* promise */
function readFilePromise() {
    return new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

readFilePromise()
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
