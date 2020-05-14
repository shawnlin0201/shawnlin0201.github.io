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

呼叫堆疊（Call stack）在處理只有同步的程式碼時是非常容易理解的，直到遇上了非同步（Asynchronous）……

<!-- more-->

在呼叫堆疊（Call stack）或執行環境堆疊（Execution Context Stack）一文有介紹過程式碼只有同步時的情況，

但如果我們需要非同步的時候怎麼辦？

# Event Loop
事件循環（event loop）是 JavaScript 引擎中的某個循環，那他循環什麼呢？

其實就是循環任務隊列（task queue）到任務執行完畢的過程。

而什麼事件會放入到任務隊列？
- 定時器（setTimeout、setInterval）等 Web APIs。
- 使用者點擊元素所觸發的事件。


