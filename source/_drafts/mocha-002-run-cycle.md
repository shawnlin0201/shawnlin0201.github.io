---
title: Mocha.js 運行週期、週期鉤子（Run cycle, Hook）
date: 2020-01-01 00:00:00
tags:
- [前端]
- [JavaScript]
- [Testing]
- [Mocha.js]
categories: 
- [JavaScript, Testing]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/Mocha/mocha-logo.svg' width='200px' height='200px' />
</div>

# Run Cycle
Mocha.js 在執行測試時，會遵循它的運行週期，只要瞭解了它的運行週期，我們便能快速掌握撰寫測試程式碼的基本架構：

![mocha-run-cycle.png](/images/Mocha/mocha-run-cycle.png)

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

## Hook
而運行週期裡面最主要的概念在於每個 spec 檔案被執行的時候，會依序觸發的 callback function 與週期鉤子（Hook），接下來來介紹與週期有關的 API：

### describe('test suit name', callback function())：
用來描述該測試套件中的整體環境。
```javascript
describe('App router test',function () {
    // 放入 it() 或其他週期鉤子 before()、beforeEach()、after()、afterEach()
})
```

### it('test case name', callback function())
用來描述該筆測試案例（Test Case）的情境。
```javascript
it('App router test',function () {
    // 放入斷言內容
})
```
### before()
測試前先執行這個區塊內容，用來放入執行測試前的測前資料。
```javascript
before(function () {
    // 測前資料
})
```

### beforeEach()
每個測試案例（Test Case）開始前都會執行一次，用來更新每筆測試案例的測前資料。
```javascript
beforeEach(function () {
    // 更新測前資料
})
```

### afterEach()
每個測試案例（Test Case）結束後都會執行一次，用來更新每筆測試案例的結束後的資料。
```javascript
afterEach(function () {
    // 更新測後資料
})
```

### after()
測試後先執行這個區塊內容，用來更新整個測試套件結束後的資料。
```javascript
after(function () {
    // 測後資料
})
```





# 參考資料

- [Mocha 官方網站](https://mochajs.org/)