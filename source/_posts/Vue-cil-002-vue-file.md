---
title: Vue-cli 單一元件檔 （.vue 檔）
date: 2019-10-04 23:45:14
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

## 單一元件檔
今天要來介紹的是**單一元件檔**，單一元件檔在 Vue-cli 中被大量地使用，算是寫 Vue-cli 不可不知的一環，而在昨天我們安裝好 Vue-cli 環境後，可以看見 src 資料夾底下充滿著大量 .vue 結尾的檔案，大家或許會滿臉疑惑，因為前一兩周寫 Vue.js 根本沒有提到這個東西啊？那他到底是什麼呢？

![https://ithelp.ithome.com.tw/upload/images/20191004/20119062Z2qnzMoZH6.jpg](https://ithelp.ithome.com.tw/upload/images/20191004/20119062Z2qnzMoZH6.jpg)

其實顧名思義，單一元件檔（single-file-component）就是一個元件專屬的檔案，還記得我們當時使用  `Vue.component` 建立了一個全域環境的元件嗎？單一元件檔就好比把該元件所需的資訊封裝成一種檔案格式，透過 `import` 註冊到其他的檔案當中，最後以工具解析後，產生網頁能夠讀懂的相關靜態檔案（如 HTML、CSS、JavaScript 等等。）那他跟我們寫得全域性註冊元件差在哪呢？

當我們以 Vue.component 註冊元件會遇到的問題：
- 以全域性註冊的元件，**元件名稱不能重複使用**。
- 樣板字面值在文字編輯器中一般情況都是**沒有語法顏色提醒輔助**，需要自行下載額外工具。
- 在元件當中通常**沒有區塊能夠讓元件單獨使用 CSS 的地方**。
- 沒有建立環境的步驟，因此需要預處理器的協助時通常會有一定難度。

而在使用了單一元件檔之後：
- 即使在不同資料夾中元件名稱一樣，仍可**透過 import 時指定元件名稱**來引入。
- 單一元件檔**提供各種語法顏色輔助提醒**，在編寫程式時可以容易分辨樣板字面值的區塊（template）。
- 單一元件檔提供撰寫 CSS 的地方，並且**支援 SCSS 等預處理器**，讓你可以**直接在檔案中撰寫 SCSS**，經由熱處理直接在運行的網頁上立刻看到更改後的結果，另外還能封裝成限定該元件區域使用，不會汙染全域環境。
- Vue-cli **基於 webpack**，要引入各種工具都十分方便。

除了以上使用單一元件檔後的差別，最重要是更能體現**關注點分離**的部分：

## 關注點分離
在之前程式開發時，關注點分離可能指的像是 HTML、CSS 以及 JavaScript 的檔案類型要分離的很乾淨，各司其職彼此井水不犯河水，不要在 HTML 裡面看到 inline 版本的 CSS 或是 JavaScript，而在 JavaScript 裡面可能不要去寫到 HTML 或是去定義樣式等等，然而近代前端開發的思維已逐漸邁向另一種**元件化**的思維。

元件化的思維，最主要的想法是在於要盡可能的**把重複性高的程式碼，包裝成一個可重複利用的元件**，並且裡面的樣式與功能可能都大同小異，差異在於帶進去的數值不同，因此返回不同的結果。以前端開發為例，可能就像是將每頁都會固定用到的 Navbar 區塊寫成一個可重複利用的檔案，以 HTML 定義好結構，用 CSS 替元件修飾一下外觀，最後用 JavaScirpt 提供更多元的功能等等；因此 HTML、CSS 與 JavaSciprt 基本上都會混和在一起。

## 如何使用
而說了這麼多，單一元件檔到底要怎麼用呢？我們點開 Vue-cli 中的範例檔案 Hello.vue，可以看見該檔案中分成三個區塊，分別為 `template`、`script` 和 `style`：

```javascript
<template>
    // ...
</template>

<script>
    // ...
</script>

<style>
    // ...
</style>
```

**template** 區塊，如同之前我們寫元件時的 template 一樣，這裡主要是放置 HTML 結構與 Vue 指令、樣板指令的地點。

**script** 區塊，則是以往我們寫 JavaScript 的地方，而單一元件檔則是透過 export 指令匯出，使我們可以在其他元件檔中以 import 方式引入該元件。

**style** 區塊，這個地方是最令我開心的地方，因為我們將可以在這邊直接編寫如 SCSS 等 CSS 預處理器等工具，只要我們在安裝 Vue-cli 時有指定要選用這個選項即可無痛快速使用！

![https://ithelp.ithome.com.tw/upload/images/20191004/20119062l0e3DH9v5z.jpg](https://ithelp.ithome.com.tw/upload/images/20191004/20119062l0e3DH9v5z.jpg)

> 而實務上要怎麼應運這些區塊呢，明天我們將直接開發一個專案來當作範例！
> ![https://ithelp.ithome.com.tw/upload/images/20191004/20119062Pcn7QO96UM.jpg](https://ithelp.ithome.com.tw/upload/images/20191004/20119062Pcn7QO96UM.jpg)