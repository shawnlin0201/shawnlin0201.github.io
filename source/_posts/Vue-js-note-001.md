---
title: Vue.js學習筆記(一)入門、環境搭建、指令與修飾符
date: 2019-07-07 17:30:00
tags: vue.js
---

## 前言

嗨，大家又見面了，由於最近正在學Vue.js，順手來記錄一下。我之前專案有使用過React.js，所以這次學Vue.js上其實覺得大同小異，而React.js搭配的create-react-app，在Vue.js中也有Vue-cli可以使用，不過礙於篇幅，這篇主要會簡單介紹Vue的一些基本指令與環境搭建，而其他的部分會挪到其他章節來寫囉！要快速閱覽目錄可以透過右下方的menu觀看，一樣有任何問題歡迎寄信到[我的信箱](mailto:shawnlin0201@gmail.com)討論喔！

## 使用vue原因

傳統操作資料往往是透過document.getElementById('someID')等等方式去捕捉DOM的元素，並且在其中(如innerHTML)塞入我們所要的資料。量少還不是問題，但量一多就會出人命，假如我們今天要在一百個地方放入資料，我們就得捕捉一百次DOM元素。而Vue.js則將這個資料綁定的部分做掉了，並且提供已經包裝好的樣板語法以及其他好用的功能，讓我們可以以一個較快速的方式，來對資料做操作、顯示。且最重要的是，由於Vue.js的開發作者是中國人，因此它的說明文件是支援全中文的！有興趣的同學可以點[這裡](https://cn.vuejs.org/)看看。然而實際上要怎麼透過Vue.js操作資料呢？就讓我們繼續看下去……


## 快速建造環境

想要快速體驗vue.js的同學們，可以使用官網提供的CDN快速引入，而引入的版本主要有下面兩種：

開發版本：這個版本包含了完整的開發人員工具以及報錯等等的協助，適合開發時後使用。
生產版本：這個版本則是將上述開發工具都拔除，盡量縮小它的體積，適合正式發布時使用。

而我們目前主要目的是體驗開發，因此選擇開發版本，然後透過script標籤引入vue.js後即可。

```
<head>
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
</head>
<body>


<script>
//這樣這裡就可以準備撰寫vue的檔案啦!
</script>
</body>
```


而在引入好檔案後，我們便可以開始來撰寫html以及javascript的部分，首先html的部分要有個可以讓vue實體抓到DOM的地方，我們可以使用id來命名(ex:app)，並且在javascript的地方以new初始化vue，裡面以el指定剛才命名的id`app`，並在data內放入資料，接著在html元素中以兩層花括號{% raw %}{{}}{% endraw %}的方式指定要顯示的資料名稱，接著就會在畫面上呈顯出'Hello, world'的部分。範例如下：

HTML部分

```
<div id='app'>
  {{ message }}
</div>
```
JavaScript部分
```
<script>
let vm = new Vue({
  el:'#app',
  data:{
    message:'Hello, world!'
  } 
})
</script>

```

## 指令(Directives)
而知道怎麼透過Vue.js顯示資料後，接著來學習如何有條件、遍歷輸出我們所想要的資料！Vue.js中有提供一些帶有前綴`v-`的一些指令，而這些指令的功用在於當表達式子被改變時，連帶影響到DOM上的元素，這裡列出幾個常用到的指令與介紹：

### v-if
透過`v-if`的情況，當`v-if`後的條件為`true`時，該元素就會顯示，若否則相反，並且該元素實際上會從DOM上消失。

```
<div id='app'>
  <div v-if='text1'>這段文字會顯示</div>
  <div v-if='text2'>這段文字不會顯示</div>
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

### v-show
和`v-if`很像，但`false`時的消失，實際只是被加上了`style="display:none"`而已，並沒有從DOM上消失。

### v-for
透過`v-for`的方式，我們可以將資料中的陣列遍歷出來，作法是在`v-for`後面的數值中，取一個任意的名稱(ex person)作為代表，取用方式如同一般我們要取出物件中的`value`一樣。另外也可以透過第二個參數的部分(ex index)來取得該筆資料的實際索引值。

```
<div id='app'>
  <ul>
    <li v-for="(person,index) in class">
      第{{ index }}筆資料，姓名：{{ person.name }}，年齡：{{ person.age }}
    </li>
  </ul>
</div>
<script>
let vm = new Vue({
  el:'#app',
  data:{
    class:[
      {
        name:'小明',
        age:12
      },
      {
        name:'小美',
        age:10
      },
      {
        name:'小華',
        age:11
      },
    ]
  } 
})
</script>
```

### v-model
透過`v-model`綁定在元素上，我們可以創造一個雙向綁定資料的概念，也就是說假設我在表單組件`input`上設置`v-model`並綁定到`data`中的`meesage`上，他除了會即時顯示`data.message`中資料以外，我們在更動`input`中的數值時也會同步更改回`data`中`message`的`value`。

```
<div id='app'>
  <input type="text" v-model="message">
</div>
<script>
let vm = new Vue({
  el:'#app',
  data:{
    message:'我會顯示在input中，input的value改變時也會改變到我'
  } 
})
</script>
```

### v-on
`v-on`顧名思義就是類似於原生js中的on事件，而使用方法一樣是要綁定的元素上，放一個`v-on`的屬性，例如，我們要在元素上定義一個點擊會`alert`一個提示的事件，我們就可以在後面寫上要觸發行為的條件(`click`)，並且在`value`的值內放入指定的`method`，範例如下：

HTML部分
```
<div id="#app">
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
除此之外，`v-on`也可以縮寫為`@`，我們將上面的範例改寫一下：
```
<div id="#app">
  <button type="button" @click="handleOnClick">Click Me!</button>
</div>
```
這樣的效果會跟上方一模一樣。

### v-bind
`v-bind`是Vue.js裡面還蠻重要的功能，它可以用來綁定DOM元素中的屬性，並且將屬性的值交由Vue.js來控管，因此我們便可以動態的去綁定、控制屬性，進而使得該元素變成是可控制的元素，這個觀念在React.js中也常常用到，而實作上常用到的一個做法就是控制元素的`class`。而範例我們將做一個由按鈕去驅動`data`中`isRotate`的值，並且由`v-bind:class`去管理`box`元素的`class`，範例如下：

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
HTML部分，這裡透過`v-on`去驅動`data`中`isRotate`的值，而`v-bind:class`中的意思為`rotate`的值綁定在`isRotate`上，若`isRotate`為`true`則替該元素加上`rotate`的class，若`false`則不添加`rotate`。
```
<div id="#app">
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
如此一來我們便可以使用button來trigger box的樣式，並且他是否在旋轉的狀態也變成可控制的項目。而不例外的常用到的這個功能也有縮寫的寫法，用法是省略`v-bind`只留下`:`的部分，範例修改上面後的如下：
```
<div id="#app">
  <div class="box" :class="{'rotate':isRotate}"><div>
  <button type="button" @click="isRotate = !isRotate"> Rotate the box</button>
</div>
```
大功告成！
若想看更多`v-bind`的用法[官網上也有更多詳細範例](https://cn.vuejs.org/v2/api/#v-bind)。


## 修飾符
介紹完`v-on`與`v-bind`後，順便提到修飾符(modifier)的概念，在Vue.js中，以半形句號(`.`)來表示，並且後綴在指令後面來表明觸發事件時會調用什麼方法，而修飾符分別有：
- [事件修飾符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)
- [按鍵修飾符](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)
- [系統修飾鍵](https://cn.vuejs.org/v2/guide/events.html#%E7%B3%BB%E7%BB%9F%E4%BF%AE%E9%A5%B0%E9%94%AE)

### 事件修飾符
事件修飾符是將常用的一些事件處理事件以後綴的方式綁定在我們所觸發的指令上，例如我們常會遇見的點擊冒泡觸發事件，以往我們會透過`event.preventDefault()`來處理這一類事件，而在Vue.js中我們可以用更快速的方式去綁定他：
```
<button type="button" @click.prevent="handleOnClick">Click Me!</button>
```

### 按鍵修飾符
按鍵修飾符則是將一些按鍵後綴呈現，提供鍵盤綁定觸發方法(method)的功能：
```
<input type="text" @keyup.enter="sumbitValid"/>
```
並且也同時支援keycode的特性，但目前已經廢除了
```
<input type="text" @keyup.13="sumbitValid"/>
```

### 系統修飾鍵
系統修飾鍵則是將事件綁定在要按下相對應的按鍵才能觸發方法的功能，假如上方範例我們還要多一個同時按下`shift`才能觸發的情境，就會變成：
```
<input type="text" @keyup.enter.shift="sumbitValid"/>
```
### 結尾
本次Vue.js的筆記就到這邊結束啦，相信透過這一章節大家也可以簡單地認識到一些Vue.js的實用功能，下一章節將會介紹一下Vue.js的`computed`、`methods`以及`watch`等等的用法。

### 參考資料

- [官方網站文件：https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)
- [六角學院影片：https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA](https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA)