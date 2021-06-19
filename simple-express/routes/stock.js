const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

module.exports = router;

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
// 分頁(一頁幾筆、當前頁數、總共幾筆、總頁數)
// 檢查這個股票代碼是否有效（是否存在於列表內？）

/* stock detail */
router.get("/:stockCode", async (req, res, next) => {
    // 檢查股票代碼是否存在
    let stock = await connection.queryAsync("SELECT * FROM stock WHERE stock_id = ?;", req.params.stockCode);

    if (stock.length === 0) {
        // throw new Error("No result");
        next();
    }
    stock = stock[0];

    /* 分頁 */
    let count = await connection.queryAsync("SELECT COUNT(*) as total FROM stock_price WHERE stock_id = ?;", req.params.stockCode);

    // console.log(count);

    const total = count[0].total; // 總頁數
    const perPage = 8; // 每頁8筆
    const lastPage = Math.ceil(total / perPage); // 總共頁數

    // console.log(lastPage);

    // 當前頁碼
    // http://localhost:3000/stock/2330
    const currentPage = req.query.page || 1;
    const offset = (currentPage - 1) * perPage;

    let queryResult = await connection.queryAsync("SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date LIMIT ? OFFSET ?;", [req.params.stockCode, perPage, offset]);
    res.render("stock/detail", {
        stock,
        stockPrices: queryResult,
        pagination: {
            lastPage,
            currentPage,
            total,
        },
    });
});

// A: :stockCode /stock/2330
// B: stock?stockCode=2330