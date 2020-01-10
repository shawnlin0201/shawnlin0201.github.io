---
title: D3.js 如何繪製圖形？
date: 2019-09-22 16:33:57
tags:
- [前端]
- [JavaScript]
- [D3.js]
- [SVG]
- [DOM]
categories: 
- [JavaScript, D3.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/d3js/d3.png' width='300px' height='300px' />
</div>

今天要來介紹 D3.js 如何繪製圖形，而其實 D3.js **本身程式並不會繪圖**，嚴格來說是藉由操作 **HTML DOM** 來達到**新增修改刪除**等功能，而**實際繪製圖形**的部分則是會依靠 **SVG** 來產生，這裡要來稍微介紹一下這些名詞來幫助大家更快理解 D3.js 是怎麼運作的：

## DOM（Document Object Model）

![https://ithelp.ithome.com.tw/upload/images/20190921/201190628ubodsiOQU.png](https://ithelp.ithome.com.tw/upload/images/20190921/201190628ubodsiOQU.png)

DOM 簡單來說是一種 HTML、XML、SVG 的程式介面，我們可以**透過這個介面來操作 HTML 上的節點**，如附圖中展示的是當 `table` 元素與裡面的內容以 DOM 樹狀圖結構描述時的樣子，`table` 底下包了一個子節點 `rows`，而 `rows` 底下又有兩項 `tr` 節點，往下延伸最後可以看到最左邊則是 `td` 節點裡面放入了一個文字節點 `Shady Grove`，這個文件在 HTML 程式中則相當於：

```
<table>
    <rows>
        <tr>
            <td>Shady Grove</td>
            <td>Aeollan</td>
        </tr>
        <tr>
            <td>Over the River, Charlie</td>
            <td>Dorian</td>
        </tr>
    </rows>
</table>
```

## SVG（Scalable Vector Graphics）

SVG 主要是用來描述**平面圖形的一種格式**，並且是以 **XML 格式**來描述，因此開發者可以直接在 HTML 檔案中使用 SVG，下面以一段簡單的 SVG 程式碼來說明：

```javascript
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" 
    width="450" height="450">
  <rect x="0" y="0" width="100" height="100" fill="blue"/>
</svg>
```

在這段程式碼中可以看到要在 HTML 中使用 SVG，首先要使用 SVG 標籤來，並且在屬性中定義渲染的範圍與基本的文件說明與版本，接著在標籤內容放入要繪製的圖形標籤以及相關的位置、寬高以及填入的顏色等等。

![https://ithelp.ithome.com.tw/upload/images/20190922/20119062ehXvPXwJ6G.jpg](https://ithelp.ithome.com.tw/upload/images/20190922/20119062ehXvPXwJ6G.jpg)

如此一來，瀏覽器就會依照其 DOM 結構來繪製圖形（如上方），而我們也能透過 JavaScript 來操作這些 HTML DOM，至於 D3.js 提供的功能便是**一系列操作這些圖形介面 DOM 的方法集**給我們使用，透過包裝好的函式，我們可以更快速、方便的去取得這些內容與新增修改。

而目前 SVG 的標籤有以下幾種：

- 圓形 `<circle>`
- 橢圓形 `<ellipse>`
- 矩形 `<rect>`
- 線條 `<line>`
- 折線 `<polyline>`
- 多邊形 `<polygon>`
- 路徑 `<path>`

明天我們則會繼續介紹這幾種基本圖形在 SVG 中要如何設定！

> 今日一貓：最近黑黑每天都在找新的地方可以趴著，從南趴到北在從北趴到南的那種
> ![https://ithelp.ithome.com.tw/upload/images/20190922/20119062DmPChMevas.jpg](https://ithelp.ithome.com.tw/upload/images/20190922/20119062DmPChMevas.jpg)