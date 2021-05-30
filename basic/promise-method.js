let doWork = function (job, timer, cb){
    setTimeout(() => {
        cb(null, `完成工作 ${job} at ${dt.toISOString()}`);
    }, timer);
};

/* Promise是一個表示「非同步」運算的「最終」「完成或失敗」的物件 */
// new Promise(function(resolve, reject){});
// status: pending/fulfilled/rejected
// 最終成功 --人--> resolve --Promise--> then
// 最終失敗 --人--> reject --Promise--> catch

let doWorkPromise = function(job, timer, success){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let dt = new Date();
            if(success){
                // 成功
                return resolve(`完成工作： ${job} at ${dt.toISOString()}`);
            }
            // 這個情境不會失敗
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

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

/* old method */
let count = 0; 
// 寫功課, 聽音樂, 同學聊天（並行執行）
doWorkPromise("寫功課", 3000, true)
    .then(result => {
        if (count === 3) {
            console.log(result);
        }
    });

doWorkPromise("聽音樂", 2500, true)
    .then(result => {
         if (count === 3) {
            console.log(result);
        }
    });

doWorkPromise("同學聊天", 3500, true)
    .then(result => {
         if (count === 3) {
            console.log(result);
        }
    });

let p1 = doWorkPromise("寫功課", 3000, true)
let p2 = doWorkPromise("聽音樂", 2500, true)
let p3 = doWorkPromise("同學聊天", 3500, true)

/* Promise.all */
// 1. 並行執行（非同步）
// 2. 三件事「都」做完的時候通知我（獨立、不相依）-> console.log
Promise.all([p1, p2, p3])
    .then((values) => {
        console.log("三件工作都完成");
        console.log(values);
    })
    .catch((err) => {
        console.log(err);
    });

/* Promise.race */
// 1. 並行執行（非同步）
// 2. 只要有一件事成功或失敗就候通知我 -> console.log
Promise.race([p1, p2, p3])
    .then((values) => {
        console.log("賽跑看誰先做完");
        console.log(values);
    })
    .catch((err) => {
        console.log(err);
    });

/* Promise.any (v15.0.0) */
Promise.any([p1, p2, p3])
    .then((values) => {
        console.log("只要一個成功即成功");
        console.log(values);
    })
    .catch((err) => {
        console.log(err);
    });

/* Promise.allSettled */
Promise.allSettled([p1, p2, p3])
    .then((values) => {
        console.log("不是fulfilled就是rejected");
        console.log(values);
    })
    .catch((err) => {
        console.log(err);
    });