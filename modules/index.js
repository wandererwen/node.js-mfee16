// 不寫路徑的話，會先到 modules 裡找
const drink = require("../crawler/beer")
const origins = require("./origin");

/* origins */
console.log(origins); // originA = 
origins.originA = "asdf";

/* drink */
// console.log(drink);

// console.log(drink.getOrigin());

// drink.setOrigin("Japan");