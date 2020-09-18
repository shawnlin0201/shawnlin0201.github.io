---
title: 【事前準備】1-4 如何訓練心智模型：對於正在嘗試實作者而論
tags: 《透過認知模型認識 JavaScript》
---

## 準備實作

現在的你已經瞭解 JavaScript 的前身今世是怎麼來的，並且也清楚 JavaScript 一些基礎語法，也知道了如何將抽象的流程具體化了。但你可能對於實作來說卻沒有太多的想法，也不知道從何下手？

本文透過上一章所建議的訓練方式，來解說如何將「具體化抽象流程」延伸到實作的程式面上！如果還不清楚如何具體化抽象流程的方式可以參考上一篇文章！

---

## 練習拆解代辦清單

待辦清單算是一個非常適合入門的實作項目，因為他牽扯到了每個實作幾乎都會碰到的「新增」、「刪除」、「修改」、「更新顯示」，而本篇將示範「新增」與「更新顯示」的部分。

首先，我們依照解決問題的策略可以先定義好問題目標，這時可暫時先不要想到程式如何實作！

而我們的目標便是「新增使用者填入的待辦事項」，進而可以拆解成起點（填入待辦事項）與終點（顯示填入的待辦事項）。

再來我們可以透過剛剛的問題試著形成策略（解決辦法），方法是想像一下「使用者」操作角度，並轉化為具體的流程，這時你可能會想到下面兩種作法之一：

![](https://i.imgur.com/p1FIHbm.png)
> 如果專案有 UX 或是其他人有定義好規格就可以直接採用規格來省略這一步。

接著，我們依據這個流程來思考「實作上的進入點」，而這個進入點所指的意思是說決定 **使用者某個特定行為** 來觸發 **畫面更新** 的時間點。

也就是說我們可以這兩個方案中的進入點分別是在「點選新增按鈕」或「在填入框敲擊 Enter 鍵」之中。

> 注意到了嗎！規格若是沒有先定義好實作的進入點時，前端如何實作將會備受影響！

若是定義在「點選新增按鈕」時，我們開發上的邏輯就會變成：

![](https://i.imgur.com/g5zQQt7.png)

若是定義在「按下 Enter 鍵」時，我們開發上的邏輯就會變成：

![](https://i.imgur.com/gCUTXhg.png)

而虛線框框中正是你實際程式中需要去實作的細節。

## 程式面的實作

現在瞭解哪些部分是程式所要開發的部分後，現在來思考程式怎麼去偵測與執行這些行為，我們以方案 A 為例：

![](https://i.imgur.com/2Ecq0un.png)

接著轉化成程式碼：
- 如何偵測按鈕被點擊？ => 監聽器（EventListener）
- 如何取得填入待辦事項的內容？ => 操作 DOM（取得 input 值）
- 如何整理多筆資料？ => 透過陣列（Array）來紀錄資料
- 如何顯示於網頁中？ => 操作 DOM（innerHTML）

最後再一步步實作各個環節，並組裝起來。如下列概念碼：

1. 偵測按鈕被點擊
```js
var addButton = document.querySelector('.add-button') // 1.取得按鈕按鈕


addButton.addEventListener('click', function(){ // 2.偵測按鈕點擊

})
```

2. 取得待辦事項的內容
```js
var addButton = document.querySelector('#add-button')
var addInput = document.querySelector('#add-input') // 3.取得待辦欄位


addButton.addEventListener('click', function(){
    getCurrentTodo(); // 1.點擊後取得現在的待辦 => 透過命名來加強語意上的邏輯
})

function getCurrentTodo(){
    console.log(addInput.value) // 2.待辦欄位的值 => 點擊當下使用者所填入的待辦事項
}
```

3. 整理好新增與原有的待辦事項
```js
var addButton = document.querySelector('#add-button')
var addInput = document.querySelector('#add-input')
var currentTodos = [] // 3.新增一個變數來負責處理所有相關的資料

addButton.addEventListener('click', function(){
    var currentTodo = getCurrentTodo() // 2. 取得待辦事項的值
    currentTodos.push(currentTodo) // 4. 將取得待辦事項的值新增至負責處理所有待辦事項的變數
})

function getCurrentTodo(){
    return addInput.value // 1.不在裡面做與名稱無關的事情使函式做的事情更加的單純（單一職責原則）
}
```

4. 顯示於網頁中
```js
var addButton = document.querySelector('#add-button')
var addInput = document.querySelector('#add-input')
var currentTodos = []

addButton.addEventListener('click', function(){
    var currentTodo = getCurrentTodo()
    currentTodos.push(currentTodo)
    formatTodoTemplate() // 1. 新增負責整理樣板的函式
})

function getCurrentTodo(){
    return addInput.value
}

function formatTodoTemplate(){
    var template = '' // 2. 新增一個空字串用來處理樣板
    currentTodos.forEach(function(todos){ // 3. 將所有待辦事項一一抓取出來整理成樣板
        template += '<li>'+ todos +'</li>'
    })
    return template
}
```

```js
var addButton = document.querySelector('#add-button')
var addInput = document.querySelector('#add-input')
var currentTodos = []
var renderTarget = document.querySelector('#render-target') // 2. 取得渲染目標

addButton.addEventListener('click', function(){
    var currentTodo = getCurrentTodo()
    currentTodos.push(currentTodo)
    var template = formatTodoTemplate() // 1. 將整理好的樣板透過變數儲存起來
    renderTarget.innerHTML = template // 3. 將樣板渲染至預定的目標上
})

function getCurrentTodo(){
    return addInput.value
}

function formatTodoTemplate(){
    var template = ''
    currentTodos.forEach(function(todos){
        template += '<li>'+ todos +'</li>'
    })
    return template
}
```

如此一來就完成了代辦清單中的「新增」與「更新顯示」的 **基本功能** 了！

預覽此範例請[點此](https://codepen.io/ShawnLin0201/pen/yLOxdEg)

而事實上這個範例還有很多可以調整的部分，比如說你會發現新增後應該要清除原先框中的內容好讓下一次新增待辦事項時比較方便，等等諸如此類的議題。

透過這樣的方式長期練習下來，最後就能縮短思維與程式碼之間轉換的思考時間！

最後，在思考這些細節時，你很有可能會遇到一些不如預期的反應而受阻，其實你並不是不會那些語法，而是不瞭解實際程式執行時的運作。

這時我會推薦你閱讀第二章節到第四章節的內容，若能清楚的瞭解第四章節中所談的 JavaScript 執行期間的運作，那將有如打任督二脈，在開發階段能夠更加地順利。