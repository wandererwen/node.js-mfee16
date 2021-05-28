### (1) 請問下列程式執行後的結果為何？為什麼？

```javascript
console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 1000);
})();

console.log("end");
```

```
start
IIFE
end
Timeout
```

因setTimeout是瀏覽器提供的WebAPI，當setTimout()在stack中執行時，會將setTimeout中的callback function放到WebAPIs中，這時setTimeout()即執行結束並從stack中抽離。等待設定的時間倒數完畢，callback function會被移動到task queue，直到stack清空後才會被放入執行。

### (2) 請問下列程式執行的結果為何？為什麼？

```javascript
console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 0);
})();

console.log("end");
```

```
start
IIFE
end
Timeout
```

因event loop的條件必須等到stack是空的才會隨之執行，程式執行結果與題一的結果會是一樣的。

### (3) 請問下列程式執行的結果為何？為什麼？

```javascript
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  bar();
  baz();
};

foo();
```

```
foo
bar
baz
```

JavaScript是單一執行緒的程式語言，並會在堆疊中記錄目前執行到哪一段程式嗎。當進入某一個函式時，這個函式會被推至堆疊的最上方；當該函式執行結束，則會將此函式從堆疊的最上方抽離（後進先出的資料結構）。因此foo()會先被呼喚進入堆疊最上方，接著依序在foo()中呼叫bar()和baz()進入堆疊最上方執行程式碼。

### (4) 請問下列程式執行的結果為何？為什麼？

```javascript
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  setTimeout(bar, 0);
  baz();
};

foo();
```

```
foo
baz
bar
```

由於setTimeout()是存在於JavaScript執行緒以外的WebAPI，會先執行堆疊中依序進入的foo()和baz()，並從堆疊中抽離後，才會執行setTimeout中的回呼函式bar。