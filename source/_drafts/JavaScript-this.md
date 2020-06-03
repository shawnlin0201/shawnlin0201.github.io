---
title: JavaScript 深入淺出 This
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
- 參考物件的呼叫。
- 被綁定的呼叫：bind、call、apply。
- 箭頭函式的呼叫。
- 被 `new` 關鍵字初始化的綁定

# 物件呼叫
來自物件的呼叫主要是依據 **執行當下該行程式碼時有沒有參考物件**，如果沒有參考物件則會自動綁定全域物件（在瀏覽器是 `window`，在 Node.js 是 `global`）。

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