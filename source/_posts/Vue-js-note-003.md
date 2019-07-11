---
title: Vue.js學習筆記(三)lifecycle
date: 2019-07-09 14:33:32
tags:
- [前端]
- [JavaScript]
- [Vue.js]
categories: 
- [前端, JavaScript, Vue.js]
---

![](/images/vue-logo.png)

# 前言
Vue.js的生命週期，隨著Vue.js的更新，Vue.js的生命週期也變化了不少，本篇文章討論時Vue.js的版本在2.x(3即將要推出)，因此若生命週期發現有不太一樣的地方請先確認版本號一致囉！

![](/images/vue-lifecycle.png)

# 生命週期
上方這張圖就是Vue的生命週期，而生命週期主要是在說明一個元件從生(初始化)到死(註銷)的過程，對於生命週期良好的理解，可以更有效的運用他，譬如我們要在哪個階段加載ajax的資料、我們要在哪個階段之後才能開始撈`data`的資料等等。而為了要好好地瞭解Vue.js的生命週期，我們可以透過一個簡單的範例，來捕捉各種生命週期的狀態：
HTML部分
```
<div id="app">
    {{ message }}
<div>
```
JavaScript部分
```
let vm = new Vue({
    el:'#app',
    data:{
        message:'get Data!',
    },
    methods:{
        handleOnClick: function(){
            alert(this.message)
        }
    },
    beforeCreate: function(){
        alert('beforeCreate')
        alert("el屬性： "+this.$el)
        alert("data資料： "+this.$data.message)
    },
    created: function(){
      alert('created')
      alert("el屬性： "+this.$el)
      alert("data資料： "+this.$data.message)
    },
    beforeMount: function(){
      alert('beforeMount')
      alert("el屬性： "+this.$el)
    },
    mounted: function(){
        alert('mounted')
        alert("el屬性： "+this.$el)
    }
})
```
## new Vue
初始化Vue實例。

## init events $ lifecycle
開始初始化Vue的生命週期。

## beforeCreate (hooks)
由`alert`取得`$el`與`data`結果均為`undefined`的結論得出，在此週期下，`$el`尚未被建立，且`data`此時也尚未被定義出來，說明在這個階段中我們可以做的基本上是在於資料尚未被讀取進來的事情。而此階段Vue.js的`init.js`當中，還尚未初始化`props`、`data`、`methods`、`watch`、`computed`所以顯然上述的功能基本上是都不能夠使用的。

## init injection & reactivity
開始注入依賴項目。

## created (hooks)
由`alert`取得`$el`結果為`undefined`，`data`的結果為`get Data!`的結論得出，在此週期下，`$el`尚未被建立，但`data`此時已經可以讀取的到了，在這個階段中我們可以做的基本上是在於資料尚未被讀取進來的事情。而此階段Vue.js的`init.js`當中，還已經初始化`props`、`data`、`methods`、`watch`、`computed`，因此也說明了若想要使用`data`等等的資料的話，至少得等到`created`這個階段才可以使用。

## el檢查
這個階段會檢查Vue實體中是否含有`$el`的項目，有的話就繼續檢查是否含有`template`，沒有的話則是等到手動調用vm.#mount(el)的時候才繼續。

## template檢查
這個階段會檢查Vue實體中是否含有`template`的項目，沒有的話會將被`$el`綁定的`outerHTML`區域作為樣板替換，若有的話則是將`template`編譯進`render function`。

## beforeMount (hooks)
由`alert`取得`$el`結果顯示此時已經抓的到`$el`，也就是說在此週期下DOM已經被Vue.js加載了一個新的元素。但此時的差異在於，`$el`裡面的樣板語言尚未被賦予值進去，所以顯示的仍然是兩個花括號的部分`{% raw %}{{ message }}{% endraw %}`。

## mounted (hooks)
由`alert`取得`$el`結果顯示此時已經抓的到`$el`，並且此時樣板語言的部分也確實將資料對象傳遞進去，因此最後看到的`$el`的部分是顯示`get Data!`的字串而非`{% raw %}{{ message }}{% endraw %}`了。而一般初始化的Vue元件的必經之路到此階段就結束了(**除了使用`keep-alive`的元件，`keep-alive`元件再次渲染時並不會觸發`created`、`mounted`等hooks**)，因此我們可以再次看向官網的說明圖中，此階段後的線條是虛線的部分。

## beforeUpdate (hooks)
此生命週期發生在資料即將被更新前，這個階段主要可以用在得知哪個元件即將發生資料改動，並且可以移除對其綁定的事件監聽器。

## updated (hooks)
此階段已經重新渲染完成資料更新後的狀態，並且要注意在此期間更改狀態，如果要更改官方建議使用`computed`或`watch`來進行資料更改。

## beforeDestroy (hooks)
當一個實體要被銷毀前會觸發此生命週期(譬如透過主動調用`vm.$destroy()`或是當該元素所綁定的`v-if`條件為`false`時)。而這個階段我們可以做一些提醒的動作，例如`alert`來確認使用者的意圖。

## destroyed (hooks)
當一個實體已經被銷毀時會觸發此生命週期，這個階段的銷毀意味著所綁定的`watcher`、`child components`以及`event listeners`等等已經與原本元素毫無關聯了，但要注意的事情是父元件已經渲染在DOM上的視圖仍然會保留在頁面上，只有子元件會完全消失。

## 補充
當我們為了要保留被銷毀元件的狀態時會使用到`keep-alive`的功能，而用了`keep-alive`的元件才會觸發以下兩個Hook。
- activated
- deactivated

### activated
當使用`keep-alive`的元件被渲染時會觸發這個hook。

### deactivated
相對於`activated`，當使用`keep-alive`的元件被銷毀時會觸發這個hook。

## 補充2
另外，在2.5.0版本之後，Vue也新增了一個Hook。

#### errorCaptured
當`child-component`被捕獲到一個錯誤時，這個hooks會收到三個參數，透過此hooks，可以返回`false`來阻止錯誤繼續向外傳遞。


# 結尾
這篇介紹了Vue.js的生命週期，只能說簡單介紹了大致上他的輪廓，而底層實際運作的部分大家已經有用vue實作過一些專案，並且有興趣深入瞭解可以看看參考資料的第三篇文章，裡頭除了講解lifecycle是如何運作的，另外也有一些工具(`vue Router`,`Vuex`)的介紹，而下一篇的部分將會著重在component上，討論如何運用組件去完成Vue.js的專案。

# 參考資料

- [官方網站文件：https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)
- [六角學院影片：https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA](https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA)
- [Vue.js 技术揭秘：https://ustbhuangyi.github.io/vue-analysis/components/lifecycle.html](https://ustbhuangyi.github.io/vue-analysis/components/lifecycle.html)
- [包你理解---vue 的生命周期-egmentFault 思否：https://segmentfault.com/a/1190000014640577](https://segmentfault.com/a/1190000014640577)