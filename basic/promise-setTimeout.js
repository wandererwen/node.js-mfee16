// 下列程式的執行順序
setTimeout(() => console.log("Timeout 1"), 0); // 4

Promise.resolve().then(() => console.log("in promise 2")); // 2

setTimeout(() => console.log("Timeout 3"), 0); // 5

Promise.resolve().then(() => console.log("in promise 4")); // 3

console.log("outside 5"); // 1

// run order: microqueue > timer queue
// promise -> mircoqueue
// setTimeout -> timer queue
