---
title: Jest.js 測試替身 Test double & Mocks
date: 2020-03-16 19:23:17
tags:
- [前端]
- [JavaScript]
- [Testing]
- [Jest.js]

categories: 
- [JavaScript, Jest.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/Jest/jest-logo.png' width='200px' height='200px' />
</div>

# Test double 測試替身

測試替身最主要是透過封裝好的函式來協助開發者模擬一些函式、功能、模組所返回的值，而在之前我曾寫過一篇文章專門在講述不同類型的測試替身之間的差別。

> [測試替身 Test Doubles](/testing/testing-002-test-doubles/)

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

# .Mock API
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
從 console.log 中我們可以得知：

### mockFn.mock.calls
這裡會顯示所有呼叫過的 mock 函式

# 參考資料

- [Jest-mock](https://jestjs.io/docs/zh-Hans/mock-functions)
