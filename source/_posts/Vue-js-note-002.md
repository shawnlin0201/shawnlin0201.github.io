---
title: Vue.js學習筆記(二)data、computed、methods、watch
date: 2019-07-08 12:30:00
tags: vue.js
---

## 前言
[在上一章節中](https://shawnlin0201.github.io/2019/07/07/Vue-js-note-001/)，我們簡單介紹了Vue.js的環境架設與指令的部分，而這章節則要來討論Vue instance中常見到的一些option(`data`,`computed`,`method`,`watch`)的使用方法以及注意事項。

## data
為`Vue instance`的`data`對象，並且Vue會將其屬性轉換為`getter/setter`，也就是說我們可以對data的數值去做讀取與更動，並且對象均需要為純粹的`key/value pair`。而在instance被創立出來後，便可以透過`vm.$data`的方式讀取到`data`的對象，並且Vue也有包裝過，使得我們可以更單純的使用`vm.data`的方式得到其值。

這邊採用官網的範例：
```
let vm = new Vue({
  data:{
    a : 1,
  }
})

```
而其中最需要注意的是，當我們今天如果是使用component的方式創造，`data`則必須聲明為返回一個初始數據對象的函數，如下：

```
Vue.component('my-component',
  data : function(){
    return {
      a : 1
    }
  }
)

```
其原因在於，若`data`我們如果仍然只是使用純粹的數據對象，則我們在創建多個實體時，數據對象將會被共享，白話的說，若我們想要元件間擁有個別的數值，我們必須使用`function`來切割，這邊可參考javascript中`call by value`、`call by reference`與`scope`的概念。

而另外一個須注意的地方是，在`data`中如果使用了es6的箭頭函式(`arrow function`)，則`this`不會指向原先的實體(`instance`)。

介紹完`data`後，這裡主要補充說明幾個Vue.js在使用樣板語法時常用到的幾個api，而其中一個就是`computed`，

## computed

computed顧名思義是在計算，而他要計算的是什麼呢？就是我們在`data`中塞的數據對象，我們可以依靠computed去運行原先在樣板語法中塞入的javascript，例如我們想要寫一個匯率計算的樣板，我們可能要對原本的數據做運算，因此我們會寫成：

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
但量少還好，量一多或運算開始複雜後這樣在HTML的部分可能會太過複雜，因此我們這時候便可以使用`computed`來計算：
```
<div id="app">
  目前擁有台幣：{{ money }}元。
  轉換為日幣後：{{ JPY-Dollar }}日圓。
</div>
```
```
let vm = new Vue({
  el:'#app',
  data:{
    money:1000,
  },
  computed:{
    JPY-Dollar : function(){
      return this.money / 0.3
    }
  }
})
```
這樣改變後，便可以將計算屬性，綁定為Vue的實例，並且在使用樣板語法的時候可以更加的直觀，也避免在樣板中有過多的計算干擾視覺。而使用`computed`要注意的地方在於，若其function中沒有使用到`data`的數據對象時，**則資料將會無法更新！**因此若確定每次使用都會更新到的部分建議還是使用`methods`的方法來驅動。

## methods
與`computed`不一樣的是，`methods`可以直接透過`vm instance`直接來調用，並且也可以在指令表達式中去使用，除此之外還能將參數帶入其函式中。

```
<div id="app">
  <button @click="hello("Shawn")" type="button">{{text}}</button>
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

而`methods`要注意的地方是其function的部分不能使用`arrow function`，否則`this`將會拋出`undefined`。

## watch

`watch`在其綁定的數據對象有更動時會即時監聽並且執行對應的對象，通常也用於異部執行數據變化時，參考官網的範例如下：

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
這個範例是簡單透過yesno網站所提供的api去實作晚餐要不要吃這個，使用者在`input`輸入問題後，透過上篇提過的`v-model`雙向綁定資料到`data`中的`question`，進而透過資料去驅動監聽`question`的`watch`，而`watch`再去啟動對應欄位`question`裡頭的方法，裡頭的方法使用到了`methods`裡的`getAnswer`，接著`getAnswer`發送了一個`fetch`到[https://yesno.wtf/api](https://yesno.wtf/api)並得到一個回應後，透過第一個`then.(res=>res.json())`把他打包成json格式，接著再從第二個then把資料灌回`data`中的`answer`。

### 結尾
這篇簡單介紹了Vue.js的`computed`、`methods`以及`watch`等等的用法，基本上搭配上一篇的指令後，就可以實作出許多有用的小工具了，而接下來下一篇章節將會講到Vue.js的生命週期，瞭解生命週期將會對Vue.js有更加完整的認識，就讓我們繼續前進吧！


### 參考資料

- [官方網站文件：https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)
- [六角學院影片：https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA](https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA)
