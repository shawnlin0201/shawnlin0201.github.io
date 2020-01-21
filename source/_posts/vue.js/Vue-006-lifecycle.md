---
title: Vue.js 生命週期 lifecycle
date: 2019-09-09 01:44:29
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

![https://ithelp.ithome.com.tw/upload/images/20190909/20119062ONbDHOY5Nq.png](https://ithelp.ithome.com.tw/upload/images/20190909/20119062ONbDHOY5Nq.png)
## 生命週期

生命週期（如上圖）主要是在說明一個元件從生(初始化)到死(註銷)的過程，對於生命週期有良好的理解，可以更有效的運用他，譬如要在哪個階段載入 AJAX 的資料？哪個階段之後才能開始撈 `data` 裡的資料？為了解決這一類時機的問題，Vue.js 提供了這些**時機**的呼叫方式，稱之為 **hook**。而為了要好好地瞭解 Vue.js 的生命週期，下面透過一個簡單的範例，來捕捉各種生命週期的狀態：

<!--more-->

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

設定好一個 Vue.js 的實體之後，接著一步一步對照生命週期的圖來說明：

## new Vue
初始化 Vue.js 實體。

## init events $ lifecycle
開始初始化 Vue.js 的生命週期。

## beforeCreate (hooks)
在此週期下， `$el` 尚未被建立，且 `data` 此時也尚未被定義出來，說明在這個階段中我們可以做的基本上是在於資料尚未被讀取進來的事情。而深入查看 Vue.js 檔案 `init.js` 中，會發現此階段尚未初始化 `props`、`data`、`methods`、`watch`、`computed`等 `options` 所以顯然上述的功能基本上是都不能夠使用的。

## init injection & reactivity
~~9/9前原文：開始注入依賴項目。~~

比較好理解的話應該是**此階段會開始將父元件所提供的資料傳遞給子元件做接收**。也就是說在 `created` hook 執行前要將「提供/拿取 `data`值」這件事情給初始化完畢，以供使用。

在官方文件 [provide / inject](https://cn.vuejs.org/v2/api/#provide-inject) 一文中提到，父元件可以透過 `provide` 傳遞一個物件或是讓函式回傳一個物件的方法，供給子元件利用 `inject` 來得到該物件。

程式碼的部分則可以透過 Vue.js 官方 github 庫的檔案 [inject.js](https://github.com/vuejs/vue/blob/dev/src/core/instance/inject.js) 中可以瞭解到底層的運作方式。

## created (hooks)
由 `alert` 取得 `$el` 結果為 `undefined` ， `data` 的結果為 `get Data!` 的結論得出：

在此週期下， `$el` 尚未被建立，但 `data` 此時已經可以讀取的到了，說明在這個階段中我們可以做的基本上在於讀取資料相關的事情。深入研究，查看 Vue.js 中裡的檔案 `init.js` ，會發現已經初始化`props`、`data`、`methods`、`watch`、`computed`，因此也說明了若想要使用`data`等等的資料的話，至少得等到`created`這個階段才可以使用。

## el檢查
這個階段會檢查Vue實體中是否含有 `$el` 的項目，有的話就繼續檢查是否含有 `template`，沒有的話則是等到手動調用 `vm.$mount()` 的時候才繼續。

## template檢查
這個階段會檢查 Vue.js 實體中是否含有 `template` 的項目，沒有的話會將被 `$el` 綁定的 `outerHTML` 區域作為樣板替換，若有的話則是將 `template` 編譯進 `render function`。

## beforeMount (hooks)
由 `alert` 取得 `$el` 結果顯示此時已經抓的到 `$el`：

在此週期下 DOM 已經被 Vue.js 載入了一個新的元素。但此時的差異在於， `$el` 裡面樣板語法尚未被賦予值進去，所以顯示的仍然是兩個花括號的部分`{{ message }}`。

## mounted (hooks)
由 `alert` 取得 `$el` 結果顯示此時已經抓的到 `$el`，並且此時樣板語法也確實的將資料傳遞進去，因此最後看到的是顯示`get Data!`的字串而非 `{{ message }}` 了。而一般初始化的 Vue.js 元件的必經之路到此階段就結束了 (**除了使用`keep-alive`的元件，`keep-alive`元件再次渲染時並不會觸發`created`、`mounted`等hooks**)，因此我們可以再次看向官網的說明圖中，此階段後的線條是虛線的部分。

## beforeUpdate (hooks)
此生命週期發生在資料即將被更新前，這個階段主要可以用在得知哪個元件即將發生資料改動，並且可以移除對其綁定的事件監聽器。

## updated (hooks)
此階段已經重新渲染完成資料更新後的狀態，並且要注意在此期間更改狀態，如果要更改官方建議使用`computed`或`watch`來進行資料更改。

## beforeDestroy (hooks)
當一個實體要被銷毀前會觸發此生命週期(譬如透過主動調用`vm.$destroy()`或是當該元素所綁定的`v-if`條件為`false`時)。而這個階段我們可以做一些提醒的動作，例如`alert`來確認使用者的意圖。

## destroyed (hooks)
當一個實體已經被銷毀時會觸發此生命週期，這個階段的銷毀意味著所綁定的`watcher`、`child components`以及`event listeners`等等已經與原本元素毫無關聯了，但要注意的事情是父元件已經渲染在DOM上的視圖仍然會保留在頁面上，只有子元件會完全消失。

### 補充：觸發渲染 Render 時機

透過以上生命週期，大致上已經可以瞭解每個周期 Vue.js 正在做什麼事情、我們能做什麼事情了，而觸發渲染的關鍵時刻是`beforeMount`到`mounted`時以及`beforeUpdate`至`updated`的這兩個階段。

最後如果在編寫 Vue.js 時有遇到哪邊渲染有問題，或是資料讀取不到的時候，不彷查看一下是不是做了生命週期所不能及的事情喔！

黑黑：沒有我所不能及的事情！（翻滾）
![https://ithelp.ithome.com.tw/upload/images/20190909/20119062gSCDaeWfkk.jpg](https://ithelp.ithome.com.tw/upload/images/20190909/20119062gSCDaeWfkk.jpg)
