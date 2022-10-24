---
title: 【語法ノ章】元件測試：容器方法（Wrapper methods）－模擬事件
date: 2022-10-06 19:21:33
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

# 容器方法（Wrapper methods）

到目前為止容器方法的部分我們已經學到如何選擇目標與取得目標屬性等相關資料後，今天我們要著重學習如何模擬觸發 DOM 所發生的各種事件（Event），而常見的 DOM 事件有下列幾種：

- 滑鼠事件：點擊（click）
- 鍵盤事件：按下某鍵（keydown）、鬆開某鍵（keyup）
- 表單事件：針對 `<input>` 輸入內容、`checkbox` 與 `radio` 勾選或 `<select>` 中的選擇內容。

<!-- more -->

首先，語法方面除了表單事件之外，要模擬大部分的事件我們可以透過容器方法中的 `trigger` 方法即可觸發事件：

```js
wrapper.trigger(event, options)
```

用法是在第一個參數中傳入要觸發的 `DOM` 事件名稱（e.g. `click`, `drag`），如果有需要補充觸發事件的條件，比方像是按下哪個鍵盤，就可以透過第二個參數帶入資訊（e.g. `{ keyCode: 65 }`）。

而要注意到的是由於這些事件基本上都會是非同步的用法，所以在撰寫測試案例時可以使用 `async/await` 來讓斷言（Assertion）保持正確的結果：

```js
it('...', async () => {
    // Arrange
    const wrapper = mount(component)

    // Act
    await wrapper.trigger(event, options)
    
    // Assert
    expect(/* ... */).toBe(/* ... */)
})
```

有了這個概念之後，接下來便可以快速來看看實際上各個事件觸發的實際案例與事件名稱，並且著重關注要特別注意的地方。

---

## 滑鼠事件
- 點擊： `click`
- 雙擊： `dblclick`
- 指定點擊： `click.left`, `click.middle`, `click.right`

### 點擊與雙擊
點擊與雙擊的部分最主要需要注意的部分是，以事件來說的概念「雙擊（dblclick）」是一個事件，並非「兩個」「點擊（click）」事件：

元件：
```html
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
<template>
  <p data-test="content">{{ count }}</p>
  <button data-test="button" @click="count++">Add</button>
</template>
```

測試程式碼：
```js
it('after click button should display correct content', async () => {
  const wrapper = mount(component)

  await wrapper.find('[data-test="button"]').trigger('click')
  expect(wrapper.find('[data-test="content"]').text()).toBe('1')
  await wrapper.find('[data-test="button"]').trigger('click')
  expect(wrapper.find('[data-test="content"]').text()).toBe('2')
  await wrapper.find('[data-test="button"]').trigger('dblclick') // 觸發不到 @click 事件
  expect(wrapper.find('[data-test="content"]').text()).toBe('4') // AssertionError
})
```

### 指定按鍵點擊
有時候你可以會想要指定滑鼠的按鍵來觸發事件，這時就可以使用類似修飾符（modifier）一樣的方式來觸發事件：
- `click.left`
- `click.middle`
- `click.right`

元件：
```html
<script>
const result = ref('')
</scirpt>

<template>
  <button data-test="button" @click.right="result = 'here we go!'">Are You ready?</button>
  <p data-test="target">{{ result }}</p>
</template>
```

測試程式碼：
```js
it('should be display correct text', async () => {
  const wrapper = mount(component)
  await wrapper.find('[data-test="button"]').trigger('click.right')
  expect(wrapper.find('[data-test="target"]').text()).toBe('here we go!')
})
```

除此之外，鍵盤與滑鼠的操作也可以融合再一起：

```js
trigger('click.ctrl.left') // 左鍵點擊時同時按著 ctrl 鍵
trigger('click.alt.right') // 右鍵點擊時同時按著 alt 鍵
```

---

## 鍵盤事件
鍵盤最常見的核心事件主要為：
- 按下某個按鈕 `keydown`
- 鬆開某個按鈕 `keyup`

上述事件如同指定滑鼠按鍵的寫法，一樣擁有修飾符的相關語法，而後方帶的修飾符主要為按鍵的名稱：

```js
trigger('keydown.enter') // 按下 enter 鍵
trigger('keyup.up') // 鬆開 上方向鍵
```

同樣地，鍵盤事件也支援多重的組合修飾符寫法：

```js
trigger('keydown.ctrl.tab') // 按下 ctrl 鍵 + tab 鍵
```

若你想要更靈活的使用鍵盤事件，也可以用 `trigger` 方法的第二個參數帶入鍵盤的名稱，而目前有支援的寫法主要有下列三種：

```js
trigger('事件名稱', {
    code?: event.code;
    key?: event.key;
    keyCode?: event.keycode;
})
```

若不清楚鍵盤對應的代號也沒有關係，有不少網站專門提供類似的服務供查詢，比方像這個 [網站](https://www.toptal.com/developers/keycode/for/enter) 只要按下任一按鍵就會即時顯示鍵盤對應的代號、名稱等等相關資訊：

![https://ithelp.ithome.com.tw/upload/images/20221006/20119062C3G2LJAWCj.png](https://ithelp.ithome.com.tw/upload/images/20221006/20119062C3G2LJAWCj.png)

在查到代號後我們就可以將其帶入剛才的方法中：

```js
trigger('keydown', { keyCode: 13 })
```

至於要選擇哪種寫法就看場景本身的需求來做決定囉！

---

## 表單事件
- input 輸入
- `checkbox` / `radio` 勾選
- `<select>` 中的選擇內容

> 原先為了針對不同表單類型，Vue Test Utils 1 版（for Vue2）工具提供了一個專屬的 `setChecked` 的來對應 `checkbox` / `radio` 勾選狀態（checked）；除此之外替 `<select>` 元素的選擇提供了 `setSelected` 方法來模擬選擇行為。

而在 Vue Test utils 2 版時，我們將只要統一使用 `setValue` 即可自動對應所有表單的行為！

### 模擬 input 輸入

輸入表單或是操作日期選擇器：

```html
<template>
    <input v-model="textResult" type="text" data-test="text"/>
    <p data-test="result_text">{{textResult}}</p>
    <input v-model="dateResult" type="date" data-test="date"/>
    <p data-test="result_date">{{dateResult}}</p>
</template>
```
文字輸入：
```js
it('模擬 input 輸入', async () => {
    const wrapper = mount(component)
    await wrapper.find([data-test="text"]).setValue('Hello, World!')
    expect(wrapper.find([data-test="result_text"]).text()).toBe('Hello, World!')
})
```
選擇日期：
```js
it('模擬 日期 輸入', async () => {
    const wrapper = mount(component)
    await wrapper.find([data-test="date"]).setValue('2022/10/06')
    expect(wrapper.find([data-test="result_date"]).text()).toBe('2022/10/06')
})
```

### 模擬 `radio` 勾選
元件：
```html
<template>
  <input data-test="radio_1" type="radio" v-model="radioResult" value="1" />
  <input data-test="radio_2" type="radio" v-model="radioResult" value="2" />
  <p data-test="result">{{ radioResult }}</p>
</template>
```
測試程式碼：
```js
it('模擬 radio 勾選行為', async () => {
  const wrapper = mount(component)
  await wrapper.find('[data-test="radio_1"]').setValue(true)
  expect(wrapper.find('[data-test="result"]').text()).toEqual('1')
  await wrapper.find('[data-test="radio_2"]').setValue(true)
  expect(wrapper.find('[data-test="result"]').text()).toEqual('2')
})
```

### 模擬 `checkbox` 勾選
元件：
```html
<template>
  <input data-test="checkbox_1" type="checkbox" v-model="checkboxResult" value="1" />
  <input data-test="checkbox_2" type="checkbox" v-model="checkboxResult" value="2" />
  <p data-test="result">{{ checkboxResult.join(',') }}</p>
</template>
```
測試程式碼：
```js
it('模擬 checkbox 勾選行為', async () => {
  const wrapper = mount(component)
  await wrapper.find('[data-test="checkbox_1"]').setValue(true)
  expect(wrapper.find('[data-test="result"]').text()).toBe('1')
  await wrapper.find('[data-test="checkbox_2"]').setValue(true)
  expect(wrapper.find('[data-test="result"]').text()).toEqual('1,2')
  await wrapper.find('[data-test="checkbox_1"]').setValue(false)
  expect(wrapper.find('[data-test="result"]').text()).toEqual('2')
})
```

### 模擬 select 選擇
元件：
```html
<template>
  <select data-test="target" v-model="result">
    <option value="orange">Orange</option>
    <option value="black">Black</option>
  </select>
  <p data-test="result">{{ result }}</p>
</template>
```
測試程式碼：
```js
it('模擬 select 選擇', async () => {
  const wrapper = mount(component)
  await wrapper.find('[data-test="target"]').setValue('orange')
  expect(wrapper.find('[data-test="result"]').text()).toEqual('orange')
})
```

---

今天所介紹的模擬事件中，表單事件是筆者個人最喜歡的部分，因為表單若透過手動測試必須要準備大量的測試資料以及繁複的來回測試，萬一測到有問題等到修復好之後又得再重新來過一次，因此若能把這部分轉為自動化測試將能夠感受到非常多的好處。