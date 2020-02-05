---
title: Vue.js nextTick 原理與應用
date: 2020-02-05 17:57:40
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

在現代網頁開發時，使用 Vue.js 等現代框架時，由於框架會採用 **Virtual DOM** 來進行 DOM 相關的處理，避免一些直接控制 DOM 等昂貴的操作，連帶我們使用時也應盡量避免進行 DOM 的操作，以防與 Vue.js 實體本身的方法衝突。而各框架在進行 DOM 更新時實作方法也略有不同，Vue.js 雖然是透過偵測數據資料的變更來對 DOM 進行更新，但其實並不是**立即進行**的。

<!--more-->

根據 [Vue.js 文件](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97) 說明，有關於 DOM 的更新是採用**異步（asynchronously）**的策略。如 JavaScript 中針對的 Event loop 類似。Vue 對於資料更新的部分會另外開啟一個隊列（queue）與緩衝器（buffer），即便我們可能透過 watch 一類的 Hook ，觸發了多次的更新，但也僅會推入隊列一次，並且最終在下一次事件循環（tick）後更新。

然而有時候我們可能會在實體中的數據（data）進行操作賦值：

```js
vm.message = 'Hello, Vue.js.'
```

而我們想要針對其賦值的結果進行操作，例如在 `mounted` 中，要得到賦值後的字串資料：

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

透過上面 **.vue file** 範例結果可以看到，我們在這時取得 DOM 的資料仍是初始化前的資料，而過程透過圖的話大致可以理解成這樣：


但如果我們真的想拿到 DOM 更新後的資料怎麼辦？

# nextTick
Vue.js 提供了一個回呼函式（callback function）**Vue.nextTick(callback)** 以供我們使用，

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


# 資源參考

- [Virtual DOM 概述](https://cythilya.github.io/2017/03/31/virtual-dom/)
- [Vue.nextTick 的原理和用途](https://segmentfault.com/a/1190000012861862)