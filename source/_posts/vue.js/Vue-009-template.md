---
title: Vue.js 元件樣板 template
date: 2019-09-12 03:50:25
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

前幾章花了一點時間在介紹元件的註冊方式與用法，除了能夠建立一個元件並使用對應的 `<tag>` 標籤建立在網頁上，也能將元件塞入其他元件當中成為他的子元件。

然而，對於真正顯示的內容，最主要還是得依靠 `template` 所產生，回顧一下之前[生命週期](https://ithelp.ithome.com.tw/articles/10214359)的章節會發現到，Vue.js 的生命週期中，會有一段過程檢查實體中是否有包含 `template` 的選項：
- 若有 `template` 的情況：最後會使用 `render function`去編譯裡面的內容到網頁上。
- 若沒有 `template` 的情況：則是會使用綁定 `el` 元素的 `outerHTML`來做為編譯範圍。

其中 `template` 指的就是元件樣板的部分，我們可以透過不同的封裝方式來管理內容，例如使用 `HTML` 標籤來進行封裝：

<!--more-->

## HTML標籤封裝
```
let vm = new Vue({
    el:'#app',
    template:'<div>HTML封裝方式</div>'
})
```

作法是直接在 `template` 中以 `HTML` 字串方式直接編寫，但是內容一多的時候將會變成非常長一條，不易於閱讀，而所幸在 JavaScript ES6 中我們可以透過**模版字符串（template literal）**的方式去書寫，透過**反引號**快速解決這個難處：

```
let vm = new Vue({
    el:'#app',
    template:`
    <div>
        <h1>HTML封裝方式</h1>
        <div>ES6 讓這種方式變得更容易閱讀了！</div>
    </div>`
})
```


## inline-template

這種封裝方式，則是在編寫樣板的時候直接在元件上加上 `inline-template` 屬性，它的效果是能夠讓 Vue.js 認為其元件標籤內的內容是元件的樣板（原先預設元件標籤內的值都不會渲染出來）：

```
<thumb-slider inline-template>
    <div class="thumb-wrapper">
        <div class="title"> ... </div>
    </div>
</thumb-slider>
```

使用這種封裝方式的好處是在渲染時由於是直接寫在 HTML 當中，因此在頁面載入的過程中就會出現在頁面上，而不用等到 JavaScript 執行到才編譯元件內容。

## x-template

`x-template`的封裝方式，則是可以將整段樣板抽取出來，以另一個 `script` 標籤作為樣板來管理，使用方法僅需要另外加入一個`script`標籤，並且將其 `type` 屬性定義為 `x-template` ， id 的部分則對應到 Vue.js 實體中的 `template` 即可：

x-template 部分
```
<script type="text/x-template" id="my-component">
    <div> // 最外層只能由單個元素包裝
        <div>x-template封裝法</div>
        <div>x-template封裝法</div>
    </div>
</script>
```

Vue.js 實體部分
```
<script>
    let vm = new Vue({
        el:'#app',
        template:'#my-component'
    })
</script>
```

**需要注意的是在使用 `x-template` 方法封裝時，最外層必須只能使用單個元素來做包裝，否則最後將會只渲染出第一個元素，這一點跟 React.js 的 JSX 概念是一樣的。**

## Render function

最後這一種方式則是原先 Vue.js 在編譯所做的事情，意思就如同我們平常在使用`template`時，主要是依靠 Vue.js 去幫我們做編譯，但今天如果我們想要自己寫更多 JavaScript 的內容去管理時，就可以透過這種封裝方式來編寫樣板，而範例程式碼如下：

Render function 作法：
```
let vm = new Vue({
    el:'#app',
    render: function(createElement){
        return createElement('div','內容')
    },
})
```

原本 template 作法：
```
let vm = new Vue({
    el:'#app',
    template:'<div>內容</div>'
})
```

透過 Render function 的作法，我們可以藉由返回一個樣板物件來建立一個樣板，而樣板物件寫法好處是可以寫更加詳細的內容去編譯，而不是只是透過 Vue.js 幫我們包裝好的方法去開發，但相對難處便是在於實在太過抽象，元件內容一多，編寫 render function 將會十分困難。

---

以上便是 template 的一些常見封裝方式，而除了以上這幾種方式之外，還有一種常見的是單一文件檔（.vue檔），而這種封裝方式到時候會在 Vue-cli 的章節一併解說。至於封裝方式的選用到底用哪種，最後決定權還是要看專案上實際上的需求來選用可能會好一點！

明天的部分將會看到 Vue.js 對於元件溝通的核心概念，以及 Vue.js 元件之間到底要怎麼溝通，就讓我們一起繼續努力撐到最後吧！

附上一起陪我撐到很晚的黑黑一枚
![https://ithelp.ithome.com.tw/upload/images/20190912/20119062DGAD832DiF.jpg](https://ithelp.ithome.com.tw/upload/images/20190912/20119062DGAD832DiF.jpg)
黑黑：我幫你暖好被了，快來睡吧~