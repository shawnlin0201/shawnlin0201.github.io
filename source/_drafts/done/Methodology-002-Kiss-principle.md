---
title: 「萬物之始，大道至簡，演化至繁。」一起來瞭解簡單原則（KISS principle）
date: 2020-04-06 17:00:25
tags:
- [w3HexSchool]
- [Methodology]
categories: 
- [Methodology]
---

# KISS 原則

繼上次避免**重複原則**（DRY principle）後這次要來介紹的程式三大開發原則之一的**簡單原則**（簡稱 KISS 原則，即為 Keep it simple and stupid.）。

這個開發原則在古文中早已有驗證，在老子《道德經》之中，有句話叫做「萬物之始，大道至簡，演化至繁。」意思簡單來說就是任何事物之中，一開始都是非常簡單而直白的，經過不斷演化之後，才到達繁的境界，而程式設計也理應如此。


而 KISS 原則追尋的便是那種**大道至簡**的精神。

那麼我們要如何追尋這個原則呢？

<!--more-->

# KISS 實踐

在程式開發的過程中，我們時常會針對將來的擴充性與例外處理做一些防衛性措施，例如針對函式參數設想了一些情境：

```js
function Person(name) {
  if (name !== undefined && name !== null) {
    this.name = name
  } else {
    this.name = 'Anonymous'
  }
}

Person.prototype.getName = function () {
  return this.name
}

Person.prototype.setName = function (setName) {
  return this.name = setName
}
```

若要使其更容易閱讀其實可以這麼寫：

```js
function Person(name) {
  this.name = name || 'Anonymous'
}
```

或是採用 ES6 的寫法：

```js
function Person(name = 'Anonymous') {
  this.name = name
}
```

在這個範例中我們可以看到簡化最後程式碼所想要表達的內容所帶來的效益，使程式碼變得更加的清晰。

# KISS principle & DRY principle

KISS 原則的誤區如同 DRY 原則一樣要避免**過度抽象化（over-abstraction）**與**過早最佳化（premature-optimization）**。

而 KISS 原則比起 DRY 原則就個人理解下，KISS 更偏向不要去預設任何立場並且稍微重複也有助於後續修改，而 DRY 則對各種意義上的重複概念比較注重；但兩種最終都還是得面向可讀性（readability）這道關卡，所以要適當的拿捏之間的尺度。

正所謂：

> *“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.”
> 「笨蛋都能寫出讓電腦看得懂的程式碼，只有優秀的程式開發者能寫出讓人看得懂的程式碼。」
> -Martin Fowler*

一個良好的程式碼應該可以使其他開發者**容易維護**並且**容易閱讀**，多餘的預設立場只會**限制後續的開發**。

這也是為什麼多半 KISS 原則與 DRY 原則通常會與 YAGNI 原則放在一起討論的原因。

而 YAGNI 原則又是什麼呢？請待下回分曉。

# 參考資料

- [你不得不知的KISS原則（三大軟體原則之一）](https://kknews.cc/zh-tw/home/8q5jj5e.html)
- [Kent Beck 的四個簡單程式設計原則](https://ihower.tw/blog/archives/7181)