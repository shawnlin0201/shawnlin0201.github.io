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
> 1-5 行是假設我們要用來模擬的函式。
> 7 行是透過 Jest 測試時所提供的 `jest` 物件，裡面有個 `fn` 的方法，只要使用 `fn` 方法所建立的函式，後續才可以使用接下來的鍊式語法
>
>

# 參考資料

- [Jest-mock](https://jestjs.io/docs/zh-Hans/mock-functions)
