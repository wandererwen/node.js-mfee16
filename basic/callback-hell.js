/* callback hell 1 */
let doWork = function (job, timer, cb){
    setTimeout(() => {
        cb(null, `完成工作 ${job} at ${dt.toISOString()}`);
    }, timer);
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
doWork("刷牙", 2000, function(err, result){
    if(err){
        console.error(err);
        return;
    }
    console.log(result);

    doWork("吃早餐", 3000, function(err, result){
        if(err){
            console.error(err);
            return;
        }
        console.log(result);
        
        doWork("寫功課", 4000, function(err, result){
            if(err){
                console.error(err);
                return;
            }
            console.log(result);
        });
    });
});


/* callback hell 2 */
let doWork = function (job, timer, cb){
    setTimeout(() => {
        cb(null, `完成工作 ${job} at ${dt.toISOString()}`);
    }, timer);
};

function brush() {
    doWork("刷牙", 2000, function(err, result){
        if(err){
            console.error(err);
            return;
        }
        console.log(result);
        eat();
    });
}

function eat() {
    doWork("吃早餐", 3000, function(err, result){
        if(err){
            console.error(err);
            return;
        }
        console.log(result);
        homework();
    });
}

function homework() {
    doWork("寫作業", 5000, function(err, result){
        if(err){
            console.error(err);
            return;
        }
        console.log(result);
    });
}
let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
brush();