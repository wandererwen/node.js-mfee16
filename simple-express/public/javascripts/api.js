/* ajax */
$.ajax({
    type: "post",
    url: "api/stocks",
    dataType: "json",
})
.done(function(data){
    console.log(data);
})
.always(function () {
    
});

/* axios */
axios.get('/api/stocks')
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {

    });