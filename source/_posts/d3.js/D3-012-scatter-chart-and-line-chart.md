---
title: D3.js 繪製散點圖與折線圖 scatter chart & line chart
date: 2019-10-01 22:15:51
tags:
- [前端]
- [JavaScript]
- [D3.js]
categories: 
- [JavaScript, D3.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="d3-logo" src='/images/d3js/d3.png' width='300px' height='300px' />
</div>

## 繪製散點圖 scatter chart

昨天我們已經繪製出座標軸了，而接下來要繪製散點圖就非常的容易了，繪製散點圖的原理與繪製座標軸的原理類似，並且更簡單，我們只要在圖表內生成 SVG 圓形標籤時，藉由其屬性 `cx` 與 `cy` 定義圓形標籤的位置之後，即可將圓點產生在資料對應的位置。

以下範例用昨天已繪製好的座標軸繼續延伸：

<!--more-->

```javascript
// draw() 函式內部
enter.append('circle')
    .attr('cx',function(d){
        return Xscale(d.x)                        // 將 X 資料換算成 X 軸的比例
    })
    .attr('cy',function(d){
        return Yscale(d.y)                        // 將 Y 資料換算成 Y 軸的比例
    })
    .attr('r',5)
    .attr('fill','#000')
    .attr("transform", "translate(30,20)");       // 調整原點產生位置，對齊座標軸中心
```

結果顯示：

![https://ithelp.ithome.com.tw/upload/images/20191001/20119062s7pR6uUYWP.jpg](https://ithelp.ithome.com.tw/upload/images/20191001/20119062s7pR6uUYWP.jpg)

而要注意的事情是，**圓點之間距離比例需要對應到圖表坐標軸的比例**，藉由坐標軸的比例，將原先的資料能隨著比例一同對應到畫面上，另一方面也要記得調整**生成圓點群組時的位置**要對應到座標軸的中心位置 `(0, 0)`。

## 繪製折線圖 line chart

繪製完散點圖後，另一個跟散點圖有異曲同工之妙的圖表就是折線圖啦，折線圖與散點圖的邏輯其實差不了多少，主要都是**將資料輸出給圖形座標點 `(X, Y)` 來繪製**。而 D3.js 的線段，便是**藉由 SVG 中的 `path` 路徑標籤來繪製**，以**屬性 `d`** 來描述路徑，如果大家還記得的話我們曾經在 [SVG 基本圖型繪製](https://ithelp.ithome.com.tw/articles/10219120) 章節中介紹過下面這段**符咒**：
```html
<path d="M0,0h7.75a45.5,45.5 0 1 1 0,91h-7.75v-20h7.75a25.5,25.5 0 1 0 0,-51h-7.75zm36.2510,0h32a27.75,27.75 0 0 1 21.331,45.5a27.75,27.75 0 0 1 -21.331,45.5h-32a53.6895,53.6895 0 0 0 18.7464,-20h13.2526a7.75,7.75 0 1 0 0,-15.5h-7.75a53.6895,53.6895 0 0 0 0,-20h7.75a7.75,7.75 0 1 0 0,-15.5h-13.2526a53.6895,53.6895 0 0 0 -18.7464,-20z"></path>
```

基本上這段 `path` 路徑要由人類來編寫實在是太辛苦了，縱使有能力能通靈繪製出這個線段，一但要改變某段線條，那將會非常痛苦，因此 D3.js 提供一個 `d3.line()` 來協助我們定義這條線，而我們只要將座標傳入到 `x()` 以及 `y()` 中即可產生出這條線段的路徑，並且在產生圖表時將其帶入屬性 `d` 即可。

```javascript
// draw() 函式內部
let line = d3.line()                        // 定義線段
    .x(function (d) {
        return Xscale(d.x);
    })
    .y(function (d) {
        return Yscale(d.y);
    })

d3.select('svg').append('path')
    .attr('d', line(dataset))               // 使用定義線段
    .attr("transform", "translate(30,20)")
    .attr('stroke', 'black')
    .attr('stroke-width',2)
    .attr('fill', 'none');
```

畫面上結果顯示：

![https://ithelp.ithome.com.tw/upload/images/20191001/20119062cDgJma6soy.jpg](https://ithelp.ithome.com.tw/upload/images/20191001/20119062cDgJma6soy.jpg)

打開開發者工具來看看這條線：

![https://ithelp.ithome.com.tw/upload/images/20191001/20119062Fj2hKV7SAa.jpg](https://ithelp.ithome.com.tw/upload/images/20191001/20119062Fj2hKV7SAa.jpg)

...恩，我想還是關起來好了。

### 客製化線條
D3.js 除了已經處理好 `path` 基本路徑之外，還提供了一些客製化功能：

- `line.defined()`：定義繪製的資料範圍
```
let line = d3.line()
    .x(function (d) {
        return Xscale(d.x);
    })
    .y(function (d) {
        return Yscale(d.y);
    })
    .defined(function(d){return d.y > 30 }); // 只繪製資料 Y 中大於 30 的點所連起來的線段
```

結果顯示：

![https://ithelp.ithome.com.tw/upload/images/20191001/201190628HUbwC6NmB.jpg](https://ithelp.ithome.com.tw/upload/images/20191001/201190628HUbwC6NmB.jpg)

- `line.curve()`：定義線段樣式，前身在 3 版中為 `line.interpolate`。

```
let line = d3.line()
    .x(function (d) {
        return Xscale(d.x);
    })
    .y(function (d) {
        return Yscale(d.y);
    })
    .curve(d3.curveBasis);         // 加入這段 curve 來定義線條，並且樣式採用 d3.curveBasis 呈現
```

結果顯示：

![https://ithelp.ithome.com.tw/upload/images/20191001/20119062NgAh5xLKsN.jpg](https://ithelp.ithome.com.tw/upload/images/20191001/20119062NgAh5xLKsN.jpg)

以上即為 D3.js 中繪製散點圖以及折線圖的部分，明天就是鐵人賽的最後一天啦，老實說還有很多東西可以講，像是 Vue-cli 與 D3.js 的結合、透過 Vuex 撈取資料給 D3.js 繪圖等等，或許有機會就會直接繼續寫下去吧？總之，明天我們將會來繪製 D3.js 裡面算是最經典的圖表－－地圖！

> 黑黑黑到只剩眼睛跟鈴鐺
> ![https://ithelp.ithome.com.tw/upload/images/20191001/20119062eMtIHfEnSu.jpg](https://ithelp.ithome.com.tw/upload/images/20191001/20119062eMtIHfEnSu.jpg)


## 附註 D3.js 3 版與 4 版線段相關 API 差異表

> // 線段相關
> d3.svg.line ↦ d3.line
> d3.svg.line.radial ↦ d3.radialLine
> // 線段樣式
> linear ↦ d3.curveLinear
> linear-closed ↦ d3.curveLinearClosed
> step ↦ d3.curveStep
> step-before ↦ d3.curveStepBefore
> step-after ↦ d3.curveStepAfter
> basis ↦ d3.curveBasis
> basis-open ↦ d3.curveBasisOpen
> basis-closed ↦ d3.curveBasisClosed
> bundle ↦ d3.curveBundle
> cardinal ↦ d3.curveCardinal
> cardinal-open ↦ d3.curveCardinalOpen
> cardinal-closed ↦ d3.curveCardinalClosed
> monotone ↦ d3.curveMonotoneX
