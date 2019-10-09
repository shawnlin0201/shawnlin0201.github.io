---
title: Vue.js 元件傳遞 event
date: 2019-09-14 15:53:38
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

上一章節中，我們介紹了父元件如何透過 `props` 傳遞資料給子元件，並且使用**型別設定**來規範傳進元件中的值，而今天要來介紹**子元件要如何傳遞資料給父元件**。

![https://ithelp.ithome.com.tw/upload/images/20190913/20119062xmubDbCYt5.png](https://ithelp.ithome.com.tw/upload/images/20190913/20119062xmubDbCYt5.png)

昨天在解說這張圖的時候，有提到了一個單向資料流的概念，Vue.js 只允許我們透過 `props` 來傳遞資料給 子元件，為了避免一些不可預期更改導致最後不知道是哪個子元件去更改了父元件的資料，那麼如果子元件真的有需求，想要傳遞資料給父元件的話，官方給了一個作法是 `emit event` 發送事件。

透過子元件發送事件給父元件，父元件的部分可以藉由**監聽**這個任務事件，去觸發相對應的行為，而藉由這個做法，就可以達成類似於**子元件傳遞資料給父元件**的行為，並且**仍然是單向資料流的行為**，而實際上要怎麼來發送事件以及監聽事件就一起來看看下面的範例：

> 這個範例中我們將會跟上一章節一樣，做一個父元件可以將資料傳遞給子元件的表單，但不一樣的事情是我們將會在子元件中新增一個按鈕，藉由**點擊按鈕**來觸發**將我們輸入在子元件的內容資料傳遞給父元件**。

在 HTML 的部分，我們一樣先建立一個基礎的版型，：

```
<div id="app">
    <p>父元件：<br>
        {{ message }}<br>
        <input type="text" v-model="message">
    </p>
    <p>子元件：
        <child-component :parent-message="message"></child-component>
    </p>
</div>
```

JavaScript 也是一樣建立一個基本的實體：

```
let vm = new Vue({
    el:'#app',
    data:{
        message : '父元件資料'
    }
})

Vue.component('child-component',{
    template:`
<div> {{ parentMessage }} <br>
  <input type="text" v-model="parentMessage">
  <button type="button">Update</button></div>`,
    props:{
        parentMessage: String
    },
    data: function(){
        return {
            message : this.parentMessage
        }
    }
})
```

現在我們已經擁有了父元件可以傳資料給子元件，並且子元件同樣只能更改屬於自己資料的表單，接下來我們要撰寫的部分是在按鈕點擊的時候要發送事件，而發送事件的行為我們同樣是將函式寫在 `methods` 當中，只是我要註冊的對象我們可以透過 `this.$parent` 來捕捉，並藉由 `$emit` 來發送行為。

而 `$emit` 函式使用方法是在第一個傳送參數中，填入要觸發方法的名稱，就像是告訴對方說我要做什麼事情：而第二個傳送參數則是傳入想要給予對方什麼樣的內容。
```
Vue.component('child-component',{
    template:`
<div> {{ parentMessage }} <br>
  <input type="text" v-model="parentMessage">
  <button type="button" @click="updateText">Update</button></div>`,
    props:{
        parentMessage: String
    },
    data: function(){
        return {
            message : this.parentMessage
        }
    },
    methods:{
      updateText: function(){
        this.$parent.$emit('update',this.parentMessage)
      }
    }
})
```

將上方的範例更改之後，現在的子元件 `child-component` 已經可以發送給父元件一個 `update` 事件，並且將要傳遞的資料 `this.parentMessage` 傳送給父元件。

接著在父元件的部分，我們則是要註冊一個監聽事件，用來監聽其他人發送給他的事件，而本次監聽的方法，我們寫在父元件實體中的 `mounted` 生命週期鉤子中，透過 `$on`這個方法來監聽目標的事件，同樣的第一個傳送參數是**我們要監聽的事件名稱**，第二個則是監聽到這個事件的時候，元件要選擇做什麼事情；而這裡我們是選擇監聽到這個事件之後，我們要去觸發 `selfUpdate` 的這個函式，這個函式將會將元件自己的資料，賦與傳遞進來的值。

```
let vm = new Vue({
    el:'#app',
    data:{
        message : '父元件資料'
    },
    methods: {
      selfUpdate(value){
        this.message = value
      }
    },
    mounted() {
      this.$on('update', this.selfUpdate)
    },
})
```

[範例連結請點我！](https://codepen.io/ShawnLin0201/pen/MWgBWpe)

透過這個方式大家可以很明顯地看到，**子元件其實並沒有真正直接傳遞資料給父元件**，而是雙方**各自註冊了事件去溝通要傳遞什麼資料**，如此一來父元件最後更新的掌握權利還是**保留在自己**身上，若是子元件自己單獨想要發送資料給父元件的話，是同樣無法使父元件觸發行為的，且最後要不要將傳遞資料更動到自己本身的資料上也是由父元件自己所掌握，這樣能使得傳遞的資料來源流向更加的清晰，也解決子元件想要傳遞給父元件資料的這個問題。

而到目前為止，我們已經學會了父元件傳遞資料給子元件的方法，也學會了子元件傳遞給父元件的正確知識~~姿勢~~，但事情總不會這麼簡單就結束！假如今天我們是要將子元件傳遞給另外一個子元件的時候，我們可以怎麼做呢？這邊就留個謎底給大家想想，明天我們將會公布解答！

> 隨文小故事
最近發現黑黑好像對於自己是黑色的貓這件事情感到很無奈，時常發現他有的時候會照著鏡子發呆，難道他想要變成白貓嗎？
黑黑：我很黑我也很無奈好嗎
![https://ithelp.ithome.com.tw/upload/images/20190914/20119062vxXds9RVWs.jpg](https://ithelp.ithome.com.tw/upload/images/20190914/20119062vxXds9RVWs.jpg)