---
title: JavaScript 深入淺出 Higher-order function 高階函式
date: 2000-01-01 00:00:00
tags:
- [w3HexSchool]
- [JavaScript]
categories: 
- [JavaScript]
- [JavaScript, 深入淺出]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/JavaScript/JavaScript-logo.png' width='200px' height='200px' />
</div>

<!-- more -->

# Higher-order function
高階函式指的是滿足下列某一個條件的函式：
- 能接受一個、多個函式作為輸入：即為函式引數（functional arguments，縮寫為 funargs）。
- 能輸出一個函式，即為函式值函式（function-valued functions）

比如常見的回呼函式（callback function），與之搭配的即為高階函式：

```js
function getMemberInfo(id, callback) {
  fetch('.../' + id)
    .then(res => res.json())
    .then(res => callback(res))
}

getMemberInfo('c8763', function(data){ // getMemberInfo 函式能接受一個函式作為輸入
  console.log(data)
})
```

另外 Web APIs 中常見的 `setTimeout`、`addEventListener` 也是高階函式：

```js
// setTimeout(fn, time)
setTimeout(function(){
  console.log('Higher-order function!')
},0)

// addEventListener(event, fn)
addEventListener('click', function(){
  console.log('Higher-order function!')
})
```

# Funargs Problem
使用函式引數（funargs）時會遇到兩種問題：
- Upward funargs problems
- Downward funargs problems

## Upward funargs problems
Upward funargs problems，指的是作為被函式回傳的函式（如 callback function），其作用域到底要算誰的？

```js
let x = 10
function funcA(){
  let x = 20
  return funcB()
}

function funcB(){
  console.log(x)
}

let result = funcA()
console.log(result) // ?
```

而這牽扯到作用域的類型，若是動態作用域（dynamic scope）的話這裡的解答應該為 `20`。

但 JavaScript 選擇使用靜態作用域，而靜態作用域是依靠詞彙環境（Lexical Environment）來識別，所以我們可以輕易地從視覺上知道 `funcB` 中的作用域其實是包含 `funcB` 與 `Global` 而不是 `funcB` 與 `funcA` 的組合。

## Downward funargs problems
Downward funargs problems，指的是如果函式被作為引數傳入時，其作用域到底要算誰的？

```js
let x = 10

function funcA(){
  conosle.log(x)
}

function funcB(callback) {
  let x = 20
  callback()
}

funcB(funcA) // console.log 裡的 x 該算誰的作用域
```

一樣的是，選擇動態作用域的語言會跟你說這裡是 `20`，而選擇靜態作用域的 JavaScript 則會跟你說是 `10`。（JavaScript：所見"外面"即所得！）