---
title: Vue.js nextTick 原理與應用
date: 2000-00-00 00:00:00
tags:
- [w3HexSchool]
- [前端]
- [JavaScript]
- [Vue.js]
categories: 
- [JavaScript, Vue.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="vue-logo" src='/images/vue-logo.png' width='200px' height='200px' />
</div>

在現代網頁開發時，使用 Vue.js 等現代框架時，由於框架會採用 **Virtual DOM** 來進行 DOM 相關的處理，避免一些直接控制 DOM 等昂貴的操作，連帶我們使用時也應盡量避免進行 DOM 的操作，以防與 Vue.js 實體本身的方法衝突。而各框架在進行 DOM 更新時實作方法也略有不同，Vue.js 雖然是透過偵測數據資料的變更來對 DOM 進行更新，但其實並不是**立即進行**的。

<!--more-->

根據 [Vue.js 文件](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97) 說明，有關於 DOM 的更新是採用**異步（asynchronously）**的策略，對於資料更新的部分會另外開啟一個隊列（queue）與緩衝器（buffer）來處理，而透過這樣的機制，即便我們透過 watch 這一類的 Hook 觸發了多次的更新，但也僅會推入隊列一次，並且最終在下一次事件循環（tick）後更新。

而便是這樣事件循環的機制，導致嘗試在實體中取得 DOM 上的值會取到未更新前的初始值：

```html
<template>
  <div id="example">{{ message }}</div>
</template>
```

```js
export default {
  name: 'some-component',
  data () {
    return {
      message = 'initValue'
    }
  },
  mounted () {
    this.message = 'newValue'
    console.log(this.$el.textContent === 'newValue') // false
    console.log(this.$el.textContent === 'initValue') // true
  }
}
```

透過上面 **.vue file** 範例結果可以看到，我們在這時取得 DOM 的資料仍是初始化前的資料，如果我們想要取得更新後的 DOM 數值時該怎麼做呢？

# nextTick
Vue.js 提供了一個回呼函式（callback function）**Vue.nextTick(callback)** 以供我們使用，由於 `nextTick` 方法是異步執行的，因此透過 callback function 我們能夠取得更新 DOM 後的數值：

```js
export default {
  name: 'some-component',
  data () {
    return {
      message = 'initValue'
    }
  },
  mounted () {
    this.message = 'newValue'
    console.log(this.$el.textContent === 'newValue') // false, should be 'initValue'
    this.$nextTick(function () {
      console.log(this.$el.textContent === 'newValue') // true
    })
  }
}
```

而關於事件循環中 `nextTick` 的機制如下：

![](/images/vue.js/vue-nextTick.png)

當我們在 `mounted` Hook 中給予 Vue 實體的 `message` 一個值後，DOM 並不會馬上做更新，在該事件循環中只能取得未更新前的資料。

而當程式碼依序執行的過程中，會將異步方法 `nextTick` 放入序列中，並且依序使用 `promise`、`MessageChannel ` 等等方法來執行，如果宿主環境（瀏覽器）都不支援的話就會採用 `setTimeout` 的方法來執行，等待所有程式碼都執行完畢，才更新 DOM。

更新完 DOM 後，由於這時主執行序（main thread）已經沒有事情了，接著剛剛採用異步策略的方法才會開始依序執行，而這時我們透過 `nextTick` 中的 callback function 便能夠取得 DOM 更新後的數值。

# 應用
而 `nextTick` 最大的使用時機就是在於當我們更新實體中的資料時，想要取得在資料驅動視覺下更新 DOM 後的數值。

```js
mounted () {
  this.$nextTick(function () {
    // 處理 DOM 更新後的一些操作
  })
}
```

透過這個方法可以稍微彌補 `mounted` Hook 對於 DOM 渲染不完全的一個缺點。

# 資源參考

- [Virtual DOM 概述](https://cythilya.github.io/2017/03/31/virtual-dom/)
- [Vue.nextTick 的原理和用途](https://segmentfault.com/a/1190000012861862)