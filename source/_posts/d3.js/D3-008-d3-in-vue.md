---
title: D3.js in Vue.js
date: 2019-09-27 03:35:48
tags:
- [前端]
- [JavaScript]
- [D3.js]
- [Vue.js]
categories: 
- [JavaScript, D3.js]
- [前端, JavaScript, Vue.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/d3js/d3.png' width='300px' height='300px' />
</div>

## D3.js in Vue.js ~~阿彌陀丸 in 春雨~~
![https://ithelp.ithome.com.tw/upload/images/20190927/20119062asFjpda8Cf.jpg](https://ithelp.ithome.com.tw/upload/images/20190927/20119062asFjpda8Cf.jpg)

既然最近介紹的主題是 Vue.js 跟 D3.js，那就沒有道理不把 D3.js 融合進 Vue.js 啦！我們接下來把昨天的繪製函式加入到我們 Vue.js 中，並著利用 Vue.js 的一些特色來完成我們的融合：

<!--more-->

1. 首先最基本的是 HTML 部分需要一個元素作為 **Vue.js 初始化**的地方：

```html
<div id="app">
      
</div>
```

2. 由於 Vue.js 是依靠**資料來驅動視覺層**的，因此我們把 D3.js 資料的部分挪到 Vue.js 的 data 當中以供綁定：

```javascript
let vm = new Vue({
    el: "#app",
    data: {
        sampleData: [10, 20, 30]
    }
})
```

3. 再來則是針對 Vue.js 生命週期中的 `created` 階段，透過 Vue.js 初始化時將 D3.js 所需要的 SVG 畫布設置好：

```
let vm = new Vue({
    el: "#app",
    data: {
        sampleData: [10, 20, 30]
    },
    created() { // 複習一下，這個 hook 將會在 Vue.js 初始化的階段會啟動它
        d3.select("#app")
            .append("svg")
            .attr("width", 500)
            .attr("height", 500);
    },
})
```

4. 接著在 Vue.js 中的 `methods` 放入重新繪製的函式以供 Vue 實體使用，並把原先 D3.js 中 `data()` 所綁定的資料更改為 `dataset` ，加上一點邏輯判斷，使 `draw` 函式能夠接受外來的參數：

```
let vm = new Vue({
    el: "#app",
    data: {
        sampleData: [10, 20, 30]
    },
    created() {
        d3.select("#app")
            .append("svg")
            .attr("width", 500)
            .attr("height", 500);
    },
    methods: {
        draw(newData) { // 加入剛剛辛苦改好的重繪函式
            let dataset = newData || this.sampleData; // 若沒有傳入資料，則會使用 Vue.js 實體中的 sampleData
            let circle = d3.select("svg").selectAll("circle");

            let update = circle.data(dataset); // 更改一下綁定資料
            let enter = update.enter();
            let exit = update.exit();

            update
                .attr("cx", function(d, i) {
                return (i + 1) * 100;
                })
                .attr("cy", 100)
                .attr("r", function(d) {
                return d;
                })
                .style("fill", "red");

            enter
                .append("circle")
                .attr("cx", function(d, i) {
                return (i + 1) * 100;
                })
                .attr("cy", 100)
                .attr("r", function(d) {
                return d;
                })
                .style("fill", "red");

            exit.remove();
        }
    }
});
```

5. 在 Vue.js 生命週期中的 `mounted` 放入從 Vue.js `methods` 撈來的繪製函式，使得 Vue.js 載入資料完畢後會繪製一次最初的圖形：

```
let vm = new Vue({
    el: "#app",
    data: {
        sampleData: [10, 20, 30]
    },
    created() {
        // 略
    },
    mounted() { 
        this.draw(); // 等到 Vue.js 一載入完成就執行這個繪圖函式
    },
    methods: {
        // 略
    }
});
```

6. 利用 Vue.js 的 `watch` 來監聽 `sampleData` 資料是否有改動，若有改動則啟用該函式：
```

let vm = new Vue({
    el: "#app",
    data: {
        sampleData: [10, 20, 30] // watch 監控並執行對應的函式
    },
    created() {
        // 略
    },
    mounted() { 
        // 略
    },
    methods: {
        // 略
    },
    watch: {
        sampleData: function() {
            this.draw(this.sampleData);
        }
    }
});
```

7. 在 `methods` 中再次加入一個函式 `changeData` 用來模擬新資料非同步的載入：
```
    methods: {
        changeData() { 
            this.sampleData = [5, 30]; // 模擬新資料的載入
        },
        draw(newData) {
            // ...
        }
    }
```

8. 最後我們在 HTML 中加入一個按鈕來驅動 Vue.js 內的 `changeData` 函式：

```
<div id="app">
      <button @click="changeData">New Data</button>
</div>
```

於是我們就得到了一個藉由資料驅動完成 D3.js 繪製的 Vue.js 程式！[程式碼範例請點這裡](https://codepen.io/ShawnLin0201/pen/rNBbyqX)

而我們接下來的目標就是完善**資料處理**的部分與**繪製圖形**的部分，明天將會介紹有什麼方法可以調整資料與篩選。

> 阿橘：終於可以來慵懶地曬著陽光了
> ![https://ithelp.ithome.com.tw/upload/images/20190926/20119062wcMRwdS8v4.jpg](https://ithelp.ithome.com.tw/upload/images/20190926/20119062wcMRwdS8v4.jpg)
