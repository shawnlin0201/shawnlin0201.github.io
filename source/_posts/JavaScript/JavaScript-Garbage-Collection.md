---
title: JavaScript 深入淺出 Garbage Collection 垃圾回收機制
date: 2020-05-06 16:53:31
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

垃圾回收機制（Garbage Collection）主要是在協助執行於電腦上的應用程式，保留、清除一些儲存於記憶體中一些用不到的資料。

那麼在 JavaScript 中的垃圾回收機制又是如何處理呢？

<!-- more -->

# 瀏覽器中的記憶體存取
要知道垃圾回收機制前，要先稍微瞭解一下記憶體存取的概念，對於瀏覽器來說，由於各家廠商對於記憶體管理（Memory Management）的實作不同，存取的抽象概念可能也會有所差距，但大致上來說都會擁有 `stack` 與 `heap` 的儲存機制：

其中 stack 存放著一些較為簡單的資料，如一些原始數值（如：Number、String 等等），另外還有儲存一些指向 `heap` 的地址（address）。

而相對的 `heap` 就是用來儲存一些比較複雜的物件類型（或說非原始類型、複雜類型）。

所以每次操作資料時都會去 `stack` 設定相關的資料，如果是處理物件類型的資料，那就得在 `stack` 設定一個找到 `heap` 的地址，再儲存值到 `heap` 裡面；如果只是原始數值，就指向到 `stack` 就完成了。

> 想知道瀏覽器實作時遵循的文件可參考 [ECMA 262 - 10.0](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-memory-model)

# Memory leak 記憶體遺失
上面介紹到簡略的存取概念後，我們可以知道：
- 每次操作時都會申請分配（allocate） `stack` 的記憶體。
- 物件類型不僅會分配到 `stack`，還會再深入到 `heap` 當中。

所以當我們對於變數重新賦值（reassign）一個物件類型時，意味著我們需要重新分配一個 `stack` 地址後，再連結到新的一個 `heap` 當中。

而一個較為經典的記憶體遺失案例就發生在這個過程中當中：

```js
let a = ['大家掰掰，這是我們最後一次見面了。']
a = ['大家好，我其實是另一個陣列'] // Memory leak
```

僅僅兩行，就能造成一個簡單的記憶體遺失案例，這中間發生什麼事情了？

首先，第一行我們對於 `a` 賦值，由於是物件類型，我們必須分配到 `stack` 記憶體後，儲存一個指向 `heap` 的地址，並在 `heap` 中存下 `['大家掰掰，這是我們最後一次見面了。']`。

接著第二行，我們對於 `a` 重新賦值，由於是物件類型，我們必須再次重新分配到 `stack` 記憶體後，儲存另一個指向 `heap` 的地址，原本在 `heap` 中存下 `['大家掰掰，這是我們最後一次見面了。']` 資料，它仍然還在那邊，不過我們再也無法去取得它了。

> 想看更多的垃圾（？）可以參考這篇[文章](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)

# 垃圾回收機制
身為人類，我們都知道哪些東西要拿去丟垃圾車，但瀏覽器其實並沒有提供你手動丟記憶體垃圾的權利，因為瀏覽器會幫我們丟掉這些垃圾。

簡單的來說，記憶體垃圾要怎麼丟、丟什麼完全不是我們網頁工程師所能控制的，我們唯一能做的就是減少垃圾的產生~或繼續製造垃圾。~

那麼瀏覽器要怎麼辨識哪些是記憶體垃圾呢？一般在辨識記憶體垃圾上有比較常見的兩種方法：
- 計算參考（Reference counting）演算法
- 標記掃除（Mark-and-Sweep）演算法

## 記憶體回收演算法：Reference counting
簡單來說就是該記憶體有沒有被參考到，而這理論上確實很合理，因為沒有被參考到的就是垃圾。

但有一種明明有被參考到但卻還是垃圾的情況：

```js
function func() {
  var obj = {};
  var obj2 = {};
  obj.a = obj2;   // obj 參考 obj2
  obj2.a = obj;    // obj2 參考 obj
}

func();
```

這種例子就叫做循環參考。

## 標記掃除演算法：Mark-and-Sweep
標記掃除演算法是大部分垃圾回收機制的處理方式。

原因在於這種演算法則是將記憶體垃圾定義為「從根（roots）開始，不可到達的物件」。

對於 JavaScript 來說，根即為全局物件（詳見變數物件 Variable Object），因此這種算法會遍歷所有被全局物件所參考的物件與所參考的物件底下所有被參考的物件，還有其被參考的物件所參考的物件（好饒舌），一直到最後為止，沒有被這個颱風尾掃到的，就是垃圾。

這個演算法好處解決了上面循環的問題：

```js
function func() {
  var obj = {};
  var obj2 = {};
  obj.a = obj2;   // obj 參考 obj2
  obj2.a = obj;    // obj2 參考 obj
}

func();
```

# 總結
垃圾回收機制最終控制權是在瀏覽器身上而非網頁開發工程師本身，儘管完美的垃圾回收應該要使記憶體垃圾不會對使用者造成負擔，但我們仍可以試著理解垃圾回收機制儘量避免這些會成為記憶體垃圾的寫法。

# 參考文章
- [Garbage Collection wiki](https://zh.wikipedia.org/wiki/%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6_(%E8%A8%88%E7%AE%97%E6%A9%9F%E7%A7%91%E5%AD%B8))
- [Memory wiki](https://zh.wikipedia.org/zh-tw/%E9%9B%BB%E8%85%A6%E8%A8%98%E6%86%B6%E9%AB%94)
- [Memory Management MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Memory_Management)
- [基本算法 mark-and-sweep](https://liujiacai.net/blog/2018/06/15/garbage-collection-intro/#%E5%9F%BA%E6%9C%AC%E7%AE%97%E6%B3%95-mark-and-sweep)
- [garbage-collection](https://zh.javascript.info/garbage-collection)
- [JavaScript 内存泄漏教程](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
- [JavaScript 内存机制](https://juejin.im/post/5b10ba336fb9a01e66164346)
- [How JavaScript works: memory management + how to handle 4 common memory leaks](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)
- [JavaScript’s Memory Model](https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239)
- [JS Demystified 04 — Execution Context](https://codeburst.io/js-demystified-04-execution-context-97dea52c8ac6)
- [Day00：V8 bytecode 系列文介紹](https://www.coderbridge.com/@aszx87410/a5279d9298ab4e75bf75c75a4f391e78)