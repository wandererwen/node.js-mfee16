// 不寫路徑的話，會先到 modules 裡找
const drink = require("./beer")
const origins = require("../modules/origin");

/* origins */
console.log(origins); // originA = 
origins.originA = "asdf";

/* drink */
// console.log(drink);

// console.log(drink.getOrigin());

// drink.setOrigin("Japan");