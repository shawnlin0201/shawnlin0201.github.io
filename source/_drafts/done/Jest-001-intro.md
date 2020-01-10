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
Jest.js 是由 Facebook, Inc 公司所維護的測試框架，並且支援了 Babel、TypeScript、Node.js、Vue.js、React.js、Angular.js，基本上支援了全部的現代框架，且像是 Vue.js 作者尤雨溪（Evan You）在撰寫 testing 時便是使用 Jest 來作為主要的 testing framework。

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

這個範例簡單的展示了 Jest 測式框架的魅力，與 Mocha 測試框架比較，可以發現 Jest 本身內帶斷言（assertion），使用的時後不再需要引入像是 Chai 之類的斷言庫（assertion library），並且 Mocha 中的測試套件需要透過 `describe()` 來描述，再用 `it()` 寫測試案例，Jest 則是可以直接使用 `test()` 來撰寫測試案例，需要的時候才加上 `describe()` 來替測試套件限制作用域（Scope）。（畢竟都用檔案名稱來分測試套件了？我自己本身也比較喜歡 Jest 直接寫下測試案例的作法 XD）

# 參考資料

- [Jest-getting-started](https://jestjs.io/docs/en/getting-started)