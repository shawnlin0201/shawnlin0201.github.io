---
title: JavaScript 深入淺出 Callback Function 回呼函式
date: 2020-06-15 15:12:13
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

回呼？回調？
Callback Function 到底 Call 了什麼東西回去？
就讓我們來瞭解回呼函式到底在做什麼吧！


<!-- more -->

# callback function
回呼函式（Callback Function）其實就是函式，只是一般都會定義**某個函式為另一個函式的參數，當透過另一個函式呼叫該函式時**，此時我們就可以說它是回呼函式。

比如我們從 `isbndb.com` 找到了一隻可以查閱書籍相關內容的 API，我們可以將其寫成下列函式：

```js
function getBookInfo(ISBN) {
  fetch('https://api2.isbndb.com/book/' + ISBN )
    .then(res => res.json())
    .then(res => console.log(res)) // 這裡會回應一個 json 格式的書籍資料
}
```

但如果我們想要取得書籍資料後做一些處理的話，直接寫在函式裡面就會難以重複利用，並且會副作用在裡面：
```js
function getBookInfo(ISBN) {
  fetch('https://api2.isbndb.com/book/' + ISBN )
    .then(res => res.json())
    .then(res => {
      // 在裡面對 responese 回來的資料做一些處理
      // 另外做了只有針對 ISBN 9862764414 的額外處理
    })
}

getBookInfo('9862764414') // 第一次沒問題

getBookInfo('986476246X') // 糟了，是副作用，裡面的額外處理是我不想要的
```

這時候我們可以將要處理的函式作為參數傳進去，使得取得資料的時候去呼叫這隻函式，接著就可以在使用函式的同時，同時定義好取到資料後要做什麼事情：

```js
function getBookInfo(ISBN, cb) {
  fetch('https://api2.isbndb.com/book/' + ISBN )
    .then(res => res.json())
    .then(res => cb(res)) // 執行 cb 參數，也就是我們使用函式時所定義的回呼函式。
}

getBookInfo('9862764414', function(res){
  // 這裡可以寫取到 ISBN 9862764414 的資料後要做什麼事情
})

getBookInfo('986476246X', function(res){
  // 現在可以各自做處理了！
})
```

從上面範例中可以看見，回呼函式輕鬆的將耦合降低了，我們將來要使用不同的 ISBN 取得書目資料時，我們不必再去更改 `getBookInfo` 函式裡的內容，而是在使用函式時可以自由的定義取到資料後要進行的處理！

# error first
在上方的例子中我們可以看見我們只有定義了取得資料後的狀態，並沒有定義取得資料失敗的狀態，因此我們要在把錯誤狀態加進我們的回呼函式：

```js
// 先不管 getBookInfo 內部的實作

getBookInfo('9862764414', function(x, y){
  // x, y 應該要是什麼
})
```

從上面例子可以看到當我們在執行 `getBookInfo` 函式的回呼函式時，我們並無法知道 `x`、`y` 傳進來的參數代表什麼意思，此時如果要你選一個參數當判斷取得資料成功與否你會選擇哪個？

較好的做法其實是使用第一個參數來做判斷：

```js
function getBookInfo(ISBN, cb) {
  fetch('https://api2.isbndb.com/book/' + ISBN )
    .then(res => res.json())
    .catch(err => cb(true, err)) // 如果取得失敗會執行這個函式
    .then(res => cb(false, res)) // 如果取得成功會執行這個函式
}

getBookInfo('9862764414', function(err, res){
  if (err) {
    // 定義取得失敗後的做法，此時 res 可以回應錯誤的內容
  } else {
    // 定義取得成功後的做法，此時 res 可以回應成功的內容
  }
})
```

為什麼會是第一個參數呢？原因在於我們對於成功取得資料的與否這件事情是一定會遇到的，所以我們可以藉由放在第一個參數來減低不必要的參數使用。

```js
getBookInfo('9862764414', function(a, b, c, d, err){
  if (err) {
    // 定義取得失敗後的做法，此時 res 可以回應錯誤的內容
  } else {
    // 定義取得成功後的做法，此時 res 可以回應成功的內容
  }
})
```

上面例子則是假如 callback function 第五個才是 err 處理，可以看見儘管我們只有要使用 `a` 參數與 `err` 處理，我們仍然要把其他參數列好列滿。

# callback hell
當我們以為終於完成 Callback function 時，上忍告訴你事情沒有這麼簡單就結束，假如今天有一個狀況是有一連串的函式需要按順序執行時，你第一個可能會想到這麼做：

```js
function funcA() {
  funcB()
}

function funcB() {
  funcC()
}

function funcC() {
  console.log('end')
}

funcA()
```

但你現在已經會回呼函式了，因此改寫成：

```js
function funcA(cb) {
  cb()
}

function funcB(cb) {
  cb()
}

function funcC() {
  console.log('end')
}

funcA(        // 執行完函式 A 時 callback 函式 B
  funcB(      // 執行完函式 B 時 callback 函式 C
    funcC()
  )
)
```
你不禁讚嘆自己如同 JavaScript 忍者一樣寫出低耦合的程式，如同一位上忍般解決了一個艱困的難題

直到當我們有多個順序需要執行時：

```js
funcA(
  funcB(
    funcC(
      funcD(
        funcE(
          funcF(
            funcG(
              funcH(
                funcI()
              )
            )
          )
        )
      )
    )
  )
)
```

「此時你就可以看到著名的回呼地獄（Callback Hell），而且這還不含錯誤處理呢。」上忍如是說，「至於要怎麼解決，只能詳閱 Promise 一文」。


# 參考文章
- [Callback(回調)](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/callback.html)