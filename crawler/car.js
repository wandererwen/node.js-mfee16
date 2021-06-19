// 如果沒有透過 exports 或 module.exports 去暴露資訊的
// 其他的都是 private -> 別人不需要知道的不要讓他知道
const car = {
    brand: "Ford",
    color: "blue",
};

// export 字串
exports.name = "Car";

// 存取子
// exports.getColor = function () {
//     return "RED";
// }

exports.getColor = function () {
    return car.color;
}

exports.setColor = function (color) {
    if (color == "Yellow" || color == "Red") {
        car.color = color;
    };
    // todo: 不符合，不給改
}

exports.car = car;

// module.exports = car;

// module.exports = {};

/*
module.exports (外部) -> string, function, object <- exports (小心)

car - brand - Ford
    - color - Yellow
*/