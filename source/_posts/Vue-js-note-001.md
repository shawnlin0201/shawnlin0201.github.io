---
title: Vue.js學習筆記(一)入門、環境搭建、指令與修飾符
date: 2019-07-07 17:30:00
tags:
- [前端]
- [JavaScript]
- [Vue.js]
categories: 
- [前端, JavaScript, Vue.js]
---

![](/images/vue-logo.png)

# 前言

由於最近正在學Vue.js，順手來記錄一下，目前也正不斷的校稿當中。我在使用Vue.js之前，曾經在專案有使用過React.js，所以這次學Vue.js上還蠻能理解他的邏輯架構，另外在React.js常常搭配的create-react-app，在Vue.js中也有Vue-cli可以使用。而這系列Vue.js的文章將會在最後介紹到Vue-cli以及後續的一些搭配工具，而這篇主要會從頭簡單介紹Vue.js的一些基本指令與環境搭建！要快速閱覽目錄可以透過右下方的menu觀看，有任何問題歡迎寄信到[我的信箱](mailto:shawnlin0201@gmail.com)討論喔！

# 為何要使用Vue.js？

## jQuery

任何一個開發工具都是在解決當代開發時所遇到的問題，而在前代前端開發中最常遇見的問題是瀏覽器整合上的問題，當時瀏覽器大戰，百家爭鳴，每家瀏覽器公司在開發瀏覽器渲染程式碼的程度以及支援都有所不同，而工程師當時得不斷的去閱讀文件、查看渲染結果是否是想要的藍圖，而當時jQuery的出現，便解決了這個問題，jQuery讓前端工程師在開發時能夠以他所定義的API下去執行，並交由jQuery去負責整合各家瀏覽器的支援，讓工程師能以簡潔的用法來編寫程式碼，能更加專注在開發上，而現今仍然許多專案上也常常會需要用到他。

## Vue.js

既然jQuery的出現已經幫我們解決了這麼多問題，為何我們還需要使用Vue.js呢？原因在於傳統操作資料往往是透過`document.getElementById('ID')`等等方式去操作選取DOM元素，並且在其中(如`innerHTML`)塞入我們所要的資料。量少還不是問題，但量一多就會出人命，並且直接對DOM的操作也對效能帶來相當大的影響，假如我們今天要在一百個地方放入資料，我們可能就得捕捉一百次DOM元素，再放入我們的資料。

而Vue.js的出現便解決了這個問題，Vue.js將資料綁定的部分由包裝好的樣板語法來渲染，並且透過虛擬DOM的運算來提升渲染的效能，我們可以透過指令(Directives)來快速對資料來進行操作與顯示。而在學習上Vue.js也相對平易近人，環境的搭建非常容易，且最重要的是，由於Vue.js的開發作者是中國人，因此它的說明文件是支援全中文的！有興趣的朋友可以點[這裡](https://cn.vuejs.org/)看看。然而實際上要怎麼透過Vue.js操作資料？接下來會一一向各位介紹……

# 快速體驗
想要快速體驗Vue.js的朋友們，不用煩惱環境部屬是否很困難，因為Vue.js有提供快速的環境搭建方式：

## 環境搭建
目前最快的搭建方式，是使用官網提供的CDN直接引入，而引入的版本主要有下面兩種：

**開發版本：**這個版本包含了**完整的開發人員工具**以及**提示報錯**等等的協助，適合**開發**時使用。
**生產版本：**這個版本則是將上述開發工具都拔除，盡量縮小它的體積，適合**正式發布**時使用。

而我們目前主要目的是體驗開發，因此選擇開發版本，然後透過script標籤引入Vue.js後即可：

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


而在引入Vue.js後，我們便可以開始撰寫HTML以及JavaScript的部分，首先HTML的部分要有個可以讓Vue.js實體(instance)抓到要渲染的元素節點，我們可以使用id來命名，通常會使用`<div id='app'></div>`，並且在JavaScript的部分以new初始化，而初始化裡面的options，則是使用`el`指定剛才命名的id為`app`的物件作為綁定，使用`data`來存放資料物件，接著就能夠在HTML部分中以兩層花括號`{% raw %}{{ message }}{% endraw %}`的方式指定要顯示的資料物件，而畫面上便會顯示出'Hello, world'的部分。範例如下：

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
而在知道怎麼透過Vue.js顯示資料後，接著來學習如何有條件的、遍歷輸出我們所想要的資料！在Vue.js中有提供一些帶有前綴`v-`的一些指令(directives)，而這些指令的功用在於當條件表達式符合條件時，會對應的影響到DOM上的元素，這裡列出幾個常用到的指令與介紹：

### v-if
透過`v-if`指令，當`v-if`後的條件為`true`時，該元素就會顯示在DOM上，若`false`則該元素實際上會從DOM上消失，並且會觸發生命週期中的`destroyed`鉤子。

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
和`v-if`很像，但`v-show`在`false`時的消失，實際觀察DOM會發現該元素只是被加上了`style="display:none"`而已，並沒有從DOM上消失。

### v-for
透過`v-for`指令，我們可以將`data`中的陣列遍歷出來，用法是在元素上綁定`v-for`指令，並在指令對應物件取一個任意名稱作為代表(範例使用person)，而在樣板語法中取用方式如同一般我們要取出物件中的`value`一樣。另外也可以透過第二個參數的部分(範例使用index)來取得該筆資料的陣列索引值。

```
<div id='app'>
  <ul>
    <li v-for="(person,index) in class" :key="person.id">
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

**需要注意的地方**，在使用`v-for`指令輸出時，[官網強烈建議](https://cn.vuejs.org/v2/style-guide/#%E4%B8%BA-v-for-%E8%AE%BE%E7%BD%AE%E9%94%AE%E5%80%BC-%E5%BF%85%E8%A6%81)需要給予相對應的`key`來作為可識別的資料，以便於我們在對資料做操作時，Vue.js能夠準確的找到資料物件`data`是綁定在哪個元素上，而`key`的選用建議是使用資料物件`data`中帶有的唯一鍵(`unique key`)，並建議不要使用`v-for`指令帶來的第二個參數(`index`)來當作`key`，否則在某些情境下將發生不可預期的錯誤。

**另外一個須注意的地方是**避免`v-for`與`v-if`在同一個地方上使用，因為有可能會渲染到本來應該會隱藏的欄位，而官方也做了[詳細解釋](https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7-%E5%BF%85%E8%A6%81)。

### v-model
透過`v-model`指令綁定在元素上，可以創造一個雙向綁定資料的概念，也就是假設在表單組件`input`上設置`v-model`並綁定到`data`中的`message`上，他除了會即時顯示`vm.$data.message`中的資料以外，我們在更動`input`中的`value`時也會同步更改回`vm.$data.message`中的資料。

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
`v-on`指令使用方法類似於使用HTML原生屬性`on`一樣。例如，要在元素上定義一個點擊會`alert`的事件，可以在`v-on`後面寫上要觸發行為的條件(`click`)，並且在對應的數值內放入指定的`methods`，範例如下：

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
除此之外，`v-on`也可以縮寫為`@`，我們將上面的範例改寫一下：
```
<div id="app">
  <button type="button" @click="handleOnClick">Click Me!</button>
</div>
```
這樣的效果會跟上方一模一樣。

### v-bind
`v-bind`是Vue.js裡面最常使用的指令，它可以用來綁定元素中的屬性，並且將屬性的值交由Vue.js中的`data`來控管，來達到動態控制，使該元素變成是可控制的元素，這個觀念在React.js中也常常用到，而實作上常用到的一個做法就是控制元素的`class`屬性。而範例將示範一個由按鈕去驅動資料讓元素的class能動態變化：

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
HTML部分，這裡透過`v-on`去驅動`data`中`isRotate`的值，而`v-bind:class`中的意思為將`rotate`這個class對應到在`vm.#data`中的`isRotate`上，若`isRotate`為`true`則替該元素加上`rotate`的class，若`false`則不添加`rotate`到元素身上。
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
如此一來我們便可以使用按鈕來驅動元素樣式。而常用到的這個指令也有縮寫的寫法，用法是省略`v-bind`只留下`:`的部分，範例修改上面後的如下：
```
<div id="app">
  <div class="box" :class="{'rotate':isRotate}"><div>
  <button type="button" @click="isRotate = !isRotate"> Rotate the box</button>
</div>
```

而關於其他更多`v-bind`的用法官網上有更多詳細範例說明可以[參考這裡](https://cn.vuejs.org/v2/api/#v-bind)。


## 修飾符
介紹完`v-on`與`v-bind`後，順便提到修飾符(modifier)的概念，在Vue.js中，修飾符以半形句號(`.`)來表示，並且後綴在指令後面來表示觸發事件時會調用什麼方法，而修飾符分別有：
- [事件修飾符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)
- [按鍵修飾符](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)
- [系統修飾鍵](https://cn.vuejs.org/v2/guide/events.html#%E7%B3%BB%E7%BB%9F%E4%BF%AE%E9%A5%B0%E9%94%AE)

### 事件修飾符
事件修飾符是將常用的一些事件處理事件綁定在我們所觸發的指令上，例如我們常會在實作上遇見的點擊冒泡觸發事件，以往我們會透過`event.preventDefault()`來處理這一類事件，而在Vue.js中我們可以用更快速的方式去處理，在`@click`後面加上`.prevent`就能夠在觸發`handleOnClick`的方法時也觸發`event.preventDefault()`：
```
<button type="button" @click.prevent="handleOnClick">Click Me!</button>
```

### 按鍵修飾符
按鍵修飾符則是提供鍵盤綁定觸發方法(`methods`)的功能，例如當我們要使用按下`enter`鍵時啟用方法：
```
<input type="text" @keyup.enter="sumbitValid"/>
```
另外，按鍵修飾符也支援keycode的用法，只可惜目前已經廢除了。
```
<input type="text" @keyup.13="sumbitValid"/>
```

### 系統修飾鍵
系統修飾鍵則是將事件綁定在要按下相對應的按鍵才能觸發方法的功能，假如上方範例還要多一個同時按下`shift`才能觸發的情境，就會變成：
```
<input type="text" @keyup.enter.shift="sumbitValid"/>
```
# 結尾
透過本篇Vue.js所介紹的指令以及修飾符，相信大家已經可以體驗到一些Vue.js的實際用法，而下一章節將會介紹一下Vue.js中`options`的一些常用api(`data`、`computed`、`methods`以及`watch`)。

# 參考資料

- [官方網站文件：https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)
- [六角學院影片：https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA](https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA)