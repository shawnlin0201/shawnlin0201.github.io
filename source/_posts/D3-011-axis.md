---
title: D3.js 繪製座標軸 axis
date: 2019-09-30 21:57:01
tags:
- [前端]
- [JavaScript]
- [D3.js]
categories: 
- [前端, JavaScript, D3.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/d3js/d3.png' width='300px' height='300px' />
</div>

## 繪製座標軸

透過 D3.js 比例尺後，我們現在已經可以透過資料得到對應比例尺的數值了，而今天要緊接著透過這個數值來繪製座標軸，並且一樣採用 Vue.js 框架來說明。

而在 Vue.js 中的實體設定基本上與前幾天差不多，最主要我們將資料集換成**每筆資料各有兩個屬性資料**的格式：

```javascript
let vm = new Vue({
    el: "#app",
    data: {
      sampleData: [
        { x: 10, y: 80 },
        { x: 70, y: 40 },
        { x: 60, y: 50 },
        { x: 30, y: 100 },
        { x: 90, y: 20 }
      ]
    },
    created() {
      d3.select("#app")
        .append("svg")
        .attr("width", 250)
        .attr("height", 250)
        .style("border", "1px solid #00000060");
    },
    mounted() {
      this.draw();
    },
    methods: {
      draw(newData) {
        let dataset = newData || this.sampleData;
      }
    }
  });
```

此時應該會看的到目前我們 SVG 畫布（灰線標示框內），應該是沒有任何東西的：

![https://ithelp.ithome.com.tw/upload/images/20190930/20119062zZPgxGAmfB.jpg](https://ithelp.ithome.com.tw/upload/images/20190930/20119062zZPgxGAmfB.jpg)

接著來繪製 X 軸線，首先我們得取出用來當作 X 軸線資料參考的資料：

```
// draw() 函式內部

let dataset = newData || this.sampleData;
let Xdata = dataset.map(function(d) {
  return d.x;                              // [10, 70, 60, 30, 90]
});
```

再來是用到我們昨天剛學到的比例尺換算，來換算 **X 軸要顯示的比例長度**：

```
// draw() 函式內部
let dataset = newData || this.sampleData;
let Xdata = dataset.map(function(d) {
  return d.x;                              // [10, 70, 60, 30, 90]
});
let Xscale = d3
  .scaleLinear()
  .domain([0, d3.max(Xdata)])              // 座標 X 軸的長度將會依據 0 至 Xdata 資料的最大值
  .range([0, 200]);                        // 換算成實際上會輸出的長度 0 至 200
  
```

緊接著下方加入 D3.js 軸線的樣式定義：

```
let Xaxis = d3.axisBottom(Xscale);         // 繪製一個數值朝下的平行座標線，並依據 Xscale 比例尺換算
```

建立一個 X 座標軸的群組：

```
let gXaxis = d3
  .select("svg")
  .append("g")
  .attr("transform", "translate(30,220)");
```

最後呼叫 `Xaxis` 來執行繪圖：
```
Xaxis(gXaxis);
```

畫面上最後顯示：
![https://ithelp.ithome.com.tw/upload/images/20190930/20119062IYr3UlvqlZ.jpg](https://ithelp.ithome.com.tw/upload/images/20190930/20119062IYr3UlvqlZ.jpg)

整段程式跑的邏輯在於，最後呼叫 `Xaxis` 時，會回傳 `gXaxis` 建立好的範圍給 `d3.axisBottom(Xscale)` 做新增，接著 `d3.axisBottom(Xscale)` 接收到範圍後， `d3.axisBottom()` 會幫我們 `gXaxis` 範圍中繪製一條數值朝下的平行座標線，並採用 `Xscale` 比例尺換算。

釐清觀念後，快速歸納出以下步驟：

1. 建立 `Xscale` ，放入比例尺設定，供 X 軸產生時有依據可供參考（`domain` 負責**座標軸資料**對應、`range` 負責**座標軸長度**對應。
2. 建立 `Xaxis` ，放入 D3.js 座標軸定義，並採用 `Xscale` 比例來繪製。
3. 建立 `gXaxis` ，在 SVG 新增一塊群組範圍 `<g>`，供繪製座標時的 **實際位置範圍**
4. 啟用 `Xaxis` 來繪製座標軸。

而 Y 軸的部分則也是依樣畫葫蘆即可完成：

```
let Ydata = dataset.map(function(d) {
  return d.y;
});
let Yscale = d3
  .scaleLinear()
  .domain([0, d3.max(Ydata)])
  .range([200, 0]);
let Yaxis = d3.axisLeft(Yscale);
let gYaxis = d3
  .select("svg")
  .append("g")
  .attr("transform", "translate(30,20)");

Yaxis(gYaxis);
```

![https://ithelp.ithome.com.tw/upload/images/20190930/20119062JaD1vQwZWL.jpg](https://ithelp.ithome.com.tw/upload/images/20190930/20119062JaD1vQwZWL.jpg)

這樣就完成了座標軸繪製的部分，很簡單吧！

![https://ithelp.ithome.com.tw/upload/images/20190930/20119062TlhU0te1Un.jpg](https://ithelp.ithome.com.tw/upload/images/20190930/20119062TlhU0te1Un.jpg)

## 座標軸客製化
若繪製完還對於座標軸有些不滿意的話，D3.js 還有提供一些客製化的部分：

- `ticks()` ：將座標軸劃分為指定的段落（會自動取成較為代表意義的範圍）。
```
let Xaxis = d3.axisBottom(Xscale).ticks(4);
```
![https://ithelp.ithome.com.tw/upload/images/20190930/201190622kWbFtC8s0.jpg](https://ithelp.ithome.com.tw/upload/images/20190930/201190622kWbFtC8s0.jpg)

- `tickValues()` ：只顯示特定座標數值的刻線
```
let Xaxis = d3.axisBottom(Xscale).tickValues([13, 55, 79]);
```
![https://ithelp.ithome.com.tw/upload/images/20190930/20119062ZqjUOZHw6U.jpg](https://ithelp.ithome.com.tw/upload/images/20190930/20119062ZqjUOZHw6U.jpg)


- `tickSize()` ：更改座標軸刻線長度
```
let Xaxis = d3.axisBottom(Xscale).tickSize(0);
```
![https://ithelp.ithome.com.tw/upload/images/20190930/2011906228iavULhvG.jpg](https://ithelp.ithome.com.tw/upload/images/20190930/2011906228iavULhvG.jpg)

- `tickPadding()` ：座標軸與座標軸標籤之間的距離（例如調整一下剛剛上方調整刻線長度後，數值太接近座標線的問題。）
```
let Xaxis = d3
    .axisBottom(Xscale)
    .tickSize(0)
    .tickPadding(10);
```
![https://ithelp.ithome.com.tw/upload/images/20190930/201190624jAQNY7hPi.jpg](https://ithelp.ithome.com.tw/upload/images/20190930/201190624jAQNY7hPi.jpg)

- `tickFormat()` ：定義座標軸數值的格式，可以傳入一個回呼函式（callback function）來定義內容，也可以參考 [d3-format](https://github.com/d3/d3-format) 文件定義資料格式。
```
let Xaxis = d3.axisBottom(Xscale).tickFormat(function(d) {
  return d + "元";
});
```
![https://ithelp.ithome.com.tw/upload/images/20190930/20119062Vsix7e4oAh.jpg](https://ithelp.ithome.com.tw/upload/images/20190930/20119062Vsix7e4oAh.jpg)

## 附註 D3.js 座標軸 3 版與 4 版差異補充

在 D3.js 3 版中，原先座標軸會**需要以 CSS 以及 JavaScript 去定義座標軸的樣式**，否則座標軸只會呈現一條線：

![https://ithelp.ithome.com.tw/upload/images/20190930/20119062ma7eL0TCiC.png](https://ithelp.ithome.com.tw/upload/images/20190930/20119062ma7eL0TCiC.png)
>（圖源源自 D3.js [官方網站](https://github.com/d3/d3/blob/master/CHANGES.md) 座標軸圖）

而在 4 版本之後我們可以透過藉由直接呼叫座標軸方向的 API 來直接採用他的基本樣式與相關設定。

- `d3.axisTop` ：繪製一個數值朝 **上** 的 **平行** 座標線
- `d3.axisRight` ：繪製一個數值朝 **右** 的 **垂直** 座標線
- `d3.axisBottom` ：繪製一個數值朝 **下** 的 **平行** 座標線
- `d3.axisLeft` ：繪製一個數值朝 **左** 的 **垂直** 座標線

以上便是今天 D3.js 繪製座標軸的說明，會繪製座標軸後，基本上要繪製各種座標圖表類型也難不倒了我們了，而明天我們將要來繪製與座標軸有關的相關圖表。

> 今天外面颱風天時而暴雨時而寧靜，只要一下雨，阿橘就會很好奇的趴在窗邊看天空。
> ![https://ithelp.ithome.com.tw/upload/images/20190930/20119062K6oywinqWO.jpg](https://ithelp.ithome.com.tw/upload/images/20190930/20119062K6oywinqWO.jpg)