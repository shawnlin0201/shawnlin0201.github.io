---
title: JavaScript 深入淺出 This （上）預設綁定、隱含綁定與強制綁定
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

`this` 可以在 JavaScript 當中可以說是比 `prototype` 還要更難懂的概念，但今天要來嘗試以簡潔的方式來說明 `this` 到底是誰。

<!-- more -->

# this
簡單來講，`this` 依據的是 **函式被呼叫的方式**，而呼叫方式可分為：
- 預設綁定：全域呼叫、呼叫當下參考沒有自物件的函式。
- 隱含綁定：呼叫當下參考自物件的函式。
- 被綁定的呼叫：使用 bind、call、apply。
- 箭頭函式的呼叫。
- 函式建構式的呼叫。

# 預設綁定、隱含綁定
隱含綁定主要是依據 **執行當下該行程式碼時有沒有參考物件**，如果沒有參考物件預設則會自動綁定全域物件（在瀏覽器是 `window`，在 Node.js 是 `global`）。

```js
function getX (){
  console.log(this.x)
}
var x = 10
var obj = {
  x: 20,
  getX: getX // 這裡單純指向上方的 getX 函式
}

getX() // 10
obj.getX() // 20
```

`getX()` 該行並沒有參考物件才去呼叫，所以 `this` 自動綁定全域物件 window，最後找到的是 window.x 的 10

此外如果是嚴格模式（strict mode），如果採用預設綁定， `this` 將不會自動綁定全域物件，而是給予 `undefined`

```js
'use strict';
function getThis() {
    console.log(this)
  }
var obj = {
  getThis: getThis
}

getThis() // undefined
obj.getThis() // obj 本身
```

現在來嘗試看看複雜例子並且想一下答案是什麼：

```js
function getX (){
  console.log(this.x)
}
var x = 10
var obj = {
  x: 20,
  getX: getX
}
var obj2 = obj.getX

getX()      // ?
obj.getX()  // ?
obj2()      // ?
```

> `getX()`：10，因為參考時純粹拿到了該函式並且執行。

> `obj.getX()` ：20，透過 obj 物件去尋找該方法並呼叫，所以是指向 obj，因此是 obj.x 的值。

> `obj2()`：10，這裡有個陷阱，實際上該行並沒有參考物件，而是透過一個已經指向 `getX` 函式的參考去呼叫的

所以簡單的來說，最主要是專注在執行的該行即可，執行該行所產生的執行環境，`this` 就綁在它上面！

再來一題：

```js
function getX (){
  console.log(this.x)
}
var x = 10
var obj = {
  x: 20,
  getX: getX
}
var obj2 = {
  x: 30,
  getX: obj.getX
}

var obj3 = obj2.getX


var obj4 = {
  x: 40,
  getX: obj3
}

getX()      // ?
obj.getX()  // ?
obj2.getX() // ?
obj3()      // ?
obj4.getX() // ?
```

> `getX()`：10，剛行沒參考自物件，所以 `this` 預設綁定在全域上。
> `obj.getX()` ：20，剛行參考自物件 `obj`，所以 `this` 預設綁定在 `obj` 上。
> `obj2.getX()`：30，剛行參考自物件 `obj2`，所以 `this` 預設綁定在 `obj2` 上。
> `obj3()`：10，剛行沒參考自物件，所以 `this` 預設綁定在全域上。
> `obj4.getX()`：40，剛行參考自物件 `obj4`，所以 `this` 預設綁定在 `obj4` 上。

最後一題：

```js
var x = 10
var obj = {
  x: 20,
  getX: function(){
    var x = 30
    function inner(){
      console.log(this.x)
    }
    inner()
  }
}

obj.getX()  // ?
```

> `obj.getX()`：答案為 10。

剛才說到了執行該行所產生的執行環境，`this` 就綁在它上面，所以最後 `console.log` 前所執行的函式是哪句？

如果你看成 `obj.getX()` ，理所當然的你就會不小心答出 `20`。

而其實最後執行 `console.log` 的函式是 `inner()`，而 `inner()` 該行並沒有參考其他物件，所以是預設綁定在全域中，也就是 `window`，因此答案是 `10`。

## 預設綁定、隱含綁定實戰中的問題
有時候我們呼叫函式時不想使用當下的 `this` 而是想要外層的 `this` 怎麼辦？

```js
function wait(second){
  setTimeout(function(){
    console.log(this.x)
  },second)
}

var obj = {
  x:10,
  wait: wait
}

obj.wait(1000) // undefined
```

在上面這段程式中我們雖然最底下執行當下有參考到 `obj` 了，但 `wait` 函式中真正在執行 `console.log()` 前呼叫的是 `window.setTimeout` 這個函式，所以其實是參考了 `window` 這個全域物件並把 `this` 綁定給他，最後拋出 `window.x` 的值，也就是 `undefined`。

所以用 `console.log(this)` 檢查其實會像這樣：

```js
function wait(second){
  console.log(this)       // 這個會指向執行當下該行呼叫函式的物件，在這範例中會指向 obj
  setTimeout(function(){
    console.log(this)     // 這個會指向 window
    console.log(this.x)
  },second)
}

var obj = {
  x:10,
  wait: wait
}

obj.wait(1000)
```

確認 `this` 的範疇後，我們就可以利用作用域的特性（找不到變數值會向外層找）來實現抓取外面的 `this`：

```js
function wait(second){
  var that = this // obj
  setTimeout(function(){
    console.log(this.x) // window.x
    console.log(that.x) // obj.x
  },second)
}

var obj = {
  x:10,
  wait: wait
}

obj.wait(1000)
```

至於那個 `that` 主要是用來儲存 `this` 指向用的，另外也有人會取名為 `self` 等等名稱。

如果這個方法還不喜歡的話，可以繼續往下看看其他綁定方法。

# 強制綁定 bind、call、apply
除了上面這種預設綁定與隱含（implicit）綁定之外，接下來要介紹強制綁定的三種方法。

## bind
`bind` 的用法主要是在呼叫時加上綁定 `this` 的物件對象：

```js
function getX(){
  console.log(this.x)
}
var x = 10
var obj = {
  x: 20,
}
var obj2 = {
  x: 30
}

getX()              // 10
getX.bind(obj)()    // 20
getX.bind(obj2)()   // 30
```

原本 `getX()` 執行到該行時會由於該行當下沒有去其他物件中尋找函式，所以會採預設綁定在 `window` 當中，但透過 `bind` 的綁定，我們可以在呼叫時將 `this` 指定給另一個物件，因而可以參考到不同的物件當中。

上面所提到的實戰的部分也可以用 `bind` 解決

```js
function wait(second){
  setTimeout(function(){
    console.log(this.x) // 10
  }.bind(this),second)
}

var obj = {
  x:10,
  wait: wait
}

obj.wait(1000)
```

上面的程式範例中，我們透過 `bind` 綁定了 `setTimeout` 裡面的 `this`，因此每次呼叫 `wait` 時，裡面 `setTimeout` 中回呼函式內的 `this` 都會與外面相同了，而不會被 `window.setTimeout` 的 `window` 物件所影響到。

## call、apply
`call`、`apply` 的用法比較接近，差別在使用時會立即呼叫該函式：

```js
function getX(num = 0, anotherNum = 0){  
  console.log(this.x + num + anotherNum)
}
var x = 10
var obj = {
  x: 20,
  getX: getX
}

addX(1, 2)              // 13
addX.call(obj, 1, 2)    // 23
addX.apply(obj, [1, 2]) // 23
```

> call()，第一個參數是要綁定 `this` 的物件，後續帶入參數是用逗號來區隔。

> apply()，第一個參數也是綁定 `this` 的物件，但後續帶入參數是放在一個陣列當中。

以上就是 `this` 上半集啦，
在下集中我們繼續提剩下沒提到的箭頭函式以及函式建構式的呼叫。