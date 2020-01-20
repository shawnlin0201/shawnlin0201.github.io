---
title: Vue-cli What is Vuex? Why do we need Vuex?
date: 2019-10-07 19:08:53
tags:
- [前端]
- [JavaScript]
- [Vue.js]
- [Vue-cli]
- [Vuex]
categories: 
- [JavaScript, Vue.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/vue-logo.png' width='200px' height='200px' />
</div>

## 前情提要
這幾天陸陸續續講解了 Vue.js 在 Vue-cli 裡偏向實作的說明，而目前我們也已經完成了一個簡單的元件，可以透過父層引用這個元件時，將需要的資料傳遞給元件，使子元件可以在不同頁面、區塊重複使用。

然而昨天有提出了一個問題，**「假設今天不同頁面（不同 .vue 檔案），都要使用共同的狀態時，我們應該如何處理？」**

<!--more-->

![https://ithelp.ithome.com.tw/upload/images/20191007/20119062j4oXCz4l8w.png](https://ithelp.ithome.com.tw/upload/images/20191007/20119062j4oXCz4l8w.png)

如果大家還有印象，我們之前曾經在 Vue.js 章節中講過類似的 [傳遞](https://ithelp.ithome.com.tw/articles/10215277) ，在當時我們提到了子元件可以透過 `$emit` 去發送事件給另一個 Vue 實體（例如當時命名的 `bus`），而父元件就可以藉由監聽 `bus` 上的事件，等待其他元件去觸發他，從而達到**事件的集中管理**。

而**資料狀態**的集中管理，在 Vue.js 則是藉由一個簡單的 `store` 來達成：

![https://ithelp.ithome.com.tw/upload/images/20191007/201190623CyZpsmxn6.png](https://ithelp.ithome.com.tw/upload/images/20191007/201190623CyZpsmxn6.png)

建立一個 store 物件，而各個 Vue 實體引入該 store 來做為狀態的集中管理：

```
let store = {}

let vmA = new Vue({
  data: store
})

let vmB = new Vue({
  data: store
})
```

只要 `vmA` 或 `vmB` 任一方更動了 store 裡的資料都會觸發雙方因**資料改變而驅動視覺改變**的過程。

而這個過程必須遵循著之前所提的單向資料流的部分，我們應該由視覺（view）的部分去觸發事件（action），而讓事件去更改狀態（state），最後狀態（state）會更新視覺（view）：
![https://ithelp.ithome.com.tw/upload/images/20191007/20119062llpUTj8JUN.png](https://ithelp.ithome.com.tw/upload/images/20191007/20119062llpUTj8JUN.png)

## Vuex

今天要介紹的 Vuex 其實就是綜合了以上的概念，將**資料狀態與事件操作集中管理的一項工具**。

![https://ithelp.ithome.com.tw/upload/images/20191007/20119062FSAgtZHqGQ.png](https://ithelp.ithome.com.tw/upload/images/20191007/20119062FSAgtZHqGQ.png)

在 Vuex 中，主要負責的是上圖綠色框中的部分，左邊 Vue.component 則是元件本身自己的部分，而元件本身最主要的工作就是藉由發送（dispatch）給 Vuex，Vuex 幫我們處理了後續的內容之後，藉由更改狀態（state）來觸發元件本身重新渲染。

因此單看元件本身的話，**元件本身**會需要的是：
- **寫下發送（dispatch）的事件**
- **接收 Vuex（store） 裡的狀態（state）**

而在 Vuex 中的**狀態管理倉庫（store）中則會提供**：
- **Actions** ：接收來自元件發送（dispatch）的事件，並且提交（commit）事件給 Mutations 去執行他該做的事情。
- **Mutations** ：接收來自 Actions 的事件，並且發送變更（Mutate）給 store 裡本身的 State。
- **State** ：接收來自 Mutations 發送的變更，更改 State 自己本身的狀態。

以昨天更改好的 Home.vue 為例子，原先在 data 中的資料改成放置在 store 中的 action 去跟後端呼叫，取而代之的是以 computed 去抓取 store 中的值，並且在 created 生命週期中發送 `getIronmanData` 事件給 store：

```
<script>
import infoBoard from "@/components/board/articleBoard";

export default {
  name: "home",
  components: {
    infoBoard
  },
  created(){
    this.$store.dispatch('getIronmanData')
  },
  computed:{
    ironmanData(){
      return this.$store.state.ironmanData
    }
  }
};
</script>
```

而在 /src/store.js 中，我們在 actions 區塊放入監聽事件名稱對應的函式 `getIronmanData` 並將 `context` 參數傳入，透過 `context.commit` 將發送的事件提交給 Mutations 來做變更：

```
actions: {
    getIronmanData (context) {
      fetch('https://raw.githubusercontent.com/shawnlin0201/ironmanData/master/ironman.json')
        .then(res => res.json())
        .then(res => {
          context.commit('setItonmanData', res)
        })
    }
}
```

mutations 區塊則是放入 actions 所提交的事件名稱 `setItonmanData` 並將 `state` 與 `payload` 傳入函式當中，這裡的 state 指向的是 store.state，而 payload 則是前面 actions 函式所帶進來的數值：
```
mutations: {
    setItonmanData (state, json) {
      state.ironmanData = json
    }
},
```

最後在 state 中放入初始值即完成一個簡單的狀態集中管理。

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ironmanData: {}
  },
  mutations: {
    setItonmanData (state, json) {
      state.ironmanData = json
    }
  },
  actions: {
    getIronmanData (context) {
      fetch('https://raw.githubusercontent.com/shawnlin0201/ironmanData/master/ironman.json')
        .then(res => res.json())
        .then(res => {
          context.commit('setItonmanData', res)
        })
    }
  }
})
```

現在的程式碼概念如下：

![https://ithelp.ithome.com.tw/upload/images/20191007/20119062DELL7jQX63.png](https://ithelp.ithome.com.tw/upload/images/20191007/20119062DELL7jQX63.png)

而最後顯示的畫面理所當然的是……還是一樣

![https://ithelp.ithome.com.tw/upload/images/20191007/20119062E0sXO8pBst.jpg](https://ithelp.ithome.com.tw/upload/images/20191007/20119062E0sXO8pBst.jpg)

![https://ithelp.ithome.com.tw/upload/images/20191007/2011906215bC8QVWPG.jpg](https://ithelp.ithome.com.tw/upload/images/20191007/2011906215bC8QVWPG.jpg)

正如梗圖所示，Vuex 最終在做的事情是方便各個元件要取得、修改同筆資料來源時，能夠有個**狀態集中管理**的地方，協助我們處理不同元件間最後**視覺層上的一致性**，但假如項目只是個單純一頁網站、沒有太多元件引用同隻資料來源，則 Vuex 確實是不一定加入項目當中的，所以工具選用上還是要自己權衡一下是否真的需要，否則會有點殺雞用牛刀的感覺！

當然，Vuex 的部分其實還不僅止於此，假設項目真的大到 store 塞滿滿的話，我們還有 [Module](https://vuex.vuejs.org/zh/guide/modules.html) 的方式去管理 store 的部分，並且如果 store 中的 state 狀態需要很多計算的話，其實可以利用 [getter](https://vuex.vuejs.org/zh/guide/getters.html) （有如元件中的 computed）來先計算好數值再傳給元件去重新渲染等等，但這麼一說下去可能這系列會寫不完吧（？，所以明天我們會先回頭來介紹 Vue.router 要如何使用再做打算吧！

> 今天就以阿橘的肉球跟大家說再見！
> ![https://ithelp.ithome.com.tw/upload/images/20191007/201190629y4SXlpmsv.jpg](https://ithelp.ithome.com.tw/upload/images/20191007/201190629y4SXlpmsv.jpg)