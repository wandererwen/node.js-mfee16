const axios = require('axios').default;

// Make a request for a user with a given ID
// axios.get('/user?ID=12345')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

// Optionally the request above could also be done as
axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
    params: {
        response: JSON,
        date: 20210528,
        stockNo: 2603
    }
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });  

// Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }


/*
crawler
    npm install 
     -> 讀 package.json "depenDencies"
     -> axios -> npm install axios
                    -> axios / package.json "depenDencies"
                        -> follow-redirects
*/