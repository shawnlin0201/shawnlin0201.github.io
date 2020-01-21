---
title: Vue.js 子元件 child component
date: 2019-09-11 02:30:46
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

## 父子元件
在某些情境下我們可能會在元件內使用大量重複的元素標籤以及內容，這個時候我們就可以把元件中的重複的內容再次元件化，並且作法同樣可以分為**區域性**與**全域性**。假設目前需求是把一個頁面拆分成 wrapper-header、wrapper-body 以及 wrapper-footer 元件並且在 wrapper-body 中還要再塞入其他元件：

在 HTML 部分要注意的地方是，HTML 在編譯的時候是**不區分大小寫**的，而在 JavaScript 中是**無法使用`-`連字號來編寫**，因此在格式上[官方建議](https://cn.vuejs.org/v2/style-guide/#%E6%A8%A1%E6%9D%BF%E4%B8%AD%E7%9A%84%E7%BB%84%E4%BB%B6%E5%90%8D%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90) HTML 部分採用 `kebab-case` 連字號命名法，而在 Vue.js 裡面採用`PascalCase`駝峰式命名法。

```html
<div id="app">
    <wrapper-header></wrapper-header>
    <wrapper-body></wrapper-body>
    <wrapper-footer></wrapper-footer>
</div>
```

<!--more-->

在 JavaScript部分，區域性的作法是在 Vue.js 實體的 `components` 中使用 `Vue.extend` 去擴充元件，使得元件中物件除了可以回傳 `template` 之外，可以在裡面繼續使用 `components` 註冊一個新的元件。

```javascript
let vm = new Vue({
    el:'#app',
    components:{
        WrapperHeader: Vue.extend({
            template:'<div>Header</div>'
        }),
        WrapperBody: Vue.extend({
            template:
            '<div>'+
              '<wrapper-innerBody></wrapper-innerBody>'+
              '<wrapper-innerBody></wrapper-innerBody>'+
              '<wrapper-innerBody></wrapper-innerBody>'+
            '</div>',
            components:{
                wrapperInnerBody: Vue.extend({
                    template: ' <div>Body</div> '
                })
            }
        }),
        WrapperFooter: Vue.extend({
            template:'<div>Footer</div>'
        })
    }
})

```

上面這個作法是將元件以**區域性**的方法註冊，而這個方式會使得初始 Vue.js 的程式碼段落過長，如果每個元件都寫在裡頭，可能將來會不易管理，因此透過 ECMAScript 6 的物件縮寫（物件名稱與值相同時可省略值），將元件的部分挪到外頭，可使得程式碼更加的簡潔：

```javascript
let wrapperHeader = Vue.extend({
    template:'<div>Header</div>'
})

let wrapperBody = Vue.extend({
    template:
    '<div>'+
        '<wrapper-innerBody></wrapper-innerBody>'+
        '<wrapper-innerBody></wrapper-innerBody>'+
        '<wrapper-innerBody></wrapper-innerBody>'+
    '</div>',
    components:{
        wrapperInnerBody: Vue.extend({
            template: ' <div>Body</div> '
        })
    }
})

let wrapperFooter = Vue.extend({
    template:'<div>Footer</div>'
})

let vm = new Vue({
    el:'#app',
    components:{
        wrapperHeader,
        wrapperBody,
        wrapperFooter
    }
})
```

但這樣的作法依然是屬於**區域性**的，也就是只有在初始化 Vue.js 的變數 `vm` 中才能使用，而如果要讓元件變成是全域性的話，同樣可以使用 `Vue.component` 進行封裝：

```javascript
let wrapperHeader = Vue.extend({
    template:'<div>Header</div>'
})

let wrapperBody = Vue.extend({
    template:
    '<div>'+
        '<wrapper-innerBody></wrapper-innerBody>'+
        '<wrapper-innerBody></wrapper-innerBody>'+
        '<wrapper-innerBody></wrapper-innerBody>'+
    '</div>',
    components:{
        wrapperInnerBody: Vue.extend({
            template: ' <div>Body</div> '
        })
    }
})

let wrapperFooter = Vue.extend({
    template:'<div>Footer</div>'
})

Vue.component('wrapper-header',wrapperHeader)
Vue.component('wrapper-body',wrapperBody)
Vue.component('wrapper-footer',wrapperFooter)

let vm1 = new Vue({
    el:'#app1',
})

let vm2 = new Vue({
    el:'#app2',
})
```
如此一來不論是 `vm1` 或是 `vm2` 的 Vue.js 實體都可以使用這些元件之外，被註冊的元件中還能再使用其他的元件。

今天這個章節除了複習元件註冊方式並製作多個元件之外，還將子元件擴充進去元件當中，也示範了子元件區域性與全域性的作法，而下個章節，我們將會學習到如何把元件中 `template` 部分抽取成一個 script 成為樣板，來大大地增加程式碼可重複利用性。

隨文附上一直想出門溜溜的阿橘一枚：
![https://ithelp.ithome.com.tw/upload/images/20190911/20119062TWW83vTNvO.jpg](https://ithelp.ithome.com.tw/upload/images/20190911/20119062TWW83vTNvO.jpg)
