---
title: D3.js 繪製臺灣地圖
date: 2019-10-02 18:11:42
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

## D3.js 地圖
今天我們要來繪製 D3.js 人人必**繪**的地圖啦！

我們首先到臺灣 [政府資料開放平臺](https://data.gov.tw/dataset/7442) 的網站中下載以縣市為界的台灣地圖 SHP 檔案：
![https://ithelp.ithome.com.tw/upload/images/20191002/20119062X0e9kJFd5j.png](https://ithelp.ithome.com.tw/upload/images/20191002/20119062X0e9kJFd5j.png)

> Shapefile（SHP），是美國環境系統研究所公司（ESRI）開發的空間資料開放格式。目前 SHP 檔案格式為地理資訊軟體界的開放標準。（資料來源： [SHP Wiki](https://zh.wikipedia.org/wiki/Shapefile)）

接著透過 [mapshaper](https://mapshaper.org/) 網站將下載好的 SHP 檔案轉成 D3.js 能夠編寫的 GeoJson 格式（或 TopoJson 格式），直接將剛下載好的解壓縮檔案丟進去即可：

![https://ithelp.ithome.com.tw/upload/images/20191002/20119062OjzoV2L2q3.png](https://ithelp.ithome.com.tw/upload/images/20191002/20119062OjzoV2L2q3.png)

選擇 Import 匯入：

![https://ithelp.ithome.com.tw/upload/images/20191002/20119062XzLfH86A9a.jpg](https://ithelp.ithome.com.tw/upload/images/20191002/20119062XzLfH86A9a.jpg)

就可以畫面上顯示出預覽地圖：

![https://ithelp.ithome.com.tw/upload/images/20191002/20119062jsybOxZlUW.png](https://ithelp.ithome.com.tw/upload/images/20191002/20119062jsybOxZlUW.png)

而在輸出檔案前我們還要先把地圖優化一下，點選右上方的 Simplify 簡化地圖：
![https://ithelp.ithome.com.tw/upload/images/20191002/20119062B231g98mW7.jpg](https://ithelp.ithome.com.tw/upload/images/20191002/20119062B231g98mW7.jpg)

將地圖簡化到 30% 左右，此時可以稍微看到地圖邊緣稍微被簡化一些，但失真程度不大還能接受：
![https://ithelp.ithome.com.tw/upload/images/20191002/20119062kl3blfOO3d.jpg](https://ithelp.ithome.com.tw/upload/images/20191002/20119062kl3blfOO3d.jpg)

最後點選右上方 Export 輸出檔案，可以看到有各種檔案類型可供選擇，這裡可以選擇 GeoJSON 或 TopoJSON，而本章範例將會採用 TopoJSON 的格式來示範：
![https://ithelp.ithome.com.tw/upload/images/20191002/20119062UTQsSF9wUN.jpg](https://ithelp.ithome.com.tw/upload/images/20191002/20119062UTQsSF9wUN.jpg)

而為什麼範例要選擇 TopoJSON 的格式呢？我們可以來比較一下簡化後與兩種檔案格式的大小差異：

GeoJSON 100% 檔案大小：
![https://ithelp.ithome.com.tw/upload/images/20191002/20119062kdwThk8UlU.jpg](https://ithelp.ithome.com.tw/upload/images/20191002/20119062kdwThk8UlU.jpg)
GeoJSON  30% 檔案大小：
![https://ithelp.ithome.com.tw/upload/images/20191002/20119062TK14DueitY.jpg](https://ithelp.ithome.com.tw/upload/images/20191002/20119062TK14DueitY.jpg)
TopoJSON 30% 檔案大小：
![https://ithelp.ithome.com.tw/upload/images/20191002/20119062E4cQI1EJrK.jpg](https://ithelp.ithome.com.tw/upload/images/20191002/20119062E4cQI1EJrK.jpg)

我們可以看到簡化過的檔案容量降了將近快要 10MB ，而 TopoJSON 又還能比 GeoJSON 更少了約八成左右，最後檔案從 12.1MB 的大怪物被優化到剩下 622KB 的檔案大小，並且品質還在能接受的範圍。

而這兩種檔案究竟差在哪裡呢？

## GeoJSON

> RFC 7946:
> GeoJSON is a geospatial data interchange format based on JavaScript Object Notation (JSON). 

根據 [RFC 7946](https://tools.ietf.org/html/rfc7946) 的定義，GeoJSON 主要是基於 JSON 編寫的一種地理交換資料格式。也就是說 **GeoJSON 其實就是 JSON 格式的檔案，並非是一種新的格式**，只是將地理的一些訊息描述以 JSON 規則呈現並受嚴格的定義控管。

> Geometry Object
> A Geometry object represents points, curves, and surfaces in coordinate space.  Every Geometry object is a GeoJSON object no matter where it occurs in a GeoJSON text.

而在幾何物件（Geometry Object）的 [ RFC 文件章節](https://tools.ietf.org/html/rfc7946#section-3)  裡也提到：不論用來描述的點、線、面等等訊息在檔案的何處，**都需要以 GeoJSON 物件形式呈現**，並且底下也詳細列出了描述地圖的一些規範和代表含意說明（如位置、點、多點、線段、多邊形等等）。

## TopoJSON

由 D3.js 作者 Mike Bostock 所發明的 [TopoJSON](https://github.com/topojson/topojson-specification/blob/master/README.md) 則是以 GeoJSON 為基礎，以拓樸學的科學基礎編碼而成的格式。其最大的特色就是原先在 GeoJSON 中描述地理訊息的邊緣，會以共同邊（`arcs`）所表示，並且消除掉一些較為冗贅的地理資訊後而產生。

## 繪製地圖

D3.js 根據了 GeoJSON 與 TopoJSON 格式來處理地圖訊息，透過像是 SVG 中的路徑 `path` ，將處理好的的資訊轉換為視覺呈現，而要以 TopoJSON 檔案來繪製地圖的話，可以透過 Mike Bostock 在 [TopoJSON 專案](https://github.com/topojson/topojson) 中的 API 來解碼使用，目前專案上也提供了 CDN 連結供快速開發使用：

```javascript
<script src="https://unpkg.com/topojson@3"></script>
```

接著如同前面幾章，我們依樣畫葫蘆開一個 Vue.js 的 HTML 版面：

```html
<div id="app">
    <svg width='500' height='500' style='border:1px solid #00000060;'>
        <g class="counties"></g>
        <path class="county-borders"></path>
    </svg>
</div>
```

Vue 實體中則是開了一個 data `taiwanCountry` 給予預設值，待實體載入完畢時將我們前面處理好的 TopoJSON 檔 `COUNTY_MOI_1080726.json` 透過 fetch 的方式載入我們的地圖資料以供取用，並且呼叫 `draw()` 函式來繪製地圖：

```javascript
let vm = new Vue({
    el: "#app",
    data: {
        taiwanCountry: []
    },
    mounted() {
        fetch('COUNTY_MOI_1080726.json')
            .then(res => res.json())
            .then(result => {
                this.taiwanCountry = result
                this.draw(this.taiwanCountry)
            })
    },
    methods: {
        draw(mapData) {

        }
    }
});
```

在 `draw` 函式中，使用 `d3.geoMercator()` 來定義投影模式，並以 `center` 定義經緯度位置，`scale` 定義縮放比例尺：

```javascript
let projection = d3.geoMercator()
    .center([123, 24])
    .scale(5500);
```

接著加入 `d3.geoPath()` （用來產生供 `path` 路徑標籤所使用的 `d`），並且傳入剛才定義好的投影模式 `projection` ：

```javascript
let path = d3.geoPath(projection);
```

最後透過 d3.js 選擇器選擇我們剛以開好的 HTML 版面，在 `g.counties` 產生地圖面積、`path.county-borders` 產生地圖輪廓：
```javascript
d3.select('g.counties')
    .selectAll("path")
    .data(topojson.feature(mapData, mapData.objects["COUNTY_MOI_1080726"]).features)
    .enter().append("path")
    .attr("d", path);

d3.select('path.county-borders')
    .attr("d", path(topojson.mesh(mapData, mapData.objects["COUNTY_MOI_1080726"], function (a, b) { return a !== b; })));
```

而裡面使用到的 `topojson` API 方法說明如下：
- `topojson.feature` ：將 TopoJSON 轉換成 GeoJSON 的格式。
- `topojson.mesh` ：將 TopoJSON 中的 geometry 物件轉換成 GeoJSON 中的線段。
其餘未使用到的 API 可參考 GitHub 上的 [topojson 專案](https://github.com/topojson/topojson)

加上一點點 CSS 來點綴：
```css
<style>
    .counties {
        fill:#33474e;
    }
    .counties :hover {
        fill: #7f9ca7;
        transition: 0.5s;
    }
    .county-borders {
        fill: none;
        stroke: #fff;
        stroke-width: 0.5px;
    }
</style>
```

最後畫面上顯示：

![https://ithelp.ithome.com.tw/upload/images/20191002/20119062PzAXSvqUed.jpg](https://ithelp.ithome.com.tw/upload/images/20191002/20119062PzAXSvqUed.jpg)

[範例程式碼](https://codepen.io/ShawnLin0201/pen/zYOgdXM)

> 躺爆！
> ![https://ithelp.ithome.com.tw/upload/images/20191002/20119062tKSJRlr5q4.jpg](https://ithelp.ithome.com.tw/upload/images/20191002/20119062tKSJRlr5q4.jpg)

