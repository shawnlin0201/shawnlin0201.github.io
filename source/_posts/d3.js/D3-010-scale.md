---
title: D3.js 繪製比例尺 scale
date: 2019-09-29 23:46:23
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

> 在圖表當中不可或缺的除了基本的**資料**與**圖表**之外，另一項就是**比例尺**的部分。在 D3.js 中，開發者可以透過比例尺**將一段範圍的某個數值對應到另一段範圍的數值**，這麼做的好處在於我們可以將資料轉換成一個具有比例意義的圖表，並且依比例縮放成我們所要的大小而不是毫無比例根據的作圖。

<!--more-->

## 線性比例尺 d3.scaleLinear
線性比例尺指的是一段**連續的**數值可以**依照一個線性函數來換算**出數值：

> 例如區間 `[0,20]` 依照 `y=2x` 可以換算出 `[0, 40]`，因此假如今天有一個值為 `10` ，我們便可以帶入函數 `y=2*10` 來求出 Y 值為 `20`。

而使用方法很簡單，我們透過 D3.js 4版以後的語法 `d3.scaleLinear` 來創造一段比例尺，並由 `domain()` 定義範圍（如設為資料最大最小範圍），再使用 `range()` 定義一個取值的範圍（如圖表中的軸長），如此一來就可以將資料的大小比例對應到圖表中的 X 軸、Y 軸內：

```
let dataset = [10, 40, 30, 20, 50]
let linear = d3
    .scaleLinear()                    // 使用 d3 線性比例尺
    .domain([0, d3.max(dataset)])     // 設定比例範圍 0 到 資料集的最大值
    .range([0, 100])                  // 設定輸出範圍 0 到 100 ，例如圖表想要的高度
  
console.log(linear(10))               // 得到 20，可以將其設定為例如矩形的高度
console.log(linear(50))               // 得到 100，可以將其設定為例如矩形的高度
```

另一個以 Vue.js in D3.js 的例子：

```html
<div id="#app">
</div>
```

```javascript
let vm = new Vue({
    el: "#app",
    data: {
      sampleData: [10, 40, 30, 20, 50]              // 設定基礎的資料集
    },
    created() {
      d3.select("#app")                             // SVG 畫布基礎設定
        .append("svg")
        .attr("width", 200)
        .attr("height", 200)
        .style("border", "1px solid #00000060");
    },
    mounted() {
      this.draw();
    },
    methods: {
      draw(newData) {
        let dataset = newData || this.sampleData;    // 設定綁定資料等相關設定
        let rect = d3.select("svg").selectAll("rect");
        let update = rect.data(dataset);
        let enter = update.enter();
        let exit = update.exit();

        let linear = d3                              // 這裡建立一個線性比例尺
          .scaleLinear()
          .domain([0, d3.max(dataset)])              // 設定比例範圍 0 與 50 (資料集最大值)
          .range([0, 200]);                          // 設定取值範圍 0 至 200（SVG 畫布高）

        enter
          .append("rect")
          .attr("width", 30)
          .attr("height", function(d) {              // 繪製矩形高時，採用資料輸入進去比例尺
            return linear(d);                        // 例如第一筆資料為 10 ，比例尺取值後會得到 20
          })
          .attr("x", function(d, i) {
            return i * 40 + 5;
          })
          .attr("y", function(d) {                   // 矩形的屬性 y 是從上往下算
            return 200 - linear(d);                  // 因此要倒過來繪製需用最大高度去減資料高度
          })                                         // 所以在這邊矩形的高度也需換算成比例尺取值的高
          .attr("fill", "blue");

        exit.remove();
      }
    }
  });
```

顯示結果：
      
![https://ithelp.ithome.com.tw/upload/images/20190929/20119062mroGQIbD8X.jpg](https://ithelp.ithome.com.tw/upload/images/20190929/20119062mroGQIbD8X.jpg)

圖中可以看到 SVG 畫布 長高各為 `200px` 的情況，我們設定資料範圍為 `0` 至 `50` （資料集最大值），並把輸出範圍設定為 `0` 至 `200`，因此最後一筆資料 `50` 經由比例尺轉換後繪製出高度為 `200`的矩形，可以看到確實撐滿了整個 SVG 的高。

> 由此範例可以看出比例尺在 D3.js 中潛力，像是 RWD 網頁透過 JavaScript 監聽視窗大小變動時，便可以藉由將視窗比例等等資訊傳遞進 D3.js 來調整比例尺，達到圖表縮放的功能。

而比例尺的功能除了簡單的依比例輸出外還有其他的 API 可供調整：

- `rangeRound()` ：替換 `range()` 使用，使最後輸出的數值會四捨五入到個位數。

```javascript
let dataset = [10, 40, 30, 20, 50]
let linear = d3
    .scaleLinear()                    
    .domain([0, d3.max(dataset)])     
    .rangeRound([0, 100])             
    
console.log(linear(9.84521))          // 得到 20，若以 range 取則得到 19.69042。
```

- `clamp()` ：啟用後會將輸入超過範圍的數值，輸出時縮放為範圍的最大、最小值。

```javascript
let dataset = [10, 40, 30, 20, 50]
let linear = d3
    .scaleLinear()                    
    .domain([0, d3.max(dataset)])     
    .range([0, 100])             
linear.clamp(true)                     // true，啟用該設定；反之 false （預設）為仍會縮放該數值。
console.log(linear(1000))              // 100
console.log(linear(-1000))             // 0
```

- `nice()` ：將定義範圍中的無窮小數捨去至合理的範圍，**用以資料集當 `domain` 範圍時若遇到無窮小數需要整理時**可使用此函數。
```javascript
let linear = d3
    .scaleLinear()                    
    .domain([0.62271947 , 0.13879428])     
    .range([0, 100])             
linear.nice()
console.log(linear.domain())           // [0.65, 0.1]
```

- `ticks()` ：將比例尺的定義範圍切成數段，並且返回一個較有意義段落的陣列，用來**製作座標軸數值**非常方便。
- `tickFormat()` ：如同 `ticks` 用法，但是可以在第二個傳送參數中定義返回的數值格式。
```javascript
let dataset = [10, 40, 30, 20, 50]
let linear = d3
    .scaleLinear()                    
    .domain([0, d3.max(dataset)])     
    .range([0, 100])             
let ticks = linear.ticks(2)           
console.log(ticks)                    // [0, 20, 40]


let tickFormat = linear.tickFormat(0, '+')
for(i=0; i<ticks.length; i++){
	ticks[i] = tickFormat(ticks[i])
}
console.log(ticks)                    // ["+0", "+20", "+40"]
```

以上是**線性比例尺**的用法，而除此之外還有像是 **序列比例尺**、**量化比例尺**、**分位數比例尺**等等不同的比例尺以供不同時機使用，這裡舉出一個比較常用到的比例尺來作為例子，往後圖表中若有用到其他比例尺時再仔細好好來介紹它們的細項，另外以下是 D3.js 比例尺在三版與四版的 API 差異表！

## 附註 D3.js 比例尺 3 版與 4 版差異補充

- d3.scale.linear ↦ d3.scaleLinear
- d3.scale.sqrt ↦ d3.scaleSqrt
- d3.scale.pow ↦ d3.scalePow
- d3.scale.log ↦ d3.scaleLog
- d3.scale.quantize ↦ d3.scaleQuantize
- d3.scale.threshold ↦ d3.scaleThreshold
- d3.scale.quantile ↦ d3.scaleQuantile
- d3.scale.identity ↦ d3.scaleIdentity
- d3.scale.ordinal ↦ d3.scaleOrdinal
- d3.time.scale ↦ d3.scaleTime
- d3.time.scale.utc ↦ d3.scaleUtc

> 明天颱風天只好跟貓咪一起在家繼續研究 D3.js 啦！附上黑黑美照一張：
> ![https://ithelp.ithome.com.tw/upload/images/20190929/2011906256tqok0zxy.jpg](https://ithelp.ithome.com.tw/upload/images/20190929/2011906256tqok0zxy.jpg)

