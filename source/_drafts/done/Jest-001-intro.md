---
title: Jest.js 入門、環境建置與範例（Install, Build environment）
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

# What is Jest.js
Jest.js 是由 Facebook, Inc 公司所維護的測試框架，並且支援了 Babel、TypeScript、Node.js、Vue.js、React.js、Angular.js，基本上支援了全部的現代框架，而 Jest 的核心概念 **batteries-included**，使得我們在使用測試要找一些資源時不太需要費力，因為，Jest 都幫你準備好了！

# 環境建置
環境建置非常的快速，透過 npm 直接安裝 Jest 到 **專案開發環境** 下就完成了：
```bash
$ npm install --save-dev jest
```

# 測試範例
在專案資料夾中直接新建一個 `sum.js` 檔案：

**sum.js**
```javascript
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

你可以直接在同層資料夾新建一個 `sum.test.js` 檔案，並引入剛才建立好的 `sum.js` 檔（當然，仍然建議是在 `src/__test__/` 資料夾底下集中會比較好管理）：

**sum.test.js**
```javascript
const sum = require('./sum')

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
})
```

> 目前的專案目錄應該看起來像是這樣：
> ```
> ├── node_modules/
> ├── src/
> │   └── __test__/
> │      └── sum.test.js     // 剛剛寫好的測試程式碼
> ├── sum.js                 // 剛剛寫好的程式
> ├── package-lock.json
> └── package.json
> ```

接著將 `package.json` 設定檔增加一條快捷碼：

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

直接在終端機下輸入 `npm run test` 即可跑出測試：

```bash
 PASS  ./sum.test.js
  √ adds 1 + 2 to equal 3 (5ms)
```

這個範例簡單的展示了 Jest 測試框架的魅力，自帶的斷言庫（assertion）讓我們在使用斷言判斷時可以與官方較有一致的行為，有利於後續的學習方面（官方文件）及相關的問題討論資源，如果看了 Intro 之後對 Jest.js 感到興趣的話不仿一起來用 Jest.js 吧！

# 參考資料

- [Jest-getting-started](https://jestjs.io/docs/en/getting-started)