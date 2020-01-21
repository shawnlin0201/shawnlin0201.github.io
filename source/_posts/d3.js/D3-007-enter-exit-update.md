---
title: D3.js 資料圖形繪製與重繪 enter(), exit() & update()
date: 2019-09-26 23:26:27
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

## enter()

昨天我們已知 `enter` 資料類型的定義是**當綁定資料時，選取元素不足以綁定時，該筆資料類型會被分類為 enter 類型**。

因此，我們可以透過綁定一個頁面上沒有的元素類別，利用 `enter()`找出不夠資料塞入的元素筆數，再透過 `append()` 函式新增元素：

<!--more-->

```javascript
let sampleData = ['a','b','c']
d3.select('body')
    .selectAll('div')
    .data(sampleData)
    .enter()
    .append('p')
    .text(function(d){
    	return d
    })
```

最後畫面上就會顯示三筆剛透過 `append()` 產生的資料：
![https://ithelp.ithome.com.tw/upload/images/20190926/20119062pCiVqVa5G3.jpg](https://ithelp.ithome.com.tw/upload/images/20190926/20119062pCiVqVa5G3.jpg)
這三筆資料在 HTML DOM 中的結構：
![https://ithelp.ithome.com.tw/upload/images/20190926/20119062fUsBdpY8yd.jpg](https://ithelp.ithome.com.tw/upload/images/20190926/20119062fUsBdpY8yd.jpg)

現在我們再把他與 SVG 標籤圖形結合，透過 D3.js 新增一個 SVG 畫布：
``` javascript
let sampleData = [10,20,30]
let svg = d3.select('body')
    .append('svg')
    .attr('width',500)
    .attr('height',500)
```

再將資料綁定在 SVG 中的圖形標籤上並產生圖形，這裡的範例是用上次講解到的圓形標籤 `<circle>`，透過 `attr()` 來依序將屬性給予 `<circle>` 以供網頁瀏覽器渲染：

```
svg.selectAll('circle')          // 這裡選了 cirlce 標籤 （對於當前網頁來說是空元素）
    .data(sampleData)             // 綁定 sampleData 資料給予接下來的元素
    .enter()                      // 透過 enter() 找到仍需要三個元素來存放資料
    .append('circle')             // 將 enter() 返回的元素數量新增為 circle 標籤
    .attr('cx',function(d,i){     // 透過 attr() 來將前面教學提到的屬性給予 circle 標籤
    return (i+1)*100              // 其中的 d 為 data， i 為 資料的陣列索引值
    })
    .attr('cy',100)
    .attr('r',function(d){        // 這裡的圓形半徑採用綁定的資料
    return d
    })
    .style('fill','red')          // 為圓形增添一下樣式
```

最後網頁瀏覽器渲染出的樣子：

![https://ithelp.ithome.com.tw/upload/images/20190926/20119062Gqr5s6gE2s.jpg](https://ithelp.ithome.com.tw/upload/images/20190926/20119062Gqr5s6gE2s.jpg)

在 HTML DOM 中的結構：


![https://ithelp.ithome.com.tw/upload/images/20190926/2011906276oUN1w5zx.jpg](https://ithelp.ithome.com.tw/upload/images/20190926/2011906276oUN1w5zx.jpg)

## exit()

`exit()` 用法與 `enter()` 類似，差異在於我們需要透過 `remove()` 來刪除 `exit()` 所篩選出來的多餘元素。

同樣以上方的例子做參考：

```javascript
let sampleData = [10,20,30] 
let svg = d3.select('body')
    .append('svg')
    .attr('width',500)
    .attr('height',500)
    
svg.selectAll('circle')
	.data(sampleData)
  .enter()
  .append('circle')
  .attr('cx',function(d,i){
  	return (i+1)*100
  })
  .attr('cy',100)
  .attr('r',function(d){
  	return d
  })
  .style('fill','red')
 // 上半部與上方相同，已預期會產生出三個依據 data 而產生不同半徑大小的圓
 
let sampleData2 = [10,20] // 這裡假設有另一筆新的資料產生
  
svg.selectAll('circle')   // 選取已經含有 sampleData 資料的圓形標籤
    .data(sampleData2)    // 將新的資料作為綁定
    .exit()               // 篩選出符合 exit 類別的資料元素
    .remove()             // 刪除符合上方條件的元素
```

最後網頁瀏覽器渲染出的樣子，可以看到最右邊的圓形已經消失了：

![https://ithelp.ithome.com.tw/upload/images/20190926/20119062dxW3iCmZZQ.jpg](https://ithelp.ithome.com.tw/upload/images/20190926/20119062dxW3iCmZZQ.jpg)

同樣再來觀察 HTML DOM 的狀態，可以確認該圓形標籤是直接**從 HTML DOM 上移除的**，並**非使用 CSS 樣式來消失該元素**：

![https://ithelp.ithome.com.tw/upload/images/20190926/20119062QOZHdTTW25.jpg](https://ithelp.ithome.com.tw/upload/images/20190926/20119062QOZHdTTW25.jpg)

## update

在 D3.js 中，`update` 類型的資料會直接覆蓋到對應的元素上，並且將舊的數據資料 `__data__` 直接替換成新的數據資料，所以 `updata` 類型的資料並不需要特地去操作，若如果需要利用新的數據資料來更動原本的圖表的作法只能依靠**重新繪製**一次新的圖表。

而目前 D3.js 並沒有方法驅動重新繪製圖表這件事情，因此比較好的做法是自己做一個可以重繪的方法來處理，以供資料變動時可以直接重複利用 D3.js 繪製圖形的程式碼：

```javascript
let sampleData = [10, 20, 30];
let svg = d3
    .select("body")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);
    
function draw() {
    let circle = d3.select("svg").selectAll("circle");

    let update = circle.data(sampleData);
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

draw();

sampleData = [5, 30];
draw();
```

原本瀏覽器渲染後的圖：

![https://ithelp.ithome.com.tw/upload/images/20190926/20119062KdZ8KBy1h3.jpg](https://ithelp.ithome.com.tw/upload/images/20190926/20119062KdZ8KBy1h3.jpg)

啟動 `draw` 函式後渲染的圖：

![https://ithelp.ithome.com.tw/upload/images/20190926/20119062qcv9LbhK24.jpg](https://ithelp.ithome.com.tw/upload/images/20190926/20119062qcv9LbhK24.jpg)

如此一來若是 `sampleData` 資料有變更時，只要重新啟用 `draw` 函式就能將舊有資料去除後重新繪製新一筆的圖。


> 然而……事情並沒有阿橘想像中這麼快就結束……
> 阿橘：蝦……蝦咪！？
> ![https://ithelp.ithome.com.tw/upload/images/20190927/20119062yzvRdt1WEE.jpg](https://ithelp.ithome.com.tw/upload/images/20190927/20119062yzvRdt1WEE.jpg)
