---
title: 重新解構：無瑕的程式碼（Clean Code） Chapter 3 函式－函式語句（上）
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

上回我們探討了命名的技巧，緊接著要來討論所有程式與語言幾乎都不可避免的函式！

這回我們要來重新檢視我們長期以來使用的函式方式，並重新解構函式本身的原貌，來探討可以怎麼使用函式會更好！

<!--more-->

# 為何我們需要函式

使用函式時我們是否曾經想過：為何我們需要函式呢？我們真的有必要用它嗎？還是我們從來沒有考慮過使用它的時機呢？

此書的作者提及了其中一個使用函式的時機，那就是違反**重複原則（DRY，Don't repeat youself.）**的時候。

當我們重複使用同樣程式碼的時後，我們可能付出許多代價來修改同樣的程式，這時我們就可以利用函式來將其中的概念封裝起來重複使用，藉此達到更高的效率與方便後續維護的人員能夠輕易地閱讀。

而對於重複程式碼的容忍度則可以遵循之前程式心法系列中所提及過的 **三次原則（Rule Of Three principle）**，達到一定次數的重複率再進行封裝，以避免過度的抽象來降低疑慮。

在有了使用函式的理由後，我們便可以開始來討論函式的細節：

# 解構函式的細節

```js
function name(parameter) {
  // 定義 function 的語句（statements）。
}
```

上方展示了一個簡單的宣告函式，我們可以清楚的看到函式至少包含了三個部分：

- 函式名稱（naming）：以供辨識、呼叫用的名稱。
- 函式參數（parameter）：提供連結外部變數，傳送到內部語句的傳送參數。
- 函式語句（statements）：實際函式所執行的區域。

我也將其重構原書的內容，以這三個部分重新整理內容。

# 函式語句（statements）
首先我想討論語句的部分，因為對於函式來說，當你透過程式編輯器的搜尋功能去尋找一個函式時，假如在找得到的情況下，通常最想做的事情是去觀看這函式裡面做了什麼事情，因此內部的語句是至關重要的地方。

而在語句（statement）之中我們可以探討的點可分為：
- 語句類別（type）：探討函式是怎麼被開發者使用的。
- 語句結構（structure）：探討內部語句的寬度與深度。
- 語句脈絡（context）：探討內部語句的長度與敘述。

## 語句類別（type）
函式根據語句的處理則可分為**指令型**和**查詢型**：

### 指令型（command）
指令型的函式表示它將做了某件事情：

```js
function changeUrlTo (url) {
  location.href = url
}
```

```js
// 實際使用時：
changeUrlTo('https://www.google.com.tw')
```

### 查詢型（query）
查詢型的函式表示它會回答某件事情：

```js
function isNumber(number) {
  return typeof number === 'number'
}
```

```js
// 實際使用時：
if (isNumber(+'123')) {
  console.log('Magic! Nice job, JavaScript.')
}
```

而在書中的筆者建議函式盡量不要將指令型與查詢型混合使用，否則很容易產生疑惑：

```js
function getAndCheckItem (itemID) {
  if (!shop[itemID]) { return false };

  fetch('...?itemID=' + itemID)
    .then(function (res) { return res.json()}
    .then(function (res) {
      return res.data.info // 回傳 <object>商品資料
    })
}
```
```js
// 實際使用時：
let itemInfo = getAndCheckItem('c8763')
console.log(itemInfo) // 無法確定回傳的資料到底是沒有此商品還是物件形式的商品資料
```

## 語句結構（structure）
在語句結構的部分我們需要考量到它的深度問題，而深度最大的問題即是巢狀結構所造成的，例如一個函式中有太多的 `if/else` 結構，或是出現 `switch` 結構。

```js
// Single Page Application 假換頁
function goPage(pipePageName) {
  let page = pipePageName.split('|');

  if (page[0] === 'main') {
    if (page[1] === 'search') {
      history.pushState('','','/main/search')
    } else {
      history.pushState('','','/main')
    }
  } else if (page[0] === 'contact') {
    history.pushState('','','/contact')
  } else {
    history.pushState('','','/404')
  }
}
```

```js
// 實際使用時：
let searchButton = document.querySelector('#goSearchPage')
searchButton.addEventListener('click', function () {
  goPage('main|search')
})
```

往後想要增添頁面的時候，`goPage` 函式內部的結構將會成為阻礙，內部大量的判斷即便更改成 `switch` 來做也是一樣令人難以接受，並且還沒考量到要傳入 `pushState` 的參數就已經如此複雜。

我們將其判斷結構挪至外層，將判斷這件事情交給外面的邏輯來處理，使 `goPage` 函式專心做好它應該做的事情：

```js
function goPage (pageName) {
  let state = JSON.parse(JSON.stringify(history.state)) || [];
  let title = document.title;
  let stateFormat = { pageName: pageName, url: location.href }

  state.push(stateFormat)
  history.pushState(state, title, pageName)
}
```

```js
// 實際使用時：
let searchButton = document.querySelector('#goSearchPage')
searchButton.addEventListener('click', function () {
  goPage('search')
})
```

我們可以發現將判斷邏輯移出後可以使得原本的 `goPage` 函式將會更加清楚，並且還補上了其他的資訊，將來還可以藉由 `history.state` 來操作如同歷史頁面的紀錄。

而書中筆者則是建議，我們應該避免將巢狀結構納入其中，如果真的有必要這麼處理，應該確保這個函式是處於低層次的抽象概念當中，意思即為該函式幾乎不再被使用。