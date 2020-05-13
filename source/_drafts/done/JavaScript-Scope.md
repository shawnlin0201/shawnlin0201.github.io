---
title: JavaScript 深入淺出 Scope
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

為什麼 `console.log` 出來的結果跟你想的不一樣？

瞭解 `Scope` 後，你將會大幅提升閱 code 能力！

<!-- more -->

> 要瞭解作用域（Scope）前，建議要先有執行環境（Execution Context）的概念就可以很快理解本篇內容！

# Scope
作用域（Scope）簡單的來說就像是變數的生存環境，最主要牽扯的是有關於執行環境（Execution Context）的概念，而簡單來說，只要執行函式就會創造一個新的執行環境。

> 想深入請詳見執行環境一文。

## 全域執行環境

```js
console.log(a) // undefined
var a = 1;
console.log(a) // 1
```

上列程式在執行前（Creation Phase），會先初始化變數物件（Variable Object）：

```js
GlobalExecutionContext = {
  phase: 'Creation',
  variableObject: {
    a: undefined
  },
  scopeChain: variableObject
}
```

這也是為什麼 **執行時** 一行一行直譯時第一行秀出該行 `console.log(a)` 為 `undefined` ，而第三行則是秀出 `1` 的原因（也是 `提升 Hoisting` 概念的由來）。

## 函式執行環境
接著或許你會說，那麼我如果執行了一個函式，裡面不是也會形成新的執行環境，那他如果找不到裡面的變數怎麼辦？

```js
var a = 1;
function test() {
  console.log(a) // ?
}
test();
```

我們一樣來看看在初始化時函式執行環境做了什麼：

```js
FunctionExecutionContext = {
  phase: 'Creation',
  activationObject: {
    argument: []
  },
  scopeChain: activationObject + [[scope]]
}
```

> 活化物件（Actication Object）與變數物件（Variable Object）其實只差在多了個 `argument` 參數。

我們可以從活化物件（Actication Object）中看到他並沒有 `a` 這個變數，那麼它要去哪裡找呢？

# Scope Chain
範圍鏈、或稱作用鏈（Scope Chain），主要的目的在於當我們在該執行環境中的物件找不到變數時，就會透過作用鏈的機制來尋找。

而一般作用鏈初始化的內容會是自己本身的變數物件加上 `[[scope]]`，所以我們可以理解成一開始理所當然的會先去找當前的變數環境，找不到再來看有沒有在 `[[scope]]` 當中。

那麼 `[[scope]]` 又是什麼東西？

根據 ECMA 262 三版中的解釋是，當一開始建立此函式時，`[[scope]]` 所設定的值會是當下環境中的 `scope chain`，回到剛剛的程式：

```js
var a = 1;
function test() {
  console.log(a) 
}
test();
```

所以`[[scope]]` 其實就是宣告 `function` 的環境，更白話一點的方式就是，
**找不到變數就往宣告函式的外層找就行！**

接著來驗證此想法：

## Scope Chain，範例一
```js
var a = 1;
function x() {
  var a = 2;
  y()
}
function y() {
  console.log(a) // ?
}
x();
```

在上面程式碼中，函式 `y` 是在全域執行環境下被初始化的，因此函式 `y` 的 scope chain 除了自己本身之外，另一個就是找到全域執行環境當中，因此輸出 `1`。

## Scope Chain，範例二
```js
var a = 1;
function x() {
  var a = 2;
  function y() {
    console.log(a)  // ?
  }
  y()
}

x();
```

在上面程式碼中，函式 `y` 是在函式執行環境 `x` 下被初始化的，因此函式 `y` 的 scope chain 除了自己本身之外，另一個就是找到函式執行環境 `x` 當中，而在 `x` 環境當中有宣告 `a` 變數，因此輸出 `2`。

## Scope Chain，範例三
```js
var a = 1;
function x() {
  a = 2;
  y()
}

function y() {
  console.log(a)  // ?
}

x();
```

在上面程式碼中，函式 `y` 是在全域執行環境下被初始化的，因此函式 `y` 的 scope chain 除了自己本身之外，另一個就是找到全域執行環境當中的 `x`，但與範例一不同的地方在於，執行 `x()` 時，內部的 `a` 去更動了全域環境的 `a` 值，因此輸出 `2`。

# Scope type 作用域類型
作用域的類型其實分有兩種：
- 動態作用域（dynamic scope）
- 靜態作用域（static scope），又稱為詞法作用域（lexical scope）。

動態作用域的意思是以**呼叫**函式的地方當作作用域鏈。

```js
var a = 1;
function x() {
  var a = 2;
  y()
}
function y() {
  console.log(a) // 若是動態的話這邊會以呼叫的地方，也就是 x 的環境當作作用域，最後輸出 2。
}
x();
```

靜態作用域的意思則是以**宣告**函式的地方當作作用域鏈。

JavaScript 所採用的是便是靜態作用域的方法，而大部分會搞錯都是認為 JavaScript 是以動態作用域的做法下去看的。

```js
var a = 1;
function x() {
  var a = 2;
  y()
}
function y() {
  console.log(a) // 但 JavaScript 是採用靜態作用域，因此其實哪邊呼叫它並沒有關係，因為他看到是最初宣告它的作用域。
}
x();
```

若能搞懂動態與靜態的差別，並知道 JavaScript 是以靜態作用域的思維下去思考，作用域其實沒你想像中的難！

