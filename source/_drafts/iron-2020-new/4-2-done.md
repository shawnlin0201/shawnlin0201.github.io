---
title: 【修正模型】4-2 呼叫堆疊（Call Stack）、事件循環（Event Loop）與任務隊列（Job Queue）
tags: 《透過認知模型認識 JavaScript》
---

今天要來提提昨天學到的執行上下文對於整個 JavaScript 執行過程中的角色以及當瀏覽器事件發生時 JavaScript 引擎的運作情形。

## 呼叫堆疊（Call Stack）

在昨天的章節中我們學到了 JavaScript 一開始執行時會產生一個 **全域執行上下文（Global Execution Context）**，另外在執行函式時則會產生一個 **函式執行上下文（Function Execution Context）**。

在產生出執行上下文之後，這些上下文之間並非毫無關係，而是會在彼此之間會互相堆疊而形成一個 **呼叫堆疊（Call Stack）**，且處理資料的結構的方式也正如其名，是採後進先出（Last in & First out，LIFO）的方式。

接下來我們以下方程式碼來看執行上下文是如何產生與堆疊的：

```js
function funcA () {
  console.log('enter')
}


console.log('func start')
funcA()
console.log('func end')
```

一開始當我們執行程式碼時，就會產生一個 `Main` 的執行上下文於堆疊的下方。

接著在 `Main` 的執行階段中，首先遇到了可呼叫的函式（`console.log('func start')`），因此產生一個執行上下文 `console.log`，並且繼續執行裡面的內容，因而拋出一個 `'func start'`。

![https://ithelp.ithome.com.tw/upload/images/20201015/20119062zWjJkZPp7v.png](https://ithelp.ithome.com.tw/upload/images/20201015/20119062zWjJkZPp7v.png)![https://ithelp.ithome.com.tw/upload/images/20201015/20119062gBjiRBEPFx.png](https://ithelp.ithome.com.tw/upload/images/20201015/20119062gBjiRBEPFx.png)

當 `'func start'` 被拋出後，由於 `console.log()` 函式沒有其他事情要做了，因此將  `console.log()` 移出呼叫堆疊，接著引擎解析到 `funcA()` 後執行函式，因此又產生出一個執行上下文 `funcA`。

![https://ithelp.ithome.com.tw/upload/images/20201015/20119062Y8mJtfFqUG.png](https://ithelp.ithome.com.tw/upload/images/20201015/20119062Y8mJtfFqUG.png)![https://ithelp.ithome.com.tw/upload/images/20201015/20119062n4hCK2ElKW.png](https://ithelp.ithome.com.tw/upload/images/20201015/20119062n4hCK2ElKW.png)

這時由於內部還有個可呼叫的函式（`console.log('enter')`），因此又繼續堆疊一個執行上下文 `console.log` 上去，並執行內部程式；同樣的，當 `'enter'` 被拋出後，由於 `console.log()` 函式沒有其他事情要做了，因此將  `console.log` 移出呼叫堆疊：

![https://ithelp.ithome.com.tw/upload/images/20201015/201190621iA9vWE5Xh.png](https://ithelp.ithome.com.tw/upload/images/20201015/201190621iA9vWE5Xh.png)![https://ithelp.ithome.com.tw/upload/images/20201015/20119062BbvDg4vTNC.png](https://ithelp.ithome.com.tw/upload/images/20201015/20119062BbvDg4vTNC.png)

接著，執行上下文 `funcA` 也沒其他事情要做了，因此也移出呼叫堆疊：

![https://ithelp.ithome.com.tw/upload/images/20201015/201190626YGPgQpS09.png](https://ithelp.ithome.com.tw/upload/images/20201015/201190626YGPgQpS09.png)

現在回到了 `Main` 執行上下文中，我們剩下 `console.log('func end')` 還沒執行，接著如上方一樣，堆疊一個 `console.log()` 執行上下文，拋出 `'func end'` 後將 `console.log` 執行上下文移出：

![https://ithelp.ithome.com.tw/upload/images/20201015/201190628G1KMOEjPl.png](https://ithelp.ithome.com.tw/upload/images/20201015/201190628G1KMOEjPl.png)![https://ithelp.ithome.com.tw/upload/images/20201015/201190625hiAHKDOtI.png](https://ithelp.ithome.com.tw/upload/images/20201015/201190625hiAHKDOtI.png)

最後連 `Main` 函式也沒有其他事情要做了，因此最後將 `Main` 也移出呼叫堆疊，完成本次的程式執行：

![https://ithelp.ithome.com.tw/upload/images/20201015/20119062fhlU6BzZHm.png](https://ithelp.ithome.com.tw/upload/images/20201015/20119062fhlU6BzZHm.png)

在整個堆疊情況中，過程就像是我們昨天那樣一步一步的去透過執行上下文來看內部的全域物件、變數物件、執行物件、`this`、範圍鍊……等等內容，只是執行的速度非常的快速，但它仍然是有規律的在 **一行一行** 解析你的程式碼。

![](https://i.imgur.com/TwtbNF9.gif)

所以只要你對於每個環節中的概念越熟悉，你就會越瞭解整個執行的過程與結果，而一旦瞭解它的執行脈絡，撰寫程式碼時就能夠更加的順暢。

> ~~「你懂海，海就會幫助你。」~~

明天我們要繼續來理解瀏覽器中事件循環的機制。