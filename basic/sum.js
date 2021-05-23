console.log("Hello");

let name = "wen";

console.log(name);

/* Algorithm */
// 0(1) 常數
// return ((1 + n) * n) / 2;
// O(n) 變數 -> 時間上複雜度會隨著n而成長

/* method 1 */
console.time("SUM");
function sum(n){
    let sum = 0;
    for(i=1; i<=n; ++i)
        sum+=i;
    return sum;
}
console.timeEnd("SUM");

/* method 2 from classmate#3 */
console.time("SUM");
function sum(m){
    let i=1;
    let total = (i+m)*m/2
    return total;
}
console.timeEnd("SUM");

console.log(sum(1)); // 1
console.log(sum(2)); // 3
console.log(sum(10)); // 55
console.log(sum(10000)); // 5000050000