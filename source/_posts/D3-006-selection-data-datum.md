---
title: D3.js 資料選取 d3-selection 與資料綁定 Joining Data
date: 2019-09-25 21:43:33
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

## 資料選取
在繪製圖表前，首先要掌握 D3.js 如何 **選取元素**，接著才能將要修改的資料輸出到選取的元素裡。而 D3.js 選取元素的部分與 jQuery 是同一套作法，也就是以往撰寫 CSS 相關程式時，開發者怎麼比對元素，就是以那一套為基準即可！

> 例如選取 id 為 test 的元素則是使用 `#test` 作為選取器。
> 
> 這裡假定開發者已稍微瞭解基礎的 CSS 選擇器（selector ），如果對於 CSS 選擇器還不熟悉的話，可以透過這個 [有趣的盤子遊戲](https://flukeout.github.io) 來快速學習 CSS 選擇器！

而 D3.js 目前提供了兩種方法以供開發者捕捉元素：

- `d3.select` ：捕捉符合選取器的第一個元素
- `d3.selectAll` ：捕捉符合選取器的所有元素

使用 D3.js 選取器捕捉到的元素（選擇集），後續則可以繼續透過 D3.js 的方法來進行 DOM 的操作修改，例如將選取到的 `p` 元素中所有的文字都改成紅色：

JavaScript 部分：
```javascript
d3.selectAll('p').style('color','red')
```

> 若想要測試語法，除了使用前面章節提到的開發環境建置之外，你可以直接在 [D3.js 官方網站](https://d3js.org/) 開啟開發者工具（DevTools）直接測試！

## 資料綁定

現在我們已經可以透過 D3.js 選取到資料集了，然而選取集上的元素裡面並**沒有帶任何的資料**，我們得透過 D3.js 提供的資料綁定方法將**資料綁定於選取的資料集**中，目前 D3.js 提供了兩種方法供開發者使用，接著就來介紹一下他們用法與差異：

- `selection.datum`
- `selection.data`

### datum

datum 的用法有兩種，一種是**未帶參數直接使用其函式**，如`d3.selection.datum()` 將會**返回選取集所綁定的數據資料**。

第二種就是**將數據資料當作參數帶入函式當中**，如`d3.selection.datum('數據資料')` **將會把數據資料綁定到選取集中每一個元素身上**，而數據資料**綁定的類型**除了`undefined`與`null`值之外**都可以賦予該元素**：

```javascript
let d3datum = d3.selectAll('p').datum('綁定資料')
```

以 D3.js 官網觀察，透過 `console.log(d3datum)` 可以很清楚的看到該選取集元素物件屬性中含有一個 `__data__` 的欄位，而這個欄位就是 D3.js 賦予這個元素的資料位置。（如下圖）

![https://ithelp.ithome.com.tw/upload/images/20190925/20119062yg0GqFbt7u.jpg](https://ithelp.ithome.com.tw/upload/images/20190925/20119062yg0GqFbt7u.jpg)

綁定資料後可以接著以 D3.js 的提供方法來使用這筆資料，例如將透過 `text` 函式將內容更換為所綁定的資料：

```javascript
let d3datum = d3.selectAll('p')
                .datum('綁定資料')
                .text(function(d){
                    return d
                })
```

所有被綁定到的資料透過 `text` 內函式的**第一個傳送參數**（`d`）替換進去，而 `text` 用法則是將返回（`return`）的數值替換為該文字節點的內容。

> 註：部分 D3.js 提供的方法第一個傳送參數皆為**元素所綁定的資料**（`data`），第二個則為**資料集的索引值**（`index`）。

最後就會看到 D3.js 官方網站變成了這樣：

![https://ithelp.ithome.com.tw/upload/images/20190925/20119062XFSQrvYrxe.jpg](https://ithelp.ithome.com.tw/upload/images/20190925/20119062XFSQrvYrxe.jpg)

要注意的是，datum 在綁定資料的過程時，有一個特性是若透過被綁定資料的元素來新增一個新的元素時，其**子元素也會繼承父元素的數據資料**（`__data__`）。

### data

data 使用方法與 datum 相同，而不一樣的是其綁定資料的邏輯是會**按照陣列索引值**或**指定的方法**來依序的綁定資料到元素上。

例如網站上目前有三個`<div>`元素：

```html
<section>
    <div></div>
    <div></div>
    <div></div>
</section>
```

若是有一筆數據資料為`['a','b','c']`，透過 data、datum 方法綁定後：

```javascript
let sampleData = ['a','b','c']

D3.selectAll('div').data(sampleData)
```


接著再觀察 `__data__` 將會得到：

\              | 透過 data 綁定得到的`__data__` | 透過 datum 綁定得到的`__data__`
-------------- | ------------- | -------------
第一個 `<div>`：| `a`           |`['a','b','c']`
第二個 `<div>`：| `b`           |`['a','b','c']`
第三個 `<div>`：| `c`           |`['a','b','c']`

由此可見，`data` 所綁定的數據資料的邏輯會依照其**綁定的元素集**下去做分配，因此若是綁定的元素數量與數據資料的數量不同時，將會被 D3.js 歸納為以下三種邏輯：

- **update** : 輸入該筆數據資料時若**還有**元素可供資料輸入，該筆輸入的資料會被歸納 `update` 資料。
- **enter** : 輸入該筆數據資料時若**沒有**元素可供資料輸入，該筆輸入的資料會被歸納 `enter` 資料。
- **exit** : 若是資料已經輸入完了，還有剩餘被綁定的元素，則剩下的元素將會被歸納為 `exit` 資料。

**例如被綁定的元素有三個，而數據資料有四筆時：**

元素              | 數據資料 | 整筆被綁定的元素會被歸納為
--------------  | ------------- | -------------
第一筆被綁定的元素| `a`           |`update` 資料
第二筆被綁定的元素| `b`           |`update` 資料
第三筆被綁定的元素| `c`           |`update` 資料
無               | `d`           |`enter` 資料

**例如被綁定的元素有四個，而數據資料只有兩筆時：**

元素              | 數據資料 | 整筆被綁定的元素會被歸納為
--------------  | ------------- | -------------
第一筆被綁定的元素| `a`           |`update` 資料
第二筆被綁定的元素| `b`           |`update` 資料
第三筆被綁定的元素| 無            |`exit` 資料
第四筆被綁定的元素| 無            |`exit` 資料

透過 `d3.selection.data()` 返回的數值中，可以看到一個屬於 `update` 資料的陣列物件以及 `enter` 函式與 `exit` 函式分別可以找到對應類型的資料，而這個類別資料的重要性在於，繪製圖型時我們需要透過這些類型的資料來判斷那些是我們要更動的資料或哪些元素是我們不需要的。若開發者能夠分清楚這三種數據資料的差別，對往後的資料處理上將會更加的容易！

而我們今天已經能夠透過 D3.js 選取到資料集以及將資料綁定給元素了，並且我們還能夠判斷出哪些資料是屬於要更新 `update` 、進入 `enter` 以及離開 `exit`，接下來明天我們將會活用這三個類別資料來進行資料處理，就讓我們明天見啦！

> 橘橘舉頭望明月
> ![https://ithelp.ithome.com.tw/upload/images/20190925/20119062iIohG6Xuvh.jpg](https://ithelp.ithome.com.tw/upload/images/20190925/20119062iIohG6Xuvh.jpg)

## 9/26 更新

不排斥英文文章閱讀的話，D3.js 作者本人 Mike Bostock 也有一篇文章詳細介紹了 D3.js 中 [選擇集的運作](https://bost.ocks.org/mike/selection/)，並且還有提供視覺動畫解釋之間的關係。