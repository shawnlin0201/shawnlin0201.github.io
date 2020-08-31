---
title: JavaScript 深入淺出 Primitive Wrapper 原始型別包裹物件
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

有沒有想過為什麼明明是字串 `'Hello, world'` 卻能夠使用點語法來呼叫 `.legnth` 方法？

如果還不知道為什麼的話一起來看看這個原始型別包裹物件（Primitive Wrapper）吧！

<!-- more -->

# 資料型別

在談談原始型別包裹物件（Primitive Wrapper）前，我們先來聊聊 JavaScript 幾種資料型別。

在 JavaScript 中，型別大致上可以分為：
- 原始型別（Primitive types）
- 物件型別（Object types）或稱非原始型別（Non-primitive types）

其中最基礎的概念即是非原始型別的資料都是物件型別，也就是函式、陣列等都是屬於物件型別的一種。

而物件的特色就是我們可以透過中括號語法（bracket notation）或是點語法（dot notation）來透過屬性取得屬性值。

比如我們透過物件實字（Object literal）來創造物件，裡面定義鍵 `name` 的值為 `Shawn`，接著我們就可以透過 `person.name` 來取得該值：
```js
var person = {
  name: 'Shawn'
}

person.name // Shawn
```

而在原始型別最大的特色即是值是


當中，透過 `typeof` 檢查原始型別的資料時，會反映出它在原始型別中的類型：

```js
console.log(typeof 1) // number
console.log(typeof 'text') // string
console.log(typeof false) // boolean
console.log(typeof undefined) // undefined
console.log(typeof null) // object
```