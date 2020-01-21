---
title: Vue.js 資料選項 Options
date: 2019-09-08 17:11:15
tags:
- [前端]
- [JavaScript]
- [Vue.js]
categories: 
- [JavaScript, Vue.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="vue-logo" src='/images/vue-logo.png' width='200px' height='200px' />
</div>

# data 資料
data 是用來儲存資料的地方，而 Vue.js 會透過前面介紹的樣板語法，將其對應的值輸出顯示到 DOM 上，並且最重要的是，只要一更動 data 裡面的資料，Vue.js 將會透過內部已經幫我們處理好的邏輯，去比對 HTML 哪邊需要更改，實現部分渲染，達成資料驅動畫面的概念。範例：

HTML 部分：
```
<div id="app">
    {{ a }}
</div>
```

JavaScript部分：
```
let vm = new Vue({
  el: '#app',
  data: {
    a: 1,
    b: {
        b1: 'something',
        b2: 'another
    }
  }
})

```

<!--more-->

首先如同前面介紹，使用 `new` 關鍵字去創建一個實體，並使用花括弧傳入我們所需要的參數，例如在 `el` 中去填入我們要渲染的元素範圍 `#app` ，在 data 中則一樣是透過物件再把我們要的資料配對給他，我們就可以在 HTML 部分以樣板語法取得對應的值。

# computed 計算屬性

前面提到的 data 主要是用來存放一些資料，如果我們今天在顯示資料前需要**先計算** data 的內容**再顯示**到畫面上時，就可以使用 computed 來幫助我們，例如以匯率計算來說：

```
<div id="app">
  目前擁有台幣：{{ money }}元。
  轉換為日幣後：{{ money / 0.3}}日圓。
</div>
```
```
let vm = new Vue({
  el:'#app',
  data:{
    money:1000,
  }
})
```
原先我們可能在樣板語法中直接去計算內容，但是如果要重複使用的話將會大量的複製貼上，此時便可以使用`computed`來計算，修改後如下：
```
<div id="app">
  目前擁有台幣：{{ money }}元。
  轉換為日幣後：{{ JPY }}日圓。
</div>
```
```
let vm = new Vue({
  el:'#app',
  data:{
    money:1000,
  },
  computed:{
    JPY : function(){
      return this.money / 0.3
    }
  }
})
```
這樣改變後，在 HTML 的部分將更加的直觀，而將計算的方法寫在實體當中，需要取得的時候如同在 data 的資料，將對應的 key（`JPY`）寫在樣板語法鐘即可。

**而使用這個方法要注意的地方在於**，若其計算的途中沒有使用到 `data` 中的任何一筆資料時，**資料將會無法更新！**，因此若確定每次使用都會更新到的部分建議還是使用 `methods` 的方法來驅動。

# methods 方法
與`computed`不一樣的是，`methods`可以直接供 Vue.js 的實體來使用，也可以藉由指令中的表達式使用，更重要的是還能將參數帶入其函式中( `computed` 是無法傳入參數的)。

範例如下：

在這個完整範例中，原先按鈕會顯示 `data` 中的 `text`資料，按下按鈕後透過指令 `v-on:click` 縮寫（`@click`）去執行  `methods` 裡面的 `handleOnClick`，並將參數 'Shawn'傳到函式中，最後透過 `this.text` 方法取得 data 裡面的 `text` 並且更改為我們需要的內容。

```
  <div id="app">
    <button @click="handleOnClick('Shawn')" type="button">{{text}}</button>
  </div>
```
```
let vm = new Vue({
  el:'#app',
  data:{
    text:'Hello Vue!',
  },
  methods:{
    handleOnClick : function(name){
      return this.text = `Hello ${name}!`
    }
  }
})
```

**而`methods`要注意的地方是**，函式的部分不能使用 ES6 中的箭頭函式`arrow function`，否則`this`指向 window 最後拋出`undefined`。

# watcher 監聽器

`watch`的用法如同監聽器一樣，在與其綁定的資料有更動時會執行對應的函式，需要異步執行資料變化時便可以使用，而參考官網的範例如下：

```
<div id="app">
  <p>
    今晚晚餐吃這個：
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>
</div>
```
```
let vm = new Vue({
  el:'#app',
  data:{
    question:'',
    answer:'讓我來幫你決定要吃什麼吧！',
  },
  watch:{
    question : function(){
      this.getAnswer()
    }
  },
  methods:{
    getAnswer:function(){
      var self = this
      fetch('https://yesno.wtf/api')
      .then(res=>res.json())
      .then(res=>{
        self.answer = res.answer
      })
    }
  }
})
```
這個範例是透過 yesno 網站所提供的 API 去實作一個決定晚餐要不要吃這個的簡單應用程式，使用者在 `input` 輸入問題後，透過上篇提過的 `v-model` 雙向綁定資料到`data`中的`question`，接著資料內容被改變後去驅動監聽器去啟動對應的方法並啟動 `methods` 裡面的 `getAnswer` ，接著 `getAnswer` 發送了一個`request`到[https://yesno.wtf/api](https://yesno.wtf/api)並得到一個回應後，我們再將回應的資料傳回去 data 中的 `answer`。

以上這幾個用法是屬於 Vue.js 實體的一些相關用法，結合樣板語法、指令與修飾符後我們已經可以完成一個簡單的小應用了，而下個章節我們將繼續介紹 Vue.js 的生命週期！