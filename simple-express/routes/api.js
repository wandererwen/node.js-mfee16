const express = require("express");
const router = express.Router();
const connection = require("../utils/db");

module.exports = router;

router.get("/stock", async (req, res) => {
    let queryResults = await connection.queryAsync("SELECT * FROM stock;");
    res.json(queryResults);
});
