---
title: Vue.js 元件傳遞 event bus
date: 2019-09-15 14:11:21
tags:
- [前端]
- [JavaScript]
- [Vue.js]
categories: 
- [前端, JavaScript, Vue.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/vue-logo.png' width='200px' height='200px' />
</div>

前面兩天提到的元件間的資料傳遞，主要是父元件對子元件的 `props` 以及子元件對於父元件的 `event` 發送，而最後留下一個問題是假如今天我們要子元件與子元件溝通，要怎麼做呢？

第一個最快想到的方法，可能是按照前面兩天提到的方法，不斷的往上傳遞到共同的父元件，再往下傳遞到想溝通的子元件當中，但這樣的做法會耗費太多心力，並且作了很多重複的動作、難以維護等等，而這些行為也是工程師不喜歡的**壞味道**，要知道未卜先知跟通靈以後要維護的東西可說是工程師的另一個價值 （？

而雖然第一個方法可以達成，但實在太搞剛（台）了，因此官方也直接列了第二個方法作為標準，那就是……

## event

而 `event` 實際上的用法如同公車一樣，當我們今天元件之間不是父子關係，而是多層元件關係時，都可以使用 `event` ，而 `event` 搭乘的乘客便是我們昨天提到的 `event`，只是今天我們**發送與監聽的對象改 `event` 身上**，而我們接下來以兩個平行的子元件之間的溝通來當作實作範例：

HTML 部分是兩個平行的元件`element-city1`與`element-city2`：

```
<div id="app">
    <element-city1></element-city1>
    <element-city2></element-city2>
</div>
```

JavaScript部分，`event` 既然要乘載我們 Vue.js 的功能，首先我們自然得先使用 `new` 去初始化一個 Vue 物件，使我們要乘載 `event` 的變數擁有 Vue 物件的屬性與功能：

```
let bus = new Vue();
```

接著子元件 `element-city1` 以 `$emit` 發送事件而發送事件對象改為 `bus`：
```
Vue.component('element-city1', {
  template:
  `
    <div>
      <input type="text" v-model="message"><br>
      <button type="button" @click="submit">Click</button>
    </div>
  `,
  methods:{
    submit(){
      bus.$emit('receive', this.message)
    }
  },
  data(){
    return {
      message : "this is city1's message"
    }
  }
})
```

要接受資料的 `element-city2`，監聽對象也同樣改為`bus`：

```
Vue.component('element-city2', {
  template:`<div>{{ message }}</div>`,
  created(){
    let self = this
    bus.$on('receive',function(newMessage){
      self.message = newMessage
    })
  },
  data(){
    return{
      message: "this is city2's message"
  }}
})
```

最後同樣的要初始化一個最基本的根元件來當作 Vue.js 要渲染的範圍。

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

[點我看範例](https://codepen.io/ShawnLin0201/pen/OJLwpap)

如此一來，子元件 `element-city1` 便能將資料藉由發送給 `bus`，讓監聽著 `bus` 的子元件 `element-city2` 拿到他想要的資料，藉此達成子元件與子元件的溝通技術。

**而往後開發要注意的是**，由於註冊與監聽事件都是在 `bus` 上，不同元件間註冊與監聽可能事件名稱會有**撞名的問題**，可以透過初始化另一台`bus`來稍微緩解這個問題。

今天介紹了子元件如何與子元件的做資料傳遞的溝通，接下來隨著 Vue.js 即將進入尾聲，因此要來介紹幾個 Vue.js 幾個也蠻重要的功能補充，祝大家周末愉快囉！

> 今天依然是由黑黑擔任每日一貓的工作，因為弟弟阿橘正在梳毛中不開心哈哈哈。而最近剛好是換毛季，感覺梳下來的毛都可以拿去做貓毛氈了......
> ![https://ithelp.ithome.com.tw/upload/images/20190915/20119062QkffxkBKJg.jpg](https://ithelp.ithome.com.tw/upload/images/20190915/20119062QkffxkBKJg.jpg)
