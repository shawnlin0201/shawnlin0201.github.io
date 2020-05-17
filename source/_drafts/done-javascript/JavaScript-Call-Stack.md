---
title: JavaScript 深入淺出 Execution Context Stack（Call Stack）呼叫堆疊
date: 2020-05-18 00:00:00
tags:
- [w3HexSchool]
- [JavaScript]
- [Call Stack]
- [Synchronous]
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

![Execution-Context-Stack.png](/images/JavaScript/Execution-Context-Stack.png)

一進入 JavaScript 前會執行一個主程式函式來包裹。

接著執行 `func1()` 函式，進入 `func1()` 函式後執行 `func2()` 函式。

在執行 `console.log('func2')` 完後，`func2()` 函式會從 stack 中移除。

執行 `console.log('func1')`，`func1()` 函式會從 stack 中移除。

最後整段程式碼都執行完畢時，便把 `main` 也拋出 stack。

這就是 Execution Context Stack（Call Stack）呼叫堆疊的運作方式，也就是為何大家會說 JavaScript 是 **單執行緒（single thread）** 的原因。

但以上的例子都只有同步（synchronous）的情況，如果遇到像是 setTimeout() 等 Web APIs 與需要藉由 Ajax 取得資料的非同步（Asynchronous）情況時，這時候就輪到 Event Loop 與 Job Queue 上場了。

# 參考文章
- [深入理解Javascript之CallStack&EventLoop](https://darjun.github.io/2018/11/23/javascript-callstack-eventloop/)