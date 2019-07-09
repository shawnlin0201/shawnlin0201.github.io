---
title: Vue.js學習筆記(四)components(Registration, child component and template)
date: 2019-07-08 17:05:04
tags: vue.js
---

### 前言
前幾篇講了基本搭建、指令、與常見到的幾個options、再講到了生命週期的部分，相信大家跟我一樣對於Vue.js的瞭解已經有了個雛形，而這篇文章要來介紹的是Vue.js的`components`的部分，介紹我們要如何在Vue.js中使用`components`，用`components`時需要注意什麼地方，以及實際上在開發時，如何有效運用`components`來組織我們的應用程式。而因為篇幅較長的關係我們將其拆為兩篇，這篇主要講解的地方將著重在元件的註冊`Registration`、
子元件`child component`如何創建以及`template`的封裝方式。

### MVVM、樹狀結構
要介紹`components`前，首先來瞭解一下Vue.js的大架構，Vue.js的架構深受[MVVM](https://zh.wikipedia.org/wiki/MVVM)的影響，而MVVM講的也就是，M(model)、V(view)以及VM(view-model)，官網使用的範例常用到的`vm`也是因此來的。透過類似MVVM的架構，我們在使用Vue.js時，不必在一個個去`select`我們所需要操作的DOM對象，我們可以透過對`$el`對象的綁定，來讓Vue.js在初始化的過程中，知道我們要對哪個元素操作，間接將`data`去綁定在該元素身上，形成一個樹狀結構，而這個樹狀結構講的就是`components`的部分，而理所當然在`components`中的屬性，大部分與vue instance都相同，其中最重要的呢，便是用來傳遞屬性的`props`(有用過React.js並且沒用Redux管理狀態的人應該對這個詞彙很熟悉XD，常常會需要props來props去的)，但是在講解`props`之前，首先我們要來講一下組件的使用方法。

![](/images/vue-component.png)

### 元件註冊
當我們在Vue.js中要使用`components`時，我們可以選擇在初始化Vue的時候將其資訊帶進去，或是使用`Vue.component`的方式來註冊，而因使用方法不同分為區域性的註冊方式(`scope`)以及全域性的註冊方式(`global`)，以下介紹兩種註冊方式的差異。
#### 區域註冊
在使用區域性的元件時，我們可以在初始化Vue.js的時候將元件的資訊帶進去：
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
    components:{
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
#### 全域註冊
而在某些情境下，我們可能要在兩個或多個應用程式間共享元件。我們可以透過`Vue.component`進行註冊，並同樣在裡面附帶相關屬性資訊，如此一來不管在哪個應用程式中都可以使用這個`my-component`元件了，這種註冊方式我們會稱他為`global`的註冊方式，範例程式碼如下：
JavaScript部分
```
Vue.component('my-component',{
    data:function(){
        return {
            message:'',
        }
    }
    template:'<div class="myComponent">Hello Vue</div>'
})
```
相信各位一定會注意到某個特別的地方，那就是在全域元件中`data`的對象是一個函式，而為什麼要這樣大費周章把他包裝成函式在返回呢？這個問題在我們[Vue.js的第二章節](https://shawnlin0201.github.io/2019/07/08/Vue-js-note-002/)的時候有提到過這個概念，這邊在重複說明一次，原因是因為我們在創建多個元件時，若不將數據對象以函式返回物件的方式封裝起來的話，數據對象將會混淆，並且被各個元件共享（原因是物件是屬於複雜類型，複雜類型的參考方式是`call by reference`），也就是說元件對`data`操作時將會連帶影響到其他元件的數值。（當然，大家不會想要在購買某樣東西的時候，結果結帳卻發現購物網站把所有商品都一起加入購物車裡面吧XD？）而解決辦法就是利用Javascript切割scope最小單位`function`來做封裝（如上面範例程式碼所示）。

### 子孫元件
同樣，在某些情境下我們可能會在元件內使用大量重複的元素標籤已集內容，這個時候我們就可以把元件中的重複的內容再次元件化，作法一樣可以分為區域性與全域性的作法，而區域性作法可以在初始化Vue實體時，在`components`資訊裡頭，使用`Vue.extend`夾帶相關的屬性：
HTML部分
```
<div id="app">
    <wrapper-header></wrapper-header>
    <wrapper-body></wrapper-body>
    <wrapper-footer></wrapper-footer>
</div>
```
**這裡要注意的地方是，html在編譯的時候是不區分大小寫的，而JavaScript中是無法使用`-`連字號來編寫，因此在格式上時[官方建議](https://cn.vuejs.org/v2/style-guide/#%E6%A8%A1%E6%9D%BF%E4%B8%AD%E7%9A%84%E7%BB%84%E4%BB%B6%E5%90%8D%E5%A4%A7%E5%B0%8F%E5%86%99-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)HTML部分採用`kebab-case`連字號命名法，而在Vue.js裡面採用`PascalCase`駝峰式命名法。（這個雷一開始沒注意到就踩下去了，想說Vue.extend元件怎麼都跑不出來，感謝前輩Kuro的提點才想起有這件事情）**
JavaScript部分
```
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
也可以改寫為如下的作法，在各別向應用程式註冊：
```
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
或是乾脆一點把他以`Vue.component`封裝：
```
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

let vm = new Vue({
    el:'#app',
})
```

### template封裝方式
在元件進行到`template check`這個生命週期時，會使用相對應的`template`進行編譯，而`template`的封裝方式也有許多不同的做法，最簡單的像是以HTML作為封裝：
#### HTML標籤封裝
```
let vm = new Vue({
    el:'#app',
    template:'<div>HTML封裝方式</div>'
})
```
#### x-template
不同於直接使用字串內塞入HTML標籤的作法，`x-template`可以將整段樣板抽取出來，以另一個`script`標籤作為樣板管理的方式，而使用方法也不會太難，我們僅需要另外加入一個`script`標籤，並且在`type`屬性定義為`x-template`，id的部分則對應到Vue實體中的template即可：
HTML部分
```
<div id="app">

</div>
```

JavaScript部分
```
<script type="text/x-template" id="my-component">
    <div> //注意一定要有這個外層元素
        <div>x-template封裝法</div>
        <div>x-template封裝法</div>
    </div>
</script>
<script>
    let vm = new Vue({
        el:'#app',
        template:'#my-component'
    })
</script>
```
**而需要注意的是JavaScript的部分，在使用`x-template`方法封裝時，要注意`x-template`的script檔案最外層必須要有一個root根元素來做包裝，否則將會只渲染出第一個元素，這一點跟React.js的JSX概念是一樣的**

#### Render function
最後這一種方式基本上不太會去使用他，他的意思就如同我們平常在使用`template`時，依靠Vue.js去編譯，而`Render function`只是變成今天編譯的動作由我們來寫而已，而範例程式碼如下：
```
let vm = new Vue({
    el:'#app',
    //  template:'<div>內容</div>' 原本template用法，變成下面的render function
    render: function(createElement){
        return createElement('div','內容')
    },
})
```
### 結尾
`components`部分還有許多的細節可以講解，因此剩下的部分將會挪到[下個章節](https://shawnlin0201.github.io/2019/07/09/Vue-js-note-005/)！


### 參考資料

- [MVVM維基百科：https://zh.wikipedia.org/wiki/MVVM](https://zh.wikipedia.org/wiki/MVVM)
- [官方網站文件：https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)
- [六角學院影片：https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA](https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA)
- [Kuro Hsu與六角學院合作的課程ppt：https://drive.google.com/file/d/0B5TNzeyWT1lqc2k0SEZtSnFuMXc/view](https://drive.google.com/file/d/0B5TNzeyWT1lqc2k0SEZtSnFuMXc/view)