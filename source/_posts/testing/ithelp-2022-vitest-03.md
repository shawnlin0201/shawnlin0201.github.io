---
title: 【初始ノ章】測試建置：在自己的專案加入單元測試來學測試
date: 2022-09-18 18:30:27
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

不論是之後看完系列文有興趣想要加入測試到實際的專案中，或是有經驗的開發者現在就想嘗試自己建立一個屬於自己的專案來測試，本文底下將會根據「剛初始化的專案」與「既有專案」兩種情境分別說明要如何安裝單元測試與需要注意的事項！

<!-- more -->
---

# 【在初始化專案過程加入單元測試】

建立專案時若要加入單元測試要注意到的是，Node.js 版本必須為 14 以上，否則 Vitest 會無法順利執行！

> 若不清楚怎麼調整或確認 Node.js 版本的朋友可以參考上一章節唷。

確認 Node.js 版本後，在要建立專案的父層路徑底下透過終端機指令輸入 `npm create vite@latest` 來建立一個基於 Vite 所建構的專案，接著終端機會出現一些問題，視專案需求選擇：

![https://ithelp.ithome.com.tw/upload/images/20220918/20119062rdNgwTXQMd.png](https://ithelp.ithome.com.tw/upload/images/20220918/20119062rdNgwTXQMd.png)

- Project name： 輸入自訂的專案名稱後按下 Enter
- Select a framework ⇒ 選擇 `Vue` 後按下 Enter
- Select a variant ⇒ 選擇 `Customize with create-vue` 後按下 Enter
- 中間可能還會有 TypeScript, ESLint⋯⋯等等問題，請視專案需要加入
- Add Vitest for Unit Testing(y/n) ⇒ 選擇 `Yes` 後按下 Enter（最重要的部分

回答完上面的問題後，建構工具就會依據剛才答覆的內容，自動生成需要的部分。

比方在 `Add Vitest for Unit Testing` 問題回答 `Yes` 的話，這時建構工具就會在專案中生成單元測試所需要的相關內容如下：

- 一個位於 `~專案根目錄/src/components/__test__/HelloWorld.spec.js` 的測試範例

```jsx
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HelloWorld from '../HelloWorld.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
```

- 在 `~專案根目錄/package.json` 自動新增一個啟動單元測試的 scripts 指令

```bash
{
  "scripts": {
    "test:unit": "vitest --environment jsdom"
  },
}
```

- 在 `~專案根目錄/package.json` 自動新增單元測試所需要的工具們

```bash
{
  "devDependencies": {
    "@vue/test-utils": "^2.0.2",
    "jsdom": "^20.0.0",
    "vitest": "^0.23.0"
  }
}
```

接著如剛剛終端機後方的提示：

![https://ithelp.ithome.com.tw/upload/images/20220918/20119062rdNgwTXQMd.png](https://ithelp.ithome.com.tw/upload/images/20220918/20119062rdNgwTXQMd.png)


- 執行 `cd {剛才專案名稱}` 切換到專案目錄底下
- 執行 `npm install` 安裝專案所需要的內容

安裝完畢後，接著就可以執行 `npm run dev` 確認環境，後續要執行測試的話，執行 `npm run test:unit` 就能立即運作了。

![https://ithelp.ithome.com.tw/upload/images/20220918/201190624NAdnXTuax.png](https://ithelp.ithome.com.tw/upload/images/20220918/201190624NAdnXTuax.png)

---

# 【在既有專案中加入單元測試】

在既有專案中加入 `Vitest` 來作為執行測試的環境時，需確認專案本身是由 `Vite`（`2.7.10` 版本以上）所建構的之外，其 `Node.js` 版本也必須為 `14` 以上，否則會無法順利執行測試！

> 若目前想加入的專案不是由 `Vite` 所建立的，後續也有章節會提到要如何替換對應的測試工具。
> 

確認好必要條件後就可以開始安裝測試工具：

- `vitest`：單元測試框架（提供了執行測試的環境、斷言、隔離庫⋯⋯等等功能與 API）
- `@vue/test-utils`：測試 `Vue` 元件的工具
- `jsdom`：讓我們可以在 `Node` 環境模擬出瀏覽器中的 `DOM` 環境（方便測試）

1. 在專案根目錄下執行：
`npm install -D vitest @vue/test-utils jsdom`  

1. 新增 `npm` 執行單元測試的指令

```bash
{
  "scripts": {
    "test:unit": "vitest --environment jsdom"
  },
}
```

這時若心急的執行 `npm run test:unit` 會發現終端機告訴你 `No test files found, exiting with code 1` ，原因是你尚未加入任何一個測試案例。

而一開始 `Vitest` 預設測試的比對規則是 `*/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}` ，簡單來說你在專案底下使用 `A.test.js` 或是 `B.spec.ts` 的方式都會被 Vitest 認為是測試程式檔。

這時，我們可以在 `~專案根目錄/src/components/__test__/` 底下新建 `HelloWorld.spec.js` ：

```jsx
import { describe, it, expect } from 'vitest'

describe('HelloWorld', () => {
  it('1 + 1 should be 2', () => {
    expect(1 + 1).toBe(2)
  })
})
```

再次執行 `npm run test:unit` 終端機就會顯示：

![https://ithelp.ithome.com.tw/upload/images/20220918/201190624NAdnXTuax.png](https://ithelp.ithome.com.tw/upload/images/20220918/201190624NAdnXTuax.png)

到這裡就算是成功安裝好囉，接下來明天我們會在把 Vitest Config 初期需要設定的部分調整好後，建置的部分就完成了。
