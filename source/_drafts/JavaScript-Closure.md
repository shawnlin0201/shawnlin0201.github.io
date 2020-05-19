---
title: JavaScript 深入淺出 Closure 閉包
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

常常聽到閉包卻不知道是指什麼？看看文章又覺得是在講作用域（Scope）？就算知道他是什麼也不知道用他能做什麼？

如果你有以上的問題，那就讓我們一起來看看閉包吧！

<!-- more -->

# Closure
閉包（Closure）其實算是 JavaScript 的種種特性所集合起來的概念，裡面牽扯到了作用域鏈（Scope Chain）、高階函式（High-order function）等等概念。

## High-order function
高階函式指的是滿足下列某一個條件即是高階函式：
- 能接受一個、多個函式作為輸入（即為該函式的參數可使用函式）
- 能輸出一個函式

比如常見的回呼函式（callback function），與之搭配的即為高階函式（High-order function）：

```js
function getMemberInfo(id, callback) {
  fetch('.../' + id)
    .then(res => res.json())
    .then(res => callback(res))
}

getMemberInfo('c8763', function(data){ // getMemberInfo 函式能接受一個函式作為輸入
  console.log(data)
})
```

另外 Web APIs 中常見的 `setTimeout`、`addEventListener` 也是高階函式：

```js
// setTimeout(fn, time)
setTimeout(function(){
  console.log('High-order function!')
},0)

// addEventListener(event, fn)
addEventListener('click', function(){
  console.log('High-order function!')
})
```

## Scope Chain
> 在 Scope 中我們曾經遇過這傢伙，這邊稍微簡單提一下。
> 詳細可參考 Scope 一文

作用域鏈（Scope Chain）會依據詞彙環境（Lexical Enviroment）來作為參考，而詞彙環境代表著程式碼實際中的位置，所以作用域鏈其實也就是**程式碼當下實際位置的裡面加上外面**。

```js
let x = 10
function test(){
  console.log(x) // 此函式的作用域就是函式本身的範圍加上外面的範圍
}
test() 
```