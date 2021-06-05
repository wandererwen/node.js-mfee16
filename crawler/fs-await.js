const axios = require("axios");
// 引入 promise 版的 fs
const fs = require("fs/promises");
const moment = require("moment");

// 因有fs promise版本，不需要自己寫
// function readFilePromise() {
//   return new Promise((resolve, reject) => {
//     fs.readFile("stock.txt", "utf8", (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     })
//   })
// }

(async function () {
  try {
    let stockCode = await fs.readFile("stock.txt","utf8");
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
      // TODO 應該要處理查不回來的情況
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