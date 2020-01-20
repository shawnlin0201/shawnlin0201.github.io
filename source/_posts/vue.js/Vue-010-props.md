---
title: Vue.js 元件傳遞 props
date: 2019-09-13 13:03:49
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

## 單向資料流

前面章節大部分的範例都是取用元件自己本身的 data 來操作的，而實際開發時的元件最主要是用來當作一個可重複利用的樣板，裡面即使有 data 的存在，可能大部分也是用於預設值的初始化，更多時候子元件所接收到的資料，會來自於父元件所傳遞的。

而在傳遞資料時要遵守單向資料流的規定，意思是我們只能透過**父元件傳遞資料給子元件**，子元件並不能**直接傳遞資料給父元件**，這樣做的原因是當今天很有多子元件依賴父元件某項資料物件時，如果每個子元件都可以任意更改父元件的資料時，就容易造成牽一髮而動全身的行為，因此這種行為是被禁止。

![https://ithelp.ithome.com.tw/upload/images/20190913/20119062xmubDbCYt5.png](https://ithelp.ithome.com.tw/upload/images/20190913/20119062xmubDbCYt5.png)

<!--more-->

## props

在傳遞資料時，我們可以使用元件內的 `props` 選項來指定傳遞的資料名稱，如下面範例中，我們在子元件 `props` 中指定了元件外面可以傳遞給他的資料為 `childmsg` ，並在 `template` 中將傳遞進來的資料當作數值，分別放入樣板語法與 v-model 中以供顯示。

子元件 的部分：
```javascript
Vue.component("child-component", {
    template:
        '<div>{{ childmsg }} <br><input type="text" v-model="childmsg"></div>',
    props: {
        childmsg: String
    }
});
```

父元件 Vue.js 實體的部分：
```
let vm = new Vue({
    el: "#app",
    data: {
        parentmsg: "父元件資料"
    }
});
```

而在 HTML 部分中，我們跟之前章節一樣，使用已經註冊好的子元件標籤 `child-component`，並且在子元件的屬性中透過 `v-bind` (縮寫`:`)綁定來自於父元件本身的資料 `parentmsg`，接著子元件就能透過這種方法來得到傳遞的對象來源，假如今天是要傳入不同的資料，我們只要將 `:childmsg-message="parentmsg"` 中的 `parentmsg` 更改為其他資料來源即可。

```
<div id="app">
    <p>父元件：<br>
      {{ parentmsg }}<br>
      <input type="text" v-model="parentmsg">
    </p>
    <p>子元件：
      <child-component :childmsg="parentmsg"></child-component>
    </p>
</div>
```

[點我看線上範例](https://codepen.io/ShawnLin0201/pen/WNeyZqV)





# props 型別檢查
而在實際在工作上實作時，我們有可能會遇到`components`的部分是由 teammate 所撰寫的，因此在接手專案時，對於 `components` 的 `props` 型別檢查就特別重要，我們可以在 `props` 設定傳送資料時一起寫入一些設定，範例如下：

```
Vue.component('my-component',{
    props: {
        parentMsg: null,  // 表示傳遞進來的類別沒有限制
        parentMsgA: Number,// 表示傳遞進來的類別須為數字類型
        parentMsgB: [String, Number], // 表示傳遞進來的類別可以是字串或數字
        parentMsgC: {
            type: String, 
            required: true, // 表示使用這個元件時一定要有 `parentMsgC` 參數，否則會報錯
        },
        parentMsgD: {
            type: Number, 
            default: 100 // 表示如果沒有給予這個參數，則預設會顯示的資料為 100
        },
        parentMsgE: {
            type: Object,
            default: function(){
                return {
                    message : 'Hello Vue!' // 我們也可以透過傳送參數來返回一個資料物件
                }
            }
        },
        parentMsgF: {
            validator: function(value){
                return value > 100 // 我們也可以自己撰寫一個驗證器，來看傳進來的資料是否有符合條件
            }
        },

    }
})

```

以上是介紹父元件傳遞給子元件資料的方法，以及如何透過 `props` 的型別檢查來限制我們傳進去的資料，有效提升子元件不會被濫用的情況。而明天的章節，我們將會說明子元件如果真的想要傳遞資料給父元件時，我們可以透過什麼方式來執行？

阿橘在這裡也祝大家中秋佳節愉快
![https://ithelp.ithome.com.tw/upload/images/20190913/20119062H4W48vp757.jpg](https://ithelp.ithome.com.tw/upload/images/20190913/20119062H4W48vp757.jpg)