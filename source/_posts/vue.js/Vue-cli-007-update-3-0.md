---
title: Vue 2.x 升級 Vue 3.0 紀錄
date: 2020-11-02 17:51:30
tags:
- [前端]
- [JavaScript]
- [Vue.js]
- [Vue-cli]
- [w3HexSchool]
categories: 
- [JavaScript, Vue.js]
---


<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="vue-logo" src='/images/vue-logo.png' width='200px' height='200px' />
</div>

Vue.js 底層還沒來得及摸透，在 2020 年 6 月 30 號 Vue 作者尤雨溪又發布[聲明](https://github.com/vuejs/rfcs/issues/183)：

大致上是在說明即將在 2020 年七月中 Vue 3.0 將進入 RC 階段並且八月初官方就會釋出正式版。

心想該來的還是要來，不如趁現在 branch 開下去馬上升級一波。

<!-- more -->

# 起始式 vue add vue-next

要升級最快的方式便是直接在 `vue-cli` 專案中使用 `vue add vue-next` 指令來升級。

但不愧是升級之路，一開始馬上就來噴個錯誤給你看...

```bash
vue add vue-next

📦  Installing vue-cli-plugin-vue-next...
✔  Successfully installed plugin: vue-cli-plugin-vue-next

🚀  Invoking generator for vue-cli-plugin-vue-next...
ERROR  TypeError: Received an unexpected value [object Undefined]
```

這個問題不難，主要是因為 `vue-cli` 版本不支援的關係，所以透過 `npm install -g @vue/cli @latest` 將 `vue-cli` 升級到最新版即可，接著再跑一次  `vue add vue-next` 指令：

```bash
vue add vue-next

📦  Installing vue-cli-plugin-vue-next...
✔  Successfully installed plugin: vue-cli-plugin-vue-next


🚀  Invoking generator for vue-cli-plugin-vue-next...
ERROR  Cannot find file src/main.js
📦  Installing additional dependencies...


✔  Successfully invoked generator for plugin: vue-cli-plugin-vue-next
 vue-next  Installed vuex 4.0.
 vue-next  Documentation available at https://github.com/vuejs/vuex/tree/4.0

This dependency was not found:

* vue in ./node_modules/vuex/dist/vuex.esm-browser.js, ./src/index.js and 17 others
```

# 修復
從上述報告中可以看出，安裝升級的套件有做了簡易的 migration，並且依據不同工具來做自動轉換。

但有舊專案總是有一些設定不如預期就沒辦法靠工具自動解決了，比如說專案使用了 `index.js` 來做為進入點的 js 檔案名稱，就會因為工具沒偵測到而拋出了 `ERROR  Cannot find file src/main.js`，

因此即便升級完畢，最後執行 `npm run serve` 時，仍會 log 出這樣的訊息：

```bash
This dependency was not found:

* vue in ./node_modules/vuex/dist/vuex.esm-browser.js, ./src/index.js and 17 others
```

甚至我在同事電腦中看到的版本還會叫你去安裝 `Vue.js` ...（別傻傻地又 install 回 2.X 版本阿 XD

而各套件中修復的方向不同，以下針對這個專案所遇到的問題來改改：
- 進入點
- Vuex
- vue.config.js

## 進入點
進入點主要就是用來綁定渲染元素的地方，基本上 Vue 2.x 的寫法 3.0 都有支援，所以主要是引入的地方要改，而原本進入點檔案可能長得像這樣：

```js
import Vue from 'vue';

const vm = new Vue({
  el: '#app',
  data () {
    return {
      // ...
    }
  }
})
```

而在 Vue 3.0 的做法是透過 createApp 引入 Vue，並且需透過 `mount` 來綁定的元素：
```js
import { createApp } from 'vue';

const app = createApp({
  data () {
    return {
      // ...
    }
  }
})

app.mount('#app') // 注意不是用 $mount，$mount 是 Vue 2.x 的寫法
```

這樣就完成進入點的設定了。

## Vuex
Vuex 更動則是包含了進入點的引入與本身檔案的設定。

Vuex 檔案（store.js）本身，原本引入與使用都在這個檔案中設定：
```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // 略
});
```

Vue 3.0 後，我們需要將 `createStore` 引入，並透過它創建好一個 `store` 後 `export` 出去，怎麼使用完全交由引入的檔案設定：
```js
import { createStore } from 'vuex'

export const store =  createStore({
  // 略
});
```

接著原本進入點的地方原本是透過這樣載入，我們拿上方進入點章節修改好的例子：
```js
import { createApp } from 'vue';
import store from '@/store'

const app = createApp({
  store, // 原本是引入到裡面
  data () {
    return {
      // ...
    }
  }
})

app.mount('#app') 
```

修改一下 `@/store` 所引入的方式：
```js
import { createApp } from 'vue';
import { store } from '@/store' // 這裡要注意引入的方式

const app = createApp({
  data () {
    return {
      // ...
    }
  }
})

app.use(store) // 改成透過 `use` 使用
app.mount('#app') 
```

Vuex 到這裡就可以繼續使用啦！

## vue.config.js

config 檔案多數偏向客製的設定，而這裡主要原先需求是要能透過靜態的 html 檔案使用 vue.js 功能，也就是讓 SSR 渲染完能接回 Vue.js SPA 的概念，所以原本大概會有這些設定：

```js
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {  // multiple page SSR contect with SPA
    index: {
      entry: './src/index.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    'about': {
      entry: './src/page/about.js',
      template: 'public/about.html',
      filename: 'about.html',
      chunks: ['chunk-vendors', 'chunk-common', 'about']
    },
    'contact': {
      entry: './src/contact.js',
      template: 'public/contact.html',
      filename: 'contact.html',
      chunks: ['chunk-vendors', 'chunk-common', 'contact']
    }
  },
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        vue$: 'vue/dist/vue.esm.js', // 對應的解析方式
        '@': resolve('src')
      }
    }
  }
}
```

而裡面最主要會拋出錯誤的地方在於透過 `configureWebpack` 設定 `webpack` 的 `resolve` 時，這是因為原先用來定義引入 `vue` 的 `vue/dist/vue.esm.js` 在 Vue 3.0 的 module 中消失了。

因此我們將其改為 Vue 3.0 對應 ES module 的檔案 `vue/dist/vue.esm-bundler.js` 引回即可。

修復完畢後執行 `npm run serve` 應該就能看到頁面長回來了，接下來就可以使用 `composition API` 的寫法將原本的 `lifecycle`、`methods` 或其他 API 改寫完畢！

~~寫文當下還沒有出 Vue 3.0 的 devtool，升級投資有賺有賠申購前請記得先開 branch 改~~
