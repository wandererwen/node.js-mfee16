const connection = require("./utils/db"); // ./utils 當前資料夾

// import express package
const express = require("express");

// use express to create express application "app"
let app = express();

/* public */
// 可以指定一個或多個目錄是「靜態資源目錄」
// 自動幫你為 public 裡面的檔案建立路由
app.use(express.static("public"));

/* views */
// 第一個變數 views，第二個檔案夾名稱
app.set("views", "views");

/* view engine */
// 告訴 express 我們用 view engine 是 pug
app.set("view engine", "pug");

// middleware 中間件 中介函式
app.use(function (req, res, next) {
    let current = new Date();
    console.log(`Visiter came at ${current}`);
    // 幾乎都要呼叫，讓他往下繼續
    next(); // middleware -> also runs from top to bottom
});

// code for testing purpose
app.use(function (req, res, next) {
    console.log("useless middleware");
    // 幾乎都要呼叫，讓他往下繼續
    next(); // middleware -> also runs from top to bottom
});

/* inside express */
// req -> middlewares..... -> router

// 路由 router
// (request, response) {} 去回應這個請求
app.get("/", function (req, res) {
    res.send("Hey Express");
})

app.get("/about", function (req, res, next) {
    // console.log("This is About");
    res.render("about");
    next();
})

/* index */
app.get("/", function (req, res) {
    res.render("index");
})

/* about */
app.get("/about", function (req, res) {
    res.render("about");
})

// 1. express run from top to bottom and stops when response is found
// app.get("/about", function (req, res, next) {
//     // res.send("About Express A"); 
//     console.log("This is About");
//     next(); // 3. but with middleware, it will pass on to the next request
// })

// 2. therefore below response code will not be executed
// app.get("/about", function (req, res) {
//     res.send("About Express B");
//     // res.json("About Express B"); // 4. in most cases, use json to response
// })
// //

app.get("/test", function (req, res) {
    res.send("Test Express");
})

// moved to routes > stock.js and import by below code
/* stock */
let stockRouter = require('./routes/stock');
app.use('/stock', stockRouter)

let apiRouter = require("./routes/api");
app.use("/api", apiRouter)

/* stock list */
// app.get("/stock", async (req, res) => {
//     let queryResults = await connection.queryAsync("SELECT * FROM stock;");
//     res.render("stock/list", {
//         stocks: queryResults,
//     });
// });

/* stock detail */
// app.get("/stock/:stockCode", async (req, res) => {
//     let queryResults = await connection.queryAsync("SELECT * FROM stock_price WHERE stock_id = ? ORDER BY date;", req.params.stockCode);
//     res.render("stock/detail", {
//         stockPrices: queryResults,
//     });
// });

/* 404 not found*/
// 必須放在所有路由的下方
app.use(function (req, res, next) {
    // 表示前面的路由都找不到
    // http status code: 404
    res.status(404);
    res.render("404");
});

/* 500 error */
app.use(function (err, reg, res, next) {
    console.log(err.message);
    res.status(500);
    res.send("500 - Internal Server Error");
})

app.listen(3000, async () => {
    await connection.connectAsync();
    console.log(`Running, Port 3000`);
});

/* package, module, framework
    size: framework > package > module
    express is a package, but is complete to be seen as framework
*/