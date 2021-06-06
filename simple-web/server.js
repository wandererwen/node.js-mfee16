// http 是 nodejs 內建的 web server，不需要安裝
// https://nodejs.org/docs/latest-v14.x/api/index.html
const http = require("http");

// createServer(Listener)
// Listener(request, response) 負責處理進來的連線
// request 請求物件
// response 回覆物件
const server = http.createServer((req, res) => {
    console.log("連線成功");
    console.log(req.url); // 請求網址資訊
    res.statusCode = 200; // 2xx, 3xx, 4xx, 5xx
    res.setHeader("content-type", "text/plain;charset=utf-8") // 中文顯示

    switch (req.url) {
        case "/":
            res.end("嗨 這是首頁");
            break;
        case "/test":
            res.end("這是測試頁面");
            break;
        case "/about":
            res.end("這是關於頁面")
            break;
        default:
            res.writeHead(404);
            res.end("Not Found");
    }
    // res.write("嘿，這是我的回覆");
    // res.end;
});

// port 
server.listen(3000, () => {
    console.log("跑裡來啊，收 3000 port");
});
    
    // const connection = mysql.createConnection(); -> 建立物件
    // connection.connect -> 真實連線

    // localhost 127.0.0.1
    // Public IP: 34.217.120.25
    // 預設 80 ?

    // PHP --> 搭配 web server (apache or nginx)
    // NodeJS 直接開發一個 web server

    // npm run dev ===> node server.js
