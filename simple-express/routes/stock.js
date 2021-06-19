// routes/stock.js
const express = require("express");
const router = express.Router();

const connection = require("../utils/db");

/* stock list */
router.get("/", async (req, res) => {
    let queryResults = await connection.queryAsync("SELECT * FROM stock;");
    res.render("stock/list", {
        stocks: queryResults,
    });
});

// todo
// 模組化
// 股票標題
// 分頁
// 檢查這個股票代碼是否有效（存在於列表內？）

/* stock detail */
router.get("/:stockCode", async (req, res) => {
    let queryResults = await connection.queryAsync("SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date;", req.params.stockCode);
    res.render("stock/detail", {
        stockPrices: queryResults,
    });
});
// :stockCode /stock/2330
// stock?stockCode=2330

module.exports = router;