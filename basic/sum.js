console.log("Hello");

let name = "wen";

console.log(name);

/* Algorithm */
// O(1)

/* method 1 */
function sum(n){
    let sum = 0;
    for(i=1; i<=n; ++i)
        sum+=i;
    return sum;
}
console.time("SUM");
console.timeEnd("SUM");

/* method 2 from classmate#3 */
function sum(m){
    let i=1;
    let total = (i+m)*m/2
    return total;
}
console.time("SUM");
console.timeEnd("SUM");

console.log(sum(1)); // 1
console.log(sum(2)); // 3
console.log(sum(10)); // 55
console.log(sum(10000)); // 5000050000