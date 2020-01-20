---
title: Vue.js 動態元件 Dynamic component
date: 2019-09-16 00:50:58
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

## Dynamic component 動態元件

在某些情境下的專案中可能會需要透過標籤來切換頁面，可能第一個想到的會是使用 `v-if` 或是 `v-show` 的方式去顯示，並且透過在標籤上綁定資料物件來顯示內容：

在 HTML 部分，我們可能會使用`v-on`（縮寫`@`）去綁定 `click` 事件，透過點擊事件來更動 `data` 裡的資料（`pagename`）：

<!--more-->

```html
<button type="button" @click="pagename = 'mainpage'">switch to Main page</button>
```

接著在要顯示頁面的元件中掛上`v-if`來限定顯示的條件，如 `pagename` 的值是 `mainpage` 時就會顯示該元素，藉此來達到如切換分頁的效果，並且重複以上動作將各個顯示頁面用的元件加入如下：

```html
<div id="app">
    <button type="button" @click="pagename = 'mainpage'">switch to Main page</button>
    <button type="button" @click="pagename = 'aboutpage'">switch to About page</button>
    <button type="button" @click="pagename = 'contactpage'">switch to Contact page</button>
    <mainpage v-if="pagename === 'mainpage'"></mainpage>
    <aboutpage v-if="pagename === 'aboutpage'"></aboutpage>
    <contactpage v-if="pagename === 'contactpage'"></contactpage>
</div>
```

而 JavaScript部分除了基本的頁面內容樣板之外， 在 Vue.js 初始化的實體中則是在 `data` 中先放入一開始預設頁面值：
```javascript
Vue.component('mainpage', {
  template:`<div>This page is mainpage</div>`,
  created() {
    console.log('created mainpage')
  },
  destroyed() {
    console.log('destroyed mainpage')
  },
})
Vue.component('aboutpage', {
  template:`<div>This page is aboutpage</div>`,
  created() {
    console.log('created aboutpage')
  },
  destroyed() {
    console.log('destroyed aboutpage')
  },
})
Vue.component('contactpage', {
  template:`<div>This page is contactpage</div>`,
  created() {
    console.log('created contactpage')
  },
  destroyed() {
    console.log('destroyed contactpage')
  },
})


let vm = new Vue({
  el:'#app',
  data:{
    pagename : 'mainpage'
  }
})
```

如此一來就能達成進入後顯示主要頁面，接著透過按鈕切換數值來驅動顯示不同的畫面。這樣的做法確實可以達到切換分頁的效果，但缺點在於一開始進入根目錄頁面時，DOM 就已經載入該元素了。

解決辦法是透過 Vue.js 所提供的 API (`:is`) 來達成同樣的效果，我們只需要放入一個名為`component`的標籤（ Vue.js 的內建元素 `Built-In Components`），並且透過 `:is` 來對應元件名稱，最後 Vue.js 就會依照`:is`的數值來決定被渲染的元件，HTML部分改寫後如下：

```html
<div id="app">
    <button type="button" @click="pagename = 'mainpage'">switch to Main page</button>
    <button type="button" @click="pagename = 'aboutpage'">switch to About page</button>
    <button type="button" @click="pagename = 'contactpage'">switch to Contact page</button>
    <component :is="pagename"></component>
</div>
```

往後新增頁面時，只要將觸發更改頁面的按鈕、方法寫好，並且新增對應名稱的元件，即可快速做到更動頁面的效果，而同樣的方法也適用於快速切換小區域的元件內中（如表單等等），大家不彷一起嘗試看看這個 API 吧。

> 橘橘也有周一病，一到周末晚上就各種厭世臉哈哈哈
> ![https://ithelp.ithome.com.tw/upload/images/20190916/20119062aZXueKQpKU.jpg](https://ithelp.ithome.com.tw/upload/images/20190916/20119062aZXueKQpKU.jpg)