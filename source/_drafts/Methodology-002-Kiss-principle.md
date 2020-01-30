---
title: 「萬物之始，大道至簡，演化至繁。」一起來瞭解簡單重複原則（KISS principle）
date: 2020-04-06 17:00:25
tags:
- [w3HexSchool]
- [Methodology]
categories: 
- [Methodology]
---

# KISS 原則

這次要來介紹的程式三大開發原則之一的**簡單原則**（簡稱 KISS 原則，即為 Keep it simple and stupid.）。

這個開發原則在古文中早已有驗證，在老子《道德經》之中，有句話叫做「萬物之始，大道至簡，演化至繁。」意思簡單來說就是任何事物之中，一開始都是非常簡單而直白的，經過不斷演化之後，才到達繁的境界，而程式設計也理應如此。

> *“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.” -Martin Fowler 「笨蛋都能寫出讓電腦看得懂的程式碼，只有優秀的程式開發者能寫出讓人看得懂的程式碼。」*

而 KISS 原則追尋的便是那種**大道至簡**的精神。

那麼追尋簡單最終會看起來如何？

<!--more-->

# KISS 實踐

日本設計大師 KASHIWA SATO（曾擔任 UNIQLO 紐約全球旗艦店的創意指導），在其極簡主義底下中的[作品](https://www.google.com/search?q=KASHIWA+SATO&source=lnms&tbm=isch&sa=X&ved=2ahUKEwimqI-lgqvnAhWbfd4KHf-0B28Q_AUoAXoECA4QAw&biw=1920&bih=937)可以看得出絲毫不遜色於其他相較華麗的作品，而其[個人網站](https://kashiwasato.com/)也同樣充斥著極簡的思維。

在平面設計上已有如此先例驗證了既可行又不失風采的案例了，那麼在**程式開發**中又有什麼不可呢？

在程式開發的過程中，我們時常會針對將來的擴充性與例外處理做一些防衛性措施，例如針對函式參數設想了一些情境：

```js
function Person(name) {
  this.name = name || 'Anonymous'
}

Person.prototype.getName = function () {
  return this.name
}

Person.prototype.setName = function (setName) {
  return this.name = setName
}
```

看起來似乎很完美，即使使用 `Person` 物件初始化時沒有提供其他參數，也因為有給予預設值因此得以順利進行。

而過了幾天，由於後續的追加需求，因此向 `Person` 物件擴充了一些內容，並且被要求要考量到未給予參數時的情況：

```js
Person.prototype.sayHello = function () {
  if (this.name !== 'Anonymous') {
    return `Hello, ${this.name}.`
  } else {
    return `Hi! Do you want to set your name right now?`
  }
}
```

這時慢慢地你開始嗅到了不尋常的味道（bad smell），你的程式中開始出現了針對當初預設值的 if 條件判斷式，而後續的其他功能也逐漸依賴當初設定的預設值。

直到有一天專案需求需要將未設置的名稱更改為 `Guess` 時，才赫然發現有許多條件需要修改，並且還要追到底有那些地方也用了之前的預設值做判斷，表面上看起來很簡單的需求，卻意外地讓開發人員修改了半天。

回想當初最早開發的時候，如果沒有自己先增添了一些**優雅的**程式碼會發生什麼事情？

```js
function Person(name) {
  this.name = name
}

Person.prototype.getName = function () {
  return this.name
}

Person.prototype.setName = function (setName) {
  return this.name = setName
}
```

接著一樣增加需求：

```js
Person.prototype.sayHello = function () {
  if (this.name) {
    return `Hello, ${this.name}.`
  } else {
    return `Hi! Do you want to set your name right now?`
  }
}
```

然後一樣面臨更改預設值的情況：

```js
function Person(name) {
  let 
  this.name = name
}

Person.prototype.getName = function () {
  return this.name
}

Person.prototype.setName = function (setName) {
  return this.name = setName
}

Person.prototype.sayHello = function () {
  if (this.name) {
    return `Hello, ${this.name}.`
  } else {
    return `Hi! Do you want to set your name right now?`
  }
}
```
這時候的思維由於已知需要符合

針對現代主流的開發風格：敏捷式開發


# 參考資料

- [你不得不知的KISS原則（三大軟體原則之一）](https://kknews.cc/zh-tw/home/8q5jj5e.html)
- [Kent Beck 的四個簡單程式設計原則](https://ihower.tw/blog/archives/7181)