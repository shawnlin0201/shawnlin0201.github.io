---
title: CSS學習系列（二）如何利用預處理器SASS(SCSS)來維護CSS
date: 2019-07-16 09:07:47
tags:
- [前端]
- [CSS]
- [SASS]
- [SCSS]
categories: 
- [前端, CSS, 學習系列]
---

![](/images/SASS-logo.svg)

# 前言

在專案運行的過程中，偶爾可能會遇到需求更改的問題，若是遇到視覺更改且專案上是純寫CSS的話，容易會改到天荒地老，小案子則輕微中傷，大案子則重度身亡，而複製貼上並不是工程師所喜歡做的事情，然而在CSS中又沒辦法像是JavaScript一樣有變數可以儲存、可以寫邏輯判斷的概念，因此有許多人試著把這個想法實作出來，而他們就是CSS預處理器（CSS preprocessor）。節自2019年7月以來，CSS預處理器已經不勝枚舉，其中有幾個較為知名的預處理器如SASS(SCSS)、LESS、Stylus、PostCSS等等，也有網站分析了幾個預處理器的優劣（[點這裡查看](https://www.creativebloq.com/features/best-css-preprocessor)）。而本篇主要介紹的是如何利用SASS(SCSS)與VSCode編譯器順暢的結合。

# SASS(SCSS)

SASS全名（Syntactically Awesome Stylesheets），由Hampton Catlin所設計並由Natalie Weizenbaum所開發的一套語言，最初的開始的語法主要是利用縮排與換行來辨識程式碼區塊，後來推出更新的語法為SCSS，使用的語法基本上與CSS沒有不同，採用大括號區隔規則以及使用分號做為樣式分開，辨識檔案方法是透過副檔名`.sass`以及`.scss`作為區分。

SASS加入了許多特色如變數（Variables）、巢狀（Nesting）、混和（Mixins）、繼承（Extend）、運算子（Operators）並且還有許多類似於JavaScript的用法，而在擴充工具[Compass](https://github.com/Compass/compass)出來後更大大的加強了SASS的能力，只可惜該專案目前已經宣布不再維護，故此文不提到Compass。

# 解析.sass .scss檔

在使用SASS與SCSS前首先要知道如何解析.sass與.scss檔，如果是使用VScode作為編譯器的人可以使用[Live Sass Compiler擴充工具](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)，使用方法很簡單，下載完擴充工具後，點選編譯器底下的Watch Sass，就會在同個資料夾產生對應檔名的css檔案，並自動監控(Watching...)當前畫面中的檔案，只要該檔案有儲存動作，就會即時同步解析成對應檔案，若要停止即時解析的話再點一次(Watching...)即可（如下圖示範）；而如果是其他編譯器的使用者，也可以先使用[Sassmeister](https://www.sassmeister.com/)來解析。

![](/images/SCSS-VScode-Watch-Sass.png)

![](/images/SCSS-VScode-Watching.png)

而若要設定相關資訊，例如編譯後的檔案路徑與檔案名稱等等可以從VSCode設定檔去更改，而設定檔在VSCode>設定>偏好>右上角圖示開啟setting.json(如圖)：

![](/images/SCSS-VScode-setting.png)

![](/images/SCSS-VScode-setting-screen.png)

![](/images/SCSS-VScode-setting-json.png)

設定的資訊可以參考下方範例程式碼：
```
{
    "liveSassCompile.settings.formats": [
    {
        "format": "expanded",
        "extensionName": ".css",
        "savePath": "/css"
    },
    {
        "format": "compressed",
        "extensionName": ".min.css",
        "savePath": "/dist/style"
    }
    ],
}
```
其中`format`表示解析檔案類型，這個範例分別有`expanded`與`compressed`版本；而`extensionName`則表示編譯後的結尾副檔名，可以依照解析檔案的類型分別使用不同的名稱，最後`savePath`則表示解析完後儲存檔案的路徑，**要注意的是若VScode有開啟工作區，預設根目錄會是工作區中第一個資料夾**，而解決辦法可以將路徑改為`../"檔案夾名稱"/`即可在解析在工作區中指定的資料夾。

# 使用方法

順利地得到解析完的CSS檔案後，接著便可以開始學習SASS(SCSS)基本用法（以下會採用SCSS寫法方便解說）。

## 變數（Variables）

使用錢字號($)定義變數，並使用冒號(:)來定義其值，接著按照原本的方法撰寫CSS，使用變數來當作CSS屬性的值。這樣做的好處在於整個網站的字體、顏色如果要統一更改時，就不必再一個一個做更動，只需要更改其變數的數值即可。

```
$font-title-color: #0a0a0a;

.news-title {
  color:$font-title-color;
}
.shop-title {
  color:$font-title-color;
}
```
編譯後的結果：
```
.news-title {
  color: #0a0a0a;
}

.shop-title {
  color: #0a0a0a;
}
```


## 巢狀（Nesting）

SASS(SCSS)讓原先具有關係層級的CSS能夠以巢狀的形式呈現，使其更容易撰寫，也更容易一目瞭然之間的關係。
```
#news {
  .news-article {
    .news-title {
      font-weight:bold;
    }
    .news-body {
      color: #202020
    }
  }
}
```
編譯後的結果：
```
#news .news-article .news-title {
  font-weight: bold;
}

#news .news-article .news-body {
  color: #202020;
}
```
### 父層選擇器 &
SASS(SCSS)唯一在巢狀語言中可以使用的特殊選擇器&，它的作用是替代父層選擇器的名稱，以節省重複使用的時間：
```
#news {
  .news-article {
    &-title {
      font-weight:bold;
    }
    &-body {
      color: #202020
    }
  }
}
```
編譯後的結果：
```
#news .news-article-title {
  font-weight: bold;
}

#news .news-article-body {
  color: #202020;
}
```

## 混和（Mixins）
有時候同樣相近的語法在CSS中是枯燥乏味的（例如為了適應各家瀏覽器實作而需要用到一堆prefix的時候）。而Mixins提供了可以組合SASS(SCSS)的功能，使以往要重複填入的內容可以打包在一起，並且提供了傳參、組合與流程控制等等在裡面，而在使用Mixins方法也很簡單，撰寫`@mixin`啟用語法，而後如同CSS一樣的寫樣式規則，接著要在其他地方引入時則是使用`@include`加上要傳入的Mixins名稱：
```
@mixin text-format {
  font-family: Verdana;
  font-weight: bold;
}

.article-title {
  @include text-format
}
```
編譯後的結果：
```
.article-title {
  font-family: Verdana;
  font-weight: bold;
}
```

### 傳參（Arguments）

加上傳參的功能，加速解決prefix方面的問題：

```
@mixin transform($property) {
  -webkit-transform: $property;
  -ms-transform: $property;
  transform: $property;
}
.box { @include transform(rotate(30deg)); }
```
編譯後的結果：
```
.box {
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
}
```
### 組合（In combination）
能夠傳入不只一個Mixins：
```
@mixin fontFormat($size) {
  font-size: $size;
  font-family: Verdana;
}
@mixin borderFormat($width) {
  border-width: $width;
  border-style: solid;
  border-radius: 4px;
}
.comment-content { 
  @include fontFormat(18px);
  @include borderFormat(2px);
}
```
編譯後的結果：
```
.comment-content {
  font-size: 18px;
  font-family: Verdana;
  border-width: 2px;
  border-style: solid;
  border-radius: 4px;
}
```

## 繼承（Extend）
不同於Mixins，Extend提供的功能是將目標擴充原本SCSS部分，並且繼承者本身會保留下來：
```
.btn {
  font-weight: bold;
  font-size: 16px;
  border-width: 2px;
  border-radius: 2px;
}

.btn-blue {
  border-color:#006eff00;
  @extend .btn
}

.btn-red {
  border-color:#ff3c3c00;
  @extend .btn
}
```
編譯後的結果：
```
.btn, .btn-blue, .btn-red {
  font-weight: bold;
  font-size: 16px;
  border-width: 2px;
  border-radius: 2px;
}

.btn-blue {
  border-color: #006eff00;
}

.btn-red {
  border-color: #ff3c3c00;
}
```

## 流程控制 （Flow Control）
流程控制的部分則是有引入類似JavaScript裡面的if、else、each、for、while等等，而用法也接近原生JavaScript一樣：
```
$base-color: #036;

@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```
編譯後的結果：
```
ul:nth-child(3n + 1) {
  background-color: #004080;
}

ul:nth-child(3n + 2) {
  background-color: #004d99;
}

ul:nth-child(3n + 3) {
  background-color: #0059b3;
}
```

## 函式（Function）
在我心目中SCSS好用榜單前幾名的功能，SCSS的function類似於JavaScript中的function，配合上方流程控制選項（`if`、`else`、`each`、`for`），使我們可以自訂一段程式：
```
@function rem($targetFontPx, $rootFontSize: 16px){
  @return ( $targetFontPx / $rootFontSize ) + 0rem;
}

.article-title {
  font-size: rem(16px);
}
```
編譯後的結果：
```
.article-title {
  font-size: 1rem;
}
```

## 內建函式 (Built-in Functions)
而除了可自訂函式之外，原生SASS(SCSS)也內建了許多不同的函式可以使用，像可以把顏色加亮的lighten()、或是把顏色轉色相的adjust-hue()等等：
```
.shop-item {
  background: adjust-hue(#6b717f, 60deg)
}
```
編譯後的結果：
```
.shop-item {
  background: #796b7f;
}
```

# 結尾
熟練SASS(SCSS)後對於專案上的開發真的有如神助，而官網的文件也有很多其他功能可以[參考](https://sass-lang.com/documentation)，而這篇文章也僅列出幾個最常用的部分，另外也有國外網站整理的[十個使用CSS preporcessor的原因](https://raygun.com/blog/10-reasons-css-preprocessor/)可以看看。

# 參考資料

- [SASS文件](https://sass-lang.com/documentation)
- [Sassmeister](https://www.sassmeister.com/)
- [Compass github](https://github.com/Compass/compass)
- [Haml wiki](https://zh.wikipedia.org/wiki/Haml)
- [SASS wiki](https://zh.wikipedia.org/wiki/Sass)
- [best-css-preprocessor](https://www.creativebloq.com/features/best-css-preprocessor)
- [30天掌握Sass語法](https://ithelp.ithome.com.tw/users/20040221/ironman/562)
- [SASS : VSCode 套件安裝](https://ithelp.ithome.com.tw/articles/10203396?sc=iThelpR)
- [SCSS 15分鐘入門](http://eddychang.me/learn-scss-in-15-mins/)
- [ERAY NOTE：編譯SASS/SCSS方式](https://medium.com/@youngox9/%E7%B7%A8%E8%AD%AFsass-scss%E6%96%B9%E5%BC%8F-467007c1c337)