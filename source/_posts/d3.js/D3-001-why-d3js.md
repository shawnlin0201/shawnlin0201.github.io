---
title: D3.js Why D3.js： D3.js 是什麼？
date: 2019-09-19 00:26:06
tags:
- [前端]
- [JavaScript]
- [D3.js]
categories: 
- [JavaScript, D3.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/d3js/d3.png' width='300px' height='300px' />
</div>

今天開始要進入到 D3.js 的單元啦，在進入 D3.js 的常用 API 章節前，我們一樣要先來介紹一下 D3.js：

> ![https://ithelp.ithome.com.tw/upload/images/20190918/20119062xiIiM2NaBx.jpg](https://ithelp.ithome.com.tw/upload/images/20190918/20119062xiIiM2NaBx.jpg)
> ~~絕對不是這個 D3，但有機會的話或許也可以介紹（？~~




![https://ithelp.ithome.com.tw/upload/images/20190918/20119062fyOApfWwWF.png](https://ithelp.ithome.com.tw/upload/images/20190918/20119062fyOApfWwWF.png)

## D3.js

這個才是我們今天的主角 D3.js，D3.js 全名（**D**ata-**D**riven **D**ocuments），即為**資料驅動文件**，而其中的資料所驅動的文件，則是我們很熟悉的 **DOM（Document Object Model）**，與同樣為操作 DOM 的 JavaScript 函式庫 jQuery 有許多相似的概念與用法：

- 兩者同樣都是在操作 **DOM** 的新增修改刪除
- 兩者同樣都採用了**鍊式語法（chain syntax）**
- D3.js 選擇器（selector）向 jQuery 選擇器看齊

以上三點在實際使用 D3.js 便能深刻感受到他們類似的地方，所以有寫過 jQuery 的開發者們學習 D3.js 會更容易上手。不同的地方在於， D3.js 最主要是關注在**資料視覺化**（Data Visualization）的部分，我們可以透過 D3.js 來將資料轉化為視覺圖表，例如像是：

將資料繪製成簡單的**圓餅圖**：

![https://ithelp.ithome.com.tw/upload/images/20190918/201190628OQTGlFrhY.jpg](https://ithelp.ithome.com.tw/upload/images/20190918/201190628OQTGlFrhY.jpg)

甚至是程式語言列表的**文字雲**：

![https://ithelp.ithome.com.tw/upload/images/20190918/20119062QEaKxTyJA7.jpg](https://ithelp.ithome.com.tw/upload/images/20190918/20119062QEaKxTyJA7.jpg)

而這些由 D3.js 製成的圖表，由於是基於支援瀏覽器的 JavaScript 語言所製作而成的，因此開發者可以透過已經熟稔的 HTML、CSS 以及 JavaScript 技術，搭配 SVG 或 Canvas 標籤產生對應的元素後，來動態操作這些視覺圖表，讓圖表不在只是死板板的一張圖，更可以是一個富有相關資訊的多功能圖表。

> 其中在台灣目前較為多人知曉的專案 [零時政府-中央政府總預算視覺化](http://budget.g0v.tw/budget) 便是由 D3.js 所製成的。

## Why D3.js?

**這一類製作圖表的 JavaScript 函式庫並不是只有 D3.js，為何我們要選擇他呢？**

除了 D3.js 之外，這類以**資料視覺化**為主的 JavaScript 函式庫還有 Chart.js、C3.js、Echarts、CanvasJS……等等，為何要特別挑選 D3.js 的理由則是在於 D3.js **富有高度的自由性**，開發者可以透過 D3.js 的 API 繪製出各種點線面的圖，配合 DOM 圖層的概念與操作，來實現其他函式庫較難以做到的功能，但副作用也是在於它的高度自由性，一開始接觸 D3.js 需要多花一點時間來熟悉他的概念與文件，但等到熟悉 D3.js 之後就會對於他的方便與自由感到驚嘆！所以如果有興趣想要製作**可以在網頁上與使用者互動的高度客製化動態圖表**，不彷來訂閱一波吧！

> D3.js 的魅力如同黑黑漩渦一樣令人深陷而不能自拔。
>  ![https://ithelp.ithome.com.tw/upload/images/20190919/20119062HIUjY2oBLF.jpg](https://ithelp.ithome.com.tw/upload/images/20190919/20119062HIUjY2oBLF.jpg)