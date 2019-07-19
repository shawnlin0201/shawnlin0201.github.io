---
title: 前端系列（一）：圖文優化的前端藝術
date: 2019-07-18 11:58:50
tags:
- [UI/UX]
- [前端]
- [CSS]
- [JavaScript]
- [優化]
- [optimizing]
categories: 
- [前端, CSS]
- [前端, JavaScript]
---

![](/images/frontend-note-001.jpeg)

# 前言
前端工程師在工作上與視覺牢不可分，時常與文字、圖片和容器為舞，為了使圖片與文字能夠更好的支援網站、app產品，除了要瞭解基礎的視覺相關知識，還可以利用CSS、JavaScript對於圖片與文字進行優化，加強使用者在使用網站上的體驗，本篇文章介紹了幾項對於圖片以及文字優化的部分：

# 圖片優化 (Image Optimization)

前端工程師常見對於圖片優化相關方案：
- [圖片的解析設定](#%E5%9C%96%E7%89%87%E8%A7%A3%E6%9E%90%E8%A8%AD%E5%AE%9A-img-srcset)
- [圖片的格式類型](#%E5%9C%96%E7%89%87%E6%A0%BC%E5%BC%8F%E9%A1%9E%E5%9E%8B-image-type)
- [圖片的檔案壓縮](#%E5%9C%96%E7%89%87%E6%AA%94%E6%A1%88%E5%A3%93%E7%B8%AE-image-size-cost-reduction)
- [圖片的呼叫次數](#%E5%9C%96%E7%89%87%E5%91%BC%E5%8F%AB%E6%AC%A1%E6%95%B8-http-request)
- [圖片的延遲載入](#%E5%9C%96%E7%89%87%E5%BB%B6%E9%81%B2%E8%BC%89%E5%85%A5-lazy-loading)
- [圖片的替代方案](#%E5%9C%96%E7%89%87%E6%9B%BF%E4%BB%A3%E6%96%B9%E6%A1%88)


## 圖片解析設定 (img srcset)
首先在優化視覺顯示之前，要先知道視覺顯示的呈現是怎麼來的，而談到圖片解析前有幾個視覺單位需要先科普一下：

第一組是密度常見的單位，主要用於是顯示參考上會需要考量到的：
- **DPI（Dots per inch）**：為一英吋中點的數量，通常是用於印刷單位使用。
- **PPI（Pixels Per Inch）**：為一英吋中**物理像素**的數量。我們常聽到的解析度（Resolution）便會使用此單位。


![](/images/Frontend-note-dpi.jpg)

光看文字可能太過於抽象，接著以一個範例解說dpi的例子。假設上方圖中為一平方英吋的方框，而左邊橫排格數為1、右邊橫排格數為2，因此左邊方框代表的dpi為1，右邊方框代表的dpi就是2，紅色中的方塊範圍即為1px（Pixel）；而1pt（Point）的大小即為1/72英吋，也就是一個一平方英吋的方格切成72{% raw %}*{% endraw %}72的方格時，每個方格代表即為1pt，此時正好同等1px。因此在**72dpi情況下其實1pt就會同等於1px**。

PPI的算法則是：**開根號(渲染像素長<sup>2</sup>+渲染像素寬<sup>2</sup>)/物理尺寸(英吋)**，例如iPhone 6的**渲染尺寸**為320{% raw %}*{% endraw %}480，**實際尺寸**為3.5吋，以JavaScript計算即為`Math.sqrt(320*320+480*480)/3.5=164.83`約164ppi`。

而從技術上來說DPI的dot（點）只會出現在印刷領域中、PPI中的pixel（像素）則是出現在顯示裝置中，但兩個說明的其實是類似的概念。

第二組是螢幕設備常見單位，主要用於**網頁與app端顯示**時需要考量到的：

- **DP（Device Pixels）**：
為設備螢幕的**物理像素**，例如iPhone5的物理像素為640px{% raw %}*{% endraw %}1136px，但是這不是一個**真實長度**單位。

- **CSS Pixels**：
為CSS樣式中使用的單位大小如px等等的**邏輯像素**，呈現大小將會**依據設備的DPR不同而不同**。

- **DPR（Device Pixel Ratio）**：
為CSS像素在設備上對應的物理像素**比例**，即CSS將會依DPR縮小成多少的單位（這裡的縮小指的是**看**起來）。

根據上面的定義意思即為當DPR為1時，我用CSS撰寫一個寬120p{% raw %}*{% endraw %}長120px的正方形時，該元素在畫面上則會呈現寬120px{% raw %}*{% endraw %}長120px的正方形（如下圖左邊的正方形）；DPR為2時，表示一個像素點會由四個CSS像素組成，因此最後會呈現一樣會是120px{% raw %}*{% endraw %}120px的正方形，但是由於螢幕的物理像素密度更高了，所以讓圖形看起來變小了（如下圖中間的正方形）；而DPR為3時則會如下圖右邊的正方形。

![](/images/Frontend-note-dpr.jpg)

正常**電腦螢幕裝置預設值為1**，DPR測量可以藉由JavaScript中的`window.devicePixelRatio`來得到，而Retina電腦DPR則有@1x、@2x到@3x的倍率，若想要將DPR@3x中**看起來**被縮小的圖放大到跟一般電腦@1x的大小一樣，那麼在Retina螢幕上觀看圖片將會非常模糊。（**註**：Apple公司所發明的Retina螢幕顯示器則是指在正常距離下人類的眼睛無法分辨單獨一個物理像素，但並不是高PPI就是Retina螢幕。）

若今天專案有需求要將網頁中的圖片分別呈現給不同DPR螢幕時，有以下幾種作法：

- 利用img元素的srcset
- 利用picture元素裡source元素相關設定
- Media Query
- 直接暴力輸出@2x、@3x的圖檔（**不建議**）

### img srcset
在img元素標籤中有個`srcset`可以設定，準備額外倍率的圖片檔後，加入此屬性並且在檔名後面寫上DPR輸出倍率，而預設是沒有符合倍率的情況會使用原先src預設的圖檔：
```
<img src='images/sample.jpeg' srcset='images/sample_2x.jpeg 2x,images/sample_3x.jpeg 3x'/>
```

除此之外也可以依據Viewport來選擇輸出尺寸，但依據的不是倍率而是Viewport的寬度：

```
<img src='images/sample.jpeg' srcset='images/sample.jpeg 320w,images/sample.jpeg 1200w'/>
```

### picture元素
將img與source包裹在picture元素當中，使用方法與img srcset很像，將media query選項包在source元素標籤內，而預設是沒有符合篩選選項則會使用img標籤內的圖檔，而此作法同樣可以在裡面塞入不同的DPR倍率：

```
<picture>
    <source media='(min-width: 1200px)' srcset='image/sample_large.jpeg 2x, image/sample_large.jpeg 3x' >
    <source media='(min-width: 640px)' srcset='image/sample_medium.jpeg 2x, image/sample_medium.jpeg 3x,' >
    <img src='image/sample.jpeg'>
</picture>
```


### Media Query (**稍微不建議**)
使用CSS的media query去寫出圖片的路徑與大小等等：
```
@media
    (-webkit-min-device-pixel-ratio: 1),
    (min-resolution: 96dpi){
    
    //CSS內容

}
```

**要注意的是**此作法與上面兩種做法不同是，CSS的作法並不會透過瀏覽器去選擇要產出的檔案，而是全部下載下來再透過CSS去編輯，因此也不建議去使用。

### 暴力輸出（**不建議**）
直接將@3x的圖檔放上去讓比例自動縮放。

好處：一張圖搞定。
壞處：容量怪獸、使用者沒吃到飽會損耗額度、載入時間拉長……一坨拉庫的原因，如果要**優化**，那這個選擇將會不是很妥當。

折衷辦法：就放個@2x的圖吧！


## 圖片格式類型 (image type)
依據圖片上的不同，採用不同的圖片格式：
- gif：若要放置動圖時，可採用此格式。**但建議使用CSS3的transition與animation來製作動圖會更好**
- SVG：當圖片為簡單純色塊組成時，可使用此向量格式檔，它會讓圖片放大時不會失真。
- jpeg：當圖片為較複雜時，背景**不須透明**且較**不要求照片細節**時。
- png：當圖片較為複雜時，背景**需透明**或是**要求照片細節**時。

## 圖片檔案壓縮 (image size cost reduction)
依據圖片的類型使用不同方式先壓縮過後在上傳至主機：
- svg：上傳至主機前使用Gzip壓縮，盡量避免圖形複雜度以及特效等等。
- jpeg：最佳化jpeg[jpegtran](http://jpegclub.org/jpegtran/)
- png：無失真壓縮的[optipng](http://optipng.sourceforge.net/)、失真壓縮的[pngquant](https://pngquant.org/)

想要快速線上壓縮也可以考慮：[tinypng](https://tinypng.com/)。



## 減少圖片呼叫次數 (http request)

HTTP Caching
CSS Sprite
SVG
html5 canvas

## 圖片延遲載入 (lazy loading)



## 圖片替代方案

[Fontawesome](https://fontawesome.com/)
[Iconfont](https://www.iconfont.cn/)

# 字體優化 (Web Font Optimization)

前端工程師常見對於字體優化相關方案：
- 網頁字體
- 字體的資源來源



# 參考資料
- [完全理解px,dpr,dpi,dip](http://www.ayqy.net/blog/%E5%AE%8C%E5%85%A8%E7%90%86%E8%A7%A3px-dpr-dpi-dip/)
- [px、pt、dp、sp 大混戰](https://blog.akanelee.me/2018/07/31/dpi-px-pt-dp-sp/)
- [PPI wiki](https://zh.wikipedia.org/wiki/%E6%AF%8F%E8%8B%B1%E5%AF%B8%E5%83%8F%E7%B4%A0)
- [DPI wiki](https://en.wikipedia.org/wiki/Dots_per_inch)
- [http-caching](https://cythilya.github.io/2018/07/27/http-caching/)
- [MDN-DPR](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#-moz-device-pixel-ratio)
- [響應式圖片（Responsive Images）](https://cythilya.github.io/2018/08/24/responsive-images/)
- [guide-to-iphone-resolutions](https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions)
- [images Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)
- [webfont Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization)
- [Retina wiki](https://en.wikipedia.org/wiki/Retina_display)