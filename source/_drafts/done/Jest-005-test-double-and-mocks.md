---
title: Jest.js 測試替身 Test double & Mocks Functions
date: 2020-03-16 19:23:17
tags:
- [w3HexSchool]
- [前端]
- [JavaScript]
- [Testing]
- [Jest.js]

categories: 
- [JavaScript, Jest.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="jest-logo" src='/images/Jest/jest-logo.png' width='200px' height='200px' />
</div>

# Test double 測試替身

測試替身最主要是透過封裝好的函式來協助開發者模擬一些函式、功能、模組所返回的值。

像是 Mocha.js 就會搭配像是 Sinon.js 這一類的隔離庫來使用測試替身。而 Jest 本身核心概念是屬於 **batteries-included** 類型的框架（即為你需要的功能，框架都盡量幫你準備好了），因此 Jest 在模擬測試替身上則是看 Jest 本身的 Mock API 即可！

<!--more-->

# Mock 基礎範例
我們根據 Jest mock 中的範例程式，在自己的測試程式碼中寫入：
```javascript
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

test('mock test', () => {
  expect(mockCallback.mock.calls.length).toBe(2); // mockCallback 函式應該被呼叫了 `2` 次
  expect(mockCallback.mock.calls[0][0]).toBe(0); // mockCallback 函式第一次呼叫時第一個參數是 `0`
  expect(mockCallback.mock.calls[1][0]).toBe(1); // mockCallback 函式第二次呼叫時第一個參數是 `1`
  expect(mockCallback.mock.results[0].value).toBe(42); // mockCallback 函式第一次呼叫時，callback 返回的值是 42
})

```

> 範例程式碼中的解釋，
> 1-5 行是一般的函式。
> 7 行是透過 Jest 所提供的 `jest` 物件，透過 API `fn` 的方法，來模擬一個函式，而使用該函式會得到類似有關呼叫與傳參等等行為上的資訊。
> 8 行則是實際使用 1-5 行函式，並在 callback function 的傳參中使用了被 Mock 了的函式，因此 `mockCallback` 會記載一些關於透過 `fn` 被記錄的內容。
> 好比測試案例（Test case）中的第 11 行，`mockCallback` 裡面有被記載到被呼叫了幾次，而我們透過 `fn.mock.calls.length` 可以得到該資訊。

上面範例中可以看到被 `jest.fn` 所 Mock 的函式，我們可以透過 `.mock` 繼續取得該函式的相關資訊，而這裡使用另一個函式來模擬：
```javascript
function add(a, b) {
  return a + b
}
let mockAdd = jest.fn((a, b)=> a + b)
mockAdd(1, 2)
mockAdd('test','String')

console.log('get mock info', mockAdd.mock)
```
我們將裡面的 mock console.log 出來：
```javascript
{
  calls: [
      [ 1, 2 ],
      [ 'test', 'String' ]
    ],
  instances: [ undefined, undefined ],
  invocationCallOrder: [ 1, 2 ],
  results:[
    { type: 'return', value: 3 },
    { type: 'return', value: 'testString' }
  ]
}
```
從 console.log 中我們可以得知經由 jest.fn 所模擬後我們能在 mock 裡面撈到什麼：
- **calls**：顯示所使用過的傳參，並且依照函式呼叫順序排列。例如：第一次的呼叫兩個傳參為 `[1, 2]`。
- **instances**：顯示指向經由 `jest.fn()` 創建並經過 `new` 關鍵字所創造出來的實體。但範例中沒有使用，所以兩次都是 `undefined`。
- **results**：顯示函式最後返回的結果。例如：第一次的呼叫最後 `return` 了一個值 `3`。
- **invocationCallOrder**：回傳記錄了函式呼叫次數的陣列。換言之我們可以從這個陣列中的 length 值來判斷這個函式被呼叫了幾次。

# Mocks Functions
除了以上基礎的 Mock 之外，Jest 還有多達十多種 Mock 函式可以模擬數值上的呈現。

## 模擬 return 數值
- mockReturnValueOnce()：使 Mock 函式接下來返回的數值被強制回傳其傳參值 **一次**。
- mockReturnValue()：使 Mock 函式接下來返回的數值被 **強制** 回傳其傳參值。
我們直接來看一段測試碼：
```javascript
test('mockFn return value', () => {
  const mockFn = jest.fn()
  console.log(myMock()) // undefined
    mockFn
      .mockReturnValueOnce(10)
      .mockReturnValueOnce('x')
      .mockReturnValue(true);
    
  console.log(mockFn(), mockFn(), mockFn(), mockFn())
  // > 10, 'x', true, true
})
```
我們可以從範例中看到，不論原先 Mock function 中的處理，只要被綁定之後就會強制返回其數值。

第一次看到這個 Mock 肯定會一頭霧水，因為要回傳一個寫死的值為什麼不乾脆直接寫死在斷言中呢？

原因是為了**有效分割測試的範圍**，例如我們在某段程式邏輯中，依賴到其他函式邏輯，但我們並沒有要測試那個範圍就可以這麼做：

```javascript
test('mockFn return value', () => {
  const alwaysReturnTrue = jest.fn()
  alwaysReturnTrue.mockReturnValue(true) // 強制將值返回為 true

  let DBdata = [0, "", false]

  // 未經 Mock 所返回的 filter 處理
  const filterFunction = DBdata.filter(data => data) 
  console.log(filterFunction) // []
  
  // 經 Mock 所返回的 filter 處理
  const afterMockfilterFunction = DBdata.filter(data => alwaysReturnTrue(data))
  console.log(afterMockfilterFunction) // [ 0, '', false ]
})
```
範例中我們透過 `alwaysReturnTrue` 函式加上 `mockReturnValue(true)` 來將值強制返回 true，而在原先 Array.prototype.filter 邏輯當中，`0`、`""`、`false` 都屬於 `falsy` 值，應該要被 filter 篩選出來，因此返回一個空陣列。

但如果我們想檢測如果都 **通過** 的情況 filter 應該要返回哪些值，這時我們就可以使用 `mockReturnValue(true)` 來將返回值都修改判定為 `true`，如此一來就可以比對經由這個 `filter` 邏輯判斷返回值的前後差異。

而以上就是測試替身的基礎概念以及 Jest 中 Mock 的基礎用法，在實作中可能會有不少處需要 Mock 的情況，若沒有出現上述情況的話可以先翻翻 Jest API 中有沒有專門針對的 Mock API 可以使用。

# 參考資料

- [Jest-mock](https://jestjs.io/docs/zh-Hans/mock-functions)
