---
title: Vue.js 狀態保留 keep-alive
date: 2019-09-17 00:14:43
tags:
- [前端]
- [JavaScript]
- [Vue.js]
categories: 
- [JavaScript, Vue.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/vue-logo.png' width='200px' height='200px' />
</div>

上一章節介紹到動態元件的使用方法，我們可以使用 `is` 來快速切換元件中的內容，藉著省下不少程式碼上的複製貼上，並且在 DOM 結構上也不會渲染出不必要的內容：

```html
<div id="app">
    <button type="button" @click="pagename = 'mainpage'">switch to Main page</button>
    <button type="button" @click="pagename = 'aboutpage'">switch to About page</button>
    <button type="button" @click="pagename = 'contactpage'">switch to Contact page</button>
    <component :is="pagename"></component>
</div>
```

但假如使用者在這些頁面中進行如**表單輸入**等等的操作，接著切換到另一個元件中，原本的元件頁面就會消失，並且觸發 `destroyed`的生命週期鉤子，而當使用者在切換回原先的頁面時，就會發現已經輸入過的資料**已經遺失**了。

<!--more-->

而這並不是什麼奇怪的 BUG ，我們可以透過 **`created` 生命週期鉤子被觸發**的現象觀察證實，此時載入的已經是另一個**全新的元件**，而如果這時我們想要能夠自在的切換元件間，又想要保留元件原先的資料內容，則可以使用 `keep-alive` 這個標籤。


## keep-alive

這個標籤最主要的功能，就是保留如上述一樣的情境時，因為切換而遺失的資料內容，原先消失的原因是因為 Vue.js 在虛擬 DOM 上的計算，導致渲染時會以該元件作為一個重新渲染的節點，最後刷新整個元件內部的資訊，而要藉由 `keep-alive` 保留內部資訊的使用方法也很簡單，我們只要在外層包覆一層 `keep-alive` 標籤即可：

```html
<div id="app">
    <button type="button" @click="pagename = 'mainpage'">switch to Main page</button>
    <button type="button" @click="pagename = 'aboutpage'">switch to About page</button>
    <button type="button" @click="pagename = 'contactpage'">switch to Contact page</button>
    <keep-alive>
      <component :is="pagename"></component>
    </keep-alive>
</div>
```

JavaScript部分
```javascript
Vue.component('mainpage', {
  template:`<div>This page is mainpage. Enter this page : {{ count }} </div>`,
  data(){
    return {
      count : 0
    }
  },
  activated() {
    this.count++
  },
  destroyed() {
    console.log('destroyed')
  },
})
Vue.component('aboutpage', {
  template:`<div>This page is aboutpage. Enter this page : {{ count }} </div>`,
  data(){
    return {
      count : 0
    }
  },
  activated() {
    this.count++
  },
  destroyed() {
    console.log('destroyed')
  },
})
Vue.component('contactpage', {
  template:`<div>This page is contactpage. Enter this page : {{ count }} </div>`,
  data(){
    return {
      count : 0
    }
  },
  activated() {
    this.count++
  },
  destroyed() {
    console.log('destroyed')
  },
})


let vm = new Vue({
  el:'#app',
  data:{
    pagename : 'mainpage'
  }
})
```

我們在上面範例中加入了一些觸發生命週期的鉤子，透過開發者工具列可以看到的是，原先當元件切換時，理應當觸發 `destroyed` 的生命週期鉤子，並且顯示 `destroyed`，然而最後結果卻沒有顯示，表示元件在切換到不同元件時，該元件**並沒有被銷毀**。

此時切換回原先的元件時，可以發現觸發了生命週期鉤子中的 `activated`，表示元件並**不是走原先 `created` 等初始化元件的過程**，而 `activated` 在官方生命週期中則是表示元件**重新被啟用**的意思，並且可以發現先前的資料內容也同時被保存下來，如此一來將來有如表單輸入等等需要暫時保留資料的元件，可以透過 `keep-alive` 的這個標籤來達到保存的功能。

以上就是今天狀態保存 `keep-alive` 的說明與用法，明天將會介紹 Vue.js 的最後的一個好用功能 `slot`。

> 明天就是 Vue.js 的最後一張啦，~~橘橘表示興奮到模糊~~。
> ![https://ithelp.ithome.com.tw/upload/images/20190917/20119062yrB2Z2gY2w.jpg](https://ithelp.ithome.com.tw/upload/images/20190917/20119062yrB2Z2gY2w.jpg)