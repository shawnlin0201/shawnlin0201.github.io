---
title: 【概念ノ章】測試脈絡－2. 決定測試工具
date: 2022-09-23 20:21:35
tags:
- [前端]
- [Vue.js]
- [Vitest]
- [Vue Test Utils]
- [Unit Test]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="vitest-logo" src='/images/vitest-logo.svg' width='200px' height='200px' />
</div>

# 本文序

正所謂「工欲善其事必先利其器」，決定好專案中要運用哪些測試類型後，接下來就要挑選合適的測試工具來輔助我們執行測試的內容。

<!-- more -->

## 測試工具

在 【測試價值：為什麼我需要測試】 一文中，我們有提到簡易的測試工具是如何手刻出來的，也稍微談到了手刻測試工具的困難，因此選擇一個適當的測試工具來輔助我們進行測試是有必要性的。

但測試工具百百種，許多工具在提供的功能上又重疊，那麼我們該如何選擇工具呢？

若是以 **「單元測試」** 來說的話，我們在撰寫測試程式碼時可能至少就會有以下的需求：

```js
/* 引入相關檔案 */

describe('測試情境描述', () => {
  it('測試案例描述', () => {
     const wrapper = mount(component)
     expect(wrapper.text()).toBe('Hello, World')
  })
  it('另一個測試案例描述', () => {
     const wrapper = mount(component, {
       props: {
         content: 'Unit-test!'   
       }
     })
     expect(wrapper.text()).toBe('Unit-test!')
  })
})
```

- 測試環境（test runner）：提供上方測試程式碼執行的環境。
- 測試情境（test suite）：如上方的 `describe` ，用來包裹多個測試案例，以及描述測試情境⋯⋯等功能。
- 測試案例（test case）：如上方的 `it`，用來包裹該測試案例的實際情況，若有錯誤時需讓我們能夠輕易找到是哪個案例發生的⋯⋯等等功能。
- 斷言（Assertion）如上方的 `expect`，主要是用來判斷受測物與預期結果是否一致的方法，甚至依據不同判斷方式內部也提供了多種判斷方式，如 `.toBe` 可用來判斷選取的目標與預期結果是否相等。

除此之外，在必要的情況下甚至會需要：
- 測試替身（test double）：用來模仿依賴工具或函式原先的功能狀況
- 解析或模擬元件容器
- 模擬瀏覽器中 DOM 的環境

而根據上述需求，就能夠列出一個需求表，來評估各個測試工具是否符合我們測試需要的部分：

> 測試工具列表可參考個框架中的測試建議指南，（比方 [Vue 的測試建議指南](https://vuejs.org/guide/scaling-up/testing.html#component-testing)）

需求 | Vitest | Jest | Mocha | Chai.js|Sinon.js|Vue-test-utils|jsdom|
:-- | --- | --- | --- | --- | --- | --- | --- |
測試環境（test runner）|✔(註1)|✔|✔| | | | |
測試情境（test suite） |✔|✔|✔| | | | |
測試案例（test case）  |✔|✔|✔| | | | |
斷言（Assertion）     |✔|✔| |✔| | | |
測試替身（test double）|✔|✔| | |✔| | |
解析或模擬元件容器      | | | | | |✔| |
提供模擬 DOM 環境      | | | | | | |✔|

> 註1：Vitest 本身基於 Vite 環境，因此專案若非透過 Vite 所構建的話就無法使用。

現在透過這個表我們可以很清楚的看見，假設專案是基於 `Vite` 所建立的那麼我可以選擇下列這個組合：
- `Vitest` + `Vue-test-utils` + `jsdom`

如果專案是基於 `Vue-cli` 所建立的，那麼就無法使用了 `Vitest` 作為測試運行的環境了，此時根據表中我們就可以替換為：
- 方案一：`Jest` + `Vue-test-utils` + `jsdom`
- 方案二：`Mocha` + `Chai.js` + `Sinon.js` + `Vue-test-utils` + `jsdom`

而在做工具替換時，需要注意到的是，不同的測試環境（test runner）可能會對於引入（`import`）檔案時發生解析上的問題，比方若用到 Vue 中的 `SFC` 類型檔案作為開發，那在 `Jest` 做為測試環境時我們就需要另外安裝 `vue-jest` 來做轉換 `SFC` 上的處理。

當然，上述的需求表只是一個簡單的範例，而隨著撰寫測試的經驗越多，後續慢慢就會瞭解到專案中會需要哪些測試工具來協助我們進行測試，甚至比較各種測試工具的優缺點從而選出最適合團隊的測試工具！

現在我們已經了解要如何挑選測試工具了，明天要來開始聊聊撰寫測試案例時應該要如何思考！
