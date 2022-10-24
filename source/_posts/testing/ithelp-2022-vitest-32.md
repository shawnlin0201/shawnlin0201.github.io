---
title: 【進階ノ章】Vitest UI
date: 2022-10-17 23:02:18
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

# Vitest UI

經過了一個月多，我們也從測試基礎概念一路講到實際上的語法和簡單的應用，而有關於測試的部分，還有許多值得我們去探討的地方，因此從今天開始要來談談一些有關於測試的相關輔助工具與議題，看看這些東西要怎麼協助我們更好的撰寫測試。

<!-- more -->

而第一個要談到的是基於 Vitest 工具底下的 [Vitest UI](https://vitest.dev/guide/ui.html)：

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062L5WYsaaOLO.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062L5WYsaaOLO.png)


Vitest UI 簡單來說，是另一種供我們查看測試與編寫測試的方式，它的特色在於基於 Vite 的 dev server 環境，讓我們可以直接在瀏覽器上直接觀看測試案例的測試結果，甚至支援直接在瀏覽器中編寫測試案例後同步更新測試檔案。

而在使用這項酷酷的功能之前，我們需要另外安裝 `@vitest/ui`：

```bash
npm i -D @vitest/ui
```

接著就可以在 `package.json` 中新增一個 `vitest` 指令，並帶上參數 `--ui`：

```json
{
  "scripts": {
    "vitest:ui": "vitest --ui"
  }
}
```

如此一來後們只要執行 `npm run vitest:ui`，就可以在啟動這項功能，並看到下列畫面：

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062L5WYsaaOLO.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062L5WYsaaOLO.png)

## 介面 

在 Vitest UI 中，左側是所有測試案例的測試結果（Pass / Fail / Skip），我們可以透過上方的搜尋欄輸入檔名或路徑找到我們要觀察的測試。

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062E2AiqzFYsB.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062E2AiqzFYsB.png)

點擊左側的測試路徑後，右側會出現測試情境與測試案例的描述讓我們更好觀察當下檔案中的所有案例

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062DFHiTCaobG.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062DFHiTCaobG.png)

除此之外，再往右側會看到四項資訊，分別為：

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062FLznwhW8On.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062FLznwhW8On.png)

- Report（預設顯示項目）
- Module Graph
- Console
- Code

### Report
點擊 Report 頁籤時，會在右側顯示該測試檔案中的所有測試案例結果。

若為全通過的情況會顯示 `All tests passed in this file`：

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062TbwjYrMuoW.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062TbwjYrMuoW.png)

若有錯誤會顯示是哪一條測試案例發生錯誤：

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062TQhdnfzOZf.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062TQhdnfzOZf.png)

我們甚至能點擊錯誤訊息右方的開啟視窗 Icon，Vitest UI 將會直接啟動系統預設的程式碼編輯器，開啟測試檔案後將輸入游標聚焦在錯誤的行數與位置。（e.g. 圖中的 `toEqual` Assertion Matcher）

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062GPtp0Nw6Ub.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062GPtp0Nw6Ub.png)

### Module Graph
接著是第二個頁籤的 `Module Graph`，這頁的內容主要是透過檢測行內引入模組，呈現檔案之間依賴關係。

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062eUcp66kBCu.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062eUcp66kBCu.png)

點擊圖中的節點可以看到該模組的 Source 檔與經由 Transformed 後的程式碼。

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062rinDQ1r5LZ.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062rinDQ1r5LZ.png)

而這個圖表最大的用處在於，透過可視化的方式呈現出測試程式碼中受測物（SUT）與依賴物（DOC）的依賴狀況。

### Console
Console 頁籤主要是顯示在測試程式碼中的 `console.log` 資訊，由於與測試結果分離的情況下，相較於在終端機中觀察 Console，這裡會顯示得更加清楚。

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062XMfRj5tUxM.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062XMfRj5tUxM.png)

### Code
最後壓軸介紹的部分，則是 Code 頁籤，你可能會覺得這有什麼特別的，不就是顯示測試檔案程式碼嗎？

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062YNU4uepQdC.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062YNU4uepQdC.png)

然而，這裡的測試程式碼除了預覽之外，還能夠直接在瀏覽器中直接編寫並執行測試查看結果，更重要的是寫完的當下按下儲存它還能夠同步調整到實際的程式碼中！

比方在瀏覽器中的測試程式碼中加個註解，並儲存：

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062pXtIRD6DYz.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062pXtIRD6DYz.png)

實際測試程式碼檔案也加上了註解！

![https://ithelp.ithome.com.tw/upload/images/20221017/20119062iJAN6r7pjK.png](https://ithelp.ithome.com.tw/upload/images/20221017/20119062iJAN6r7pjK.png)

如此一來，我們就可以直接在這個視窗內撰寫我們的測試案例，並且在瀏覽器中即時看到測試結果。

不過這裡有個小小缺點是，若在專案中有設定 eslint + prettier 的話，在程式編輯器撰寫測試時可以設定儲存當下的自動做格式化，但是瀏覽器中的編輯器環境不同，所以寫測試時會收到格式錯誤的警告，但在不考慮這點的情況下，這個工具是個用來檢視測試結果與依賴關係的好工具。

![https://ithelp.ithome.com.tw/upload/images/20221017/201190625fQBVzwGJn.png](https://ithelp.ithome.com.tw/upload/images/20221017/201190625fQBVzwGJn.png)

以上就是 Vitest UI 工具的介紹，若有興趣的話可以親自下去 try try！