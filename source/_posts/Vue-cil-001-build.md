---
title: Vue-cli 介紹與環境建置
date: 2019-10-03 23:27:31
tags:
- [前端]
- [JavaScript]
- [Vue.js]
- [Vue-cli3]
categories: 
- [前端, JavaScript, Vue.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/vue-logo.png' width='200px' height='200px' />
</div>

## Vue-cli

當我們終於熟悉 Vue.js 的一些基本用法後，專案上可能會要使用 webpack 來建立專案，而今天要來介紹的 Vue-cli ，主要是提供開發者一個快速建置 Vue.js 架構的工具，並基於 webpack，提供了許多相關的功能、套件安裝協助。而這裡建議使用 Vue-cli 前可以稍微瞭解 Vue.js 一些基本的指令以及元件概念基礎，並且要有不怕操作基本終端機指令的一顆心。

## 環境建置

要下載 Vue-cli 之前，我們會需要透過 NPM 套件管理工具來下載，而 NPM 在下載 Node.js 時就會一併包進去了，雖然安裝 Node.js 比較好的方式是依靠 NVM 來管理 Node.js 版本，但如此一來我們就要使用 NVM 來下載 Node.js，再來檢查有沒有一併安裝好 NPM 後，最後才能用 NPM 來下載 Vue-cli。（好饒口）

但如果大家真的只是在家體驗玩看看的話，其實也不彷直接載 Node.js 就是了。

首先，我們到 [Node.js](https://nodejs.org/en/) 官方網站下載 Node.js，接著打開這個黑色的視窗，window 系統叫他**命令提示字元（cmd）**，而 Mac 電腦要找到他則可搜尋**終端機（Terminal）**。

![https://ithelp.ithome.com.tw/upload/images/20191003/20119062P4LfYSn7rD.jpg](https://ithelp.ithome.com.tw/upload/images/20191003/20119062P4LfYSn7rD.jpg)

打開它之後會看到全黑的視窗，以 Windows 系統的為例會看到這個：

![https://ithelp.ithome.com.tw/upload/images/20191003/20119062KSvKqPCe8s.jpg](https://ithelp.ithome.com.tw/upload/images/20191003/20119062KSvKqPCe8s.jpg)

接著在裡面輸入`node -v`，如果有出現 Node.js 版本號表示有下載到 Node.js：

```powershell
$ node -v
```

NPM 的部分同樣可以輸入 `npm -v` 來查詢：

```powershell
$ npm -v
```

確認同樣有跳出版本號後，我們就可以來使用 NPM 來下載 Vue-cli 啦！而這裡 Windows 系統與 Mac 會略有一點差別：

Windows 在 cmd 中直接輸入 `npm install -g @vue/cli` 來下載，`npm install @vue/cli` 表示藉由 npm 來下載 `@vue/cli`，而 `-g` 則表示此套件將會下載到全域環境之中，也就是說接下來你在任何資料夾路徑中都可以使用這個套件。
```powershell
$ npm install -g @vue/cli
```


Mac 用戶下載全域(`global`)套件的部分會受到一些限制，第一個是需要在指令前面多加 `sudo` 來執行，並且會要求你提供 Mac 帳戶密碼，如果帳戶沒設置密碼的話會沒辦法使用，因此得替帳戶設定一組密碼：

```powershell
$ sudo npm install -g @vue/cli
```

安裝完畢之後，可以輸入指令來確認 Vue-cli 是否有安裝成功：

```powershell
$ vue --version
```

下載完成後，若是熟悉終端機指令的朋友可以下面方案一的方式創建，若不熟悉終端機操作的人，Vue-cli 也很貼心地推出介面的管理方式，可以參考底下方案二的方式管理（但我還是推薦大家可以多熟悉終端機指令啦 XD）。

## 方案一 終端機

將終端機切換到存放管理的資料夾執行指令：

```powershell
$ vue create *你的專案名稱*
```

接著他會顯示要安裝哪種預設套裝，默認 `default` 設定可以快速建立一個基本原型，而實際專案較常會使用下方的手動設定 `Manually` 來調整想要使用的內容，如官網圖所示：

> ![https://ithelp.ithome.com.tw/upload/images/20191003/20119062NIJtU0zTOl.png](https://ithelp.ithome.com.tw/upload/images/20191003/20119062NIJtU0zTOl.png)

而手動設定的部分我一般是選用 Router、Vuex、CSS Pre-processors 以及 Linter。

## 方案二 介面安裝法

雖然 Vue-cli 幫大家做了一個介面來管理，但第一行還是要請大家到終端機去輸入指令：

```powershell
$ vue ui
```

這樣一來他就會開啟一個瀏覽器頁面來幫助建立專案的流程，最後一樣會建立一個以你專案名稱為名字的資料夾。

![https://ithelp.ithome.com.tw/upload/images/20191003/201190621ygmc1dhMd.png](https://ithelp.ithome.com.tw/upload/images/20191003/201190621ygmc1dhMd.png)

設定完畢啟動後，我們透過終端機 `cd` 指令切換到我們的專案資料夾中，再使用 `npm run serve` 來啟用本地伺服器：

```powershell
$ cd '你的專案夾名稱'
$ npm run serve
```

最後啟動後將可以看到 Vue.js 大大的 LOGO 以及 `Welcome to Your Vue.js App` 字樣出現在網頁上了。

![https://ithelp.ithome.com.tw/upload/images/20191003/20119062AgkG8fqvm2.png](https://ithelp.ithome.com.tw/upload/images/20191003/20119062AgkG8fqvm2.png)

## 結構目錄

在專案資料夾被創立之後，Vue-cli 會在裡面建立一些預設檔案，而產生的目錄如下，可以先稍微了解大概檔案的目的是什麼：
```powershell
├── dist/               // 使用 npm run build 會在此處建立一個靜態檔案
├── node_modules/       // 使用 npm 下載管理的模組會集中在此
├── public/             // 放在此處的公共檔案可以使用絕對路徑取得，並且不會經過編譯壓縮處理
│   ├── favicon.ico     // 範例用的圖片檔
│   └── index.html      // 網站入口
├── src/                // 前端開發的原始檔案，基本上要寫的程式都是放在此處
│   ├── assets/         // 放在此處的公共檔案可以使用相對路徑取得，並且會經過編譯壓縮處理
│   ├── components/     // Vue 元件檔案
│   ├── views/          // Vue rounter 頁面檔案
│   ├── App.vue         // Vue 專案的進入點
│   ├── main.js         // Vue 專案的設定檔
│   ├── router.js       // Vue rounter設定
│   └── store.js        // Vuex設定
├── .gitignore          // git 設定檔案
├── package.json        // npm 產生的專案文件
└── vue.config.js       // Vue 設定文件 ( 需手動建立 )
```

> 環境建置的章節就到這裡結束囉，下一章會來介紹一下 Vue-cli 裡面的 .vue 檔案究竟是什麼東西？
> ![https://ithelp.ithome.com.tw/upload/images/20191003/20119062S6FmV59sIA.jpg](https://ithelp.ithome.com.tw/upload/images/20191003/20119062S6FmV59sIA.jpg)
