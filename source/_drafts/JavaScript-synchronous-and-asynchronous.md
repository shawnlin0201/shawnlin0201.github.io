---
title: JavaScript 深入淺出 Synchronous & Asynchronous 同步與非同步
date: 2020-05-24 00:00:00
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

# Asynchronous 非同步
而非同步的 JavaScript 函式最大的特色就是**不會阻塞**主程式：

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

# 為何需要同步、非同步？

- 瀏覽器的非同步
- callback function