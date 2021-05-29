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

let doWorkPromise = function(job, timer, success){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let dt = new Date();
            if(success){
                // 成功
                return resolve(`完成工作： ${job} at ${dt.toISOString()}`);
            }
            // 這個情輕不會失敗
            // if(err){
                // 失敗
                reject(`工作失敗： ${job} at ${dt.toISOString()}`);
            // }
        }, timer);
    });
};

// 刷完牙 > 吃早餐 > 寫功課
// Promise.then.catch
// Promise Chain
doWorkPromise("刷牙", 2000, false)
    .then((result) => {
        // fulfilled 處理成功 resolve
        console.log(result);
        return doWorkPromise("吃早餐", 3000, true);
    })
    .then((result) => {
        console.log(result);
        return doWorkPromise("寫功課", 5000, true);
    })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        // rejected 處理失敗 reject
        console.error("發生錯誤", err);
    })
    .finally(() => {
        console.log("工作完畢")
    });