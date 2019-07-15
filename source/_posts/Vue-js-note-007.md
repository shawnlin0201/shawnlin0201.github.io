---
title: Vue.js學習系列(七)vue-cli
date: 2019-07-12 13:55:58
tags:
- [前端]
- [JavaScript]
- [Vue.js]
- [Vue-cli]
categories: 
- [前端, JavaScript, Vue.js, 學習系列]
---

![](/images/vue-logo.png)

# 前言
當我們終於熟悉Vue.js的一些基本用法後，專案上可能會要使用webpack來建立專案，而Vue的團隊有提供了一套專門給需要使用webpack的開發人員快速開發的工具（vue-cli）。Vue-cli這個工具基於webpack提供了許多擴充，我們可以按照vue-cli的架子，合理的放置檔案，與團隊中的其他成員協作開發，並且在vue-cli環境中產出專案需要部屬的靜態網站，也支援了許多開發時需要用的工具，因此本文章就要來介紹這個好用的工具，並簡單帶過一些基本的檔案介紹。

# 推薦使用者
在使用vue-cli前，建議使用者除了要有基礎的HTML、CSS、JavaScript的觀念外，另外對於Vue.js基本的指令以及元件要有基礎的認識，並且擁有基本終端機指令的操作能力，對於這個工具會比較容易理解與使用。

# 環境建置
要使用vue-cli的話，會需要使用npm套件管理工具來下載，這會需要使用Node.js，而一般會使用nvm的方式去控管Node.js（因為專案上可能是使用不同版本的Node.js），因此順序是先下載nvm後，用nvm去安裝Node.js，接著裡面會附贈npm（如果使用nvm導致沒有下載完全，可能需要另行自己下載npm），最後使用npm來下載vue-cli。

確認自己有沒有下載到Node.js方法可以在終端機輸入：
```
$ node -v
```
如果有跳出版本號即表示有下載到Node.js，npm的部分同樣可以在終端機下方指令來做檢查：
```
$ npm -v
```
確認好都有下載到後，就可以使用npm來下載vue-cli囉！而windows用戶可以直接使用npm install來下載，並且加上`-g`(表示下載到全域環境)即可安裝，mac用戶下載全域(`global`)的話則需要在指令前面多加sudo來執行，並且會要求你提供mac帳戶密碼（如果mac帳戶沒設置密碼會沒辦法使用，建議替mac帳戶設定一組密碼）：
windows 用戶
```
$ npm install -g @vue/cli
```
mac 用戶
```
$ sudo npm install -g @vue/cli
```
安裝完畢之後，可以輸入指令來確認vue-cli是否有安裝成功：
```
$ vue --version
```
**請注意，而本篇教學用的vue-cli版本為3.x，若是使用2.x版本的架構上可能會有有所不同。**

下載完成後，若是熟悉終端機指令的朋友可以使用方案一的方式創建，若不熟悉終端機操作的人，vue-cli也很貼心地推出GUI介面的管理方式，可以參考底下方案二的方式管理（但我還是推薦大家可以多熟悉終端機指令啦XD）。
## 方案一 終端機設定
將終端機切換到存放管理的資料夾執行指令：
```
$ vue create *你的專案名稱*
```
接著他會顯示要安裝哪種`preset`，默認`default`設定可以快速建立一個基本原型，而實際專案會使用下方的手動設定`Manually`來調整想要使用的內容（可能會選用Router、Vuex、CSS Pre-processors、Linter），如官網圖所示：

![](/images/vue-cli-new-project.png)

而設定完成後，vue-cli會在當前目錄下建立一個`*你的專案名稱*`的資料夾。

## 方案二 GUI設定
雖然vue-cli已經另外做了一個GUI的管理介面，但第一行還是要請大家到終端機去輸入指令：
```
$ vue ui
```

這樣一來他就會開啟一個瀏覽器頁面來幫助建立專案的流程，最後一樣會建立一個以你專案名稱為名字的資料夾。

而不論使用哪種方案，在vue-cli建立資料夾後，需要使用終端機切換到專案資料夾中，並執行以下指令，如果有正確顯示`Welcome to Your Vue.js App`的網頁表示環境變設定完畢：
```
$ npm run serve
```

![](/images/vue-cli-ui-new-project.png)

# 結構目錄
在專案資料夾被創立之後，vue-cli會在裡面建立一些預設檔案，而產生的目錄如下，可以先稍微了解大概檔案的目的是什麼：
```
├── dist/               // 使用 npm run build 會在此處建立一個靜態檔案
├── node_modules/       // 使用 npm 下載管理的模組會集中在此
├── public/             // 放在此處的公共檔案可以使用絕對路徑取得，並且不會經過編譯壓縮處理
│   ├── favicon.ico     // 範例用的圖片檔
│   └── index.html      // 網站入口
├── src/                // 前端開發的原始檔案，基本上要寫的程式都是放在此處
│   ├── assets/         // 放在此處的公共檔案可以使用相對路徑取得，並且會經過編譯壓縮處理
│   ├── components/     // Vue 元件檔案
│   ├── views/          // Vue rounter 頁面檔案
│   ├── App.vue         // Vue 專案的進入點
│   ├── main.js         // Vue 專案的設定檔
│   ├── router.js       // Vue rounter設定
│   └── store.js        // Vuex設定
├── .gitignore          // git 設定檔案
├── package.json        // npm 產生的專案文件
└── vue.config.js       // Vue 設定文件 ( 需手動建立 )
```

# .vue 單一元件檔
在全部設定完後，首先開啟src/components/HelloWorld.vue的範例檔案中，我們可以看到程式碼被拆成`template`、`script`、`style`：

```
<template>
    //省略
</template>

<script>
    //省略
</script>

<style>
    //省略
</style>
```

如果有照之前Vue.js系列文跑過一次的話，對單一元件檔(.vue)應該很快就上手了，基本上對應之前在單一網頁直接使用CDN撰寫Vue.js的作法來說這一整個檔案就是所謂的元件`component`，而`template`就是之前子元件中的`template`，也就是將被渲染的樣板，`script`的部分則代表原先寫元件時的Vue.js物件，我們可以將`options`跟`lifecycle hooks`寫在這裡，而`style`則是撰寫css的部分，並且可以依其設定要使用sass或scss的方式，而編譯後就會自動產生對應的css檔案：
```
<style lang="scss">
h1 {
  margin: 40px;
}
</style>
```
而這裡的css檔案預設是全域範圍的，若想單獨使用在這個元件則可以設定`scope`屬性給他，如此一來這個css將會在最後編譯時，隨機產生一組hash data屬性給css用來命名給這個元件渲染：
```
<style scoped>
a {
  color: #000;
}
</style>
```

這裡推薦一個vscode開發擴充工具：**[Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)**，這個工具的開發作者Ping Wu已被微軟授權可以花三個月的時間專心編寫這套擴充工具，並且Vue.js作者尤雨溪也表示會跟此擴充工具的作者有密切的合作，而這個擴充工具支援了以下功能：
- Syntax-highlighting
- Snippet
- Emmet
- Linting / Error Checking
- Formatting
- Auto Completion
- Debugging

接著回到src/main.js檔案，會看到這裡引入了專案中所需要的模組`router`、`vuex`等等，而下面會初始化一個Vue物件，並把相關模組編寫進去，最後載入到`#app`元素上：
```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
再到src/App.vue檔案，可以看到這裡的模板中有`router`相關的設定，`<router-link></router-link>`默認會渲染成HTML元素`<a>`，用意是訪問Vue元件底下的`this.$router`而取得正確的路徑連結，並且會在路徑成功回應時自動加設一個類似於`active`的class名稱：
```
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/test">Test</router-link>
    </div>
    <router-view/>
  </div>
</template>
```
而`<router-view></router-view>`是功能性組件，會渲染路徑比對到的元件，其設定可以到src/router.js中設定：
```
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

```
# 結尾
經過走一遍vue-cli的設定後，其實可以發現開發的大模樣清晰可見，我們在router.js中設定相關路徑後，在App.js檔案放入相對應的router，接著設定views中各頁面的page後，在引入components資料夾中的原件，最後便能夠快速地完成一個完整帶有路徑比對的專案。

# 參考資料

- [Vue官方網站文件：https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)
- [Vue-cli官方網站文件](https://cli.vuejs.org/zh/guide/)
- [Vue rounter官方網站文件](https://router.vuejs.org/zh/)
- [Vue項目實戰影片](https://www.bilibili.com/video/av55664085/)
- [六角學院Vue-cli教學](https://www.youtube.com/watch?v=3ypel9_VtmU)