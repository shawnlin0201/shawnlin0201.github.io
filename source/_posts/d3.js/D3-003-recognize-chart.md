---
title: D3.js 重新認識圖表
date: 2019-09-21 17:55:47
tags:
- [前端]
- [JavaScript]
- [D3.js]
categories: 
- [JavaScript, D3.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/d3js/d3.png' width='300px' height='300px' />
</div>

## 對於圖表的認知

開發者學習 D3.js 的理由可能有很多種，有人可能是為了自己**興趣**、也有人可能是為了**專案需求**，不論出發點在哪，最終 D3.js 目標都是在**產出圖表給使用者看**，因此圖表實際的意涵**是否能達到我們要訴說的**便是我們所要關切的地方。若開發者對於圖表的認知不足，即使製作出來的圖表有對應資料，並且使用了較為困難的技術來呈現，**對於使用者來說**也只是個無效的資訊。

## 圖表種類

對於圖表的認知與呈現上要有所精進，最簡單的方式就是先認識**圖表類型**有哪些，並且知道各圖表所想要**強調的資訊**在哪，進而才在圖表上做一些補強，而以下將介紹幾種最常見的圖表：

### 長條圖 Bar Chart

![https://ithelp.ithome.com.tw/upload/images/20190921/20119062DXISTs8RoJ.jpg](https://ithelp.ithome.com.tw/upload/images/20190921/20119062DXISTs8RoJ.jpg)
（英文單字使用字母頻率表 圖源來至 D3.js official website）

長條圖一般使用在**二維的資料處理**，其中一軸用來表示**資料的類別**，而長條的長度則表示**該項資訊的大小**，最常使用在於**資料間的相互比較**。

若類別軸資訊是屬於連續的資料（如年份、月份），則可以看出連續的資料趨勢，但可以使用折線圖可能較好表達。

若要表達三維的資訊則可以透過長條的寬度來顯示，但同樣會使得資訊較為混亂，也是要慎選處理。

> 變化、相似圖型：堆積長條圖、雙向長條圖、百分比長條圖……等等

### 圓餅圖 Pie Chart

![https://ithelp.ithome.com.tw/upload/images/20190921/20119062OlFBnOYBz6.jpg](https://ithelp.ithome.com.tw/upload/images/20190921/20119062OlFBnOYBz6.jpg)
（2015 美國人口年齡分布 圖源來至 D3.js official website）

圓餅圖一般用於比較**資料的比例大小**，通常會輔以其他數字資訊來搭配（如附註百分比比例），而若是資料之間比例如果差異不大的話，使用這個圖表將會難以看出差異。

> 變化、相似圖型：玫瑰圖、環形圖、旭日圖

### 散點圖 Scatter Chart

![https://ithelp.ithome.com.tw/upload/images/20190921/20119062gLfzdj0YEP.jpg](https://ithelp.ithome.com.tw/upload/images/20190921/20119062gLfzdj0YEP.jpg)
（燃油效率與馬力散點圖 圖源來至 D3.js official website）

散點圖可以用來表示三維的資料處理，如附圖中`燃油效率`與`馬力`各為 X 軸與 Y 軸，而各家汽車廠商品牌資料則是透過點來對應前兩項資訊，散點圖可以用**強調視覺上的資料呈現何種的關係取向**（如正相關、負相關等等），而**實際上是否相關仍須以統計計算來判斷**。

> 變化、相似圖型：氣泡圖

### 折線圖 Line Chart

![https://ithelp.ithome.com.tw/upload/images/20190921/20119062isRTSm4IZH.jpg](https://ithelp.ithome.com.tw/upload/images/20190921/20119062isRTSm4IZH.jpg)
（Apple 股票市值折線圖 圖源來至 D3.js official website）

折線圖與長條圖類似，但更強調於**連續的資料走勢**，透過其中一軸的資料變化（如時間）來觀測固定軸（如商品名稱）的資料變化。

> 變化、相似圖型：面積圖、堆積面積圖、百分比面積圖……

而其餘的圖表還有：

- 熱圖
- 地圖
- 雷達圖
- 儀表圖
- 瀑布圖
- 桑葚圖
- 和弦圖
- 族繁不及備載

以上是今天認識圖表的章節，章節雖簡單卻重要，瞭解資料適合以何種圖表呈現之後，再來決定圖表要做哪些修正與改良，才不會落得使用一手好技術使用者卻不以為意的窘境，而明天將開始介紹使用 D3.js 的基礎用法與繪製簡單圖型。

> 每日一貓：黑黑表示我來看看你最近到底在打蝦米碗糕……
> ![https://ithelp.ithome.com.tw/upload/images/20190921/20119062lUJiSgzUz7.jpg](https://ithelp.ithome.com.tw/upload/images/20190921/20119062lUJiSgzUz7.jpg)
