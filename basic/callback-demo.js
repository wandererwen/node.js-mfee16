function sum(n, cb) {
    let result = 0;
    for(let i=1; i<=0; i++){
        result += i;
    }
    // 回頭呼叫
    cb(result);
    // return result;
}

// let ans = sum(10);
// console.log(ans);
// ans = ans + sum(4);
// console.log(ans);

function reportAns(ans){
    console.log(`Hi, Answer is ${ans}`);
}

function reportAns2(ans){
    console.log(`Hello, Answer is ${ans}`);
}

sum(10, reportAns);