let doWork = function (job, timer, cb){
    setTimeout(() => {
        cb(null, `完成工作 ${job} at ${dt.toISOString()}`);
    }, timer);
};

/* Promise是一個表示非同步運算的最終完成或失敗的物件 */
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
// 語法糖(syntax candy) await 只能用在 async function 裡 (await is only valid in async function)

(async function () {
    try {
        let result = await doWorkPromise("刷完牙", 2000, true);
        console.log("await", result);

        // let noAwait = doWorkPromise("刷完牙", 2000, true);
        // console.log("noAwait", noAwait);
        
        result = await doWorkPromise("吃早餐", 2500, true);
        console.log("await", result);
    
        result = await doWorkPromise("寫功課", 3000, true);
        console.log("await", result);
    } catch (err) {
        console.log("錯誤", err);
    } finally {
        console.log("工作完成！")
    }
})(); // 立即實行函式

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);