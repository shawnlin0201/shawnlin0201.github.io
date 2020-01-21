---
title: Jest.js 配對器（Matchers）a.k.a. 斷言（Assertion）
date: 2020-02-24 22:23:38
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
  <img style="object-fit:cover;" alt="jest-logo" src='/images/Jest/jest-logo.png' width='200px' height='200px' />
</div>

# 斷言 Assertion
在測試庫中，斷言（assertion）是一個很重要的概念，意思即為開發程式中執行完畢時，程式碼執行結果應與斷言所設定的結果一致，否則該處斷言碼會拋出錯誤的意思。你可能已經在某些情況下「斷言」過好幾次了，例如在 JavaScript 裡面使用全等比較（`===`）來比較兩者的資料類型是否一致，這便是斷言。而在 Jest.js 框架中，Jest 選擇的是使用 Matchers 配對器這個名稱，兩者其實在概念上是差不多的東西。

Jest.js 中的配對器（Matchers），主要採用的是 `expect()` 的方法，但 Jest.js 中的 expect 與 Node.js 和其他斷言庫（如 Chai.js）中的 `expect()` 是不一樣的，別搞混了！XD，我自認為比較好辨識 Jest 方法是當斷言中出現了 `expect().toBe()` 這個東西，基本上看到這個可以確認大概率是使用 Jest.js 了。

而為什麼辨識文件中是用誰家的斷言有一點小重要的點是，當你試著按照例如 Vue.js 的測試文件 Vue-test-utils 測試時，可能會遇到斷言方法 API 不一樣的情況，那麼你可能得回去翻翻其他斷言庫本身的斷言 API 文件了。

<!--more-->

# 配對器 Matchers
在 Jest.js 中，我們可以直接使用 `expect()` 來寫斷言中的期望值，而關於 `expect` API 官方也有整理很棒的[列表](https://jestjs.io/docs/zh-Hans/expect)可以看，私心覺得比起隔壁棚的框架好讀多了（？
但在一開始學習配對器時，或許我們可能不是每個都會用得到，因此接下來，我們要跟著官方的範例一起來看看幾個常用的 API。

## toBe()
一開始我們可以使用 `expect()` 來寫斷言中的期望值，後面接上 `.toBe()` 來寫下預期的配對值，`toBe()` 最主要的功用是在與檢查**值的相等**。
```javascript
test('1 加上 1 等於 2', () => {
  expect(1 + 1).toBe(2)
})
```

## toEqual()
如果要檢查**資料型別（data type）**的話，官方建議使用 `toEqual()` 來判斷（因為在 JavaScript 中物件會有記憶體存取位置不同而導致某些議題產生）：
```javascript
test('物件中的值應該相等', () => {
  let person = {name: 'shawn'}
  person[age: 25]
  expect(obj).toEqual({name: 'shawn', age: 25})
})
```

## Truthiness 類
Truthiness 主要在判斷的是有關於真假值上的問題，有經驗的開發者應該都體會過 JavaScript 中 truthy 與 falsy 的威力...（害怕.png），但在 Jest.js 中有一系列的真假值斷言可以直接使用。
- toBeNull： 斷言 null 值。
- toBeUndefined： 斷言 undefined 值。
- toBeDefined： 斷言不是 undefined 值。
- toBeTruthy： 斷言該值在 if 判斷句中為 truthy。
- toBeFalsy： 斷言該值在 if 判斷句中為 falsy。

## Number 類
數字類基本上就是那幾位大於小於等於家族。
- .toBeGreaterThan()：大於。
- .toBeGreaterThanOrEqual()：大於等於。
- .toBeLessThan()：小於。
- .toBeLessThanOrEqual()：小於等於。
- .toBe()：等於，同上方介紹。
- .toEqual()：等於，同上方介紹。

## String 類
- .toMatch：可以利用正則表達式（Regex）來配對是否相等。

```javascript
test('"test" is not to match "text"', () => {
  expect('test').not.toMatch(/text/)
})
```

## Array、Iterables
- .toContain()：比較陣列或可迭代的值是否含有某個特定值。

```javascript
let favoFruits = ['orange', 'banana', 'strawberry']
test('my favo fruits', () => {
  expect(favoFruits).toContain('durian')
})
```

## 例外處理
- .toThrow()：程式中可能會需要會拋出錯誤的情況，要比對是否拋出可以使用此 API。

```javascript
function throwErrorMsg (Msg) {
  throw new Error(Msg)
}

test('it should throw Error Msg', () => {
  expect(throwErrorMsg('Error: Account data is missing.')).toThrow()
  expect(throwErrorMsg('Error: Account data is missing.')).toThrow(Error)
  expect(throwErrorMsg('Error: Account data is missing.')).toThrow('Error: Account data is missing.')
  expect(throwErrorMsg('Error: Account data is missing.')).toThrow(/missing/)
})
```

以上是 Jest.js 一些常見的配對器，接下來的章節將會介紹有關於一些 callback function、promise、async 與 await 等等的處理。

# 參考資料

- [Jest-using-matchers](https://jestjs.io/docs/en/using-matchers)