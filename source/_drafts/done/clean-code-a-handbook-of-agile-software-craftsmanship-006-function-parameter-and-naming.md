---
title: 重新解構：無瑕的程式碼（Clean Code） Chapter 3 函式－參數與名稱
date: 2000-00-00 00:00:00
tags:
- [w3HexSchool]
- [Book]
- [Clean-Code-A-Handbook-of-Agile-Software-Craftsmanship]
categories: 
- [Book, Clean-Code-A-Handbook-of-Agile-Software-Craftsmanship]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/Book/Clean-Code-A-Handbook-of-Agile-Software-Craftsmanship.jpg' width='200px' height='200px' />
</div>

函式的參數究竟要怎麼傳？傳什麼？

不同的參數個數又會影響到什麼？

這篇章節將來討論書中所提到的函式參數的部分：

<!--more-->

# 函式參數（parameter）
函數參數主要可以提到參數本身的用法以及參數個數

## 參數用法
函式根據語句參數的用法可分為**輸入型**與**輸出型**函式：

### 輸入型：
輸入型的函式我們預期參數都只是用來輸入到函式的語句內進行處理：

```js
function sum(a, b) {
    return a + b
}

sum(1, 2) // 3
```

### 輸出型：
輸出型的函式則是會改變傳入參數本身的內容：

```js
let person = {
    name: 'Shawn'
}

addSomething(person) // 增加原先物件某個內容
```

但這樣的做法我們會無法了解 `addSomething` 要增加的是 `person` 這個物件，還是 `person` 物件要增加什麼內容。

因此更好的做法應該是採用物件導向（Object oriented）的程式設計：

```js
function Person (name) {
    this.name = name
}

Person.prototype.addSomething = function () {
    // addSomething statment 處理
}

let Shawn = new Person('Shawn')

Shawn.addSomething()
```

這樣我們可以很快地確認是 `Shawn` 這個物件要增加內容了。

## 參數個數

### 零個參數

### 一個參數

### 兩個參數

### 多個參數

### 布林參數、
布林參數又稱為旗幟參數（flag parameter)












# 函式名稱（naming）
- 函式名稱：使用有描述能力的名稱
    - 一個參數：動詞名詞