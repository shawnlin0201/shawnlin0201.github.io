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
閉包（Closure）其實算是 JavaScript 的種種特性所集合起來的概念，裡面牽扯到了作用域鏈（Scope Chain）、高階函式（Higher-order function）與自由變數（free variable）等等概念。

> 推薦先閱讀 Scope 與 Higher-order function 一文

# Free Variable
自由變數（free variable）的意思則是指使用不在自己的作用域中的變數：

```js
let x = 10

function funcA() {
  console.log(x) // 這裡的 x 就是自由變數
}

funcA()
```

而要瞭解自由變數的原因在於通常談論閉包的特性時，通常會指有用到自由變數的情況：

```js
function acc(){
  let result = 0
  return function (num = 0){
    result = result + num
    console.log(result)
  }
}

let counter = acc()

counter.add(3) // 3
counter.add(5) // 8
```

在上面程式碼中，使用 `counter` 覆值 `acc` 會是一個重點，因為函式的執行環境（Execution Context）在函式執行完畢時，就會被移出呼叫堆疊（Call Stack），也因此照理來說裡面的變數物件（Variable Object）及作用域鏈（Scope Chain）會消失。

但因為使用了 `counter` 覆值 `acc`，因此執行完畢時，會將此參照記錄到 `counter` 當中。

最後我們就能藉由操作 `counter` 來達到看似控制 `acc` 內部的變數的效果。

# why we need closure?
聰明的讀者一定想到了一點，既然執行函式時都會創立一個執行環境，那麼用不同變數去承接這些環境，不就能達到類似獨立的效果嗎？

沒錯！我們再來看一次剛剛的程式碼，只是我們用不同的變數去接取：

```js
function acc(){
  let result = 0
  return function (num = 0){
    result = result + num
    console.log(result)
  }
}

let counter1 = acc()
let counter2 = acc()

counter1.add(1) // 1
counter1.add(2) // 3

counter2.add(10) // 10
counter2.add(20) // 30

counter1.add(3) // 6

counter2.add(30) // 60
```

我們可以看到 `counter1`、`counter2` 各自擁有其執行環境，

除此之外在函式執行完畢時，原先執行環境移除後，該環境中的變數物件應該會消失，但由於作用域鏈的綁定，使其被重新
變相延長了他的生命週期，也就是說只要 `counter1`、`counter2` 再沒有被重新賦值（reassign）的情況下，`acc` 中的 `result` 就會一直存在裡面。


現在我們大致上已經瞭解閉包是什麼以及可以如何善用它了，最後我們再回頭來較準確地重新看一次閉包的解釋：

根據參考 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Closures) 對於閉包的解釋：

> 閉包（Closure）是函式以及該函式被宣告時所在的作用域環境（lexical environment）的組合。

