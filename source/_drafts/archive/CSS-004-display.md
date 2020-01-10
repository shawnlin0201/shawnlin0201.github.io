---
title: block, inline, inline-block 的區別
date: 2019-07-22 10:08:32
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
在前端網頁切版時，為了排版以及顧及 SEO 而使用語意化標籤 sematice element 時，有時候 HTML 標籤的預設渲染並不是這麼方便，比如使用 header 標籤`<h2>`來強調某段文章的標題重點，來強化 SEO 的排名，然而專案上該段落同行也要塞入其他的圖片或文字來搭配，而`<h2>`預設渲染會佔據整行的 display:block 就不是這麼方便了，而本篇文章主要介紹 display 基本介紹與主要 block, inline, inline-block 三者的差別。

# display

在區別這三者之前，首先先來認識一下 display 這個屬性原本的基本介紹（或是[點我略過此小節](#block)）。

根據官方W3規格表示，CSS 中的 display 屬性是主要用於定義**元素(element)的顯示狀態(display type)**，這個狀態主要有兩個影響其呈現盒子模型的數值型態：**內在顯示型態**(inner display type)與**外在顯示型態**(outer display type)，透過這兩個呈現型態，我們將可以定義該元素控制其後裔元素的排列方式與自己本身對於父元素的盒子模型要如何呈現。


## inner display type
內在顯示型態定義有兩種區別，分為**非取代元素**(non-replaced element)與**取代元素**(replace element)。在非取代元素**中(例如`<div>`)中內在顯示類別是定義**這個元素裡面的後裔元素將如何排列**，而**取代元素**(內部沒有辦法塞入其他 HTML 元素)，則是定義這個元素的**CSS設定範圍**(例如`<img>`，網頁解析後將會以其屬性中src指定路徑的圖片作為替代)。

## outer display type
外在顯示型態主要則是定義**該元素所產生的盒子(principal box)將如何排列**。例如像`<table>`元素最後渲染時會產生外框 wrapper box 與內部格線 grid box，並且按定義排好；另一例像`<p>`元素則是產生的盒子模型將會佔據整行父元素的寬等等。

# display: block
- 元素本身的盒子模型容器寬將會是100%父元素的寬，也就如同在頁面上有換行的感覺。
- 可設定其 margin、padding、width、height，但在設置width的時候僅會影響到元素的內容寬度(content width)

預設值屬於 `display:block` 的HTML元素(block-level element)：
div, h1~h6 , p, form, header, foorter, section...table, ol, ul, dl, pre

# display: inline
- 元素的盒子模型寬將會視內容而決定，並且強制並排顯示。
- 無法設定其 margin、padding、width、height

預設屬於`display:inline`的HTML元素(inline element)：
span, a, img, input, select, textarea, strong, em

**值得注意的是**，img 與 input 雖然是被定義屬於 inline element，但實際上前面在介紹 display 時有提到，他們其實算是**取代元素**(replace element)的一種，他所替換後的內容是擁有寬高等屬性的，而因此更多人認為他們的表現其實如同 inline-block 一樣。

# display: inline-block
- 如同 inline 一般，元素的盒子模型寬將會視內容而決定，並且強制並排顯示。
- 與 inline 不同的是可設定其 margin、padding、width、height

**特性像是**`display:inline-block`的 HTML 元素：
img, input

**值得注意的是**，IE8 以前要設置的 display:inline-block 必須本身就預設為 display:inline 的元素才能使用，雖然要應付這種遠古版本的機會不大但還是稍微紀錄一下，在翻了一些文章後找到一種前綴 property 解法可以專門應付他：
IE 7版本，直接屬性前綴星號
```
div {
  display : inline-block;
  *display : inline;
}
```
IE 6版本，直接屬性前綴底線
```
div {
  display : inline-block;
  _display : inline;
}
```
如此一來就可以使IE 7、IE 6照樣吃到相關的設定了。

# 結尾
以上定義規格主要是以 W3 所發布 CSS 規章為參考，然而各家瀏覽器真正實作上的設定會有所不同，但大致上是不會相差太多<del>除了IE之外<del>，而同瀏覽器中不同版本也會有所差異，因此建議使用較新的 CSS 語法時要多留意瀏覽器是否會支援。


# 參考資料

- [w3-css-display](https://www.w3.org/TR/css-display-3/)
- [block，inline和inline-block概念和区别](https://www.cnblogs.com/KeithWang/p/3139517.html)
- [螞蟻的 CSS](http://ant4css.blogspot.com/2013/01/display02.html)
