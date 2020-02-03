---
title: Mocha.js 入門、環境建置與範例（Install, Build environment）
date: 2020-02-03 07:01:19
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

# What is Mocha.js
Mocha.js 是一款基於 Node.js 的 JavaScript 測試框架，用意在於使開發人員可以寫出更優雅且容易閱讀的測試程式碼，並且支援不同斷言庫來判斷程式。而彈性、多樣的配置是 Mocha.js 最大的特點，不同於像是 Jest.js 的 **batteries-included** 的概念，Mocha.js 只提供了最基本的測試環境，而斷言與隔離的選擇，都可以自由地搭配其他的函式庫來使用。例如：選配 Chai.js 斷言庫以及 Sinon.js 隔離庫。如此一來就能使用較自由的測試風格來撰寫測試程式碼。

<!--more-->

> 註：
> 斷言（assertion）意思即為開發程式中執行完畢時，程式碼執行結果應與斷言所設定的結果一致，否則該處斷言碼會拋出錯誤。
> 隔離則表示在測試中，我們會透過工具來仿造原先開發中的模組、元件、函式、數值等，來使測試能夠集中於某個特定的進入點。

# 環境建置
首先，我們可以透過 npm 來安裝 Mocha 到 **全域環境**：
```bash
$ npm install --global mocha
```
或是將它安裝到 **專案開發環境** 下：
```bash
$ npm install --save-dev mocha
```

安裝完畢後，我們需要在專案中新建一個名稱為 `test` 的資料夾，並且在資料夾裡面再新建一個 `sample.spec.js` 檔案。

> 創立 **sample.spec.js** 之後，目前的專案目錄應該看起來像是這樣：
> ```
> ├── node_modules/       // 使用 npm 下載管理的模組會集中在此
> ├── test/               // 測試程式碼預設資料夾位置
> │   └── sample.spec.js     // 測試程式碼檔案
> ├── package-lock.json   // npm 文件檔（管理 npm 預設模組，不必去動他）
> └── package.json        // npm 文件檔（管理專案中客製的模組）
> ```

如此一來 `Mochajs` 便能根據預設設定去找尋 `test` 資料夾底下有 `spec.js` 結尾的檔案來執行測試。

# 撰寫測試程式碼

在撰寫測試程式碼前，我們先來準備一隻檔案 `sum.js` 以供測試：

```javascript
function sum (a,b) {
    return a + b
}

module.exports = sum
```
範例中展示的是一個簡單的加法運算函式，我們透過 `module.exports = sum` 來導出我們的函式，使待會我們可以在測試程式碼 `sample.spec.js` 中使用 `require` 來導入。

> 創立 **sum.js** 之後，目前的專案目錄應該看起來像是這樣：
> 
> ```
> ├── node_modules/
> ├── test/
> │   └── sample.spec.js
> ├── sum.js              // 剛剛寫好的 JavaScript 檔案
> ├── package-lock.json
> └── package.json
> ```

接著我們回到 `sample.spec.js` 準備來撰寫測試程式碼：

```javascript
let assert = require('assert')  // 引入 Mocha 的斷言庫。
const sum = require('../sum')   // 引入寫好的程式

// 描述測試環境
describe('sum 函式測試', () => {

    // 描述測試案例
    it('1 加上 2 應該等於 3', () => {
        // 透過斷言庫來寫判斷式
        assert.equal(sum(1,2), 3,'沒有返回預期的結果')
    })

    // 描述另一個測試案例
    it('100 加上 200 應該等於 300', () => {
        assert.equal(sum(100, 200), 300,'沒有返回預期的結果')
    })
})
```

在這個範例程式碼中，主要是在測試剛剛我們寫好的 `sum.js` 函式，並且透過兩個測試案例來描述情境，並斷言該情境預期的結果。（語法在後面的篇章將會有更詳細的介紹。）

# 執行測試

準備好測試程式碼後，我們回到 `package.json` 來撰寫最後要執行用的快捷程式碼：

```javascript
"scripts": {
  "test": "mocha"
}
```

如此一來，我們在終端機中執行 `npm run test` 便可以執行 `Mocha` 來根據測試程式碼來測試程式了。而本次測試執行的結果如下：

```bash
test sum 函式測試
    √ 1 加上 2 應該等於 3
    √ 100 加上 200 應該等於 300
2 passing (13ms)
```

我們看到測試結果首先跑出我們前面使用 `describe` 所描述的測試情境，並且在底下顯示兩條通過的測試案例，後面帶有使用 `it` 所描述的測試案例說明，到這裡基本上我們已經完成了一個測試基本的概念雛型。

有興趣的讀者，可以再試試看假設今天的程式結果與斷言不一致時會發生什麼事情？

# 參考資料

- [Mocha-installation](https://mochajs.org/#installation)
- [Mocha-get-started](https://mochajs.org/#getting-started)