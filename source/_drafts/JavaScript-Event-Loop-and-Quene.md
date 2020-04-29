---
title: JavaScript 深入理解 Event Loop、Task quene、Mirco task quene
date: 2000-01-01 00:00:00
tags:
- [JavaScript]
categories: 
- [JavaScript]
- [JavaScript, 深入理解]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/JavaScript/JavaScript-logo.png' width='200px' height='200px' />
</div>

前面提過當呼叫堆疊（Call stack）處理完時，事情還未結束。

因為有還有一群任務正在等著主程式處理結束才要開始……

> 一群 event 虎 4 眈眈的看著主程式……

<!-- more-->

# Event Loop
事件循環（event loop）是 JavaScript 引擎中的某個循環，那他循環什麼呢？

其實就是循環任務隊列（task queue）到任務執行完畢的過程。

而什麼事件會放入到任務隊列？
- 定時器（setTimeout、setInterval）等 Web APIs。
- 使用者點擊元素所觸發的事件。
