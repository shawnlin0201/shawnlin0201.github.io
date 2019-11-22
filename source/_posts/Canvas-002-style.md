---
title: Canvas 套用樣式
date: 2019-10-20 17:22:36
tags:
- [前端]
- [Canvas]
- [JavaScript]
categories: 
- [前端, Canvas]
---

# 前情提要

在 Canvas 系列上一篇中我們已經可以繪製一些基本矩形與線條了，但在 Canvas 中，由於繪製圖形並不是藉由產生 DOM 標籤來形成圖形，因此並沒有辦法透過 CSS selector 來捕捉並更改樣式，而今天便要來研究一下如何使用 Canvas 提供的 API 來更改裡面的樣式。

## 顏色

在 Canvas 中，主要有兩隻與顏色相關的屬性可以使用：
- `fillStyle = color`：填滿圖形顏色
- `strokeStyle = color`：圖形邊框顏色

參考 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors) 漂亮的 fillStyle 為例：

```javascript
function draw () {
    var canvas = document.getElementById('canvas')
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d')
        for (i=0; i<5 ; i++) {
            for (j=0; j<5 ; j++) {
                ctx.fillStyle = `rgb(${Math.floor(255-30*i)},${Math.floor(0+45*j)},45)`
                ctx.fillRect(i*25,j*25,25,25)
            }
        }
        for (i=0; i<5 ; i++) {
            for (j=0; j<5 ; j++) {
                ctx.strokeStyle = `rgb(0,${Math.floor(255-30*i)},${Math.floor(255-42.5*j)})`
                
                ctx.beginPath();
                ctx.arc(12.5+j*25,12.5+i*25,10,0,Math.PI*2,true);
                ctx.stroke();
            }
        }
    }
}
draw()
```
首先先指定 Canvas 畫板 DOM 位置並宣告渲染環境為 `2d`，接著依序宣告 `fillStyle`、`strokeStyle` 的顏色，再依序使用 API `fillRect()` 與 `stroke()` 繪製出圖形。

而要注意的地方在於由於 Canvas 與 SVG 渲染層概念一樣，新的渲染圖形會蓋過舊的渲染圖形，但原生 Canvas DOM 並不像 SVG DOM 擁有多個標籤可以供我們操作，所以渲染順序上要比 SVG 更小心一點，以免渲染出不是理想中的圖形。


![](/images/canvas/Canvas_color.png)

## 透明度 
- `globalAlpha = transparencyValue`：透明度可指定從 0.0 ~ 1.0 的數值，與一般 CSS opacity 概念類似。

我們將上方的範例稍微更改一下，將 rgb() 傳入第四個透明參數。

```
// ctx.fillStyle = `rgb(${Math.floor(255-30*i)},${Math.floor(0+45*j)},45)`
ctx.fillStyle = `rgb(${Math.floor(255-30*i)},${Math.floor(0+45*j)},45,0.45)`

// ctx.strokeStyle = `rgb(0,${Math.floor(255-30*i)},${Math.floor(255-42.5*j)})`
ctx.strokeStyle = `rgb(0,${Math.floor(255-30*i)},${Math.floor(255-42.5*j)},0.75)`
```
最後結果：

![](/images/canvas/Canvas_color2.png)


## 線條
Canvas 已提供了數種線條有關的屬性可以使用，若讀者曾經使用過類似 PhotoShop 一類的設計工具，大部分的功能應該都還蠻熟悉了！
- `lineWidth = value`：線條寬度
- `lineCap = type`：線條結尾樣式
- `lineJoin = type`：線條接合處的樣式

**線條寬度**
```javascript
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  for (var i = 0; i < 5; i++) {
    ctx.lineWidth = 5*i;
    ctx.beginPath();
    ctx.moveTo(5 + i * 25, 5);
    ctx.lineTo(5 + i * 25, 140);
    ctx.stroke();
  }
}
draw();
```
![](/images/canvas/Canvas_line.png)

**線條結尾樣式**

```javascript
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  var lineCap = ["butt", "round", "square"];
  ctx.strokeStyle = "black";
  for (var i = 0; i < lineCap.length; i++) {
    ctx.lineWidth = 20;
    ctx.lineCap = lineCap[i];
    ctx.beginPath();
    ctx.moveTo( 20 + i * 40, 20);
    ctx.lineTo( 20 + i * 40, 110);
    ctx.stroke();
  }
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10,20);
  ctx.lineTo(110,20);
  ctx.moveTo(10,110);
  ctx.lineTo(110,110);
  ctx.stroke();
}
draw();
```
![](/images/canvas/Canvas_line2.png)
這裡利用圖層的概念，我們先繪製出三條線段後在繪製兩條白色的線條來區隔，可以看到 `butt` 樣式的線段會完全符合我們定義的線條長度，因此沒有被白線截斷的痕跡；而 `round` 線段的則是露出半圓形的尾部；`square` 線段則是除了本身線段外，會在結尾的部分再多延長一段矩形的線段。

**線條接合處的樣式**
- `round`：圓弧形接角
- `bevel`：斜角形接角
- `miter`：斜接形接角，並受 `miterLimit` 影響。

```javascript
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  var lineJoin = ["round", "bevel", "miter"];
  ctx.lineWidth = 15;
  for (var i = 0; i < lineJoin.length; i++) {
    ctx.lineJoin = lineJoin[i];
    ctx.beginPath();
    ctx.moveTo(0, 40 + i * 40);
    ctx.lineTo(50, 40 + i * 40);
    ctx.lineTo(65, 20 + i * 40);
    ctx.lineTo(80, 40 + i * 40);
    ctx.lineTo(150, 40 + i * 40);
    ctx.stroke();
  }
}
draw();
```

![](/images/canvas/Canvas_line3.png)
這裡試著彎折一條線段，並觀察他的接合處的樣式，我們可以清楚的看到 `round` 樣式的線段接合處會出現圓弧的形狀；`bevel` 線段則是再轉折處會產生斜角的折線；`miter` 則與一般線條無差別，因此來看看 `miterLimit` 對他的差異。

而 `miterLimit` 的公式如下：
`miterLimit = max miterLength / lineWidth = 1 / sin ( min θ / 2 )`

以 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors) 程式碼範例說明：


```javascript
function draw() {
    var ctx = document.getElementById("canvas").getContext("2d");

    ctx.miterLimit = 10;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 10;

    ctx.beginPath();
    ctx.moveTo(0, 100);
    for (i = 0; i < 10; i++) {
    var dy = i % 2 == 0 ? 25 : -25;
    ctx.lineTo(Math.pow(i, 1.5) * 2, 75 + dy);
    }
    ctx.stroke();

    ctx.strokeStyle = 'red';
    ctx.lineWidth   = 2;
    ctx.strokeRect(-5,50,160,50);
}
draw();
```
根據公式換算，當 `miterLimit = 10` 的時候，若交界角度小於 11 度的時候就會消失！
![](/images/canvas/Canvas_line4.png)

若改成 `miterLimit = 5`，則結果
![](/images/canvas/Canvas_line5.png)

比較 tricky 的玩法大概就是塞入一個根號二的值，讓他只顯示出直角與鈍角吧？

---

# 結尾
今天跟著 MDN 範例快速瞭解 Canvas 中對於樣式色彩的替換，可以看到許多色彩樣式與一般繪圖軟體提供的功能差不多，覺得可以靠它來實作繪圖軟體，而在 Google keyword `web photoshop` 也確實找到不少利用 Canvas 實現近似 PhotoShop 軟體的功能，其中有幾個甚至完成度已經可以說是跟 Photoshop 很接近了。

# 參考資料

- [MDN-Canvas](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial)