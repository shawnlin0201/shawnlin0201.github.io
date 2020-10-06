---
title: 【強化模型】3-3 瀏覽器中的事件處理（下集）
tags: 《透過認知模型認識 JavaScript》
---

## 瀏覽器事件流程

在上篇文章中，我們總共提到了三種註冊方式以及多種事件類型。然而，瀏覽器事件並非只是單純的註冊對應的類型並且執行而已，在事件發生到觸發之間其實有一連串的過程需要我們去理解。

當然，我們並不需要真的關注到太過底層的知識，例如透過細胞自動機（Cellular automaton）中的 Wireworld 來模擬物理層面上的 [電子運作情形](https://xieranmaya.github.io/blog/demo/wireworld-computer.html)。
![](https://i.imgur.com/F8DJYDf.png)

但是我們能夠以一個較粗的細粒度來學習並看待它，

接下來，我們要以一個簡單的點擊事件為例，來深入瞭解事件發生時的整個過程：
```html
<html>
    <head>
        <title>ithelp ironman</title>
    </head>
    <body>
        <h1>inon 2020</h1>
        <p id="target">join us</p>
    </body>
</html>
```

```js
var handleClick = function(e){
    console.log(e)
}

window.addEventListener('click', handleClick)
target.addEventListener('click', handleClick)
```

根據上方的程式碼，當我們今天點擊網頁中的 `<p>` 元素的區域時，事件會如下圖中的方式傳遞：

![](https://i.imgur.com/A7vComq.png)

事件在傳遞的過程中會以 **元素** 為一個單位，並以被點擊的元素為 **目標元素** 區分為：
- 捕獲階段（capture phase）
- 目標階段（target phase）
- 冒泡階段（bubbling phase）

之所以要特別區分這些事件階段，最主要是因為我們在使用標準事件模型監聽器時，要選擇監聽捕獲階段或是冒泡階段：

```js
window.addEventListener('click', handleClick) // 預設是採用冒泡階段
window.addEventListener('click', handleClick, false) // 採用冒泡階段
window.addEventListener('click', handleClick, true) // 採用捕獲階段
```

會有這樣的需求在於，每次事件發生時不一定是由 **監聽目標** 本身所引起的，比如我雖然是點擊網頁中的 `<p>`，但由於冒泡事件流程會經過 `window`，所以最後註冊在 `window` 上的冒泡階段監聽器也會跟著被觸發。

假使一個事件同時觸發了多個監聽器時，而監聽器處理的順序則是依賴 **事件流程** 以及 **程式碼中的位置**。

```js
window.addEventListener('click', handleClick, true) // 捕獲階段
target.addEventListener('click', handleClick, true) // 捕獲階段
target.addEventListener('click', handleClick) // 冒泡階段
window.addEventListener('click', handleClick) // 冒泡階段
```

以上程式碼點擊 `target` 為例，整個流程觸發順序為：

1. 捕獲階段 - window 物件
2. 捕獲階段 - #target 元素
3. 冒泡階段 - #target 元素
4. 冒泡階段 - window 物件

若是將目標元素的監聽器換一下位置：

```js
window.addEventListener('click', handleClick, true) // 捕獲階段
target.addEventListener('click', handleClick) // 冒泡階段
target.addEventListener('click', handleClick, true) // 捕獲階段
window.addEventListener('click', handleClick) // 冒泡階段
```

最後處理的順序為：

1. 捕獲階段 - window 物件
2. 冒泡階段 - #target 元素
3. 捕獲階段 - #target 元素
4. 冒泡階段 - window 物件

會有如此情況是因為在 **目標階段（Target Phase）** 並沒有先後上的問題，因此會變成哪個監聽器先被註冊就先執行哪個的觸發情況出現。

## 取消事件傳遞

上述展示了多個監聽器被一個事件同時觸發的情形，然而有時候我們並沒有想這麼做時，我們可以藉由 Event 物件中的 `stopPropagation()` 方法來停止捕捉與冒泡階段的傳遞：

```js
window.addEventListener('click', function(e){
    console.log('Active')
})
target.addEventListener('click', function(e){
    e.stopPropagation()
})
```

當我們點擊 `target` 元素時，由於我們在其註冊的監聽器中寫了 `stopPropagation()`，因此 `window` 監聽器中的 `console.log('Active')` 將不會被執行。

若我們點擊的路徑中不包含 `target` 元素的區域，則 `window` 所註冊的監聽器將可以繼續接收到事件傳遞，進而顯示 `Active`。

## 取消原生行為

除了事件中的傳遞可以被取消之外，若原生的元素有事件的話，我們也可以透過 Event 物件中的 `preventDefault()` 方法來取消元素原有的行為，比方說 `<a>` 元素中若有 `href` 連結時，點擊將會自動導頁，若我們想要在導頁之前做一些處理我們可以參考下列概念碼：

```js
target.addEventListener('click', function(e){
    e.preventDefault() // 先阻止自動導頁的行為

    // 做一些處理...

    // 接著在實作後續的導頁流程
    window.location.href = this.href // 透過 this 指向目標元素，再透過原先的 href 導頁
})
```

## 事件代理（event delegation）

以上的事件處理器基本上都基於伺服器第一次回應頁面時就存在的元素，但是假如有些元素是我們後來藉由 JavaScript 所新增的元素，如果還是使用同樣的方法綁定，你將會發現這樣的做法並沒有用。

```html
<ul>
    <li>list 1</li>
    <li>list 2</li>
    <li>list 3</li>
</ul>
```

```js
var list = document.getElementsByTagName('li')

for(var i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function(e){
        console.log('Active')
    })
}
```

接著透過 JavaScript 動態新增一個新的元素：

```js
var link = document.createElement('li')
link.textContent = 'list 4'
document.getElementsByTagName('ul')[0].appendChild(link)
```

此時你會發現無論怎麼點擊 `list 4` 都不會顯示 `Active`：

```html
<ul>
    <li>list 1</li>
    <li>list 2</li>
    <li>list 3</li>
    <li>list 4</li>
</ul>
```

而解決的相應之道就是透過事件傳遞的原理，我們將監聽器綁在父層再去判斷後續的邏輯：

```js
var list = document.getElementsByTagName('ul')[0]
list.addEventListener('click', function(e){
    if(e.target.nodeName === 'LI'){ // 判斷目標元素是否為預期的元素 or 其他設定的條件
        console.log('Active')
    }
})
```

如此一來不論你後面要新增幾個元素進去，都可以沿用綁定在 `<ul>` 元素上的監聽器。

以上這兩篇便是關於瀏覽器事件處理的資訊，而明天開始我們將學習如何操作 AJAX 來實現更多功能。