const { json } = require("express")

$.ajax({
    type: "post",
    url: "api/stock",
    dataType: "json",
})
.done(function(msg){
    console.log(msg);
})
.always(function () {
    
});