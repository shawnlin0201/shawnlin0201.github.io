---
title: JavaScript 深入淺出 Microtasks & Marcotask
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
前陣子我們介紹到事件循環（Event Loop）以及任務隊列（Job Queue），使我們更加瞭解 JavaScript 中非同步（Asynchronous）的運作知識，然而並非所有的非同步事件都是排在同一個隊伍裡……

<!-- more -->

# Microtasks & Marcotask
之前我們理解到非同步事件會經由 Web API 依照各自的做法（如： `setTimeoue` 需靠 `Timer` 檢查），之後才排入任務隊列（Job Queue）中，然而任務隊列實際上還可以分為 `Marcotask` 與 `Mircotask` 兩個隊伍。

而各自會排入的事件大概可以分為：
- Marcotasks：`setTimeout`、`setInterval`、I/O、UI 渲染
- Mircotasks：`Promises`、`MutationObserver`

在執行順序上 `Mircotasks` 是優於 `Marcotasks` 且會等到 `Mircotasks` 都執行完了才會回來檢查 `Marcotasks`：

```js
console.log('start')

setTimeout(() => {
  console.log('setTimeout1')
})
Promise.resolve()
  .then(()=> {
    console.log('Promise1')
  })
  .then(()=> {
    console.log('Promise2')
  })
setTimeout(() => {
  console.log('setTimeout2')
})
console.log('end')
```

執行完畢會顯示：
```js
'start'
'end'
'Promise1'
'Promise2'
'setTimeout1'
'setTimeout2'
```

一步一步來看的話，程式應當會先執行同步的程式碼，因此依序直譯到最後一行時，會依序將 `start` 以及 `end` 拋出。

接著其他非同步的程式則會分派到不同的 `watcher` 待任務循環的輪詢。

其中 `Promise1`、`Promise2` 分到 `Mircotasks`， `setTimeout1`、`setTimeout2` 分到 `Marcotasks`。

等到主線程（main thread）執行完畢時，任務循環首先會去查看 `Mircotasks` 還有沒有事件，如果有就將之移入呼叫堆疊（Call Stack）中執行，直到 `Mircotasks` 沒有事件才去檢查 `Marcotasks`。

由此可知如果想要非同步事件盡早被解決的話可以使用會被分派於 `Mircotasks` 的寫法，如果想要避免非同步事件受到 `Mircotasks` 隊伍影響到其餘非同步事件則應盡量都使用 `Marcotasks` 方法。

# 強迫寫成 Mircotasks 事件或 Marcotasks 事件的方法
強迫寫成 Marcotasks 技巧其實很多人可能都有使用過了，那就是 `setTimeout(fn, 0)`。

透過 `setTimeout` 的特性讓內部的程式區塊可以拖延至主線程都執行完畢時再來執行內部的程式碼，例如需要龐大的計算時就可以以此來包裹。

而強迫寫成 Mircotask 這個可能就比較少人知道了，我們可以透過 `queueMicrotask(callback)` 來執行：

```js
queueMicrotask(() => {
  console.log('想非同步的先被執行')
})

setTimeout(() => {
  console.log('想非同步的後面才被執行')
},0)
```

以上就是 Microtasks & Marcotask 在瀏覽器上的概念，基本上事件循環（Event Loop）整體的概念到這裡已經算是一個尾端了，每個部份當然可以更加的深究，不過與產出的結果可以說是以達到相近不遠的程度了，若有興趣的可以再深究下去，一起來討論！