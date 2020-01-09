---
title: Box-model 盒子模型
date: 2019-07-20 09:34:42
tags:
- [前端]
- [CSS]

categories: 
- [前端, CSS]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/CSS-logo.svg' width='200px' height='200px' />
</div>

# 前言
盒子模型可以說是將 HTML 元素抽象的距離大小關係具象化，使設計師與前端更容易理解 HTML 標籤被瀏覽器渲染出來的樣子。而根據 w3c 對**盒子模型(box-model)**的定義與規範，一個元素含有 content area，以及**選擇性**圍繞著 padding、border 以及 margin，而為了更好的解說之間的關係，我已經切了一個盒子模型的板，有興趣的可以複製下面程式碼或直接由下圖參考：

CSS部分：
```
  .box-model {
      display: flex;
      justify-content:flex-start;
      align-items:center;
      flex-direction: column;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: bold;
      line-height: 25px;
  }
  .margin{
      border:2px dashed #BBBBBB;
      width:400px;
      height:250px;
      background:#F1F1F1;
  }
  .border {
      width:350px;
      height:200px;
      background:#4CAF50;
  }
  .padding {
      width:300px;
      height:150px;
      background:#F1F1F1;
  }
  .content {
      justify-content:center;
      border:2px dashed #BBBBBB;
      width:250px;
      height:100px;
      background:#FFFFFF;
  }
```
HTML部分：
```
  <div class="margin box-model">
      margin
      <div class="border box-model">
          border
          <div class="padding box-model">
              padding
              <div class="content box-model">
                  content
              </div>
          </div>
      </div>
  </div>
```
# box-model
<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/CSS-box-model.png' width='400px' height='280px' />
</div>

前提說到一個盒子的組成會有 content area、padding、border 以及 margin 的部分，並且 padding、border 與 margin 四個方向都可以分別設置(top, right, bottom, left)而實際上各屬性意涵為：
- `content`：盒子內容，文字與圖片將會顯示於此。
- `padding`：盒子內容外到邊框的範圍，此範圍為透明。
- `border`：盒子的邊框，圍繞在padding與content的外面，此範圍可以設置border顏色、border樣式。
- `margin`：盒子最外層，此範圍為透明。

在預設的情況下，若是 CSS 設了`background-color`，其背景顏色將會充滿 content、padding 以及 border 的範圍。

另外，content 與 padding 若是設置寬度但寬度不足**預設將會撐開所屬容器高度**(height)，content 與 padding 若是設置高度但高度不足**content的內容預設將會突破content的範圍往下長**，而若設置寬度與高度，但寬度高度皆不足則**content的內容預設也是會突破content的範圍往下長**。

而一般CSS中對元素設置的寬(width)與高(height)實際上包含的範圍**只有 content 的範圍**，所以如果CSS樣式是這樣設置：
```
  div {
        width:300px;
        height:100px;
        padding:10px;
        border:10px solid black;
        margin:10px;
  }
```
實際上這個 div 元素最後顯示的寬將會是：

width 300px +
padding-left 10px + padding-right 10px +
border-left 10px + border-right 10px +
margin-left 10px + margin-right 10px
= 360px

肉眼上可見的則是：

width 300px +
padding-left 10px + padding-right 10px +
border-left 10px + border-right 10px +
= 340px (**實際上仍佔360px**，只是因為margin的範圍肉眼看不見)

# box-sizing
在實際專案的設計稿中，可能會需要使用到 border 來增加邊框樣式，但是又不想要一直計算可見範圍時這時就可以使用`box-sizing`這個屬性
- `box-sizing:content-box`：width計算將只會包含content的範圍（預設值）。
- `box-sizing:border-box`：width計算將會包含content、padding到border的範圍（肉眼可視範圍）。

同樣如上方的樣式，但多加了 `box-sizing:border-box`：
```
  div {
        width:300px;
        padding:10px;
        border:10px solid black;
        margin:10px;
        box-sizing:border-box;
  }
```
最後肉眼可見的寬度就會變成300px，但是 content 的寬度將會變為：

300px -
border-left 10px - border-right 10px -
padding-left 10px - padding-right 10px
= 260px (content width)

由此可見使用 `box-sizing:border-box` ，可以使我們更專注在視覺切版後的樣子，而不是一直去計算 content 寬高與 box-model 間的關係。

在說完容器本身的盒子模型後，接著來看盒子與盒子之間的關係：

# margin 額外補充

margin主要是用來控制盒子與盒子之間的距離(到border、padding的部分)，以下面範例講解之間的關係：
CSS部分：
```
  .box{
      width:100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
  }
  .box1{
      margin:10px;
      background:#F08080;
  }
  .box2{
      margin:10px;
      background:#FFF200;
  }
```
HTML部分：
```
  <div class="box box1">box1</div>
  <div class="box box2">box2</div>
```
<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/CSS-margin.png' width='100px' height='200px' />
</div>

如上圖與程式碼所示，可以看到兩個 div.box 元素是處於分開的狀態，而兩個 div.box 元素中間的空隙便是 margin 的部分，但是 margin 在渲染盒子時，會以盒子與盒子之間的的最大值來當作參考點，並不是直接兩者相加，因此上面範例最後兩者之間的距離為10px（如下圖）。

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/CSS-margin2.png' width='400px' height='400px' />
</div>
<br>
<br>

假設 box1 的 margin-bottom 為 10px，但 box2 的 margin-top 改為 20px 後，兩者之間有一最大值 20px，則 box1 的 margin-bottom(10px) 不會影響到之間的距離，最後距離為 20px（如下圖）。

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/CSS-margin3.png' width='400px' height='400px' />
</div>
<br>
<br>

假設 box1 的 margin-bottom 為 10px，但 box2 的 margin-top 改為 -5px 後，兩者之間有一最大值 10px，則兩者距離將會變成先以 box1 的 margin-bottom 為基準撐開，接著 box2 在以 margin-top(-5px) 拉近距離，最後距離為 5px（如下圖）。

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/CSS-margin4.png' width='400px' height='400px' />
</div>
<br>
<br>

**簡單來說，今天若是有多個箱子模型互相牽制的情況，會先以其中一個最大的margin值作為基準，而其他若是介於最大值與0之間則不會影響，若是小於0的元素則該元素會往相對應的方向縮減，**而善用此 margin 的負值可以為排版上帶來更多的變化性。

**要注意的是**，若是因為 margin 的設置而使其元素超過 viewport 的寬度(例如在1920*1080的電腦螢幕上設定了 margin-left:1920px 時)，網頁在渲染時將會為了將其元素渲染出來，而將整個**頁面寬度**撐大，若是網頁RWD要適應mobile的部分將會造成破版的結果。（同樣也會發生在設定margin-top時超過整個你原先預定的頁面高度）。

## 縮寫
縮寫的部分基本上各個箱子模型的屬性都差不多，若是想要個別設置的話則分為一至四個參數：

一個參數，將會設定上右下左的 margin
```
div {
  margin:10px;
}
```
兩個個參數，將會設定上下與左右的 margin
```
div {
  margin:10px 20px;
}
```
三個參數，將會設定上、左右`下的 margin
```
div {
  margin:10px 20px 25px;
}
```
四個參數，將會設定上右下左的 margin
```
div {
  margin:10px 15px 20px 25px;
}
```

若要快速記憶只要記得順序**上、右、下、左**，如果有缺一個屬性則會抓對角的來補齊，例如三個參數中缺左邊則抓右邊（最後參數設定為變成上、左右、下）。

# border額外補充
相對 margin 來說 border 基本上要容易理解，border 簡單來說會佔預設箱子寬度(`width`)，並且`background-color`的部分會涵蓋在內，而其他的CSS樣是設定如下：
- `border-style`：邊框的樣式
- `border-width`：邊框的寬度
- `border-color`：邊框的顏色

## border-style
邊框樣式的部分又可以分為以下幾種：
- `solid`：將邊框樣式設為**實線**樣式。
- `dashed`：將邊框樣式設為**虛線**樣式。
- `double`：將邊框樣式設為**雙框線**樣式。
- `dotted`：將邊框樣式設為**點線**樣式。
- `groove`：將邊框樣式設為**凹線**樣式。
- `ridge`：將邊框樣式設為**凸線**樣式。
- `inset`：將邊框樣式設為**嵌入**樣式，讓整體元素看起來像凹下去。
- `outset`：將邊框樣式設為**浮出**樣式，讓整體元素看起來像浮起來。

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/CSS-border-style.png' width='150px' height='350px' />
</div>
<br>

## border-width
透過`border-width`可以設置邊框的寬度：
```
  div {
    border-width:2px;
  }

```

## border-color
透過 `border-color` 可以設置邊框的寬度：
```
  div {
    border-color:black;
  }

```

## border-image
若要自定義邊框的圖案則可以使用 `border-image` 屬性：
```
  div {
    border:10px solid transparent;
    border-image:url(image.png);
  }

```

## 縮寫
同樣的 border 也可以各自設定(top、right、bottom、left)，而若四個邊框屬性皆相同可以寫在同一行：
```
  div {
    border:1px solid black;
  }

```


# padding 、 結尾
最後 padding 的使用方法與 margin 類似，就不再冗述了。而本篇文章介紹的 box-model 在網頁排版基本上一定會遇到，並且會與容器中的 display type 與 position 有密切關聯，接下來的文章將會講述block、inline 與 inline-block 的差別。


# 參考資料

- [w3c-css-box-3](https://www.w3.org/TR/css-box-3/)
