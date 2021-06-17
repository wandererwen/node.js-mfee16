// import express package
const express = require("express");

// use express to create express application "app"
let app = express();

// middleware 中間件 中介函式
app.use(function (req, res, next) {
    let current = new Date();
    console.log(`Visiter came at ${current}`);
    // 幾乎都要呼叫，讓他往下繼續
    next(); // middleware also runs from top to bottom
});

/* inside express */
// req -> middlewares..... -> router

// 路由 router
app.get("/", function (req, res) {
    res.send("Hey Express");
})

// express run from top to bottom and stops when response found
app.get("/about", function (req, res) {
    res.send("About Express A");
})

// therefore below code will not be executed
app.get("/about", function (req, res) {
    res.send("About Express B");
})
//

app.get("/test", function (req, res) {
    res.send("Test Express");
})

app.listen(3000, () => {
    console.log(`Running, Port 3000`);
})

/* package, module, framework
    size: framework > package > module
    express is a package, but is complete to be seen as framework
*/