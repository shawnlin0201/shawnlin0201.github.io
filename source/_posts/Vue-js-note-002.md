---
title: Vue.js系列(二)data、computed、methods、watch
date: 2019-07-08 12:30:00
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

# 前言
[在上一章節中](/2019/07/07/Vue-js-note-001/)，簡單介紹了Vue.js的環境架設、指令與修飾符的部分，而這章節則要來討論Vue instance中常見到的一些`options`(`data`,`computed`,`methods`,`watch`)的使用方法以及注意事項。

# data 資料
通常我們會將資料物件放在此`option`中，而Vue.js會將其屬性轉換為`getter/setter`，使我們可以對數值去做讀取與更動，而放入的物件均需要為純粹的`key/value pair`。而在實體中的生命週期`created`後，便可以透過`vm.$data`的方式讀取到`data`。另外透過Vue.js的包裝，同樣可以使用`vm.data`的方式得到其值。

這邊採用官網的範例：
```
let vm = new Vue({
  data:{
    a : 1,
  }
})

```
**其中最需要注意的是**，當我們今天如果是使用全域性的`components`的方式創造，`data`則必須聲明為返回一個初始資料物件的函數，如下：

```
Vue.component('my-component',
  data : function(){
    return {
      a : 1
    }
  }
)

```
其原因在於，若`data`仍然只使用純粹的資料物件，則在創建多個實體時，資料物件將會混淆，並且被元件所共享，因此Vue.js在這邊強制使用者必須返回一個初始資料物件的函數，白話的說，若我們想要元件間擁有個別的數值，我們必須使用`function`來切割（因為JavaScript切割`scope`的最小單位是`function`），這邊可參考javascript中`call by value`、`call by reference`與`scope`的概念。

而另外一個須注意的地方是，在`data`中如果使用了es6的箭頭函式(`arrow function`)，則`this`不會指向原先的實體(`instance`)。

# computed 計算屬性

computed顧名思義是在計算，而他要計算的是在`data`中的資料物件，當我們在樣板語言中做計算的時候，可以將其替代為`computed`中的物件，例如在實作一個匯率計算的樣板，可能要對原本的資料做運算：

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
此時我們這時候便可以使用`computed`來計算：
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
這樣改變後，便可以將計算物件綁定於實體中，並且在HTML樣板語法的部分可以更加的直觀，避免有過多的計算干擾視覺。
**而使用這個`option`要注意的地方在於**，若其function中沒有使用到`data`中的資料物件時，**則資料將會無法更新！**，因此若確定每次使用都會更新到的部分建議還是使用`methods`的方法來驅動。

# methods 方法
與`computed`不一樣的是，`methods`可以直接透過實體直接來調用，並且也可以藉由指令表達式使用，除此之外還能將參數帶入其函式中(`computed`是無法傳入參數的)。

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

**而`methods`要注意的地方是**，其function的部分不能使用`arrow function`，否則`this`將會拋出`undefined`。

# watcher 監聽器

`watch`在其綁定的資料物件有更動時會即時監聽並且執行對應的物件，通常也用於異部執行資料變化時，參考官網的範例如下：

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
這個範例是透過yesno網站所提供的api去實作一個決定晚餐要不要吃這個的應用程式，使用者在`input`輸入問題後，透過上篇提過的`v-model`雙向綁定資料到`data`中的`question`，進而透過資料去驅動監聽`question`的`watch`，而`watch`再去啟動對應欄位`question`裡頭的方法，裡頭的方法使用到了`methods`裡的`getAnswer`，接著`getAnswer`發送了一個`fetch`到[https://yesno.wtf/api](https://yesno.wtf/api)並得到一個回應後，透過第一個then把他打包成json格式，接著再從第二個then把資料灌回`vm.$data.answer`。

# 結尾
這篇簡單介紹了Vue.js的`data`、`computed`、`methods`以及`watch`等等的用法，搭配上一篇的指令後，就可以實作出許多有用的小工具了，而接下來下一篇章節將會講到Vue.js的生命週期，瞭解生命週期也將會對Vue.js有更加完整的認識！


# 參考資料

- [官方網站文件：https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)
- [六角學院影片：https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA](https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA)
