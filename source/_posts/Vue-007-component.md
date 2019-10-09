---
title: Vue.js 元件 component
date: 2019-09-10 01:39:50
tags:
- [前端]
- [JavaScript]
- [Vue.js]
categories: 
- [前端, JavaScript, Vue.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/vue-logo.png' width='200px' height='200px' />
</div>

元件的概念可以把它看作成一個**重複利用性高**的程式，好比只要輸入資料進去，就能夠輸出得到對應的需求，至於其他相關的外觀樣式等等都會相應產生。而要將 Vue.js 的程式元件化之前，首先一起來瞭解它的核心觀念：

## MVVM
![https://ithelp.ithome.com.tw/upload/images/20190910/20119062r5BJ41crhr.png](https://ithelp.ithome.com.tw/upload/images/20190910/20119062r5BJ41crhr.png)

Vue.js 的架構深受 [MVVM](https://zh.wikipedia.org/wiki/MVVM) 的影響，而 MVVM 講的也就是，M(model)、V(view)以及 VM(view-model)，官網範例中常用到的 `vm` 也是因此而來的。

三者之間的關係也非常簡單，前端可能會透過像是 API 取得一些後端的資料（Model），接著會撰寫 Vue.js 的部分來讓 API 資料更有邏輯或整理成更加容易讓視覺可以顯示的資料（View-Model），接著就可以使用 Vue.js 的樣板語法來讓整理好的資料顯示在畫面上（View）。

反過來則是今天當按鈕（View）的部分被使用者點擊，因此觸發向 View-Model 獲取一些資訊，而作為 View-Model 可能會直接提供自己本身就有的資料，亦或是最後再向 Model 拿取更多的資訊回來整理。

而 Vue.js 最主要是幫我們把**連結 View 與 Model 的部分**給處理掉了（**View-Model**），因此我們接下來要做的元件，最主要是要透過 Vue.js 提供的 API 等功能（也就是前面所說的指令、修飾符等等），來打造元件，並且搭配 View 與 CSS（SCSS）來塑造他的外觀。

## 元件註冊
在 Vue.js 中要使用 `components` 時，可以選擇在初始化 Vue.js 時將其資訊帶進去，或是使用 `Vue.component` 的方式來註冊，並且依據使用方法不同分為區域性的註冊方式(`scope`)以及全域性的註冊方式(`global`)，以下介紹兩種註冊方式的差異：

### 區域註冊
使用區域性的元件時，可以選擇在初始化 Vue.js 的時候將元件的資訊帶進去：

HTML部分
```html
<div id="app">
    <my-component></my-component>
    <my-component></my-component>
    <my-component></my-component>
</div>
```

CSS部分
```css
.myComponent{
    border:2px solid black;
}
```

JavaScript部分

```javascript
let vm = new Vue({
    el:'#app',
    components:{
        'my-component':{
            template:'<div class="myComponent">Hello Vue</div>'
        }
    }
})
```
範例註冊了一個名稱為`my-component`的元件，並且該元件有一個`template`，使得 Vue.js 會將其渲染出來，最後在 DOM 產生三個`<div class="myComponent">Hello Vue</div>`，並且將CSS的style渲染上去，而這種註冊方式是會僅限於原先的區域，假使有另一個 Vue.js 應用程式 `app2` `(如下），在裡面同樣使用`my-component`，最終結果將會是`app2`不認得這個元件，也沒辦法將結果渲染在畫面上。

```html
<div id="app2">
    <my-component></my-component>
    <my-component></my-component>
    <my-component></my-component>
</div>
```

## 全域註冊
而在某些情境下，專案可能要在兩個或多個應用程式間共享元件。我們可以透過 `Vue.component` 進行註冊，如此一來不管在哪個程式中都可以使用`my-component`元件，這種註冊方式會稱他為全域的`global`的註冊方式，範例程式碼如下：

JavaScript部分
```javascript
Vue.component('my-component',{
    data:function(){
        return {
            message:'',
        }
    },
    template:'<div class="myComponent">Hello Vue</div>'
})
```

**而這裡有一點要注意的是**，若不將 `data` 以函式返回物件的方式封裝起來的話，資料物件將會混淆，並且被各個元件共享（原因是物件是屬於複雜類型，複雜類型的參考方式是`call by reference`），也就是說元件對 `data` 操作時將會連帶影響到其他元件的數值。而解決辦法就是利用 Javascript 切割 scope 最小單位`function`來做封裝（如上面範例程式碼所示）。

以上章節是透過基本的**元件註冊**，將**重複的程式碼**包裝成元件，來達成**可重複利用性更高**的程式，而明天要介紹的部分則是在元件中設置元件的作法。

附上今日的黑黑元件以及橘橘元件
![https://ithelp.ithome.com.tw/upload/images/20190910/20119062caNJOFKmnT.jpg](https://ithelp.ithome.com.tw/upload/images/20190910/20119062caNJOFKmnT.jpg)

![https://ithelp.ithome.com.tw/upload/images/20190911/20119062t3y8rmF2D3.png](https://ithelp.ithome.com.tw/upload/images/20190911/20119062t3y8rmF2D3.png)

