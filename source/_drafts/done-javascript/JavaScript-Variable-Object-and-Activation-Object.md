---
title: JavaScript 深入淺出 Variable Object & Activation Object
date: 2000-01-01 00:00:00
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

理解變數物件（Variable Object，簡稱 VO）與執行物件（Activation Object）的概念對於理解作用域（Scope）、提升（Hoisting）、垃圾回收機制（Garbage collection）、閉包（Closure）與執行環境（Execution context）等等至關重要。

究竟變數物件到底指的是什麼？為何理解它會可以快速打通任督二脈？就讓我們一來看看它吧！

<!-- more -->

根據 ECMA [10.1.3 Variable Instantiation](https://www.ecma-international.org/archive/ecmascript/1999/TC39WG/990220-es2_func.pdf) 對於 Variable Object 的解釋：

> Every execution context has associated with it a variable object. 
> Variables and functions declared in the source text are added as properties of the variable object.
> For function, anonymous, and implementation-supplied code, parameters are added as properties of the variable object.

也就是說每個執行環境都會包含著一個變數物件（Variable Object），而執行函式等所創造出來的執行環境中，則會把參數（parameters）也加進去變數物件中，也就是活化（Acativation Object）

用物件來表示的話，全域變數物件大概就像這樣：

```js
GlobalExecutionContext = {
  phase: 'Creation',
  variableObject: {
    a: undefined
  },
  scopeChain: variableObject
}
```

而執行物件僅僅就是多了參數的變數物件版本：

```js
FunctionExecutionContext = {
  phase: 'Creation',
  activationObject: {
    argument: []
  },
  scopeChain: activationObject + [[scope]]
}
```

其中變數物件大致上會包含了三樣描述：
- phase：用來描述變數物件所處的階段。
- variableObject、activationObject：初始化變數的值會存放在這，而函式的執行物件則多了 `argument`。
- scopeChain：作用域鏈，用來理解作用域的關鍵（詳見 Scope 一文）

# Phase
當每個執行環境（Execution Context）剛執行時，這裡的階段會被標為初始化，當下該環境中需要初始化的變數會被初始化為 `undefined`，若有函式則會將其移入為值。

```js
let x = 1;
let y = 3;

function add(a,b) {
  return a + b
}

add(x,y)
```

對於全域的執行環境來說，一開始初始化階段會長得像這樣：

```js
GlobalExecutionContext = {
  phase: 'Creation',
  variableObject: {
    x: undefined,
    y: undefined,
    add: function(a,b) { return a + b}
  },
  scopeChain: variableObject
}
```

執行到第一行 `let x = 1` 時，將 `x` 覆值 `1`：

```js
GlobalExecutionContext = {
  phase: 'Creation',
  variableObject: {
    x: 1,
    y: undefined,
    add: function(a,b) { return a + b}
  },
  scopeChain: variableObject
}
```
後面依此類推。

我們可以發現初始化時最大的差別在於函式一開始就會被存入，因此宣告函式時我們可以在宣告前也能使用，而 `x`、`y` 變數則是要等到執行階段，執行到該行才會被覆值。

而在執行 `add` 函式所創建的執行環境中，一開始初始化階段會長得像這樣：

```js
addExecutionContext = {
  phase: 'Creation',
  activationObject: {
    a:1,
    b:3,
    arguments: {
      0: 1,
      1: 3,
    }
  },
  scopeChain: activationObject + [[scope]]
}
```

可以看見執行物件中會隱性的（implicit）將參數（paramemter）建立值，並且對於原先 `add(x,y)` 中的引數（arguments）建立了一個獨立的物件，這裡也是為什麼我們能透過函式的 `arguments` 取得引進來的數值。

以上是變數物件與執行物件的概念介紹，熟悉了這個之後再去看作用域就可以更快速理解作用域鏈（Scope Chain）所帶來的影響。（詳見 Scope 一文）



# 參考資料
- [10.1.3 Variable Instantiation](https://www.ecma-international.org/archive/ecmascript/1999/TC39WG/990220-es2_func.pdf)
- [變數物件(Variable Object)](https://github.com/SDLyu/JavaScript/blob/master/Core/Variable%20Object.md)
- [變數物件(Variable Object)](https://wiki.jikexueyuan.com/project/javascript-depth-understanding/variable-object.html)
- [ECMA-262 Javascript核心](http://notepad.yehyeh.net/Content/WebDesign/Javascript/ECMA/Core/JavaScriptCore.php#section7)