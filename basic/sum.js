console.log("Hello");

let name = "wen";

console.log(name);

function sum(n){
    let sum = 0;
    for(i=1; i<=n; ++i)
        sum+=i;
    return sum;
}

console.log(sum(1)); // 1
console.log(sum(2)); // 3
console.log(sum(10)); // 55
console.log(sum(10000)); // 5000050000