---
title: CSS學習系列（一）如何善用命名管理你的CSS
date: 2019-07-15 09:51:04
tags:
- [前端]
- [CSS]
- [OOCSS]
- [SMACSS]
- [BEM]
- [Vue.js]
- [React.js]
categories: 
- [前端, CSS, 學習系列]
---

![](/images/css-logo.svg)

# CSS
有接觸網頁端的工程師們或多或少都知道，尤其是前端工程師們一定認識他，對他可是又愛又恨（~~或是只有恨？~~）。CSS，全名（Cascading Style Sheets），主要在於提供於HTML文件做為樣式，語法的部分相當容易上手，只要學習如何透過選擇器（`Selector`）語法來讓CSS可以渲染到對應的HTML元素，並且瞭解該元素中有哪些可以使用的屬性（`property`）與值（`value`）即可。然而實際專案中最困難的地方不在於CSS要怎麼寫，而是在於CSS選擇器該怎麼取名。而常見的方式是遵循幾個基本原則：

- 可預測性：看到該命名可以預測大致的樣式會呈現什麼。
- 可重複利用性：樣式不單單受限於某個特定的HTML區塊，只要類似的地方都能夠重複使用。
- 可維護性：當專案需求有變更時，不必整段程式碼都砍掉重寫，只需要修改部分的程式碼。
- 可擴展性：不僅僅是自己能夠理解，團隊將來共同維護同份專案時，也能夠好理解程式碼代表的意思。

要達成這些目的可以透過許多的解決方案來執行，而透過命名來管理便是其中一項。而目前有幾項較常被工程師所採用的作法有OOCSS、SMACSS以及BEM，另外還有一套近期竄起的框架Atomic CSS，接下來將會一一介紹他們。

# OOCSS

OOCSS（Object Oriented CSS）是Nicole Sullivan於2009年提出的一種命名方法，簡報裡面提出兩個原則與十九項建議大括如下：

- 建立CSS如同建立元件庫的概念。
- 儘量將選擇器的使用簡單最小化。
- 分離結構與樣式（Separate Structure and Skin）
- 分離容器與內容（Separate Container and Content）
- 避免使用ID選擇器。

而翻譯成較白話的意思，就如同作者所說的，把style的部分做成如同樂高積木的樣子，使用這個方法在命名時應該盡量採用class以方便於套用在HTML的元素上，並且不要去使用到後裔選擇器，而且在太過於類似的地方也要有所取捨，不要有太多類似的樣式出現在同一頁面上，而結構樣式與容器內容的分離則是表示CSS在畫面上呈現的樣子與實際在HTML的結構是沒有直接關係的。

依據這些原則與建議試著改寫一段CSS程式碼：
```
  button {
    border:none;
    color:white;
    background:lightblue;
  }
  span {
    color:white;
    background:lightblue;
    font-size:1.2rem;
    padding:5px 15px;
  }
```
接著將重複的樣式抽取出來，並且將其class化：
```
  .btn {
    border:none;
  }
  .content {
    font-size:1.2rem;
    padding:5px 15px;
  }
  .skin-lightblue{
    color:white;
    background:lightblue;
  }
```
這樣一來在HTML部分我們就可以更精簡且可重複利用的方式使用樣式：
```
<div>
    <button type="button" class="btn skin-lightblue">click</button>
    <span class="content skin-lightblue">content</span>
</div>
```
而CSS框架Bootstrap便是類似於OOCSS的作法，例如Boostrap中的按鈕元件樣式便是以此方式作為命名：
```
<button type="button" class="btn btn-primary">Boostrap style</button>
```

# SMACSS

SMACSS全名（Scalable and Modular Architecture for CSS）縮寫念作"smacks"，是由Jonathan Snook所構想的一種命名架構，而作者也曾受Nicole Sullivan的OOCSS所啟發，其中還有像是Jina發表的[CSS Workflow演講](https://vimeo.com/15982903)、Natalie Downe的[Practical, maintainable CSS](https://blog.natbat.net/post/46613977728/practical-maintainable-css)以及Jeremy Keith的[Pattern primer](https://adactio.com/journal/5028)等等。

其架構主要是對於結構上與命名規則上的限制，結構的部分主要分為：

- Base
- Layout
- Module
- State
- Theme

## Base

這個結構主要是定義基本元素與通用上的基底，將會針對HTML元素直接定義樣式，例如專案上會使用的CSS reset、CSS Normalize就屬於此類，而作者也建議將長期專案中都會使用到的樣式作為團隊專屬的預設樣式。

## Layout

這個結構則指的是頁面上的元件區塊，而Layout是指較大的元件部分：如Navbar、Header、Footer等等，裡面通常還包有許多更小的元件，而在這裡SMACSS會選擇以ID的方式命名這些特定唯一的區塊、若是有共同的區塊則改以class的方式命名區塊並加入前綴`l-`：
```
#header {
    margin: auto;
    width: 960px;
}
#sidebar {
    float:left;
}
```
也能透過class名稱來達到切換樣式轉變：
```
#article {
  float: left;
}
#sidebar {
  float: right;
}
.l-flipped #article {
  float: right;
}
.l-flipped #sidebar {
  float: left;
}
```

## Module

這個結構則指的頁面上的元件區塊，是比Layout來的更小一層的元件，並且可以各自獨立存在、重複的使用。而命名規則是限定只能使用class、且避免使用元素選擇器，若要管理Module的樣式可採用`Subclassing`或是`Sub-module`來命名：
```
<div class="media">
    <div class="media-title"></div>
    <div class="media-content"></div>
</div>
```

## State

這個結構則是描述當前元件中的狀態，命名規則是以`is-State`來表示樣式：

```
<div class="media is-hidden">
    <div class="media-title"></div>
    <div class="media-content"></div>
</div>
```

## Theme

配合主視覺設計，將原本在Layout或是Module已經定義的一些元件再度強化，使其更符合網站的樣式：
```
<div class="media media-dark">
    <div class="media-title"></div>
    <div class="media-content"></div>
</div>
```

## 切換狀態

在官網中核心文件提到，其中在切換狀態時的一些方法，而官網提到的辦法是採用jQuery進行DOM元素的操作（替該元素增加、減少class名稱）。而在現今框架中，如果有使用如Vue、React、Angular，則都建議將狀態切換採用框架原先封裝好的功能進行控管，避免權責分工不明，並且影響到框架對於virtual dom的操作，例如Vue中可以使用`v-bind`來將class與data物件綁定。
```
<div class="media" :class="{'media-dark': mediaState}">
    <div class="media-title"></div>
    <div class="media-content"></div>
</div>
```

# BEM

BEM顧名思義他的設計理念便是區分為，Block、Element與Modifier，核心觀念如同現今框架一樣強調元件化，而命名方式統一只能使用class：

## Block

如同SMACSS中的Layout以及Module，並且區分更小元件的方式也是採用`-`方式區隔：
```
.media{...}
.media-header{...}
.media-footer{...}
```

## Element

Block裡面的小元件，但是不一定會有，而取名方式是前綴其依附的Block名稱加上兩個下底線`_`：
```
.media-header{...}
.media-header__title{...}

```


## Modifier

如同SMACSS中的state，命名方式是前綴Block或Element的名稱加上一個下底線`_`：
```
.media-header_hover{...}
.media-header__title_hover{...}
```

# 結尾

本篇文章簡單說明了三種CSS管理心法，會發現許多地方其實大同小異，畢竟他們掌握的原則十分相近，差異點在於關注點的位置不太相同，而除此之外還有像是Suit CSS以及Atomic CSS（~~小心服用~~）。而實際使用在專案上時，也有可能會因需求而有所改動，不會完全按照心法去操作，畢竟專案有大有小，能掌握基本原則下去進行改動，並且讓團隊成員都容易瞭解的作法，也才能夠讓使得團隊開發上能夠加順利。

# 參考資料


- [CSS wiki](https://zh.wikipedia.org/wiki/%E5%B1%82%E5%8F%A0%E6%A0%B7%E5%BC%8F%E8%A1%A8)
- [CSS 不是我們想像的這麼簡單!](https://speakerdeck.com/kurotanshi/css-bu-shi-wo-men-xiang-xiang-de-zhe-mo-jian-dan-tai-bei-chang)
- [CSS 的模組化方法：OOCSS、SMACSS、BEM、CSS Modules、CSS in JS](https://cythilya.github.io/2018/06/05/css-methodologies/)
- [OOCSS wiki](https://en.wikipedia.org/wiki/OOCSS)
- [Object Oriented CSS](https://www.slideshare.net/stubbornella/object-oriented-css/13-and_sometimes_those_goals_conict)
- [SMACSS](http://smacss.com/)
- [淺談 CSS 方法論與 Atomic CSS](https://blog.techbridge.cc/2017/04/29/css-methodology-atomiccss/)
- [SMACSS 教學](https://medium.com/@savemuse/smacss-%E6%95%99%E5%AD%B8-c94e858aa762)