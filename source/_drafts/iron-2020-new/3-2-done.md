---
title: 【強化模型】3-2 瀏覽器文件的操作
tags: 《透過認知模型認識 JavaScript》
---

昨天我們介紹了有關於瀏覽器所提供的瀏覽器物件模型（BOM），相信讀者已經對於一些瀏覽器內所提供的功能有些瞭解，今天要接著來介紹瀏覽器物件中較常用到的 `document` 物件，來看看要如何透過它來操作我們瀏覽器中的畫面。

# 文件物件模型（Document Object Model）

![](https://i.imgur.com/E9cpOOb.jpg)

**文件物件模型** 是一個由 W3C 委員會來定義 HTML 結構的一種模型，也因為有了這個模型，各瀏覽器商便能藉由這個模型規範來開發出對應的 API，使網頁工程師們能夠有管道可以透過 JavaScript 來修改網頁中的內容。

![](https://i.imgur.com/e3Mya9D.png)

上述提到的 DOM API 其實還涵括了其他的標記語言（如 XML），而我們最主要所操作的 HTML 則屬於 HTML DOM API，也就是昨天提到的瀏覽器物件模型中 `window` 底下的 `document` 物件。

而在 HTML DOM API 中，主要可分為選擇器、特性與節點操作。

## 選擇器（Selector）

在 HTML DOM API 中，選擇器主要可分為 `getElementSelector` 和 `querySelector` 兩類選擇器。

**getElementSelector 家族**
- `document.getElementById`
- `document.getElementsByClassName`
- `document.getElementsByTagName`

**querySelector 家族**
- `document.querySelector`
- `document.querySelectorAll`

而這兩類選擇器最大的差異在於，當你透過變數來儲存選擇器所選擇到的節點時，若後續透過 JavaScript **動態新增元素時會不會自動更新相關資訊**。

```js
var imgViaQuery = document.querySelectorAll('img')
var imgViaGetElement = document.getElementsByTagName('img')

imgViaQuery.length // 0
imgViaGetElement.length // 0

document.body.appendChild(new Image()) // 動態新增一個 img 元素

imgViaQuery.length // 0
imgViaGetElement.length // 1

document.body.appendChild(new Image()) // 再次動態新增一個 img 元素

imgViaQuery.length // 0
imgViaGetElement.length // 2

imgViaQuery = document.querySelectorAll('img') // 直到我們重新賦值，主動更新資訊

imgViaQuery.length // 2
imgViaGetElement.length // 2

document.body.appendChild(new Image()) // 再次新增一次

imgViaQuery.length // 2 同樣紀錄著當下賦值的情形
imgViaGetElement.length // 3 自動更新至當前的情形
```

所以雖然 `querySelector` 選擇器在選擇元素時可採用 CSS 選擇器的寫法去獲取元素，使用時還是要注意一下它的特性。

## 標籤屬性（attribute）與 DOM 特性（property）

學會選擇器後，現在我們已經可以選到一些網頁上的元素了，然而若是我今天想操作的是網頁中元素中的屬性時該怎麼辦？

在 HTML DOM API 中，除了有定義了節點之外，有關於於該元素標籤內的一些屬性（如：`type`、`src`、`href`⋯⋯等等）都會有對應的 DOM 特性可以操作。

一般來說若沒有設定屬性的情況下，我們透過 DOM 特性找值時會有個預設值，若屬性標籤中有值時則特性中的值會與屬性值相同，例如我們常用的 `input` 標籤中的 `value` 屬性。

假設我們在網頁上的某個 input 元素裡輸入了 `Hello, DOM property!`：

```html
<input id="text" type="text" value="Hello, DOM property!">
```

我們則可以透過 HTML DOM API 選取到該元素後，接著透過 `value` 來取得對應的屬性值：

```js
document.getElementById('text').value // "Hello, DOM property!"
```

所以若是今天你想要藉由 JavaScript 來修改頁面上元素中的屬性時，你只需要 **查詢對應的 HTML DOM API 的文件** 要如何操作即可。

## 節點操作

我們現在知道如何選取到節點與元素，也知道要如何修改元素上的標籤屬性後，最後我們要學習如何透過 JavaScript 來操作這些節點。

在節點操作中，也有如同元素的選擇器可以使用，但其概念比較偏向透過 **相對** 的方式在操作：

- `firstChild`：取得該節點底下的第一個節點。
- `lastChild`：取得該節點底下的最後一個節點。
- `previousSibling`：取得該節點相臨的前一個節點。
- `nextSibling`：取得該節點相臨的後一個節點。
- `parentNode`：取得該節點的父層節點。
- `childNodes`：取得該節點的所有子層節點。

只取與元素有關的節點方法則有：

- `firstElementChild`：取得該元素底下的第一個元素。
- `lastElementChild`：取得該元素底下的最後一個元素。
- `previousElementSibling`：取得該元素相臨的前一個元素。
- `nextElementSibling`：取得該元素相臨的後一個元素。
- `parentElement`：取得該元素的父層元素。
- `children`：取得該元素的所有子層元素。

透過以上的方法我們可以輕易的選擇到 DOM 上的節點與元素。

接著，倘若想要新增、刪除一個節點元素時，我們先透過 `document.createElement` 建立一個空元素後，透過剛才學到的特性方法來修改屬性，最後就可以透過 `appendChild()` 與 `removeChild()` 來新增、刪除節點：

```js
var image = document.createElement('img')
image.src = 'https://ithelp.ithome.com.tw/upload/images/20201004/20119062mjiHVKQwDm.jpg'
document.body.appendChild(image)
```

由於操作 DOM 時會觸發渲染機制導致重繪的現象，所以遇到大量的節點操作時，為了避免效能上的問題，我們可以改將原先的元素統一新增至 `document.createDocumentFragment()` 容器當中，最後將這個容器新增到對應的節點上：

```js
var imageWrapper = document.createDocumentFragment('')
for(var i = 0; i < 5; i++){
    var image = document.createElement('img')
    image.src = 'https://ithelp.ithome.com.tw/upload/images/20201004/20119062mjiHVKQwDm.jpg'

    imageWrapper.append(image) // 新增至容器當中
}

document.body.appendChild(imageWrapper) // 處理完後才一次新增至頁面當中進行處理。
```

如此一來對於瀏覽器來說我們最後只要處理一次渲染計算即可完成所有的繪製。

以上就是有關於瀏覽器中 JavaScript 對於 DOM 上的各種處理，在下一節中我們將來看看瀏覽器中要怎麼處理有關於事件上的行為。