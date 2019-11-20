---
title: Canvas 基礎介紹與圖形繪製
date: 2019-10-09 19:00:12
tags:
- [前端]
- [Canvas]
categories: 
- [前端, Canvas]
---

# 前情提要

最近在學 D3.js 與 SVG 的過程中，研究資料時一直有遇到 canvas 這個關鍵字，雖之前已經有大略聽過他在處理畫面上的神威了，但礙於撰寫今年 iT 邦幫忙鐵人賽的文章有點忙碌，光是下班後看看文件再寫文章已經到了凌晨，所以就沒心力同時研究 canvas 的技術。而這陣子鐵人賽順利地完賽後，忙碌的狀態算是告一個段落，理所當然地就很想再回頭把這個 Canvas 給弄懂，也就是這系列誕生的原因。

# 繪製標籤

在 HTML 修訂至 HTML5 之後，除了一些新增了 semantic elements（語意化標籤）與 `<video>`、`<audio>` 等影音元素之外，最驚奇的大概莫屬 `<canvas>` 元素了吧？`<canvas>` 除了像 SVG 一樣可以繪製圖形之外，還可以用來合成圖片、製作動畫連放影片都難不倒他，光是這幾點就讓我覺得有許多應用面可以去實作他，並且搭配 Pixi.js 繪製還能做出各種視覺渲染效果。而在繪製圖形中 SVG 與 Canvas 的差異其實不小，接著來比較一下繪製畫面上 SVG 與 Canvas 的差異點：

## SVG
透過操作瀏覽器的 DOM 來繪製圖形，並且內建各種圖形標籤來輔助繪製，在處理資料驅動圖形這塊能力不錯，另外由於是**藉由 DOM 來繪製**，因此我們可以在繪製出來的圖形上**加上許多互動效果**。
1. 主要適合應用在向量圖、圖形、圖表
2. 支援 JavaScript 與 CSS 更改
3. 專注在處理 DOM、較靜態的文件

## Canvas
透過單一標籤 `<canvas>` 來產生繪製畫布，並透過內建 API 來繪製圖型，而由於 Canvas 的圖型繪製單位是以**像素**為主，不像 SVG 會藉由**新增一個 DOM 元素節點來繪製圖型**，因此要與繪製完的圖形互動的**效果較差**，但**仍可以藉由一些方式來解決這個問題**。

1. 主要適合應用在點陣圖、動畫、遊戲
2. 只支援 JavaScript 操作
3. 專注在處理像素、高性能渲染與大數據

綜合以上結論我們可以看出在資訊量小，操作圖形不多的話，藉由 SVG 會是比較好的選擇，我們可以輕易的藉由 DOM 操作來增進使用者互動；而 Canvas 在資料量大且要呈現圖形的數量多時則較占優勢，但互動性方面得另外自己實作或使用第三方庫來操控，算是各有利弊不分上下。

# 繪製畫布、建立渲染環境

在 Canvas 中繪製圖形與 SVG 類似，都是先定義畫布後，之後才在畫布中繪製圖形：

HTML 部分中我們先定義一個 Canvas 畫布，
```html
    <canvas id="canvasWrapper" width="200" height="200"></canvas>
```

JavaScript 部分中則是抓取到該元素後，使用 `getContext()` API 來定義繪製圖形的渲染環境（rendering context），並從定義好的渲染環境來取得繪圖函式。
```javascript
let canvas = document.getElementById('canvasWrapper')

// 若有支援 Canvas 的話才將環境存於變數當中，若無則做出相對應的措施
if (canvas.getContext){
    let ctx = canvas.getContext('2d'); 
} else {
    // ...
}
```

**需要注意的是** Canvas 畫布與 SVG 畫布一樣，X、Y 軸都是以左上角為中心點`(0, 0)`，往右下角為正值區域`(+, +)`。

# 繪製圖形

在 Canvas 中繪製圖形的部分與 SVG 不同的是，Canvas 裡面只提供了繪製**矩形**與**路徑**的 API，並沒有像 SVG 還提供了三角形、圓形等等圖形繪製 API。

而目前提供繪製矩形的 API 則有：
- `fillRect(x, y, width, height)` ：繪製一個填滿顏色的矩形
- `strokeRect(x, y, width, height)` ：繪製一個矩形的邊框
- `clearRect(x, y, width, height)` ：清除矩形範圍內的像素，並將其設為透明。

``` javascript
let canvas = document.getElementById('canvasWrapper')

if(canvas.getContext){
    let ctx = canvas.getContext('2d');
    ctx.fillRect(0,0,200,100);
    ctx.clearRect(25,25,100,100);
    ctx.strokeRect(50,50,50,50);
}
```

最後顯示結果：

![](/images/canvas/drawRect.jpg)

# 繪製路徑
在 Canvas 中繪製路徑如同 SVG 一樣，需要創造一個路徑來設定相關參數，並提供封閉、畫筆、貝茲曲線等等功能：

- `beginPath()` ：產生一個路徑，並透過後續的路徑設定其變化。
- `closePath()` ：將路徑尾端與起點連起，使下個 `beginPath()` 可以被重新設定。
- `stroke()` ：繪製路徑邊框。
- `fill()` ：繪製路徑內顏色。
- `moveTo(x, y)` ：將畫筆移動至 `(x, y)` 座標軸。
- `lineTo(x, y)` ：從畫筆當前座標繪製線條到 `(x, y)` 座標軸。
- `arc(cx, cy, r, startAngle, endAngle[, anticlockwise])` ：以 (cx, cy) 為圓心， r 為半徑，以右邊為 0 度順時間設定 `startAngle` 與 `endAngle` 的角度繪製曲線。
- `arcTo(x1, y1, x2, y2, r)` ：從座標軸 `(x1, y1)` 到 `(x2, y2)` 繪製曲線。
- `bezierCurveTo(cx1, cy1, cx2, cy2, x, y)` ：設定兩組控制點（control point）座標，從當前座標軸畫一條貝茲曲線到 `(x, y)` 座標軸。
- `quadraticCurveTo(cx, cy, x, y)` ：設定一組控制點座標，畫一條二次函數線到 `(x, y)` 座標軸。
- `ellipse(x, y, rx, ry, rotation, startAngle, endAngle [, anticlockwise]);` ：設定 `(x, y)` 座標軸， `(rx, ry)` 兩軸半徑，以 `rotation` 弧度表示旋轉角度，最後定義起點與終點，為連接的地方會直接切掉作處理。

範例 JavaScript ：
```javascript
let canvas = document.getElementById('canvasWrapper')
if(canvas.getContext){
    let ctx = canvas.getContext('2d');
    ctx.fillStyle='#000'
    ctx.beginPath();
    ctx.ellipse(50, 50, 30, 10, Math.PI * 1.2, 0, Math.PI * 1.5);
    ctx.fill();
}
```
最後顯示：
![](/images/canvas/drawEllipse.jpg)

**需要注意的是** 在替製作線段時，若沒有 `beginPath()` 重新產生一段路徑，則不論中間是否透過 `moveTo()` 移動，線段都將會視為都是**同一條**。

## SVG Path in Canvas

另外，在 SVG 中非常好用的 Path 定義線段我們仍然可以在 Canvas 中透過 `Path2D` 物件使用：

```javascript
let canvas = document.getElementById('canvasWrapper')
if(canvas.getContext){
    let ctx = canvas.getContext('2d')
    let path = new Path2D('M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z')
    ctx.fill(path);
}
```
最後顯示：
![](/images/canvas/drawPath.jpg)

今天初入 Canvas 基本用法，感覺大部分用法與 SVG 差不多，只是 API 對象從 SVG 圖形標籤換成 Canvas 的渲染環境。而明天將繼續來看不透過 DOM 繪製的 Canvas 要怎麼去修改他畫布內的圖形樣式與文字。
