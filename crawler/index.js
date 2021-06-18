const drink = require("./beer") // 不寫路徑的話，會先到 modules 裡找

console.log(drink);

console.log(drink.getOrigin());

drink.setOrigin("Japan");