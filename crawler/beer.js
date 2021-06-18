// 如果沒有透過 exports 或 module.exports 去暴露資訊的
// 其他的都是 private -> 別人不需要知道的不要讓他知道
const beer = {
    brand: "Asahi",
    origin: "Japan",
};

// export 字串
exports.name = "Beer";

// 存取子
// exports.getOrigin = function () {
//     return "Japan";
// }

exports.getOrigin = function () {
    return beer.origin;
}

exports.setOrigin = function (origin) {
    if (origin == "Japan" || origin == "USA") {
        beer.origin = origin;
    };
    // todo: 不符合，不給改
}

exports.beer = beer;

// module.exports = beer;

// module.exports = {};