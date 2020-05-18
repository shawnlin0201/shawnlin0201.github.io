---
title: JavaScript 深入淺出 Event Loop、Job Queue
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

要知道 JavaScript 執行期（runtime）究竟在做什麼事情？絕對不能不知呼叫堆疊（Call Stack）、事件循環（Event Loop）及任務隊列（Job Queue）。

前陣子介紹了 JavaScript 執行期間如果只有同步（Synchronous）的程式碼時是非常容易理解的，因為我們只需要理解呼叫堆疊（Call stack）中的執行環境（Execution Context），就能夠透過變數物件（Variable）、執行物件（Activation Object）、作用域鍊（Scope Chain）來理解作用域（Scope）與以及閉包（Closure）等等概念。

那麼非同步要以什麼方式來理解呢？那就是靠任務循環（Event Loop）以及任務序列（Job Queue）的機制啦！

<!-- more-->

# Event Loop
任務循環（Event Loop）嚴格說起來並不是 JavaScript 本身的機制，而是 JavaScript 運行環境（runtime）裡的機制（也就是瀏覽器）。

在瀏覽器當中的主執行緒（Main Thread）會透過 JavaScript 引擎去即時編譯 JavaScript 程式碼，而辨識到**非同步的程式碼區塊**時，就會指派給各個監視器（watcher）。

接著主執行緒會在不斷的輪詢（polling）各個監視器（watcher）來確認是否產生事件，例如 `setTimeout` 會經由瀏覽器的 `Timer` 檢查是否到特定的時間，如果達到特定的時間就會將其事件移到任務隊列（Job Queue）上。

而在輪詢的過程中，也會去查看 JavaScript 中的呼叫堆疊（Call Stack）是否為空的，如果是的話就將任務隊列（task queue）裡的任務放入呼叫堆疊當中。

也因此我們可以說任務循環算是實作 JavaScript 非同步機制的一種作法，如果沒有任務循環那麼 JavaScript 就無法做到非同步這件事情。

那麼，我們現在任務循環了，但什麼是任務隊列？

# Job Queue
任務隊列（Job Queue）又稱 Event Queue 或 Callback Queue，簡單來說就是各種非同步事件用來排隊的地方；也就意味著，在非同步的概念當中並不是誰比較早寫誰先被執行，而是透過上述所說的各個監視器產生事件後才排入任務隊列的：

```js
setTimeout(function(){
  console.log('first')
}, 1000)
setTimeout(function(){
  console.log('second')
}, 500)
setTimeout(function(){
  console.log('third')
}, 500)
```

像上面的順序就是依序將第一個、第二個與第三個 `setTimeout` 分別交由 `Timer` 去確認時間，而 `Timer` 首先確認到第二個與第三個時間到，這時候分別把第二個與第三個排入任務隊列，最後才是第一個。

因此結果會顯示：
```js
'second' // 與 'third' 幾乎同時顯示
'third'  // 與 'second' 幾乎同時顯示，但稍微晚一點（如果不清楚為什麼的話推薦閱讀執行環境 Execution Context 一文

'first' // 與前兩者相較晚一些才顯示
```

> 而延伸其概念我們可以說 `setTimeout` 只能做到確認至少幾秒後才會被執行，我們並沒有辦法精確的定義他們什麼時候被執行。

那麼有什麼事件是會被放入任務隊列的：
- `XMLHttpRequest`：預設採用非同步方式取得資料，它另外也提供同步的方式給需要的開發者。
- `fetch`：使用非同步的做法取得資料。
- `setTimeout`、`setInterval`：由於 JavaScript 本身沒有計時器，因此執行後會交由瀏覽器的計時器倒數，時間到了才回傳至任務序列（Task Queue）等待任務循環（Event Loop）機制將其傳入主線程。
以上等等

然而非同步程式區塊如果是 `promise` 的話則又有另一種隊列，我們稱其為 `Mircotask Queue`…

詳見 `Mircotask Queue` 一文

