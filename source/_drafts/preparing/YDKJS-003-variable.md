# variable
必須是合法的標識符（identifiers）：須以a- z，A- Z，$，或_開頭。它可以包含任意這些字符外加數字0- 9。

## Function Scopes 函數作用域
宣告變數將屬於當前的函數作用域，位於任何函數外部的頂層，它就屬於全局作用域（global scope）。

```js
var a = 'global scope'

function sum () {
    var a = 'function scope'
    console.log(a) // 'function scope'
}

console.log(a) // 'global scope'
```

### Hoist 提升
無論var出現在一個作用域內部的何處，這個聲明都被認為是屬於整個作用域，而且在作用域的所有位置都是可以訪問的。

```js
function test() {
    console.log(a)
    var a = 3;
    console.log(a)
}
```

實際在直譯（interpret）的過程中，程式碼會被翻譯成類似這樣：

```js
function test() {
    var a;
    console.log(a) // 因此是 undefined
    a = 3
    console.log(a) // 因此是 3
}
```

### Hoist 之 Temporal dead zone（暫時性死區）
這是在 ES6 新增的 `let`、`const` 關鍵字所出現的概念，全名叫做 `Temporal dead zone`

一開始大家會誤以為 `let`、`const` 沒有提升（Hoist）的概念：
```js
console.log(a) // ReferenceError: a is not defined
let a
```

但其實有：
```js
var a = 10
function test(){
  console.log(a) // ReferenceError: a is not defined
  let a
}
test()
```

其實 `let`、`const` 也有被提升，只是提升後的行為跟 var 比較不一樣，所以乍看之下你會以為它沒有提升。

可參考：
https://blog.huli.tw/2018/11/10/javascript-hoisting-and-tdz/

## condition 條件
除了前面提過的內容之外，在 `switch condition` 中是具有掉落（fall through）特性的：

一般的例子：
```js
switch (a) {
    case 1:
        // do something
        break;
    case 2:
        // do another thing
        break;
    default:
        // other things
        break;
}
```

掉落的例子：
```js
switch (a) {
    case 1:
    case 2:
        // do something
        break;
    default:
        // other things
        break;
}
```
現在不論 `a` 的值為 `1`、`2` 都會執行 `do something` 的區塊。

## use strict 嚴格模式
ES5 新增一個嚴格模式，在嚴格模式底下，它不允許因為省略了var而進行隱含的自動全局變量聲明：
```js
'use strict'

a = 'test' // ReferenceError 
```

up & going ch2
https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/up%20%26%20going/ch2.md
https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/up%20%26%20going/ch2.md

up & going
https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/up%20&%20going/README.md#you-dont-know-js-up--going
https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/up%20&%20going/README.md#you-dont-know-js-up--going
