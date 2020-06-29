---
title: JavaScript 深入淺出 Async & Await
date: 2020-06-30 01:34:55
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

上次看完 Promise 如何快速解決 callback hell 之後這次要來介紹 ES7 的兄弟檔 `Async` & `Await`。

<!-- more -->

# `Async` & `Await`
在 ES 7 橫空出世的 `Async` 與 `Await`，最主要的功能就是協助 Promise 的操作，還記得之前基本的 Promise 用法嗎？

```js
function funcA(){
  return new Promise(res => {
    setTimeout(()=> res('funcA done!'), (Math.random() + 1) * 1000)
  })
}
function funcB(){
  return new Promise(res => {
    setTimeout(()=> res('funcB done!'), (Math.random() + 1) * 1000)
  })
}
function funcC(){
  return new Promise(res => {
    setTimeout(()=> res('funcC done!'), (Math.random() + 1) * 1000)
  })
}

funcA()
  .then(res => {
    console.log(res)
    return funcB()
  })
  .then(res => {
    console.log(res)
    return funcC()
  })
  .then(res => {
    console.log(res)
  })
```

而 `async` 功用就是包裹一個函式，使其最後會返回 Promise 物件，而 `await` 就是用來等待每個非同步的完成，才往下執行：

```js
function funcA(){
  return new Promise(res => {
    setTimeout(()=> res('funcA done!'), (Math.random() + 1) * 1000)
  })
}
function funcB(){
  return new Promise(res => {
    setTimeout(()=> res('funcB done!'), (Math.random() + 1) * 1000)
  })
}
function funcC(){
  return new Promise(res => {
    setTimeout(()=> res('funcC done!'), (Math.random() + 1) * 1000)
  })
}

let result = async() => {
  let a = await funcA()
  let b = await funcB()
  let c = await funcC()
  console.log( a + b + c)
}

result() // 'funcA done!funcB done!funcC done!'
```

每當執行到 `await`，它都會等待 `Promise` 回應，因此若要寫出非同步合併的效果就會更加方便了！