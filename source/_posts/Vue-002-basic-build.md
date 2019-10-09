---
title: Vue.js 基礎環境建置
date: 2019-09-05 10:24:05
tags:
- [前端]
- [JavaScript]
- [Vue.js]
categories: 
- [前端, JavaScript, Vue.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/vue-logo.png' width='200px' height='200px' />
</div>
# 環境搭建

一般來說建置 Vue.js 的完整專案會使用 Vue-cli 工具來產生專案目錄，但如果只是想要快速學習 Vue.js 不必安裝過多的環境，Vue.js 的官網提供了 CDN 的作為引入方式，讓有興趣的人可以更快參與其中，而目前提供的版本分別為：

- **開發版本：**這個版本包含了**完整的開發人員工具**以及**提示報錯**等等的協助，適合**開發**時使用。
- **生產版本：**這個版本則是將上述開發工具都拔除，盡量縮小它的體積，適合**正式發布**時使用。

而我們目的是體驗 Vue.js 的開發，因此選擇**開發版本**，並將其導入 HTML 的 head 中即可：
```html
<head>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
```

接著在 HTML 的部分我們需要建立一個元素並選擇性使用 `class` 或 `id`，讓待會 Vue.js 知道它要渲染的範圍。

```html
<body>
  <div id="app">

  </div>
  <script>
      // 待會用來初始化 Vue 的地方
  <script>
<body>
```



在 JavaScript 部分，我們需要初始化 Vue.js 的實體，就好像飲料販賣機一樣，投個硬幣拿到這個商品後我們就可以開始使用它。透過 `new` 初始化 Vue 的物件之後，傳入一些基本的設定，其中 `el` 的值需要放入綁定的元素好比上方範例中的（`app`）；而 `data` 的值則是傳入一個物件，這裡主要是用來存放資料的部分，而 `key`（`message`）的部分將會用在**樣板語法**中供 Vue.js 去找到對應的 `value`（`'Hello, Vue.js!'`）最後將它顯示出來。

```javascript
var vm = new Vue({
  el:'#app',
  data:{
    message:'Hello, Vue.js!'
  } 
})
```

最後，我們在剛才的 HTML 部分中使用**樣板語法（兩對花括弧）**，裡面塞入剛才的 `key`（`message`），就可以將其對應的 `'Hello, Vue.js!'` 渲染出來：

```
<body>
  <div id="app">
    {{ message }}
  </div>
  <script>
     var vm = new Vue({
      el:'#app',
      data:{
        message:'Hello, Vue.js!'
      } 
    })
  </script>
<body>
```

如此一來，將頁面打開來時就能看到 Hello, Vue.js!了。~~找回最初的感動（？~~

![https://ithelp.ithome.com.tw/upload/images/20190904/20119062w0tUzpaNA2.png](https://ithelp.ithome.com.tw/upload/images/20190904/20119062w0tUzpaNA2.png)

# BONUS：平時開發常用設定
- 作業系統： 目前主要是在 Windows、以前則是用 macOS (雙棲動物)
- 程式碼編輯器： Visual Studio Code (free)

編輯器推薦套件
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)：更改標籤時，想一次更改開始標籤與結尾標籤可以考慮安裝這個！
- [Bracket Pair Colorize](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)：將程式碼區塊前後顏色配對，可以快速找到該區塊範圍在哪。
- [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)：可以自動編譯 SASS（SCSS）並同步輸出成未壓縮版與壓縮版的 CSS 檔。
- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)：模擬一個 Local Web 環境，具有熱更新的功能，也就是一更改程式碼就會即時顯示變化在頁面上。
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)：由 Vue.js 作者**尤雨溪**與微軟開發者**Pine Wu**官方合作的套件，支援了**語法高亮**、**語法快捷**等等強大的功能。

Chrome 瀏覽器推薦套件
- [Dimensions](https://chrome.google.com/webstore/detail/dimensions/baocaagndhipibgklemoalmkljaimfdj)：可以快速量網頁上元素之間的距離。
- [ColorPick Eyedropper](https://chrome.google.com/webstore/detail/colorpick-eyedropper/ohcpnigalekghcmgcdcenkpelffpdolg)：可以快速捕捉網頁上的色彩顏色（RGB、HEX 等等應有盡有）。
- [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)：開發必備，可以即時監測 Vue 實體中的資料狀態等等資料，你想一邊 Debug 一邊觀看 Data 的狀況嗎？安裝他吧！

![https://ithelp.ithome.com.tw/upload/images/20190904/20119062BP5oyN0ahL.jpg](https://ithelp.ithome.com.tw/upload/images/20190904/20119062BP5oyN0ahL.jpg)

如果還有其他好用的工具也歡迎讀者投稿囉！