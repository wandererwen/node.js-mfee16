/* url */
// https://www.twse.com.tw/exchangeReport/STOCK_DAY
// ?response=json
// &date=20210528
// &stockNo=2610

const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

function readFilePromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

(async function () {
  try {
    let stockCode = await readFilePromise();
    let response = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: JSON,
          date: moment().format("YYYYMMDD"),
          stockNo: stockCode
        },
      });
    if (response.data.stat === "OK") {
      console.log(response.data.date);
      console.log(response.data.title);
    } else {
      // TODO 應該要處查查不回來
    }
  } catch (error) {
    console.log("錯誤", error);
  } finally {
    console.log("完成")
    // TODO
    // 通知管理原來處理
    // 過幾分鐘後再試
  };
})();