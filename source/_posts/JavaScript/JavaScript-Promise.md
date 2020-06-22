---
title: JavaScript 深入淺出 Promise
date: 2020-06-22 10:07:53
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

繼回呼地獄（Callback Hell）之後，ES 6 推了一個令人振奮的功能，那就是 `Promise`！

Promise 解決了使用回呼時會產生的回呼地獄，讓整個程式平坦化之外，更多了一些 `Promise.all` 、 `Promise.race` 使許多非同步處理能更加的簡潔，

今天就讓我們一起來看看 `Promise` 要怎麼使用吧！

<!-- more -->

# 前情提要
沒有經歷過糟糕的怎麼會懂另一邊的好，所以第一節當然要先看看相對醜醜的寫法。

而在之前 `Promise` 還未出現時，如果我們需要讓不同非同步方法能夠等待可以這麼做：

情境一，有序地等待，直接回呼下一個函式：
```js
function funcA(callback) {
  setTimeout(function() {
    console.log('funcA done!')
    callback()
  }, (Math.random() + 1) * 1000)
}
function funcB(callback) {
  setTimeout(function() {
    console.log('funcB done!')
    callback()
  }, (Math.random() + 1) * 1000)
}
function funcC(callback) {
  setTimeout(function() {
    console.log('funcC done!')
    callback()
  }, (Math.random() + 1) * 1000)
}

funcA(function(){
  funcB(function(){
    funcC(function(){
      console.log('All Done')
    })
  })
})
```
但這樣會造成回呼地獄。

情境二，互相等待，做一個控管函式，由控管函式確認最後合併結果：

```js
function funcA(callback) {
  setTimeout(function() {
    console.log('funcA done!')
    callback('A')
  }, (Math.random() + 1) * 1000)
}
function funcB(callback) {
  setTimeout(function() {
    console.log('funcB done!')
    callback('B')
  }, (Math.random() + 1) * 1000)
}
function combineResult(func1, func2, callback) {
  var box = []
  funcA(function(val){
    box.push(val)   // A
    if(box.length === 2) {
      callback('All done!')
    }
  })
  funcB(function(val){
    box.push(val)   // B
    if(box.length === 2) {
      callback('All done!')
    }
  })
}

combineResult(funcA, funcB, function(result){
  console.log(result) // All done!
})
```

情境三，互相競爭，做一個控管函式，由控管函式來阻止另一個函式回呼：

```js
function funcA(callback) {
  setTimeout(function() {
    console.log('funcA done!')
    callback('A')
  }, (Math.random() + 1) * 1000)
}
function funcB(callback) {
  setTimeout(function() {
    console.log('funcB done!')
    callback('B')
  }, (Math.random() + 1) * 1000)
}
function raceResult(func1, func2, callback) {
  var box = []
  funcA(function(val){
    box.push(val)   // A
    if(box.length === 1) {
      callback(val)
    }
  })
  funcB(function(val){
    box.push(val)   // B
    if(box.length === 1) {
      callback(val)
    }
  })
}

raceResult(funcA, funcB, function(result){
  console.log(result + ' is first!') // ? is first!
})
```

上面兩種做法雖然已經可以解決一些基礎的等待與競爭情境，但顯然看起來還是不夠乾淨，於似乎我們在 ES6 終於盼到了這一刻，

那就是 `Promise`！

# Promise 基本使用
Promise 顧名思義它主要是用來承諾一些非同步上的行為要如何處理。

而一個基本的 Promise 會有三種狀態：
- pending：等待執行回應。
- resolve（fulfilled）：執行完畢，並且回應完成。
- reject：執行完畢，並且回應失敗。

最基本的用法就是在函式中初始化一個 Promise 物件，並把相關處理放在裡面：

```js
function funcA() {
  return new Promise(function(resolve, reject){
    try {
      setTimeout(function() {
      resolve('funcA done!')        // 回應表示執行完畢，結果成功，並送出成功結果。
    }, (Math.random() + 1) * 1000)
    } catch(err) {                  // 捕捉到錯誤時
      reject(err)                   // 回應表示執行完畢，結果失敗，並送出失敗結果。
    }
  })
}
```

接著當 Promise 執行成功時，我們可以藉由 `then` 去取得 `resolve` 所回應的成功結果，執行失敗則可以藉由 `catch` 去取得 `reject` 所回應的失敗結果：

```js
funcA()
  .then(function(res){
    console.log(res) // 在這裡執行成功的後續處理
  })
  .catch(function(rej){
    console.error(rej) // 在這裡執行失敗的後續處理
  })
```

而其中由 `then` 所返回的值也是 `Promise` 物件，因此你還可以接著做其他後續處理：

```js
funcA()
  .then(function(res){
    return res // 第一波處理後將值回傳，使得接下來能可以繼續使用 Promise 中的 then 方法處理
  })
  .then(function(res){
    console.log(res) // 第二波處理
  })
```

釐清怎麼使用後，接著我們回到第一個情境改寫一下：

```js
function funcA() {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('funcA done!')
    }, (Math.random() + 1) * 1000)
  })
}
function funcB() {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('funcB done!')
    }, (Math.random() + 1) * 1000)
  })
}
function funcC() {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('funcC done!')
    }, (Math.random() + 1) * 1000)
  })
}

funcA()
  .then(function(){
    funcB()
  })
  .then(function(){
    funcC()
  })
```
有沒有看到改寫後整個平坦化了許多！

現在來看看合併與競爭下的 Promise 要怎麼使用：

# Promise.all
在 Promise 之中我們只要將會返回 Promise 物件的函式包裹在一起即可透過 `Promise.all` 等待所有結果後，再發出最後結果：

```js
function funcA() {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('funcA done!')
    }, (Math.random() + 1) * 1000)
  })
}
function funcB() {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('funcB done!')
    }, (Math.random() + 1) * 1000)
  })
}

Promise.all([funcA(), funcB()])
  .then(function(res){
    console.log(res)  // ["funcA done!", "funcB done!"]
  })
```

如此一來它就會等待所有函式都返回結果時，於下一個 `then` 中回傳一個陣列，裡面分別為所有 Promise `resolve` 的結果。

# Promise.race
若是要競爭非同步行為的話，則透過 `Promise.race` 就可以取得第一個執行完畢的結果：

```js
function funcA() {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('funcA done!')
    }, (Math.random() + 1) * 1000)
  })
}
function funcB() {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('funcB done!')
    }, (Math.random() + 1) * 1000)
  })
}

Promise.race([funcA(), funcB()])
  .then(function(res){
    console.log(res)  // 'func? done'
  })
```
如此一來它就會等待第一個回應的結果，並只回傳第一個結果。

# Promise 其餘狀況
除了基本的合併與競爭之外，Promise 還有下列情境可以使用：
- first()：只要第一個 Promise 回應了就執行。
- last()：最後一個 Promise 回應了才執行。
- none()：如果所有 Promise 都失敗了才執行。
- any()：任何一個 Promise 成功了就執行。

以上就是 Promise 基本用法，其餘之外還有一些雷點跟狀況就等待大家來挖掘吧（？

# 參考資料
- [[Javascript] Promise, generator, async與ES6](https://blog.huli.tw/2015/08/26/javascript-promise-generator-async-es6/)
- [JavaScript Promise 全介紹](https://wcc723.github.io/development/2020/02/16/all-new-promise/)
- [[JS] Promise 的使用](https://pjchender.github.io/2017/09/26/js-promise-%E7%9A%84%E4%BD%BF%E7%94%A8/)
- [你懂 JavaScript 嗎？#24 Promise](https://cythilya.github.io/2018/10/31/promise/)
- [重新認識 JavaScript: Day 26 同步與非同步](https://ithelp.ithome.com.tw/articles/10194569?sc=iThelpR)