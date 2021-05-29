let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
let doWork = function (job, timer, cb){
    setTimeout(() => {
        cb(null, `完成工作 ${job} at ${dt.toISOString()}`);
    }, timer);
};

/* Promise是一個表示非同步運算的最終完成或失敗的物件 */
// new Promise(function(resolve, reject){});
// status: pending/fulfilled/rejected

let doWorkPromise = function(job, timer){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 成功
            let dt = new Date();
            resolve(`完成工作： ${job} at ${dt.toISOString()}`);
            // 這個情境剛好不會失敗
            // if(err){
                // 失敗
                // return reject(`工作失敗： ${job} at ${dt.toISOString()}`)
            // }
        }, timer);
    });
};

let brushPromise = doWorkPromise("刷牙", 2000);
console.log(brushPromise);
brushPromise
// fulfilled 處理成功 resolve
.then((result) => {
    console.log(result);
})
.catch((err) => {
    // rejected 處理失敗 reject
    console.error("發生錯誤", err);
});