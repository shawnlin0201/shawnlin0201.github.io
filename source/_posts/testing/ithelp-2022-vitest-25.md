---
title: 【試験ノ章】第二個測驗：容器（Wrapper）與容器方法（Wrapper methods）
date: 2022-10-10 19:41:31
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
回顧第一次測驗內容，我們已經學會如何利用測試情境與案例（`describe`, `it`）的語法並參考測試路徑（test path）寫出基本的測試結構，最後也使用了對應的測試 Matcher 來做最後的斷言（Assertion）。

而第二次測驗將著重在學習容器（Wrapper）中要怎麼透過容器方法（Wrapper methods）與透過容器函式的第二個參數來模擬各種元件中的內容。

另外，我們今天使用的測試檔案要接續先前[第一次測驗](https://ithelp.ithome.com.tw/articles/10302202)中完成的檔案來進行測試！

同樣的測驗章節我們將會做以下的流程：

- 閱讀故事與題目，釐清需求與規則。
- 規劃測試情境與測試案例，並列好描述的部分。
- 撰寫測試程式碼（Testing Code），並執行測試時得到測試案例失敗。
- 按照題目要求完成產品程式碼（Production Code）
- 再次執行測試確保測試通過。

> 本文一樣可利用[系列文專案](https://ithelp.ithome.com.tw/articles/10292537)來一邊學習，幫你準備好測試所需要的環境，快來安裝吧！

![https://ithelp.ithome.com.tw/upload/images/20221010/20119062IVcelQZ7d1.png](https://ithelp.ithome.com.tw/upload/images/20221010/20119062IVcelQZ7d1.png)

<!-- more -->

## 故事

[前情提要](https://ithelp.ithome.com.tw/articles/10302202)：上回柯基中午要買便當時，碰巧遇到了負責管理『自動乾乾提存機』的橘貓，阿橘；在科基奮不顧身的協助後，終於幫阿橘把『自動乾乾提存機』的邏輯部分寫好了，並得到了一年份的乾乾。

---

「果然⋯⋯」柯基無奈地望著眼前的大袋子說道。「⋯⋯是貓貓專用乾乾。」

眼看中午休息的時間好像快過了，柯基想說拖著一大袋貓乾乾回公司好像也有點怪怪的，於是聯絡了黑黑宅急便公司，想把這包乾乾先寄回家再看要怎麼處理⋯⋯

過了不知道多久，柯基感受到似乎有股視線正在盯著他，「請問是柯基先生嗎？」一名全身黑某某的快遞員正拿著單子看著他。

柯基彷彿看到救贖一樣說道：「你好，我就是柯⋯⋯」還沒說完，黑某某快遞員用她輕快地腳步打斷了柯基的對話，繞到車子的後方並打開車廂，「打開乾乾放進來吧。」

「好的好的！」，柯基一邊打開了乾乾的同時，撇著頭注視了車廂一眼，「這該不會是⋯⋯」

柯基還沒說完話，黑某某快遞員突然用興奮的語氣一邊湊近柯基說道「咪錯咪錯！這就是配有『自動乾乾提存機』的快遞車喔！很酷吧！看來你很懂嗎！喵喵！」被快遞員貼著身上的柯基彷彿能感受到的貓觸鬚刺在他的臉上。

「⋯⋯不過，剛剛不曉得為什麼更新之後，介面就不見了。」黑某某快遞員沮喪的說。「對了，我叫做黑黑。」

「原來⋯⋯黑黑宅急便公司真的是黑貓出來送貨啊⋯⋯」

柯基還沒來得及感嘆完，手機就傳來了一封簡訊寫到：「喂？有空再幫我修一下機器吧，文件我放在副檔裡了。————來自：阿橘。」

「（回覆）⋯⋯這次我要狗狗專用乾乾。」

## 題目

『自動乾乾提存機』主要分為軟體部分與介面部分，而軟體部分目前已有 [FoodBank](https://ithelp.ithome.com.tw/articles/10302202) 程式支援了，然而介面控制部分因為某些問題損壞了，所以我們現在需要將軟體支援的一些功能，透過介面呈現並且讓他能夠操作。

而『自動乾乾提存機』的介面環境主要依賴的是瀏覽器介面來實作的，並且螢幕帶有觸碰功能與模擬鍵盤，因此使用者可以快速點擊畫面上的按鈕來操作，所以可基於瀏覽器環境進行開發。

功能的部分『自動乾乾提存機』有一些明確的限制：

- 狀態顯示欄（Ａ）：
    ```html
    <p data-test="status">{{ status }}<p>
    ```
- 輸入資訊框（Ｂ）
    - 供開戶使用：
    ```html
    <input data-test="input_account" v-model="account" type="text"/>
    ```
    - 供存款使用：
    ```html
    <input data-test="input_deposit" v-model="deposit" type="number" min="0"/>
    ```
    - 供提款使用：
    ```html
    <input data-test="input_withdraw" v-model="withdraw" type="number" min="0"/>
    ```
- 開戶按鈕：
    ```html
    <button data-test="button_open-account">開戶</button>
    ```
    - 點擊後應觸發 `FoodBank` 中的 `openAccount`，並依結果返回不同資訊：
        - 若已有開過戶頭應在狀態顯示欄（Ａ）顯示 `您已開過戶頭囉。`
        - 若交易成功，且該名稱未開過戶頭應在狀態顯示欄（Ａ）顯示 `開戶完成。`
- 存款按鈕：
    ```html
    <button data-test="button_deposit">存款</button>
    ```
    - 點擊後應觸發 `FoodBank` 中的 `deposit`，並依結果返回不同資訊：
        - 若查詢不到戶頭應在狀態顯示欄（Ａ）顯示 `查詢不到該用戶，請重新確認。`
        - 若交易成功，應在狀態顯示欄（Ａ）顯示 `存款完成，戶頭目前餘額 {該用戶的乾乾數量}`
- 提款按鈕
    ```html
    <button data-test="button_withdraw">提款</button>
    ```
    - 點擊後應觸發 `FoodBank` 中的 `withdraw`，並依結果返回不同資訊：
        - 若查詢不到戶頭應在狀態顯示欄（Ａ）顯示 `查詢不到該用戶，請重新確認。`
        - 若交易成功，提領金額足夠應在狀態顯示欄（Ａ）顯示 `存款完成，戶頭目前餘額 {該用戶的乾乾數量}`
        - 若交易成功，餘額不足提領金額應在狀態顯示欄（Ａ）顯示 `餘額不足，你帳戶目前餘額為 {該用戶的乾乾數量}`

# demo

## 1.準備測試用檔案

`FoodBank` 軟體相關邏輯的部分沿用[上次測驗中寫好的部分](https://ithelp.ithome.com.tw/articles/10302202)

而介面的部分我們以一個 `App.vue` 為例：

```
<template>
  <button data-test="button_open-account">開戶</button>
  <input data-test="input_account" v-model="account" type="text" />

  <button data-test="button_deposit">存款</button>
  <input data-test="input_deposit" v-model="deposit" type="number" min="0" />

  <button data-test="button_withdraw">提款</button>
  <input data-test="input_withdraw" v-model="withdraw" type="number" min="0" />

  <p data-test="status">{{ status }}</p>
</template>
```

## 2.撰寫測試案例描述

在撰寫測試案例時，要注意的是我們這次測試的目標是 `App.vue` 元件本身，而非 `FoodBank` 中的邏輯：

> 本次 demo 以下列測試案例為主，實際可依造 [happy, sad & bad 路徑 ](https://ithelp.ithome.com.tw/articles/10297571)規劃出完整的案例：
```js
describe('執行開戶', () => {
  it(`輸入用戶名稱，開戶完成，狀態欄應該顯示 '開戶完成。' `, () => {})
  it(`輸入用戶名稱，若開過戶頭，狀態欄應該顯示 '您已開過戶頭囉。' `, () => {})
})
describe('執行存款', () => {
  it(`輸入用戶名稱與金額，交易完成，狀態欄應該顯示 '存款完成，戶頭目前餘額 {該用戶乾乾數量}' `, () => {})
  it(`輸入用戶名稱與金額，若查詢不到戶頭，狀態欄應該顯示 '查詢不到該用戶，請重新確認。' `, () => {})
})
describe('執行提款', () => {
  it(`輸入用戶名稱與金額，交易完成，狀態欄應該顯示 '存款完成，戶頭目前餘額 {該用戶乾乾數量}' `, () => {})
  it(`輸入用戶名稱與金額，若查詢不到戶頭，狀態欄應該顯示 '查詢不到該用戶，請重新確認。' `, () => {})
  it(`輸入用戶名稱與金額，餘額不足，狀態欄應該顯示 '餘額不足，你帳戶目前餘額為 {該用戶乾乾數量}' `, () => {})
})
```

## 3.補上測試案例的細節並執行測試確保測試失敗

### 3-1. 開戶情境

開戶情境部分首先要注意到的是在輸入（`input`）與點擊（`click`）按鈕的操作時，本身行為是非同步的因此要使用 `async/await` 方式來確保執行完畢。

```js
describe('開戶', () => {
  it(`輸入用戶名稱，開戶完成，狀態欄應該顯示 '開戶完成。' `, async () => {
    const wrapper = mount(component)

    // 輸入用戶
    await wrapper.find('[data-test="input_account"]').setValue('Shawn')
    // 點擊按鈕
    await wrapper.find('[data-test="button_open-account"]').trigger('click')

    expect(wrapper.find('[data-test="status"]').text()).toEqual('開戶完成。')
  })
  it(`輸入用戶名稱，若開過戶頭，狀態欄應該顯示 '您已開過戶頭囉。' `, async () => {
    const wrapper = mount(component)

    // 建立用戶 Shawn
    await wrapper.find('[data-test="input_account"]').setValue('Shawn')
    await wrapper.find('[data-test="button_open-account"]').trigger('click')

    // 重複創建用戶 Shawn
    await wrapper.find('[data-test="input_account"]').setValue('Shawn')
    await wrapper.find('[data-test="button_open-account"]').trigger('click')

    expect(wrapper.find('[data-test="status"]').text()).toEqual('您已開過戶頭囉。')
  })
})
```

### 3-2. 存款情境

存款情境的部分則是要注意到，是否已經開戶以及存款金額的數量，我們可以透過寫定一個值（如存 100）來去模擬斷言結果應該要有的狀態，甚至透過多次操作持續追蹤狀況：

```js
describe('存款', () => {
  it(`輸入用戶名稱與金額，交易完成，狀態欄應該顯示 '存款完成，戶頭目前餘額 {該用戶乾乾數量}' `, async () => {
    const wrapper = mount(component)
    // 開戶行為
    await wrapper.find('[data-test="input_account"]').setValue('Shawn')
    await wrapper.find('[data-test="button_open-account"]').trigger('click')

    await wrapper.find('[data-test="input_deposit"]').setValue(100)
    await wrapper.find('[data-test="button_deposit"]').trigger('click')
    expect(wrapper.find('[data-test="status"]').text()).toEqual('存款完成，戶頭目前餘額 100')
    
    // 技巧：重複操作持續追蹤結果
    await wrapper.find('[data-test="input_deposit"]').setValue(100)
    await wrapper.find('[data-test="button_deposit"]').trigger('click')
    expect(wrapper.find('[data-test="status"]').text()).toEqual('存款完成，戶頭目前餘額 200')
  })
  it(`輸入用戶名稱與金額，若查詢不到戶頭，狀態欄應該顯示 '查詢不到該用戶，請重新確認。' `, async () => {
    const wrapper = mount(component)

    await wrapper.find('[data-test="input_account"]').setValue('Shawn')
    await wrapper.find('[data-test="input_deposit"]').setValue(100)
    await wrapper.find('[data-test="button_deposit"]').trigger('click')

    expect(wrapper.find('[data-test="status"]').text()).toEqual('查詢不到該用戶，請重新確認。')
  })
})
```

### 3-3. 提款部分

最後提款的部分，必須注意到我們必須開戶並且存款到足額數量並提領足額的部分才能測出 happy path 的情境：

```js
describe('提款', () => {
  it(`輸入用戶名稱與金額，交易完成，狀態欄應該顯示 '存款完成，戶頭目前餘額 {該用戶乾乾數量}' `, async () => {
    const wrapper = mount(component)

    await wrapper.find('[data-test="input_account"]').setValue('Shawn')
    await wrapper.find('[data-test="button_open-account"]').trigger('click')

    await wrapper.find('[data-test="input_deposit"]').setValue(200)
    await wrapper.find('[data-test="button_deposit"]').trigger('click')

    await wrapper.find('[data-test="input_withdraw"]').setValue(100)
    await wrapper.find('[data-test="button_withdraw"]').trigger('click')

    expect(wrapper.find('[data-test="status"]').text()).toEqual('存款完成，戶頭目前餘額 100')
  })
  it(`輸入用戶名稱與金額，若查詢不到戶頭，狀態欄應該顯示 '查詢不到該用戶，請重新確認。' `, async () => {
    const wrapper = mount(component)

    await wrapper.find('[data-test="input_account"]').setValue('Shawn')
    await wrapper.find('[data-test="input_withdraw"]').setValue(100)

    await wrapper.find('[data-test="button_withdraw"]').trigger('click')

    expect(wrapper.find('[data-test="status"]').text()).toEqual('查詢不到該用戶，請重新確認。')
  })
  it(`輸入用戶名稱與金額，餘額不足，狀態欄應該顯示 '餘額不足，你帳戶目前餘額為 {該用戶乾乾數量}' `, async () => {
    const wrapper = mount(component)

    await wrapper.find('[data-test="input_account"]').setValue('Shawn')
    await wrapper.find('[data-test="button_open-account"]').trigger('click')

    await wrapper.find('[data-test="input_deposit"]').setValue(100)
    await wrapper.find('[data-test="button_deposit"]').trigger('click')

    await wrapper.find('[data-test="input_withdraw"]').setValue(200)
    await wrapper.find('[data-test="button_withdraw"]').trigger('click')

    expect(wrapper.find('[data-test="status"]').text()).toEqual('餘額不足，你帳戶目前餘額為 100')
  })
})
```

> 在上述撰寫測試案例的過程中你可能會發現有些步驟其實相當重複，而這時其實可以善用先前提過的 `Setup` & `Teardown` 等語法包裝，但這裡先不做的原因是我們後續會有章節提到要如何更好的完善它！

## 4.補上產品程式碼，讓測試中的紅燈逐漸轉變為綠燈

在撰寫好測試案例後我們現在就可以回頭來開發介面（`App.vue`）的部分了。

```
<template>
  <button data-test="button_open-account">開戶</button>
  <input data-test="input_account" v-model="account" type="text" />

  <button data-test="button_deposit">存款</button>
  <input data-test="input_deposit" v-model="deposit" type="number" min="0" />

  <button data-test="button_withdraw">提款</button>
  <input data-test="input_withdraw" v-model="withdraw" type="number" min="0" />

  <p data-test="status">{{ status }}</p>
</template>
```


首先我們可以先關注在邏輯的部分，在引入我們的 `FoodBank` 之後，依據 `template` 需要的部分開立好變數，並建造相關的方法（開戶、存款與提領）：

```js
<script setup>
// 引入必要模組
import { ref } from 'vue'
import { FoodBank } from './FoodBank.js'

// 開設好變數
const account = ref('')
const deposit = ref('')
const withdraw = ref('')
const status = ref('')

// 建立相關方法
const $FoodBank = new FoodBank()
const handleOnOpenAccount = () => (status.value = $FoodBank.openAccount(account.value))
const handleOnDeposit = () => (status.value = $FoodBank.deposit(account.value, deposit.value))
const handleOnWithdraw = () => (status.value = $FoodBank.withdraw(account.value, withdraw.value))
</script>
```

接著在 `template` 部分補上我們的方法：

```
<template>
  <button @click="handleOnOpenAccount" data-test="button_open-account">開戶</button>
  <input data-test="input_account" v-model="account" type="text" />

  <button @click="handleOnDeposit" data-test="button_deposit">存款</button>
  <input data-test="input_deposit" v-model="deposit" type="number" min="0" />

  <button @click="handleOnWithdraw" data-test="button_withdraw">提款</button>
  <input data-test="input_withdraw" v-model="withdraw" type="number" min="0" />

  <p data-test="status">{{ status }}</p>
</template>
```

## 5. 執行測試，確認所有測試通過！

![https://ithelp.ithome.com.tw/upload/images/20221010/20119062OBy5IJidPR.png](https://ithelp.ithome.com.tw/upload/images/20221010/20119062OBy5IJidPR.png)

若以上過程你是拆分為從各情境（開戶、存款或提領）分別處理，那麼你就會發現在實作產品程式碼的過程中，測試案例將逐步地通過！

如同第一次測驗時說的，這種「紅燈開發（Red-Green-Refactor）」的感受是必須基於你先撰寫好測試才能體驗到的美好，若剛才測驗過程中，讀者是先開發才撰寫測試的，請務必反過來從測試撰寫開始嘗試！

以上便是今天的測試驗收！希望大家都有體驗到測試的美好，接下來我們要繼續介紹有關於模擬替身與 Vue 周邊工具要怎麼測試哩！