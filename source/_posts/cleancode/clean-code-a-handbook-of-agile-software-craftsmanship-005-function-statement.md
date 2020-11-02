---
title: 重新解構：無瑕的程式碼（Clean Code） Chapter 3 函式－函式語句（下）
date: 2020-10-26 10:01:01
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

在上篇文章中，我們將**函式（function）**拆成了三個部分：

- 函式名稱（naming）：以供辨識、呼叫用的名稱。
- 函式參數（parameter）：提供連結外部變數，傳送到內部語句的傳送參數。
- 函式語句（statements）：實際函式所執行的區域。

其中**函式語句（statements）**的部分又可以拆為：

- 語句類別（type）：探討函式是怎麼被開發者使用的。
- 語句結構（structure）：探討內部語句的寬度與深度。
- 語句脈絡（context）：探討內部語句的長度與敘述。

而這篇文章將延續上篇文章繼續介紹語句脈絡的概念。

<!--more-->

## 語句脈絡（context）
別於語句結構的巢狀、深度，語句脈絡指的部分是在函式中的，語句整體的敘述與長度，包含了輸入、輸出值等等邏輯。

而根據無暇的程式碼一書中，一個較好的語句脈絡應該包含了：
- 由上而下的敘述
- 越短越好
- 無副作用
- 只有一件目的
- 結構化函式

### 由上而下的敘述
由上而下的敘述是指，在函式語句（statement）的過程中，我們可能會使用其他的函式來輔助，那麼這些函式應該要有父層（parent）、子層（child）這些相對的概念：


```js
// 計算淨利的程式
function countIncome() {
  let totalIncome = 0
  totalIncome = totalRevenue() - totalCost() - calcTax(totalRevenue())
  return totalIncome
}

function totalRevenue () {
  // 計算並返回總營業額
}

function totalCost () {
  // 計算並返回總成本
}


function calcTax(NTD) {
  // 將總營業額帶入並計算營業稅
}
```

```js
// 實際使用時
const INCOME = countIncome()
console.log(INCOME)
```

我們可以看見將來實際使用時，我們會首先暴露相較於父層的 `countIncome` 函式。

因此如果將來想了解 `INCOME` 值是怎麼處理而來的時候，會先找到 `countIncome` 函式，接著在從內部語句中找到其餘計算相關內容的 `totalRevenue`、`totalCost` 與 `calcTax` 函式，我們就能輕易的透過這種由上而下的引入關係理解這些函式之間的關聯性。

### 越短越好
語句越短越好可以說是接著上節由上而下的敘述的補充。

經過剛剛的範例可以看見，當我們在閱讀 `countIncome` 時，內部並沒有做太多複雜的計算，而是將這些計算分工給其餘的程式，如此一來我們可以加快閱讀每個函式本身在做的事情，藉由快速理解各個函式本身的行為，強化理解函式與函式之間的關聯。

### 無副作用
無副作用的意思即為，在處理函式數值時，函式本身應該是針對其數值做運算、針對功能做出相對應的行為；如果函式背地裡修改了其他數值、執行其他的行為，將會大大的加深理解函式的困難度。

<!-- todo -->

```js
function getUserInfo (userID) {
  fetch('...')
    .then(res => res.json())
    .catch(e => location.reload())
    .then(res => {
      return res
    })
}
```

```js
// 實際使用時
getUserInfo('c8763') // 找不到，但錯誤時直接重整，所以也不知道發生什麼事情
```

在這段程式碼中，欲使用 `getUserInfo` 函式取得使用者相關資訊，但是卻不知道為何直接重整的案例。

去爬了定義 `getUserInfo` 的函式後，才發現語句中對於 ajax 的錯誤處理中，使用了 `location.reload()` 來重整頁面。

即便是直接使用了有副作用的函式都讓人覺得疑惑了，可以試想當你是在深層度的層次中使用到時會發生什麼情況：

```js
function renderPage (obj) {
  this.init = function (obj) {
    let pageData = getPageData(obj.pageName) // 取得 <object>頁面資料
    let userInfo = getUserInfo(obj.userID) // 取得 <object>會員資料
    return `Hello, ${userInfo.nickname}!`
  }
  return this.init(obj)
}

function getPageData(pageName) {
  let result = {}
  // 取得頁面資料
  return result
}

function getUserInfo(userID) {
  fetch('...')
    .then(res => res.json())
    .catch(e => location.reload())
    .then(res => {
      return res
    })
}
```

```js
// 實際使用時，預期要渲染一個名稱為 'main' 的頁面。
renderPage({
  pageName: 'main'
  userID: 'c8763'
})
```

你能夠輕易地看出為何 `renderPage()` 最後會導致不正常的頁面刷新嗎？如果可以的話，想像它只是某個不明顯的數值變更看看，你還能輕易地找到錯誤的地方嗎？


### 只有一件目的
一個函式語句（statement）應該要只有一件目的，如此一來閱讀程式碼時就不需要在多種目的下來回猜測，使函式本身做的事情更容易被表達。

例如錯誤處理中的 `catch` 本身就算是一件目的：
```js
function getMemberInfo (memberID) {
  fetch('...' + memberID})
    .then(res => res.json())
    .catch(err => console.log(err)) // 錯誤處理
    .then(res => console.log(res)) // 若無錯誤時的處理
}
```
在這 `getMemberInfo` 中，本身目的在於取得資料這件事情，因此我們可以掌握取得資料與沒有取得資料的行為。

如果我們在取得資料錯誤之後又做了其他事情，則會使函式變成有副作用的情況，將來要除錯時會無法聚焦錯誤訊息。

而透過讓函式符合專一職責的思維，最後可以帶來像是單元測試（unit testing）會更很容易測試他的邏輯以及重構時（refactoring）的抽象處理等等好處。

### 結構化函式
現在我們知道只有一件目的的函式的語句脈絡的好處了，結構化函式則是在整體語句脈絡上訂下一個輸出輸入的準則。

例如在需要初始化區域變數我們應該在函式語句的開頭就定義完畢，這樣可以使我們更容易找到值的來源：

```js
function countSomething(x, y, z) {
  let a = x
  let b = y
  let c = z

  /** 
  * 假設函式語句有一些長度，以至於你可能需要滑鼠滾動檢查整段語句。
  */
  c += 1 
  d = a + b
  return a + b - c 
}
```
在上方的例子中，我們快速檢查 c 變數的源頭是誰以及意識到 d 變數可能是來自更外一層的區域所宣告的區域變數或可能是忘記初始化，最後變成全域變數的危險分子。

另一個結構化的方式則是將進入點**輸出點**集中管理：

```js
function sumArray (arr) {
  let result = 0; // 將輸出值，透過變數初始化在上方
  if (!Array.isArray(arr)) { return false }  // 防禦處理、例外處理（exception handling），也可以移置上方管理。

  for (let i = 0; i < arr.length; i++) {
    result += arr[i]
  }

  return result // 輸出的來源現在可以很確定是源自哪裡了
}
```

這樣的作法在函式語句需要 `if/else`、`switch` 判斷時會更加的明顯：

```js
// 沒有控制的情況
function getPageData(pageName) {
  if (pageName === '')  {
    let something = ''
    /**
    * 進入流程處理
    */
    return something // 處理完直接輸出值
  } else if (pageName  === 'search') {
    let something = ''
    /**
    * 進入流程處理
    */
    return something // 處理完直接輸出值
  } else {
    let something = ''
    /**
    * 進入流程處理
    */
    return something // 處理完直接輸出值
  }
}
```

在沒有控制的情況，這個判斷流程（condition）將會逐漸使開發、除錯漸漸變得困難，我們可能要不斷在各種流程中下斷點來判斷裡面返回的數值狀況。

雖然不是不可，但是如果預期輸出的值是相同概念的話，可以將其控制為一點輸出：

```js
function getPageData(pageName) {
  let result = ''; // 依照輸出的資料類型定義初始值，提供預期的輸出資料類型
  if (pageName === '')  {
    let something = ''
    /**
    * 進入流程處理
    */
    result = something  // 將處理好的數值接回輸出變數
  } else if (pageName  === 'search') {
     let something = ''
    /**
    * 進入流程處理
    */
    result = something  // 將處理好的數值接回輸出變數
  } else {
     let something = ''
    /**
    * 進入流程處理
    */
    result = something  // 將處理好的數值接回輸出變數
  }

  return result // 統一輸出
}
```

如此一來我們可以針對其 `result` 變數的過程作監控，在最後輸出前監控該數值的變化是否合乎預期。

以上兩篇就是有關於函式語句（statement）上的處理，下一篇文章我們將會介紹不同的函式參數所帶來的影響以及函式命名的做法。