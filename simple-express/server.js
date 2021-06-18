const connection = require("./utils/db"); // ./utils 當前資料夾

// import express package
const express = require("express");

// use express to create express application "app"
let app = express();

// 可以指定一個或多個目錄是「靜態資源目錄」
// 自動幫你為 public 裡面的檔案建立路由
app.use(express.static("public"));

// 第一個變數 views，第二個檔案夾名稱
app.set("views", "views");

// 告訴 express 我們用 view engine 是 pug
app.set("view engine", "pug");

// middleware 中間件 中介函式
app.use(function (req, res, next) {
    let current = new Date();
    console.log(`Visiter came at ${current}`);
    // 幾乎都要呼叫，讓他往下繼續
    next(); // middleware -> also runs from top to bottom
});

// app.use(function (req, res, next) {
//     console.log("no middleware");
//     // 幾乎都要呼叫，讓他往下繼續
//     next(); // middleware -> also runs from top to bottom
// });

/* inside express */
// req -> middlewares..... -> router

// 路由 router
// (request, response) {} 去回應這個請求
// app.get("/", function (req, res) {
//     res.send("Hey Express");
// })

app.get("/about", function (req, res, next) {
    // console.log("This is About");
    res.render("about");
    next();
})

app.get("/", function (req, res) {
    res.render("index");
})

app.get("/about", function (req, res) {
    res.render("about");
})

// express run from top to bottom and stops when response found
// app.get("/about", function (req, res) {
//     res.send("About Express A");
// })

// therefore below code will not be executed
// app.get("/about", function (req, res) {
//     res.send("About Express B");
//     // res.json("About Express B");
// })
//

app.get("/test", function (req, res) {
    res.send("Test Express");
})

app.get("/stock", async (req, res) => {
    let queryResults = await connection.queryAsync("SELECT * FROM stock;");
    res.render("stock/list", {
        stocks: queryResults,
    });
});

app.listen(3000, async () => {
    await connection.connectAsync();
    console.log(`Running, Port 3000`);
});

/* package, module, framework
    size: framework > package > module
    express is a package, but is complete to be seen as framework
*/