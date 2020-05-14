---
title: JavaScript 深入淺出 Synchronous & Asynchronous 同步與非同步
date: 2020-06-01 00:00:00
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

在介紹同步（synchronous）與非同步（asynchronous）前一定要來破個題，那就是

**JavaScript** 的執行期（runtime）一定是有按行數順序的直譯。

可是為何有時執行的函式會稍晚的時候才輸出、執行？

會有這個疑問就讓我們一起來認識認識什麼是同步與非同步吧！

<!-- more -->

在 JavaScript 的執行期（runtime）當中，一定是按行數的順序直譯，因此同步與非同步最好辨認的方式就是會不會**阻塞（blocking）主程式**。

# Synchronous 同步
同步的 JavaScript 函式最大的特色就是**會阻塞**主程式：

```js
var money = 0;

console.log('do something')

while (money < 5) {
  money++
  console.log('money', money)
}

console.log('do another thing')
```

你會發現控制台依序輸出了：

```js
'do something'
'money' 1
'money' 2
'money' 3
'money' 4
'money' 5
'do another thing'
```

這也是我們一般預期寫完程式該要有的順序，然而有時候會有不同的情況發生。

# Asynchronous 非同步
非同步的 JavaScript 函式最大的特色就是**不會阻塞**主程式：

將上面程式碼範例以非同步的方法撰寫：

```js
var money = 0;

console.log('do something')

setTimeout(function () {
  while (money < 5) {
    money++
    console.log('money', money)
  }
},0)

console.log('do another thing')
```

你會發現輸出的順序變成了：

```js
'do something'
'do another thing'
'money' 1
'money' 2
'money' 3
'money' 4
'money' 5
```

現在你會知道了有同步跟非同步兩種寫法，但為何我們需要非同步，以及要怎麼寫非同步的函式呢？

# 為何需要非同步？
之所以在 JavaScript 中會需要使用到非同步的用法原因是 JavaScript 的執行期（runtime）本身是單執行緒（single thread）的，因此若在執行程式時遇到需要長時間執行的程式就會使整個 JavaScript 執行阻塞。

而藉任務循環（Event Loop）的機制，JavaScript 會將其函式交由任務序列（Task Queue）來處理，而一些比較常見被定義為非同步的函式如下：
- `XMLHttpRequest`：預設採用非同步方式取得資料，它另外也提供同步的方式給需要的開發者。
- `fetch`：使用非同步的做法取得資料。
- `setTimeout`、`setInterval`：由於 JavaScript 本身沒有計時器，因此執行後會交由瀏覽器的計時器倒數，時間到了才回傳至任務序列（Task Queue）等待任務循環（Event Loop）機制將其傳入主線程。
- `promise`


# 怎麼寫非同步的函式？
**JavaScript 工程師其實沒辦法自己定義非同步。**

沒錯，JavaScript 本身並沒有提供給你一個機制去定義，然而如果**真的需要**我們可以藉由原本就是被定義為非同步的函式搭配使用：

```js
console.log('開始執行主程式')

setTimeout(function () {
  console.log('主程式執行完畢')
  console.log('再來執行一些東西吧！')
},0)

console.log('處理主程式中')
console.log('處理主程式中')
console.log('處理主程式中')
```

可以看見輸出結果為：

```js
'開始執行主程式'
'處理主程式中'
'處理主程式中'
'處理主程式中'
'主程式執行完畢'
'再來執行一些東西吧！'
```

這裡重點在於 `setTimeout` 本身是非同步的，所以一定會等到主程式結束才會被任務循環機制抓回主程式中執行，裡面要等幾秒則是瀏覽器計時器所需要擔心的，所以並不會因為等 `0` 秒它就會變成同步的。

問題來了，如果說非同步的程式並沒有辦法在第一時間執行，那我們該怎麼處理接下來的程式呢？

詳見 回呼函式（Callback Function）一文
詳見 `Promise` 一文
詳見 `Async` / `Await` 一文

# 參考文章
- [JavaScript 中的同步與非同步（上）：先成為 callback 大師吧！](https://blog.huli.tw/2019/10/04/javascript-async-sync-and-callback/#sync)