---
title: D3.js SVG 基本圖型繪製（續）
date: 2019-09-24 17:27:09
tags:
- [前端]
- [JavaScript]
- [D3.js]
- [SVG]
categories: 
- [前端, JavaScript, D3.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/d3js/d3.png' width='300px' height='300px' />
</div>

SVG 除了基本的圖形繪製之外，另外還可以做到繪製文字、更改樣式、等等功能，今天我們將要來看看還有哪些功能沒介紹到的部分：

## 文字
SVG 中有提供一個 `text` 標籤以供我們繪製文字的部分：

- `x` ：文字左上角的 X 座標。
- `y` ：文字左上角的 Y 座標。
- `dx` ：以 `x` 座標為基準，平行移動文字距離（正為往右，負為往左）。
- `dy` ：以 `y` 座標為基準，垂直移動文字距離（正為往上，負為往下）。
- `textLength` ：文字字距。
- `rotate` ：**每個文字**的旋轉角度。（若是要整組文字一起旋轉可以使用 `transform="rotate()"` 。）

範例：
```
<svg height="50" width="50">
  <text x="20" y="20" fill="red" rotate="180" transform="rotate(30 20,40)">SVG</text>
</svg>
```
呈現結果：
![https://ithelp.ithome.com.tw/upload/images/20190924/20119062o2JJVfwDpH.jpg](https://ithelp.ithome.com.tw/upload/images/20190924/20119062o2JJVfwDpH.jpg)

## 基本樣式
SVG 的樣式幾乎都能夠依照我們所熟悉的 CSS 來使用，只是開發時需要依照 SVG 標籤定義好的樣式屬性來編寫樣式表，下面列出幾個比較不常出現的樣式屬性：

- `fill` ：圖形內部顏色。
- `stroke` ：圖形邊框顏色。
- `stroke-width` ：圖形邊框寬度。
- `stroke-linecap` ：輪廓線兩端的樣式（可設為直角、圓角）。
- `stroke-dasharray` ：輪廓線條樣式（實線、虛線……等等）。

範例：
```
<svg height="30" width="200">
    <path stroke="black" stroke-width="4" stroke-dasharray="5,5" d="M0 10 l200 0" />
    <path stroke="black" stroke-width="6" stroke-dasharray="10,10" d="M0 25 l200 0" />
</svg>
```
呈現結果：
![https://ithelp.ithome.com.tw/upload/images/20190924/20119062PQy5MXmhCn.jpg](https://ithelp.ithome.com.tw/upload/images/20190924/20119062PQy5MXmhCn.jpg)

## 定義樣式
在 SVG 中還有一些樣式需要**先定義**後才能使用的，而這些內容最後都會放在一個 `<defs>` 標籤當中，在 `<defs>` 這個標籤中，除了用來定義樣式外，最主要的功用是可以將其定義的樣式內容**重覆給予其他圖形標籤作為使用**，而以下為需要放在定義標籤中作為使用的樣式：

### 濾鏡
常使用 CSS 開發的人應該多少有用過 `filter` 這個 CSS 屬性，而在 SVG 中也可以使用類似的功能，而樣式標籤名稱正也是 `<filter>` 。

使用方法也很簡單，在 `<defs>` 標籤中，放入 `<filter>` 標籤並輸入 `id` 屬性以供接指定，接著在子層中放入濾鏡標籤（濾鏡標籤可參考[ MDN ](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter#See_also)上的列表）：

```html
<defs>
    <filter id="Blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
</defs>
```

最後在使用圖形標籤時，在 `filter` 屬性中，使用 `url` 來指定剛剛定義好的樣式及可套用：

```html
<svg height="200" width="200">
  <defs>
    <filter id="Blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
  </defs>
  <rect x="50" y="50" width="100" height="100"  stroke-width="3" fill="blue" filter="url(#Blur)" />
</svg>
```
呈現結果：
![https://ithelp.ithome.com.tw/upload/images/20190924/20119062m0NRzIXNEV.jpg](https://ithelp.ithome.com.tw/upload/images/20190924/20119062m0NRzIXNEV.jpg)

### 漸層
漸層的標籤可分為線性漸層 `<linearGradient>` 以及放射性漸層 `<radialGradient>` ，使用上兩者大同小異，最主要是最後呈現結果的不同。

在 `Gradient` 標籤的屬性中，可以透過 `X` 與 `Y` 去定義漸層顏色的起點與終點：
```html
<linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="0%">
</linearGradient>
```

並在內層中可以放入 `<stop>` 標籤，透過 `offset` 屬性來指定漸層位置，style 中的 `stop-color` 則可以用來指定該位置的顯示顏色：
```html
<stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
```

完整範例：
```
<svg height="200" width="200">
  <defs>
    <linearGradient id="linearGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
      <stop offset="50%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(0,255,255);stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="100" cy="100" rx="75" ry="50" fill="url(#linearGradient)" />
</svg>
```
呈現結果：
![https://ithelp.ithome.com.tw/upload/images/20190924/20119062nE5Uo8ixmi.jpg](https://ithelp.ithome.com.tw/upload/images/20190924/20119062nE5Uo8ixmi.jpg)

### 標記
標記主要可以用來繪製線段上的箭頭，藉由 `<marker>`標籤來定義相關屬性：
- `viewBox` ：用來定義 `marker` 內繪製圖形的比例（概念好比從五樓陽台上看陸地上的行人與從二十樓陽台上看的差別）。
- `refX`、`refY` ：繪製時從該點（如起點或終點）延伸成坐標系，再將 `viewBox` 所設定好的圖形放在此點上。
- `markerWidth`、`markerHeight` ：標記圖形顯示的寬高。
- `markerUnits` ：指定標記大小的參考對象（如線的寬度 `strokeWidth`）。

而在圖形標籤中，則可以藉由 `marker-start` 、`marker-mid` 及 `marker-end` 來將上方製作好的標記放入線段的起點、中點以及結尾的部分。

範例：
```html
<svg width="200" height="200">
  <defs>
    <marker id="m1" viewBox="0 0 100 100" refX="25" refY="25" markerWidth="20" markerHeight="50" orient="auto" >
      <ellipse cx="25" cy="25" rx="25" ry="50" fill="black" />
    </marker>

    <marker id="m2" viewBox="0 0 100 100" refX="50" refY="22" markerWidth="50" markerHeight="20" orient="auto" >
      <ellipse cx="25" cy="25" rx="50" ry="25" fill="black" />
    </marker>
  </defs>
  <polyline points="25,25 100,100" fill="none" stroke="black" stroke-width="1" marker-end="url(#m1)" marker-start="url(#m2)"></polyline>
</svg>
```
呈現結果：
![https://ithelp.ithome.com.tw/upload/images/20190924/20119062vHOREh7m48.jpg](https://ithelp.ithome.com.tw/upload/images/20190924/20119062vHOREh7m48.jpg)

以上就是 SVG 繪製圖形的一些輔助功能，而接下來的章節將會介紹 D3.js 如何選取與資料綁定！

> 早上感冒請假去打針，回到家想發文，發現阿橘直接霸佔我的位置，動他還會生氣的那種（起床氣？），只好一個哭笑不得地拿書去其他地方看了……
> ![https://ithelp.ithome.com.tw/upload/images/20190924/20119062WcVX8mYlHe.jpg](https://ithelp.ithome.com.tw/upload/images/20190924/20119062WcVX8mYlHe.jpg)