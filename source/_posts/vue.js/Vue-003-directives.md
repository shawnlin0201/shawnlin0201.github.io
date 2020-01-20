---
title: Vue.js 指令 Directives
date: 2019-09-06 13:54:54
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

# 指令（Directives）
在 Vue.js 中有提供一些帶有前綴`v-`的指令，指令主要放在 HTML 標籤當中，如同 HTML 屬性一樣，而我們可以透過指令去**命令那些元素做事情**，只要指令**條件符合**時，就會執行該指令的動作。而透過這些指令與上一回的樣板語法，我們可以直接在 HTML 上去綁定我們需要做的事情，以下列出幾個常用到的指令與用法：

<!--more-->

## v-if
透過`v-if`指令，當`v-if`後的條件為`true`時，該元素就會**顯示**在 DOM 上，若`false`則該元素**不會顯示**在 DOM 的結構上。

範例：
```
<div id='app'>
  <div v-if='text1'>最後這段文字會顯示</div>
  <div v-if='text2'>最後這段文字不會顯示</div>
</div>
<script>
let vm = new Vue({
  el:'#app',
  data:{
    text1:true,
    text2:false
  } 
})
</script>
```

## v-show
和上面的`v-if`很像，但`v-show`在`false`時的消失，實際觀察 DOM 會發現該元素只是被加上了行內樣式 `style="display:none"`而已，並**沒有從DOM上消失**。

## v-for
接下來介紹的這個指令非常的好用，透過`v-for`，我們可以將`data`中的某筆資料遍歷輸出，用法就有如原生 JavaScript 中的 `for...of`迴圈一樣，取一個變數名稱去拿到**資料物件裡面的值**，可以用來快速製作一個**樣板**。

範例：
```
<div id='app'>
  <ul>
    <li v-for="(person,index) in class001" :key="person.id">
      第{{ index }}筆資料，姓名：{{ person.name }}，年齡：{{ person.age }}
    </li>
  </ul>
</div>
<script>
let vm = new Vue({
  el:'#app',
  data:{
    class001:[
      {
        id:'001',
        name:'小明',
        age:12
      },
      {
        id:'002',
        name:'小美',
        age:10
      },
      {
        id:'003',
        name:'小華',
        age:11
      },
    ]
  } 
})
</script>
```

**需要注意的地方**，在使用`v-for`指令輸出時，[官網強烈建議](https://cn.vuejs.org/v2/style-guide/#%E4%B8%BA-v-for-%E8%AE%BE%E7%BD%AE%E9%94%AE%E5%80%BC-%E5%BF%85%E8%A6%81)需要給予一個 `key` 來作為可識別的資料，有點類似於身分證的概念；而當我們需要對資料操作時，Vue.js 也才能依靠身分證去找到對的人，如果我們是使用門牌（如`index`）來檢驗的話，哪天裡面的租客搬走換人了就會找錯人了！

**另外一個須注意的地方是**，需要避免`v-for`與`v-if`在同一個地方上使用，因為有可能會渲染到本來應該會隱藏的欄位，而官方也做了[詳細解釋](https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7-%E5%BF%85%E8%A6%81)，簡單來說你叫貓咪要趴下，又要他站起來，那牠到底是要趴下還是站起來呢？

橘橘：我選擇趴下好了
![https://ithelp.ithome.com.tw/upload/images/20190906/20119062JZFpwznF0E.jpg](https://ithelp.ithome.com.tw/upload/images/20190906/20119062JZFpwznF0E.jpg)

## v-model
透過`v-model`指令綁定在元素上，可以創造一個雙向綁定資料的概念，例如我們讓資料雙向綁定在一個`input`元素上，`input`的值就會顯示出他對應的`'我會顯示在input中'`，如果我們更改`input`的值，最後 `data` 裡面的值也會被我們更改。

範例：
```
<div id='app'>
  <input type="text" v-model="message">
</div>
<script>
let vm = new Vue({
  el:'#app',
  data:{
    message:'我會顯示在input中'
  } 
})
</script>
```

## v-on
`v-on`指令使用方法類似於使用 HTML 原生屬性`on`一樣。例如要使用點擊觸發的行為，我們只要在元素上寫上`v-on:click="yourFunction"`即可，而寫函式的位置則是在 Vue.js 實體中的 `methods` 裡頭。範例如下：

HTML部分
```
<div id="app">
  <button type="button" v-on:click="handleOnClick">Click Me!</button>
</div>
```

JavaScript部分
```
let vm = new Vue({
  el:'#app',
  methods:{
    handleOnClick : function(){
      alert('Hello Vue!')
    }
  }
})
```
除此之外，`v-on`也可以縮寫為`@`，將上面的範例改寫後會變成：
```
<div id="app">
  <button type="button" @click="handleOnClick">Click Me!</button>
</div>
```
這樣的效果會跟上方一模一樣。

## v-bind
`v-bind`主要可以用來綁定元素中的屬性，並且將屬性的值交由 Vue.js 中的 `data` 來控管，達到**動態控制**，使該元素變成是**可控制的元素**，這個觀念在 React.js 中也常常用到，例如常用到的一個做法就是控制元素的`class`屬性。下方範例將示範一個由按鈕去**驅動資料**讓元素的 `class` 能動態變化：

CSS部分，這裡簡單定義了box與rotate的樣式
```
.box{
    width:100px;
    height:100px;
    background-color:lightblue;
}
.rotate{
    transform:rotate(45deg);
}
```
HTML部分，這裡透過`v-on`的點擊事件讓`isRotate`的值可以反轉布林值，而 `v-bind:class` 的意思則是當`isRotate`為`true`該元素加上`rotate`的 `class`名稱，若`false`則不添加。
```
<div id="app">
  <div class="box" v-bind:class="{'rotate':isRotate}"><div>
  <button type="button" v-on:click="isRotate = !isRotate"> Rotate the box</button>
</div>
```
JavaScript部分
```
let vm = new Vue({
  el:'#app',
  data:{
    isRotate: false,
  } 
})
```

如此一來我們便可以使用按鈕來驅動元素樣式。而這個指令也有縮寫的寫法，用法省略`v-bind`只留下`:`的部分，範例修改上面後的如下：

```
<div id="app">
  <div class="box" :class="{'rotate':isRotate}"><div>
  <button type="button" @click="isRotate = !isRotate"> Rotate the box</button>
</div>
```

以上是一些常用到的指令與用法，關於其他更多深入的用法，可到官網上有更多詳細範例說明可以[參考](https://cn.vuejs.org/v2/api/)，而下一段章節將會介紹到**修飾符**的內容，我們將會知道怎麼用簡單的**修飾符**讓指令的變化更加豐富！我們下個章節見！