---
title: Vue-cli Router
date: 2019-10-08 19:00:12
tags:
- [前端]
- [JavaScript]
- [Vue.js]
- [Vue-cli]
- [Vue-router]
categories: 
- [JavaScript, Vue.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/vue-logo.png' width='200px' height='200px' />
</div>

## SPA
今天要介紹的是對**單頁式應用網站（SPA，Single Page Application）** 非常重要的 Router， SPA 為何會需要 Router 來處理網頁路徑呢？這裡簡單介紹一下他們之間的關係：

在 SPA 技術被大肆使用之前，以前的網站多是採用**多頁式網頁（MPA，Multiple Page Application）**，而兩者差異最大的地方在於**向伺服器請求的東西不同**。

一開始不論 SPA 還是 MPA 網站都需要使用者輸入網址，透過一個叫做 DNS 的服務器找到該網站伺服器，接著經過一連串回應後，伺服器回應給使用者一個 HTML 網頁檔案。

而 MPA 在後續轉換頁面上，則是**藉由輸入的網址不同，重複以上動作向網站伺服器拿取每頁的網頁檔案**，並且重新渲染每頁的內容，因此會造成網頁整個畫面都被刷新。

SPA 則是進入入口網頁（SPA 進入點）後透過 AJAX 技術，跟伺服器拿取部分資料替換內容進去；而替換的區域，小至更新收藏狀態的按鈕，大至整個頁面都被刷新，此時網址列的路徑卻仍是我們一開始進去的那個 SPA 進入點網址。

因此，SPA 網頁需要**藉由 History API** 來操控網址列，並且藉由**前端辨識使用者輸入的網頁路徑**不同，而透過前端給予使用者不同的頁面內容，這也代表著原先由後端伺服器所負責的路徑管理，將交由前端來負責辨識與處理，也使得前端的複雜度上升了一個檔次。

為了使用者的品質體驗，身為前端工程師的我們當然不會因為這種小事而被擊倒，但管理路徑上確實是不容易的事情，因此工程師們逐漸發展出一系列管理路徑的方法。而在 Vue 框架中，我們可以藉由 Vue Router 來協助處理這一類的問題，這也就是今天所要提到的內容。

## Router
在 Vue.js 中，可以單獨在頁面中引入 script 檔使用：
```html
<script>https://unpkg.com/vue-router@2.0.0/dist/vue-router.js</script>
```

而在 Vue-cli 中，我們可以在一開始建立檔案時，將 Router 模組安裝進去，安裝完畢後會在 `/src` 路徑底下看到一隻 router.js 設定檔案，這也就是我們今天主要會操作到的檔案。

```ini
├── dist/               
├── node_modules/       
├── public/             
│   ├── favicon.ico     
│   └── index.html      
├── src/                
│   ├── assets/         
│   ├── components/     
│   ├── views/          
│   ├── App.vue         
│   ├── main.js         
│   ├── router.js       // 在這裡
│   └── store.js        
├── .gitignore          
├── package.json        
└── vue.config.js       
```

而打開 router.js 後我們可以看到下列檔案：

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})
```


首先我們先來關注放在 Router 裡面所回傳的物件可放入的屬性，第一個屬性 `mode` 模式可以切換為：
- `hash` ：默認值，在這種模式下路徑會以 hash 來模擬路徑，藉由 hash 特性使切換路徑時頁面不會刷新。
- `history` ：history 模式，則是利用前面提到的 history API 來達成切換路徑的效果。

以本機伺服器為例子切換到 /about 的話兩者差異如下：
- hash
  - http://localhost:8080/#/
  - http://localhost:8080/#/about
- history
  -  http://localhost:8080/
  -  http://localhost:8080/about

第二個屬性 `base` 則是決定好根目錄的名稱，建立環境如果在特定路徑下需要更改。

第三個屬性 `routes` 則可以設定頁面路徑等相關設定，以下列出幾個較常用的項目：

### path
用來核對網址路徑使用，若符合該路徑則會渲染出對應的元件（component），並且支援多種比對的方法。
路徑          | 涵義
------------- | -------------
/             | 根目錄網址
/*             | 所有網址都符合此路徑，會攔截所有網址，要謹慎使用。
/member       | 網址剛好為 /member 才符合
/member-*       | 開頭為 /member 皆符合條件
/member/*       |  /member/ 底下網址都符合此條件
/member/:id       | 網址為 `/member/9527` 的話，可在該頁面透過 this.$route.params 取到 `{id:9527}` 
/member?       | 網址為 `/member?from=ithome` 的話，可在該頁面透過 this.$route.query 取到 `{from:ithome}` 

### component
path 條件符合時，渲染該頁面對應的單一元件檔（.vue）。

透過 import 方式我們可以在使用者開啟網站時就先導入該頁面的資源，而透過放在 component 裡的 callback function 則可以達到 lazy loading 載入元件的效果。
```javascript
component: () => import('./views/About.vue')
```

另外在執行 `npm run build` 建置靜態檔案準備上傳伺服器前，可在 import 內放入 webpackChunkName 來設定包裝元件檔的模組名稱，而該模組名稱主要是用來執行異步載入用，避免元件檔數量太多而造成載入時受影響。

```javascript
component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
```


### name 
識別該頁面的名稱，如在元件中可透過方法切換到指定的頁面名稱：

```javascript
this.$router.push({name: 'about'}) // 使用 Vue router 切換到 about 頁面
```

### redirect
將進入到符合到 path 路徑條件的網址，重新轉向 redirect 所指定的網址：

```javascript
{ path: '/a', redirect: '/b' } // 此設定將會使進入 /a 網址的使用者，被導向到 /b 網址並使用符合 /b path 路徑的元件
```

### alias
將進入到符合到 path 路徑條件的網址，改成 alias 所指定的網址：

```javascript
{ path: '/a', alias: '/b', component:A }    // 此設定將會使進入 /a 並使用符合 /a 路徑的元件，但網址會轉換成 /b
```

## 切換頁面
在設定完頁面相關資訊之後，我們現在已經擁有了一個網址路徑比對的工具了，現在我們要在頁面中執行切換頁面的效果。

最簡單的方式，是透過 Vue router 所提供的 `<router-link>`：
```html
<router-link to="/about">About</router-link>
```
最後會轉譯成：
```html
<a href="/about">About</a>
```
而特地要使用 `<router-link>` 而不是 `<a>` 的原因在於，他在有設定 base 路徑的情況下，可以直接使用 `to` 來導向網域底下的頁面，並且防止頁面重新載入以及遇到不支援 history 模式的瀏覽器時會自動降級成 hash 模式的路徑。

**此外也可以傳入一個 router 物件：**
```html
<router-link to="{ path: 'about'}">About</router-link>
<router-link to="{ name: 'user', params: { userId: 9527 }}">User</router-link>
以上等同於
<router-link to="/about">User</router-link>
<router-link to="/user?userId=9527">User</router-link>
```

**以 JavaScript 轉頁：**

```javascript
this.$router.push({ path: 'about'}})  // 網址 /about
this.$router.push({ name: 'user', params: { userId: 9527 })  // 網址 /user?userId=9527
```

**針對歷史紀錄切換頁：**
```javascript
this.$router.go(1)    // 下一頁
this.$router.go(-1)   // 上一頁
this.$router.go(9527) // 若跳轉頁面數量不構，會發生錯誤，需自行處理
```

## 顯示頁面
Vue router 提供了 `<router-view>` 標籤供我們使用，只要符合路徑，而在標籤使用區塊須注意 router 中所設定的 route 層級，以下方為例：

```ini
App.vue 
├── Home.vue
└── About.vue
    ├── Info.vue
    └── Contact.vue
```

若在 App.vue 中所使用的話，路徑可比對到 `Home.vue` 以及 `About.vue`。

但若想要在 About.vue 中嵌套顯示底下的 `Info.vue` 或 `Contact.vue` 則需在 About.vue 裡面也放置 `<router-view>`標籤，並在 router 中設定 children 路徑配對：

```
{
  path: '/about',
  name: 'AboutPage',
  component: () => import(/* webpackChunkName: "About" */ './views/About.vue'),
  children: [
    {
      path: '/about/info',
      component: () => import(/* webpackChunkName: "About" */ './views/Info.vue')
    },
    {
      path: '/about/contact',
      component: () => import(/* webpackChunkName: "About" */ './views/Contact.vue')
    }
  ]
}
```

如此一來首先會從 `App.vue` 的 `<router-view>` 配對到 about 頁面並載入 `About.vue` 後，在透過連結配對到 info 頁面或 contact 頁面，切換 About.vue 頁面當中的 `<router-view>` ，載入 `Info.vue` 或 `Contact.vue`。

以上就是 Vue-cli Router 中一些最基礎的用法！基本上依靠這幾個 API 切換加上之前所介紹到的 Vue.js 指令與 Vue-cli .vue 檔案，已經能做出完整的應用程式了，而其中還有少數幾個 API 沒有講到的，不過這都可以待需要使用時再繼續深入研究，希望大家會喜歡這個系列！

> 接下來我們就有緣再相見啦！
> ![https://ithelp.ithome.com.tw/upload/images/20191008/20119062b1DjmDGged.jpg](https://ithelp.ithome.com.tw/upload/images/20191008/20119062b1DjmDGged.jpg)