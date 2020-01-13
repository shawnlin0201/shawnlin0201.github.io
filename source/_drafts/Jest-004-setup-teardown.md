---
title: Jest.js 設定、拆除與作用域（setup、teardown & scope）、執行順序
date: 2000-01-01 00:00:00
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


# setup、teardown

在執行測試時，有時候會需要初始化一些基本資料以供測試進行，並且在測試完畢的時候要讓測試後的資料復原、整理。

而 Jest 在這方面提供的 API 如下：
- **describe()**：測試套件，可以針對測試鉤子形成作用域（scope）並描述該部分的測試情境。
- **test()**：測試案例，用以描述該筆正在進行的測試內容與設定相關測試條件。（也可以使用別名 `it()`）
- **beforeAll()**：針對該**測試套件**的作用域，在**第一筆**測試案例**開始前**執行一次。
- **afterAll()**：針對該**測試套件**的作用域，在**最後一筆**測試案例**結束後**執行一次。
- **beforeEach()**：針對該**測試套件**的作用域，在**每個**測試案例**開始前**執行一次。
- **afterEach()**：針對該**測試套件**的作用域，在**每個**測試案例**結束前**執行一次。

快速看個案例！

這裡先設置了一個基本的函式 `sum.js`，並且用 `module.exports` 來導出：

**sum.js**
```javascript
function sum (a,b) {
    return a + b
}
module.exports = sum
```

接著來寫給 Jest.js 跑測試用的測試程式碼：

**function.test.js**
```javascript
// 引入寫好的程式
const sum = require('./sum')

let sumResult = 0
let randomNumberA = 0
let randomNumberB = 0

beforeEach(() => { 
    // 設定每次測試案例要用的資料，這裡使用 random() 函式賦予每次案例不同的值。
    randomNumberA = Math.floor(Math.random()*10) // 0 ~ 10
    randomNumberB = Math.floor(Math.random()*10) // 0 ~ 10
    sumResult = randomNumberA + randomNumberB
})
test('add 函式返回兩者相加的值', () => {
  expect(sum(1, 2)).toBe(3)
})
test('add 函式返回兩者相加的值', () => {
  expect(sumResult).toBe(randomNumberA + randomNumberB)
})
```

執行測試後秀出結果：

```bash
 PASS  ./sum.test.js
  √ add 函式返回兩者相加的值
  √ add 函式返回兩者相加的值
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        3.786s
Ran all test suites.
```

# scope 與 執行順序
使用 JavaScript 都知道 JavaScript 擁有它的作用域，而在 Jest 中也有屬於它自己的作用域，官方提供了兩個很簡單能分別看出 Hook 之間與 `describe()`、`test()` 之間執行順序的測試程式碼：

## Hook
在鉤子中的順序我們可以透過以下程式碼來測試：

```javascript
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));
test('', () => console.log('1 - test'));
describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  test('', () => console.log('2 - test'));
});
```

我們試著觀察測試結果：

```bash
● Console
  1 - beforeAll    # 全域級：最外層雖沒有明寫 describe()，但整個檔案其實算是一個測試套件，因此開始前就會執行一次。
  1 - beforeEach   # 全域級：每個測試案例前執行。
  1 - test         # 全域級：測試案例。
  1 - afterEach    # 全域級：每個測試案例後執行。
  # 從這裡進入巢狀級測試套件
  2 - beforeAll    # 巢狀級：測試套件開始時執行一次。
  1 - beforeEach   # 全域級：每個測試案例前執行。
  2 - beforeEach   # 巢狀級：每個測試案例前執行。
  2 - test         # 巢狀級：測試案例。
  2 - afterEach    # 巢狀級：每個測試案例後執行。
  1 - afterEach    # 全域級：每個測試案例後執行。
  2 - afterAll     # 巢狀級：測試套件結束時執行一次。
  # 從這裡離開巢狀級測試套件
  1 - afterAll     # 巢狀級：測試套件結束時執行一次。
```

我們可以看到了幾個重點：
1. 整個檔案算是一個測試套件，因此全域級別的鉤子都會觸發。
2. 測試開始前 `*All` 系列的鉤子先於 `*Each` 系列鉤子；離開時， `*All` 系列的鉤子則是後於 `*Each` 系列鉤子。
3. `*Each` 系列的鉤子不僅只有在當下的級別執行，甚至還會往巢狀的測試套件中也執行。
4. `*Each` 系列的鉤子，在測試案例前 **全域級** 的鉤子先於 **巢狀級** 的鉤子；在測試案例後， **全域級** 系列的鉤子則是後於 **巢狀級** 的鉤子。

簡單來說的話便是：整個鉤子邏輯是屬於後進先出（LIFO，Last in, First Out）原則的，並且父層的鉤子邏輯會**完整**的套用在子層鉤子邏輯中。

## describe()、test()
在鉤子中的順序我們可以透過以下程式碼來測試：



# 參考資料

- [Jest-setup-teardown](https://jestjs.io/docs/zh-Hans/setup-teardown)