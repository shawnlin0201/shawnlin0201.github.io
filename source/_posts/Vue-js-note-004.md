---
title: Vue.js學習筆記(四)component
date: 2019-07-08 17:05:04
tags: vue.js
---

### 前言
前幾篇講了基本搭建、指令、與常見到的幾個options、再講到了生命週期的部分，相信大家跟我一樣對於Vue.js的瞭解已經有了個雛形，而這篇文章要來介紹的是Vue.js的`component`的部分，介紹我們要如何再Vue.js中使用`component`，用`component`時需要注意什麼地方，以及實際上在開發時，如何有效運用`component`來組織我們的應用程式。

### MVVM、樹狀結構
要介紹`component`前，首先來瞭解一下Vue.js的大架構，Vue.js的架構深受[MVVM](https://zh.wikipedia.org/wiki/MVVM)的影響，而MVVM講的也就是，M(model)、V(view)以及VM(view-model)，官網使用的範例常用到的`vm`也是因此來的。透過類似MVVM的架構，我們在使用Vue.js時，不必在一個個去`select`我們所需要操作的DOM對象，我們可以透過對`$el`對象的綁定，來讓Vue.js在初始化的過程中，知道我們要對哪個元素操作，間接將`data`去綁定在該元素身上，形成一個樹狀結構，而這個樹狀結構講的就是`component`的部分，而理所當然在`component`中的屬性，大部分與vue instance都相同，其中最重要的呢，便是用來傳遞屬性的`props`(有用過React.js並且沒用Redux管理狀態的人應該對這個詞彙很熟悉XD，常常會需要props來props去的)。

![](/images/vue-component.png)

### 元件註冊
使用Vue.js時要對實體初始化，而元件的部分也不例外，我們在使用Vue.js的`component`時，可以在初始化Vue的時候將元件的資訊帶進去：
HTML部分
```
<div id="app">
    <my-component></my-component>
    <my-component></my-component>
    <my-component></my-component>
</div>
```
CSS部分
```
.myComponent{
    border:2px solid black;
}
```
JavaScript部分
```
let vm = new Vue({
    el:'#app',
    component:{
        'my-component':{
            template:'<div class="myComponent">Hello Vue</div>'
        }
    }
})
```
這個範例我註冊了一個名稱為`my-component`的元件，並且該元件有一個`template`，使得Vue.js在渲染該元件時會將其編譯進去，而最後結果是在DOM上顯示三個`<div class="myComponent">Hello Vue</div>`，並且將CSS的style渲染上去，而這種註冊方式是`scope`的，什麼意思呢？意思就是說今天假使有另一個Vue.js應用程式`app2`，我們在裡面同樣使用`my-component`，最終結果是`app2`不認得這個元件，也沒辦法將結果渲染在畫面上。
```
<div id="app2">
    <my-component></my-component>
    <my-component></my-component>
    <my-component></my-component>
</div>
```
因此，若要在兩個或多個應用程師間共享元件，我們除了在component的地方要宣告外，我們也可以透過另外一種註冊方式`global`來註冊元件。使用方法是透過`Vue.component`進行註冊，並同樣在裡面附帶相關資訊，如此一來不管在哪個應用程式中都可以使用這個`my-component`元件了，程式碼如下：
JavaScript部分
```
Vue.component('my-component',{
    template:'<div class="myComponent">Hello Vue</div>'
})
```
### 參考資料

- [MVVM維基百科：https://zh.wikipedia.org/wiki/MVVM](https://zh.wikipedia.org/wiki/MVVM)
- [官方網站文件：https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)
- [六角學院影片：https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA](https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA)
- [Kuro Hsu與六角學院合作的課程ppt：https://drive.google.com/file/d/0B5TNzeyWT1lqc2k0SEZtSnFuMXc/view](https://drive.google.com/file/d/0B5TNzeyWT1lqc2k0SEZtSnFuMXc/view)