---
title: D3.js SVG 基本圖型繪製
date: 2019-09-23 01:04:56
tags:
- [前端]
- [JavaScript]
- [D3.js]
- [SVG]
categories: 
- [JavaScript, D3.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="d3-logo" src='/images/d3js/d3.png' width='300px' height='300px' />
</div>

## 繪製圖形

上次提到了 D3.js 實際上是透過 HTML DOM 來操作元素標籤，並且透過 SVG 來繪圖的，而 SVG 繪圖十分簡單，各種基本圖形在 SVG 中都有標籤能夠直接使用，並且使用方法大同小異，只要控制該元素標籤的屬性，就能夠相對應的產生想要製作的圖形，以下列出 SVG 目前支援的標籤以及介紹各個標籤中有哪些屬性可以操控：

- 圓形 `<circle>`
- 橢圓形 `<ellipse>`
- 矩形 `<rect>`
- 線條 `<line>`
- 折線 `<polyline>`
- 多邊形 `<polygon>`
- 路徑 `<path>`

<!--more-->

### 圓形
- `cx` ：表示圓心在 SVG 畫布中的 X 座標
- `cy` ：圓心在 SVG 畫布中的 Y 座標
- `r` ：圓半徑

例：產生一個半徑為 50 px 的圓形圖案

```html
<svg width="200" height="200">
    <circle cx="50" cy="50" r="50" style="fill:red"></circle>
</svg>
```
![https://ithelp.ithome.com.tw/upload/images/20190923/20119062JftvAFXvM1.jpg](https://ithelp.ithome.com.tw/upload/images/20190923/20119062JftvAFXvM1.jpg)



### 橢圓形
- `cx` ：圓心在 SVG 畫布中的 X 座標
- `cy` ：圓心在 SVG 畫布中的 Y 座標
- `rx` ：橢圓形的 X 軸半徑
- `ry` ：橢圓形的 Y 軸半徑

例：產生一個 X 軸半徑為 50 px，Y 軸半徑為 25 px 的橢圓形圖案
```html
<svg width="200" height="200">
    <ellipse cx="50" cy="50" r="50" rx="50" ry="25" style="fill:orange"></ellipse>
</svg>
```
![https://ithelp.ithome.com.tw/upload/images/20190923/20119062o05UzrfJUw.jpg](https://ithelp.ithome.com.tw/upload/images/20190923/20119062o05UzrfJUw.jpg)



### 矩形
- `width` ：矩形寬度
- `height` ：矩形高度
- `x` ：以矩形左上角為基準的 X 座標
- `y` ：以矩形左上角為基準的 Y 座標
- `rx` ：導圓角的 X 軸半徑
- `ry` ：導圓角的 Y 軸半徑

例：產生一個長寬為 50 px 且導圓角 10px 的矩形
```html
<svg width="200" height="200">
    <rect width="50" height="50" x="0" y="0" rx="10" ry="10" style="fill:yellow"></rect>
</svg>
```
![https://ithelp.ithome.com.tw/upload/images/20190923/2011906278Z9CQEVGO.jpg](https://ithelp.ithome.com.tw/upload/images/20190923/2011906278Z9CQEVGO.jpg)



### 線條
- `x1` ：起始位置的 X 座標
- `x2` ：終點位置的 X 座標
- `y1` ：起始位置的 Y 座標
- `y2` ：終點位置的 Y 座標

例：產生一個 50 px 長寬，左上到右下與左下到右上的叉叉圖案
```html
<svg width="50" height="50">
    <line x1="0" x2="50" y1="0" y2="50" style="stroke: green; stroke-width: 2" ></line>
    <line x1="0" x2="50" y1="50" y2="0" style="stroke: green; stroke-width: 2" ></line>
</svg>
```
![https://ithelp.ithome.com.tw/upload/images/20190923/20119062OIzxjDgTw3.jpg](https://ithelp.ithome.com.tw/upload/images/20190923/20119062OIzxjDgTw3.jpg)



### 折線、多邊形
折線與多邊形基本上會以 `points` 屬性來表示每個點之間的 X、Y 座標，透過多個座標來連成一條線，多邊形與折線的差異在於多邊形的最後一點座標點會連回起始座標點。

例：產生一個上下彎折的折線與多邊形
```html
<svg width="100" height="50">
    <polyline points="0,0 25,25 50,0 75,25" style="fill: none;stroke: blue;stroke-width: 4"></polyline>
</svg>
```
![https://ithelp.ithome.com.tw/upload/images/20190923/20119062cslj7ius7N.jpg](https://ithelp.ithome.com.tw/upload/images/20190923/20119062cslj7ius7N.jpg)

```html
<svg width="100" height="50">
    <polygon points="0,0 25,25 50,0 75,25" style="fill: none;stroke: purple;stroke-width: 4"></polygon>
</svg>
```
![https://ithelp.ithome.com.tw/upload/images/20190923/20119062xxws5OfM3F.jpg](https://ithelp.ithome.com.tw/upload/images/20190923/20119062xxws5OfM3F.jpg)

### 路徑
路徑則是 SVG 標籤裡面功能最多樣的標籤元素，除了擁有類似於折線、多邊形的座標軸來定義各個點來繪製線條之外還可以透過其他輔助的屬性值來描述如何移動到下個座標軸，最後透過屬性 `d` 來將下列有用到的內容來定義圖形：

- `M` ：移動到該座標軸（不繪製線條）。
- `L` ：繪製線條到下一個座標。
- `H` ：繪製水平線到下個 X 座標
- `V` ：繪製水平線到下個 Y 座標
- `C` ：經兩個指定座標來繪製貝茲曲線
- `S` ：輸入終點座標後與前一條貝茲曲線的指定座標，對稱產生下個貝茲曲線指定座標，來繪製貝茲曲線。
- `A` ：繪製一個橢圓曲線到下一個座標。
- `Z` ：繪製一條到起點座標的線條。（效果看起來像是封閉圖形）

例：如 D3.js 官網本身的 LOGO 就是由 SVG 所定義而成的
```html
<svg width="96" height="91" style="position:relative;top:22px;">
    <clipPath id="clip">
      <path d="M0,0h7.75a45.5,45.5 0 1 1 0,91h-7.75v-20h7.75a25.5,25.5 0 1 0 0,-51h-7.75zm36.2510,0h32a27.75,27.75 0 0 1 21.331,45.5a27.75,27.75 0 0 1 -21.331,45.5h-32a53.6895,53.6895 0 0 0 18.7464,-20h13.2526a7.75,7.75 0 1 0 0,-15.5h-7.75a53.6895,53.6895 0 0 0 0,-20h7.75a7.75,7.75 0 1 0 0,-15.5h-13.2526a53.6895,53.6895 0 0 0 -18.7464,-20z"></path>
    </clipPath>
    <linearGradient id="gradient-1" gradientUnits="userSpaceOnUse" x1="7" y1="64" x2="50" y2="107">
      <stop offset="0" stop-color="#f9a03c"></stop>
      <stop offset="1" stop-color="#f7974e"></stop>
    </linearGradient>
    <linearGradient id="gradient-2" gradientUnits="userSpaceOnUse" x1="2" y1="-2" x2="87" y2="84">
      <stop offset="0" stop-color="#f26d58"></stop>
      <stop offset="1" stop-color="#f9a03c"></stop>
    </linearGradient>
    <linearGradient id="gradient-3" gradientUnits="userSpaceOnUse" x1="45" y1="-10" x2="108" y2="53">
      <stop offset="0" stop-color="#b84e51"></stop>
      <stop offset="1" stop-color="#f68e48"></stop>
    </linearGradient>
    <g clip-path="url(#clip)">
      <path d="M-100,-102m-27,0v300h300z" fill="url(#gradient-1)"></path>
      <path d="M-100,-102m27,0h300v300z" fill="url(#gradient-3)"></path>
      <path d="M-100,-102l300,300" fill="none" stroke="url(#gradient-2)" stroke-width="40"></path>
    </g>
 </svg>
```
![https://ithelp.ithome.com.tw/upload/images/20190923/20119062iOg34QXBk8.jpg](https://ithelp.ithome.com.tw/upload/images/20190923/20119062iOg34QXBk8.jpg)

以上光是看到屬性可能大家就已經暈了，而實際上開發時**我們通常不會親自一個一個輸入**這些座標屬性值，開發者除了可以**透過 D3.js 的函式去產生**對應的路徑之外，像是使用繪圖軟體 AI （Adobe Illustrator）也可以將圖片儲存為 SVG 的格式將其放置在網頁當中，最後就能產出像是上方 D3.js 官網的 SVG 程式碼了。

> 阿橘固定都會在我要打文章的時候來蹭螢幕。前幾天阿橘還差一點幫我發文章 XD
> ![https://ithelp.ithome.com.tw/upload/images/20190923/20119062xqlw5CfNow.jpg](https://ithelp.ithome.com.tw/upload/images/20190923/20119062xqlw5CfNow.jpg)
> （阿橘一臉無辜地看著我）