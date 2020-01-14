---
title: Jest.js 異步測試（Asynchronous Test）
date: 2020-03-02 23:11:56
tags:
- [前端]
- [JavaScript]
- [Testing]
- [Jest.js]
categories: 
- [JavaScript, Jest.js]
- [JavaScript, Testing]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/Jest/jest-logo.png' width='200px' height='200px' />
</div>

# Asynchronous
由於 JavaScript 在瀏覽器的宿主環境裡擁有單線程（single thread）的特性，使得在程式執行時期（Run time）中一些有關非同步（Asynchronous）的操作會等到主線程（Main thread）整個操作結束後才會回來執行處在任務序列（Event queue）中的非同步操作。

因此在測試中，如果遇到有關非同步的操作時，測試程式碼的執行順序（主線程）會先於任務序列，造成測試還未來得及收到非同步執行後的結果，進而導致測試失敗的產出。

我們能做的做法便是要將測試程式碼運行結束的時間，拖延至任務序列當中，讓測試套件（Test suit）中非同步的結果產出之後，才來進行測試中的斷言。

而在 Jest.js 解決這一類非同步測試的問題時，有提供了實際 API 的作法以供參考：
- callback function 類
- promise 類
- async / await 類

## callback function
在處理 callback function 的作法是，在呼叫測試案例 API `test()` 時，使用 `done` API。

我們只需要在第二個回呼函式中給予 `done` 參數，並在非同步的結果處理完畢時，執行 `done()`，來表示整個測試案例的結束，而若給予參數 `done` 卻沒執行 `done()` 則表示測試失敗，意思也就是非同步的行為操作失敗，符合我們測試的期待。

一般測試寫法，但是這樣填寫會導致在執行非同步的 `fetch` 前，主線程的測試就已經測試完，因此導致測試失敗：
```javascript
test('查詢商品列表資料是否有正確傳送給輪播功能', () => {
  fetch('某個商品公開列表 API 網址')
    .then(res => res.json())
    .then(res => {
      // 假設完成後須執行 postItemToCarousel 函式
      // 這裡假設我們最後 callback 傳送了 {id: 1, name: 'potato', price: 50 } 進去
      res.items.forEach(item => {
        postItemToCarousel({
          id: item.id, 
          name: item.name,
          price: item.price
        })
      })
    })

  function postItemToCarousel(item) {
    expect(item.id).toBe(1)
    expect(item.name).toBe('potato')
    expect(item.price).toBe(50)
  }
})
```

加上 `done` 參數的寫法，使非同步執行完畢才進行測試：

```javascript
// 測試案例第二個傳參傳入 `done`，如此一來這個測試案例本身就會等待 `done()` 被執行的時候才會開始測試斷言的部分。
test('查詢商品列表資料是否有正確傳送給輪播功能', done => {
  fetch('某個商品公開列表 API 網址')
    .then(res => res.json())
    .then(res => {
      res.items.forEach(item => {
        postItemToCarousel({
          id: item.id, 
          name: item.name,
          price: item.price
        })
      })
    })

  function postItemToCarousel(item) {
    expect(item.id).toBe(1)
    expect(item.name).toBe('potato')
    expect(item.price).toBe(50)
    done() // 到這行表示才進行測試斷言
  }
})
```


## promise
如果資料返回的形式是一個 promise 的話，需透過 `return` 來返回斷言：

```javascript
test('取得會員社交資料成功', () => {
  return fetch('取得會員社交資料網址')
    .then(res => res.json())
    .then(res => expect(res.memberName).toBe('ShawnL'))
})
```

因為在 promise 中如果已經取得目標的狀態下（fulfilled）不會讓測試案例失敗，所以如果要測試 promise 中 `.catch()` 方法，需要透過 `expect.assertions` 來定義斷言的數量，來確保一定要通過幾筆斷言才算是成功的測試案例。

```javascript
test('取得會員社交資料錯誤處裡', () => {
  return fetch('取得會員社交資料網址')
    .then(res => res.json())
    .catch(error => expect(error)).toMatch('錯誤處理的訊息'))
})
```

除了上面的作法之外，也可以使用 Jest 提供的 `.resolves`、`.rejects` 配對器：
```javascript
test('取得會員社交資料', () => {
  return expect(fetch('取得會員社交資料網址').then(res => res.json()).then(res => res.memberName)).resolves.toBe('ShawnL')
})
```

```javascript
test('取得會員社交資料錯誤處裡', () => {
  return expect(fetch('取得會員社交資料網址').then(res => res.json()).catch(error => error)).rejects.toMatch('錯誤處理的訊息')
})
```

## async / await
Jest 關於非同步的議題也納入了 ES7 中的 `async`、`await` 用法，我們可以寫出更優雅的非同步測試程式碼：

```javascript
test('取得會員社交資料', async () => {
  let memberData = await fetch('取得會員社交資料網址').then(res => res.json()).then(res => res)
  expect(memberData.name).toBe('ShawnL')
})
```

```javascript
test('取得會員社交資料錯誤處裡', async () => {
  expect.assertions(1)
  try {
    await fetch('取得會員社交資料網址').then(res => res.json())
  } catch (err) {
    expect(err).toMatch('錯誤處理的訊息')
  }
})
```

同樣還可以再搭配 `.resolves`、`.rejects` 配對器：

```javascript
test('取得會員社交資料', async () => {
  await expect(fetch('取得會員社交資料網址').then(res => res.json()).then(res => res.name)).resolves.toBe('ShawnL')
})
```

```javascript
test('取得會員社交資料錯誤處裡', async () => {
  await expect(fetch('取得會員社交資料網址').then(res => res.json()).catch(err => err)).rejects.toMatch('錯誤處理的訊息')
})
```

上面介紹了一些在 Jest 中撰寫非同步測試的幾種情境與解決方法。

然而非同步議題在實際測試中，後續測試其實會比較關注在後續視覺與邏輯處理的部分，因為我們可能已經預期非同步執行的結果會是什麼，因此會利用 Mock 來仿造非同步資料，再來撰寫測試程式碼。

但為了真的要去測一些非同步執行的內容的話，還是要知道怎麼使用會比較好 XD


# 參考資料

- [Jest-asynchronous](https://jestjs.io/docs/en/asynchronous)