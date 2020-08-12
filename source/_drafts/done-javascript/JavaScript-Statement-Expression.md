---
title: JavaScript 深入淺出 Statement & Expression 陳述式與表達式
date: 2000-01-01 00:00:00
tags:
- [w3HexSchool]
- [JavaScript]
- [ECMAScript]
categories: 
- [JavaScript]
- [JavaScript, 深入淺出]
- [JavaScript, ECMAScript]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/JavaScript/JavaScript-logo.png' width='200px' height='200px' />
</div>

你有想過為什麼變數可以儲存 `3` 卻沒有辦法儲存 `if/else` 語句，可是卻又能儲存整個 `function` 嗎？

一起來看看陳述式與表達式的概念就能馬上瞭解！

<!-- more -->

在談談兩者之前要先請你看下方程式，請問最後會秀出甚麼呢？

```js
var a = 2
if(a = 3) {
  console.log(a = 4))
}
console.log(a)
```

如果無法一眼看出是 `4`、`4` 或不知道為什麼會這樣的話歡迎繼續看下去！

# Statement

在 JavaScript 中，語句主要可分為陳述式（statement）與表達式（expression）。

而陳述式簡單的來說就像是指令一樣，它的目的主要是去執行一些事情，並且不會返回運算結果，例如 `if/else`：

```js
if () {
  // ...
}
```

陳述式最主要是用來描述它將做什麼事，並且它也不會回傳一個運算結果給你。

# Expression

除了陳述式之外，JavaScript 另一種語句我們稱為表達式（Expression），

而表達式又稱為運算式，顧名思義就是在計算一些東西，因此在 JavaScript 執行期他會回傳一個運算結果：

```js
(1 + 1) // 回傳 2
```

而我們可以藉由將表達式所運算的結果藉由變數指派記憶體的路徑：

```js
var a = (1 + 1) // a 存下回傳的 2

a // 現在 a 儲存的路徑指向 2

a = 5 * 2 // a 存下回傳的 10

a // 現在 a 儲存的路徑指向 10
```

一些其他的例子：

```js
1 === 2 // 回傳 false
(2 > 1 ? 'yes' : 'no') // 回傳 yes
a = 3 // 3
```

有注意到嗎？賦值運算子 `=` 其實也是表達式，而 `=` 所回傳的結果是右方運算完的內容：

```js
var x;
var y;
var z = 20;

x = y = z + 5

console.log(x) // ?
console.log(y) // ?
console.log(z) // ?
```

在執行的過程中， `x = y = z + 5` 這句會先被拆解成 `y = z + 5`，接著再把 `y = z + 5` 所返回的值 `5` 賦值給 `x`，所以最後結果如下：

```js
console.log(x) // 25
console.log(y) // 25
console.log(z) // 20
```

現在再回頭看最上面的那道題目，你應該可以解釋為什麼最後印出的結果會是 `4`、`4` 了！

# 常見誤區

至於為什麼要區辨表達式跟陳述式的原因很多，其中一個例子是當你原本 `if` 中是要透過全等運算 `===` 但錯打成 `=`：

```js
var a = 2

// if(a === 3) {} 原本要做全等比較
if (a = 3) {} // 不小心打成這樣，但由於裡面返回的運算值是 3 ，為真值，所以最後仍然能通過 if 執行內部的東西。
```

而這種錯誤在 typo 當中也算是一種比較麻煩的類型，原因是因為它是合法且能執行的，所以要特別小心。

# 函式

函式（function）在 JavaScript 算是物件的一種，所以自然而然可以把它當作值來操作，比方說把函式透過變數來儲存，或是單純呼叫函式，因此自然而然它也擁有表達式與陳述式兩種形式。

## 函式陳述式 Function Statement

```js
function say(something){
  console.log(something)
}

say // function say(something){ console.log(something) }
```

## 函式表達式 Function Expression

```js
var say = function () {
  console.log(something)
}

say // function (something) { console.log(something) }
```

## 比較 函式陳述式 & 函式表達式

這兩個最大的差異點在於 JavaScript 執行時（Runtime）當下的執行環境（Execution Context）中。



所以若是以下這段程式碼為例：

```js
statementFunction()
expressionFunction()

function statementFunction(){
  console.log('Hi')
}

var expressionFunction = function (){
  console.log()
}

statementFunction()
expressionFunction()
```

在全域環境執行時期的創造階段中，會有一個叫做 `Variable Object` 紀錄所有的值（若不清楚的請詳見 `Varaible Object` 與 `Activation Object` 一章），函式陳述式在這裡會被視為需要被初始化的目標，而透過變數宣告的則是會先預設一個
 `undefined` 的值：

```js
GlobalExecutionContext = { // 全域執行環境
  phase: 'Creation', // 創造階段
  variableObject: { // 紀錄當下環境的值
    statementFunction: function statementFunction(){ console.log('Hi') },
    expressionFunction: undefined
  },
  scopeChain: variableObject
}
```

等創造模式結束所有的行為後，進入執行階段才會開始一行一行的檢查有沒有要運算的內容，因此第一行我們可以很輕易的在 `variable object` 中找到 `statementFunction` 這個辨識字（identity）所儲存的是一個函式，因此要它執行函式很合理。

但就在第二行時，我們知道 `variable object` 中 `expressionFunction` 這個識別字所表示的值還是初始化的 `undefined`，因此要去執行一個 `undefined` 時引擎就會拋出一個錯誤提醒你。

所以他們之間的差異最主要還是在於 `scope` 這件事情上，如果已經瞭解 `Execution Context` 的創造階段與執行階段到底做了什麼事情的話，其實你也大概知道這兩者背後的運作原理了。