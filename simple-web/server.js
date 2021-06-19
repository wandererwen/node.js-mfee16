// http 是 nodejs 內建的 web server，不需要安裝
// https://nodejs.org/docs/latest-v14.x/api/index.html
// node searchparams / url
const http = require("http");
const { URL } = require("url");
const fs = require("fs/promises");

// createServer(Listener)
// Listener(request, response) 負責處理進來的連線
// request 請求物件
// response 回覆物件
const server = http.createServer(async (req, res) => {
    console.log("連線成功");
    console.log(req.url); // 請求網址資訊
    res.statusCode = 200; // 2xx, 3xx, 4xx, 5xx
    res.setHeader("content-type", "text/plain;charset=utf-8") // 中文顯示

    // 將 url 一般化，移除他的 query string、非必要的結尾斜線，並且一率小寫
    const path = req.url.replace(/\/?(?:\?.*)?$/, "").toLocaleLowerCase();
    // console.log("path: ", path);
    console.log(`path:${path}`);

    // 處理 query string 查詢字串
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log(url.searchParams);

    // 手動處理路由 router
    switch (path) {
        case "/":
            res.end("嗨 這是首頁");
            break;
        case "/test":
            res.setHeader("content-type", "text/html;charset=utf-8");
            let content = await fs.readFile("test.html");
            // res.end("這是測試頁面");
            res.end(content);
            break;
        case "/about":
            // 把 query string 抓出來用
            // set vs get 存取運算子
            let name = url.searchParams.get("name") || "網友";
            // nodejs 內建的 response 物件, request 物件
            // express 的 res, req 是擴充 nodejs 內建的 res, req
            // express res.send() -> setHeader
            // res.write(""); // nodejs 原生
            res.end(`Hi ${name}, 這是關於頁面`);
            break;
        default:
            res.writeHead(404);
            res.end("Not Found");
    }
    // res.write("嘿，這是我的回覆");
    // res.end;
});

// port 網路協定
server.listen(3000, () => {
    console.log("跑起來啊，收 3000 port");
});
    
    // const connection = mysql.createConnection(); -> 建立物件
    // connection.connect -> 真實連線

    // localhost 127.0.0.1
    // Public IP: 34.217.120.25
    // 預設 80 ?

    // PHP --> 搭配 web server (apache or nginx)
    // NodeJS 直接開發一個 web server

    // npm run dev ===> node server.js



// const item = require("./car") // 不寫路徑的話，會先到 modules 裡找

// console.log(item);

// console.log(item.getColor());

// // item.car.color = "Yellow";
// item.setColor("Yellow");

// console.log(item);

// console.log(item.getColor());
