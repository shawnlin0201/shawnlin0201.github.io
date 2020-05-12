---
title: JavaScript 深入淺出 Execution Context Stack（Call Stack）呼叫堆疊
date: 2020-05-18 00:00:00
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

# Execution Context Stack
執行環境中的堆疊又稱呼叫堆疊（Call Stack）顧名思義，其資料結構是一個堆疊（Stack），而這種資料結構處理方式就是後入先出（LIFO，Last in First out）。

例如當我們執行下面程式碼時：

```js
function func1 () {
  func2()
  console.log('func1')
}

function func2 () {
  console.log('func2')
}

console.log('func start')
func1()
console.log('func end')
```

在呼叫堆疊中看起來就像這樣：

![Execution-Context-Stack.png.png](/images/JavaScript/Execution-Context-Stack.png)

一進入 JavaScript 前會執行一個主程式函式來包裹。

接著執行 `func1()`