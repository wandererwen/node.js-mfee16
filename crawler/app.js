/* url */
// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210528
// &stockNo=2610

// npm i axios -> 需要安裝因是第三方套件
// 引入 axios
const axios = require("axios").default;

// TODO: 從 stock.txt 讀取股票代碼
// npm i fsnode -> 不用安裝fs(filesystem)因node.js內建
const fs = require("fs");

/* callback */
fs.readFile("stock.txt", "utf8", (error, data) => {
  if (error) {
    console.error("讀檔錯誤", error);
    return;
  }
  axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: JSON,
      date: 20210528,
      stockNo: data
    },
  })
  .then(function (response) {
    if (response.data.stat === "OK");
    console.log(response.data.date);
    console.log(response.data.title);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  console.log(`讀到的 stock code ${data}`);
});

// const stockCode = ???

/*
crawler
    npm install
     -> 讀 package.json "depenDencies"
     -> axios -> npm install axios
                    -> axios / package.json "depenDencies"
                        -> follow-redirects
*/

/* 非同步 */
// call "stack" -> libuv "task queue"
// "task queue" <- "event loop" -> "stack"
let code = fs.readFile("stock.txt", "utf8", (err, data) => { // 1
  // libuv 3
  if (err) {
    return console.error("讀檔錯誤", err);
  }
  console.log(`讀到的 stock code: ${data}`);
  return data;
});
console.log(code); // 2