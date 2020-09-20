---
title: JavaScript 深入淺出 Pure Function & Side Effect 純函數與副作用
date: 2020-09-21 00:19:00
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

來點純一點的貨吧！

為什麼函式還有分純不純的呢？有副作用的函式又是怎麼一回事？

讓我們一起來瞭解純函數與副作用到底是什麼吧！

<!-- more -->

# Pure Function
純函式（pure function）主要的概念是不會改變函式外面與函式傳進來的數值。

```js
const add = function(x, y) {
  return x + y
}

add(1, 3) // 4
add(1, 3) // 4
```

而我們會需要純函式的原因：
- 具可快取性（cachable），可建立快取方法加速運算。
- 具有移植性（portable），由於純函式具有一致性，因此函式可輕鬆移到別的程式中。
- 引用具有透明性（referntial transparency），引用資料從何而來一清二楚，
- 函式本身即為文件（self-documenting），不必再另外撰寫一份說明文件，相對容易理解好維護。
- 具可測試性（testable），
- 好理解，因為沒有競爭狀態（race condition）。（雖然在 JavaScript Runtime 中本身是屬於單執行緒，本來就沒競爭狀態的問題）。

## 可快取性

我們可以透過閉包的機制封裝結果：

```js
const cacheFunc = function(func) {
  const cache = {} // 參數與回傳值將會被快取在這裡
  return function() {
    const arg = JSON.stringify(arguments)
    cache[arg] = cache[arg] || func.apply(func, arguments)
    return cache[arg]
  }
}
```

接著就可以透過這個 `cacheFunc` 來快取運算值：

```js
const sum = cacheFunc(function(x, y){
  return x + y
})

sum(1, 5) // 6
sum(1, 5) // 從快取得到 6
```

## 可移植性

可移植性簡單來說就是因為純函式到哪裡運算邏輯都不受影響，因此別的程式需要時可以直接引用，甚至是複製到其他專案中。

## 引用透明性

引用透明性是指撰寫時視覺上我們可以很清楚的知道函式的輸入輸出總是能輸出相同的值。

## 本身為文件

純函數本身可以被看作是一種文件。

```js
const renderH1 = function(content){
    return '<h1>' + content + '</h1>'
  }
}

document.querySelector('.title').innerHTML = renderH1('標題')
```

## 可測試性

純函數由於在內部不直接引用外部值，而須透過參數給定，因此在測試上只需要針對傳送參數即可，並且必定會回傳相同值也讓測試案例（test case）更好撰寫。

```js
const add = function(x, y) {
  return x + y
}

describe('add func test', function(){
  test('add 1 & 2 should equal 3', function(){
    expect(add(1, 2)).toBe(3) // 不論使用多少次 add(1, 2) 最後都一定會返回 3。
  })
  test('add 2 & 4 should equal 6', function(){
    expect(add(2, 4)).toBe(6)
  })
})
```
## 可並行性

在別的程式語言中要考量存取記憶體的先後順序定義的問題，然而 JavaScript 在 Runtime 時本身就是單執行緒，所以 JavaScript 不會進入競爭狀態（race condition）。但如果是在別的程式語言中使用純函數，就可以透過純函數不依靠記憶體而得到避免進入競爭狀態的窘境。

以上便是使用純函數的好處與理由。

# 參考資料

- [Day 12: ES6篇: Side Effects(副作用)與Pure Functions(純粹函式)](https://ithelp.ithome.com.tw/articles/10185780)
- [純粹的好，Pure Function 知道](https://medium.com/frochu/%E7%B4%94%E7%B2%B9%E7%9A%84%E5%A5%BD-pure-function-%E7%9F%A5%E9%81%93-574d5c0d7819)
- [第 3 章：Pure Function－單純的幸福](https://jigsawye.gitbooks.io/mostly-adequate-guide/ch3.html)