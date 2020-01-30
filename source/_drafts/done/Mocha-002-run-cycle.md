---
title: Mocha.js 運行週期、週期鉤子（Run cycle, Hook）
date: 2020-02-10 22:10:34
tags:
- [w3HexSchool]
- [前端]
- [JavaScript]
- [Testing]
- [Mocha.js]
categories: 
- [JavaScript, Mocha.js]
- [JavaScript, Testing]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="mocha-logo" src='/images/Mocha/mocha-logo.svg' width='200px' height='200px' />
</div>

# Run Cycle 運行週期
Mocha.js 在執行測試時，會遵循它的運行週期，只要瞭解了它的運行週期，我們便能快速掌握撰寫測試程式碼的基本架構：

![mocha-run-cycle.png](/images/Mocha/mocha-run-cycle.png)

<!--more-->

1. 執行 Mocha 主程式
2. 生成並進入子處理程序。
3. 處理並執行 Mocha options 選項內容。
4. 依序單筆地執行所有 spec 檔案。
5. 在 spec 檔案中，依序執行所有的測試套件 `describe()` 中的 callback function。
6. 第一筆測試案例開始前，執行 `before()` 週期鉤子。
7. 在執行每個測試案例前，都各別觸發一次 `beforeEach()` 週期鉤子。
8. 執行測試案例 `it()` 中的 callback function。
9. 在執行每個測試案例後，都各別觸發一次 `afterEach()` 週期鉤子。
10. 最後一筆測試案例結束後，執行 `after()` 週期鉤子。
11. 執行完所有 spec 檔案。
12. 結束子處理程序。

而整個週期最重要的概念在於每個 spec 檔案被執行的時候，會觸發測試套件（Test suit）與測試案例（Test case）的 callback function 以及週期鉤子（Hook），而我們最主要的撰寫測試程式碼的邏輯都會集中在個週期內。接下來要來介紹這些 API 大致上在做什麼。

------

# Test suit 測試套件
每個 spec 檔案中可以允許有多個測試套件，可用來劃分每種測試情境。
- **describe('test suit name', callback function())：**
第一個參數主要用來描述該測試套件中的整體環境，而第二個參數則是用來呼叫測試案例以及週期鉤子。
```javascript
describe('App router test',function () {
    // 放入 it() 或其他週期鉤子 before()、beforeEach()、after()、afterEach()
})
```

------

# Test case 測試案例
每個測試套件中可以允許有多個測試案例，可用來釐清該筆案例所測試的內容。
- **it('test case name', callback function())**
第一個參數主要用來描述該筆測試案例（Test Case）的情境，而第二個參數則是用來呼叫斷言（assertion）的內容。
```javascript
it('App router test',function () {
    // 放入斷言內容
})
```

------

# Hook
運行週期裡面最主要的概念在於每個 spec 檔案被執行的時候，會依序觸發的 callback function 與週期鉤子（Hook），接下來來介紹與週期有關的 API：

- **before()**
進入測試套件時便會執行一次，主要用來放入執行測試案例前的測前資料。
```javascript
before(function () {
    // 測前資料
})
```

- **beforeEach()**
每個測試案例（Test Case）開始前都會執行一次，用來更新每筆測試案例的測前資料。
```javascript
beforeEach(function () {
    // 更新測前資料
})
```

- **afterEach()**
每個測試案例（Test Case）結束後都會執行一次，用來更新每筆測試案例的結束後的資料。
```javascript
afterEach(function () {
    // 更新測後資料
})
```

- **after()**
離開測試套件時便會執行一次，用來更新整個測試套件結束後的資料，以避免測試時汙染到原先的資料，影響到下一個測試套件。
```javascript
after(function () {
    // 測後資料
})
```

# 總結
釐清了上述的週期、測試套件、測試案例、與鉤子後，現在我們可以嘗試來寫一個跟週期鉤子有關的測試 spec 檔（建置的部分可參考之前的 Mocha 環境建置 文章）。

**sum.js**
```javascript
function sum (a,b) {
    return a + b
}

module.exports = sum
```

**minus.js**
```javascript
function minus (a,b) {
    return a - b
}

module.exports = minus
```

**function.spec.js**
```javascript
// 引入 Mocha 的斷言庫。
let assert = require('assert')
// 引入寫好的程式
const sum = require('../sum')   
const minus = require('../minus')   

// 描述測試環境
describe('函式測試', () => {
    // 給予容器資料類型應有的預設值
    let sumResult = 0
    let minusResult = 0
    let randomNumberA = 0
    let randomNumberB = 0
    beforeEach(() => { 
        // 設定每次測試案例要用的資料，這裡使用 random() 函式賦予每次案例不同的值。
        randomNumberA = Math.floor(Math.random()*10) // 0 ~ 10
        randomNumberB = Math.floor(Math.random()*10) // 0 ~ 10
        sumResult = randomNumberA + randomNumberB
        minusResult = randomNumberA - randomNumberB
    })
    it('add 函式返回兩者相加的值', () => {
        assert.equal(sum(1, 2), 3,'沒有返回預期的結果')
    })
    it('add 函式返回兩者相加的值', () => {
        assert.equal(sum(100, 200), 300,'沒有返回預期的結果')
    })
    it('add 函式返回兩者相加的值', () => {
        assert.equal(sum(randomNumberA, randomNumberB), sumResult,'沒有返回預期的結果')
    })
    it('minus 函式返回兩者相加的值', () => {
        assert.equal(minus(3, 2), 1,'沒有返回預期的結果')
    })
    it('minus 函式返回兩者相加的值', () => {
        assert.equal(minus(300, 200), 100,'沒有返回預期的結果')
    })
    it('minus 函式返回兩者相加的值', () => {
        assert.equal(minus(randomNumberA, randomNumberB), minusResult,'沒有返回預期的結果')
    })
})
```

執行測試後秀出結果：

```bash
  函式測試
    √ add 函式返回兩者相加的值
    √ add 函式返回兩者相加的值
    √ add 函式返回兩者相加的值
    √ minus 函式返回兩者相加的值
    √ minus 函式返回兩者相加的值
    √ minus 函式返回兩者相加的值
```

以上便是一個簡單搭配週期鉤子的範例。當然，這比起真正的測試還有段距離，得隨著不斷的練習才能寫出快速有效率的測試程式碼！

# 參考資料

- [Mocha-run-cycle](https://mochajs.org/#run-cycle-overview)