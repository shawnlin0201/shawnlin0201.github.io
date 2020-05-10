---
title: JavaScript 深入淺出 Execution Content 執行環境
date: 2020-05-11 00:01:12
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

常聽見有人說作用域（Scope）但是不知道它是什麼，又或者查了作用域瞭解了之後卻不知道它是怎麼形成的？

那麼你可能需要知道一下什麼叫做執行環境（Execution Context）

<!-- more -->

# Execution Context
執行環境（execution context）是指 JavaScript 引擎模組化直譯程式碼時的區塊環境。簡單來說，就像是在整個 JavaScript 執行時，引擎將程式碼拆解成許多區塊，將這些區塊一塊一塊疊起來，運算完結果就移除當前的區塊，然後繼續運算下一部分的區塊。

這些區塊內存放著變數物件（Variable Object）、範圍鍊（Scope Chain）等等內容，使 JavaScript 引擎（V8）可以更方便的管理。

不過我們寫 JavaScript 程式碼時，從來就沒有主動宣告過執行環境這件事情阿。那麼到底什麼時會創建執行環境呢？

答案就是呼叫一個函式的時候。

```js
function funcA () {
  funcB()
}

function funcB () {
  console.log('Hello!')
}

funcA()
```

當我們執行了上面的程式時，整個執行環境的堆疊 stack 看起來就像是這樣：

```js
[main, funcA, funcB]
```

接著計算完 `funcB` 後拋出 `Hello` 後就變成：

```js
[main, funcA]
```

然後 `funcA` 執行完後就剩下主程式本身：

```js
[main]
```

> 如果想更加深入的瞭解上面整個運作請見執行環境堆疊一文。

# Execution Context Types
現在我們大略知道執行環境是由一個堆疊負責運作管理的，而執行環境總共可分為：
- 全域執行環境（Global Execution Context）
- 函式執行環境（Function Execution Context）


## Global Execution Context
全域執行環境指的是一開始執行 JavaScript 程式時所創立的執行環境，裡面包含了：
- 階段（Phase）
- 全域物件（Global Object）
- this
- 變數物件（Variable Object）
- 範圍鏈（Scope Chain）

在瀏覽器中，`this` 所指向的便是瀏覽器物件 `window`，
在 Node.js 中，`this` 則是指向 `global`。

以程式碼為例：

```js
var a = 1;
var b = 2;
```

整段程式碼運行完畢時，在全域執行環境可以看作是：
```js
globalExecutionContext = {
  Phase: 'Execution',    // 運行階段
  window: GlobalObject,  // 在瀏覽器中全域物件便是指 Web API
  this: window,          // 指向 window
  variableObject: {      // 變數物件（Variable）
    a: 1,
    b: 2,
  }
  scopeChain: variableObject       // 因為已經是最外層
}
```
其中變數物件（Variable）就是在形容 a 與 b 。


## Function Execution Context
函式執行環境指的是執行函式時所創立執行環境，裡面包含了：
- 階段（Phase）
- this
- 執行物件（Activation Object，其實也就只是多了一些東西的變數物件）
- 範圍鏈（Scope Chain） 

```js
function add(a, b) {
  return a + b
}

add(1, 2)
```

整段程式碼運行完畢時，在函式執行環境可以看作是：
```js
addExecutionContext = {
  Phase: 'Execution',    // 運行階段
  this: window,          // 指向呼叫的地方 => window
  activationObject: {    // 執行物件
    arguments: { 0: 1, 1: 2, length: 2},
    a: 1,
    b: 2
  },
  scopeChain: (activation object + [[Scope]])     // 簡單來說該值就是視覺上宣告程式時的外層範圍加上自己的執行物件
}

```
其中執行物件（Variable）就是形容 `arguments` 、 `a` 與 `b`， 所以在函式執行環境中變數物件與執行物件的概念其實是差不多的，但由於全域執行環境沒有 `arguments`，所以才又多了個執行物件的概念。

> 其中個別的議題涉及廣泛，我將依底下分類各開一篇文章再深度解釋：
> - Variable Object & Activation Object
> - this
> - Scope Chain

而在瞭解執行環境的種類後，接著要來瞭解執行環境是怎麼運作的：

# Execution Context Phase
在執行環境中總共可分為兩個階段：
- 創造階段（creation phase）
- 執行階段（execution phase）

## Creation Phase
在全域執行環境的創造階段中會：
- 建立全域物件（Global Object）
- 建立變數物件（Variable Object）
- 建立 `this`，並將它指向全域物件（在瀏覽器中是 `window`，在 Node.js 則是 `global`）
- 建立範圍鏈，並設為 null。（因為他自己就是最頂層）

在函式執行環境的創造階段中會：
- 建立執行物件（Activation Object）
- 建立 `this`，並把它指向呼叫此函式的 caller。
- 建立範圍鏈（Scope chain），並把它指向此函式的外層（程式編寫時視覺上的）。

## Excuting Phase
當創造階段結束時，執行環境就會將裡面的階段（Phase）從 `Creation` 更改為 `Execution` 來表示進入到執行階段。

而執行階段最主要就是一行一行（line by line）的執行該執行環境的程式碼，如果有遇到宣告就對宣告進行處理等等。

```js
console.log(a) // undefined
var a = 1;
console.log(a) // 1
```

在所有程式碼執行前，首先執行環境會先進入創造階段，此時會將所有變數初始化一個 `undefined` 的值：

```js
globalExecutionContext = {
  phase: 'Creation',
  window: globleObject,
  this: window,
  variableObject : {
    a: undefined
  },
  scopeChain: variableObject
}
```

所以等到運行階段時，第一個 `console.log` 輸出的值會是 `undefined`。

接著一行一行的看到第二行程式碼，我們這時才將 `1` 賦值給變數 `a`：

```js
globalExecutionContext = {
  phase: 'Execution',
  window: globleObject,
  this: window,
  variableObject : {
    a: 1
  },
  scopeChain: variableObject
}
```

這時候第三行 `console.log` 在當下的執行環境找到變數 `a` 現在的值為 `1`，這時才真正的將 `1` 呈現出來。

而所謂的提升（Hoisting）、`let` 的 TDZ 等等概念也是因為這樣而來的。

以上大概是執行環境（Execution Context）的介紹，其中還有許多概念我將另闢新文來做更深入的介紹。

# 參考資料
- [ECMA 262 8.3Execution Contexts](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-execution-contexts)
- [ECMA-262 Javascript核心 譯文](http://notepad.yehyeh.net/Content/WebDesign/Javascript/ECMA/Core/JavaScriptCore.php#section8)
- [所有的函式都是閉包：談 JS 中的作用域與 Closure](https://blog.techbridge.cc/2018/12/08/javascript-closure/#scope)
- [你不可不知的 JavaScript 二三事#Day5：湯姆克魯斯與唐家霸王槍——變數的作用域(Scope) (1)](https://ithelp.ithome.com.tw/articles/10203387)
- [Execution Context & the Secret Life of Functions](https://dev.to/gemhar/execution-context-the-secret-life-of-functions-1bl1)