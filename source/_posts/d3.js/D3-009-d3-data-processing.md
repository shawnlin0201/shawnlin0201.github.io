---
title: D3.js 資料處理與篩選
date: 2019-09-28 22:54:59
tags:
- [前端]
- [JavaScript]
- [D3.js]
- [Vue.js]
categories: 
- [JavaScript, D3.js]
- [JavaScript, Vue.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="d3-logo" src='/images/d3js/d3.png' width='300px' height='300px' />
</div>

昨天我們已經成功的將 D3.js 放入 Vue.js 裡面，藉由 Vue.js 的 `生命週期鉤子` 與 `監聽` 來驅動函式重新繪製圖表，而今天要來說明的是 D3.js 中的資料處理與篩選：

> 註：這裡指的資料處理是指對以優化過的資料集做延伸的處理，倘諾資料集本身需要大量的欄位調整、優化則建議需在資料庫、後端回傳 API 前就先將資料集處理完畢。

<!--more-->

## filter()
在 D3.js 中的 `filter()` 與 JavaScript 中的 `filter()` 使用起來的功用差不多，主要用意是回傳**資料集中符合條件的資料**內容，主要使用時機與位置是在**綁定資料集之後**才來篩選，我們以昨天合併完的程式碼為例：

昨天範例在 Vue.js `methods` 中，我們有一段 `draw()` 函式用來繪製圖表，我們將 `filter()` 插入在新增元素之前：
```javascript
  draw(newData) {
    let dataset = newData || this.sampleData;
    let circle = d3.select("svg").selectAll("circle");
    let update = circle.data(dataset);
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
      .filter(function(d) {  // 將 filter 插入在這裡，藉由 d 參數傳入綁定的資料集
        return d > 20;       // 將資料集中每筆資料拿出來比對，大於 20 才返回該筆資料
      })
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
```

最後因為資料集中 `[10, 20, 30]`中只剩下一筆資料符合，因此可以看到畫面上只剩下一個半徑為 `30` 的圓形。

![https://ithelp.ithome.com.tw/upload/images/20190928/20119062nNh8BPrhSx.jpg](https://ithelp.ithome.com.tw/upload/images/20190928/20119062nNh8BPrhSx.jpg)

## sort()

`sort()` 的功用則也與 JavaScript 原生的用法類似，**目的在於排列資料集中的順序**，並且我們也同樣可以傳入排列的函式，來變更排序的方法：

- sort() ：若不填入比較函式，則預設內部會返回 `d3.ascending(a,b)` 的遞增排列。
- d3.ascending(a,b)： 將資料集的資料**遞增**排列。
- d3.descending(a,b)： 將資料集的資料**遞減**排列。

使用時機是放在**綁定資料的後方**，例如昨天程式碼中，我們在 `update` 變數中綁定資料的位置裡：
```javascript
  draw(newData) {
    let dataset = newData || this.sampleData;
    let circle = d3.select("svg").selectAll("circle");
    let update = circle.data(dataset.sort(function(a, b){ // 在綁定的資料集上做好排序
        return d3.descending(a,b) // 這裡選擇資料集要返回遞減的排列
    }));
    // 以上寫法等同於 let update = circle.data(dataset.sort(d3.descending));
    
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
```

如此一來， `dataset` 在綁定資料給 D3.js 的選擇集之前，就會將原本的資料 `[10, 20, 30]` 重新排列成 `[30, 20, 10]`，因此繪製圖型時最後便會顯示：

![https://ithelp.ithome.com.tw/upload/images/20190928/20119062mS7TsTuKQs.jpg](https://ithelp.ithome.com.tw/upload/images/20190928/20119062mS7TsTuKQs.jpg)

## D3.js 常用的封裝函式

而除了以上兩種資料處理方法，D3.js 也提供了許多已經封裝好的數學函式可以直接對資料集做運算，以下列出幾個較為常用的運算函式：

### 求數值
- `d3.min()`：找出傳入陣列中的**最小值**。
- `d3.max()`：找出傳入陣列中的**最大值**。
- `d3.extent()`：找出傳入陣列中的**最小值、最小值**，返回一個`[最小值, 最大值]`。
- `d3.sum()`：將傳入陣列中的每筆資料**加總**起來。
- `d3.mean()`：求出傳入陣列中的**平均數**，並且**忽略掉陣列中的 `undefined`、`NaN` 等等資料**。
- `d3.median()`：求出傳入陣列中的**中位數**。
- `d3.deviation()`：求出傳入陣列中的**標準差**。

```javascript
let dataset = [1, 3, 2, 5, 9];

d3.min(dataset) // 1
d3.max(dataset) // 9
d3.extent(dataset) // [1, 9]
d3.sum(dataset) // 20
d3.mean(dataset) // 4
d3.median(dataset) // 3
d3.deviation(dataset) // 3.1622776601683795
```

### 操作陣列

- `d3.shuffle()`：將傳入陣列資料隨機打亂。
- `d3.merge()`：傳入一個陣列，將陣列中所有資料合併為一個陣列。
- `d3.range()`：返回一個等差數列。

```javascript
let dataset = [1, 3, 2, 5, 9];
let dataset2 = [1, 2, 3]

d3.shuffle(dataset) // [3, 5, 1, 9, 2]
d3.merge([dataset, dataset2]) // [1, 3, 2, 5, 9, 1, 2, 3]
d3.range(0, 5, 1) // [1, 2, 3, 4] ，意即從 0 開始到 5 為止，回傳每筆資料數值差為 1 的陣列（不包含 5） 
```

以上為 D3.js 對資料集操作的常用 API 整理，而其餘沒列到內容可在 [官方網站](https://github.com/d3/d3/blob/master/API.md) 中查詢，因此假若下次要對資料集操作時，不彷可以看看官方網站是否已經有提供 API 來操作資料集，透過已經提供的 API 來操作資料就可以寫出味道聞起來**較為 D3.js 的程式碼**，而讓其他人一看就能瞭解資料邏輯是怎麼處理的囉！

> 今天的阿橘看 UI/UX 書看到睡著。
> ![https://ithelp.ithome.com.tw/upload/images/20190928/20119062Gq1p2HvJVx.jpg](https://ithelp.ithome.com.tw/upload/images/20190928/20119062Gq1p2HvJVx.jpg)