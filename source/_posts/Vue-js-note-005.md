---
title: Vue.js學習筆記(五)components(props)
date: 2019-07-09 14:37:58
tags: vue.js
---

### 前言
本篇是繼上一篇講解`components`的續集，還沒有看過的朋友可以先[點此看上一篇](https://shawnlin0201.github.io/2019/07/08/Vue-js-note-004/)。

### props
在使用`component`時，許多需要顯示的資料可能不一定來自元件所擁有的，有時候可能是由父層元件所傳遞下來的，而這個傳遞方法就是透過`component`中的`props`來進行，需要額外設定的地方在於HTML部分中，自定義元件`my-component`的屬性加上了一個藉由`v-bind`所綁定的`parent-msg`，這個`parent-msg`所對應的是由JavaScript部分中`Vue.component`全域註冊元件屬性`props`中的`['parentMsg']`，進而使得`x-template`中的元件數據對象`parentMsg`能夠知道這是個被傳遞的對象；而相對的例子便是`x-template`中元件(`<div>Child Message: {{ message }}</div>`)的`message`，這裡指的`message`則是`Vue.component`中的`data`('子元件資料')。而回到原本的HTML部分，藉由`v-bind`所綁定的`parent-msg`，最終會找到其對應的`message`，這裡的`message`則是指初始化實體後根元件的數據對象`vm.$data.message`，範例程式碼如下：
HTML部分
```
<div id="app" >
    <my-component :parent-msg="message"></my-component>
</div>
```
JavaScript部分
```
<script type="text/x-template" id="my-component">
    <div>
        <div>Parent Message: {{ parentMsg }}</div>
        <div>Child Message: {{ message }}</div>
    </div>
</script>
<script>
Vue.component('my-component',{
    props: ['parentMsg'],
    data:function(){
        return {
            message : '子元件資料'
        }
    },
    template:'#my-component'
})


let vm  = new Vue({
    el:'#app',
    data:{
        message : '父元件資料'
    }
})

</script>
```
而若是HTML部分中`parent-msg`沒有使用`v-bind`綁定的話，其數據對象將會只是產生一般的`innerText`，如下所示：
```
<div id="app" >
    <my-component parent-msg="message"></my-component>
</div>
```

### props 型別檢查
而在實際在工作上實作時，我們有可能會遇到`components`的部分是由別的team所撰寫的，因此在接手專案時，對於`components`的`props`型別檢查就特別重要，我們以上面的範例為例子來看看：

```
Vue.component('my-component',{
    props: {
        parentMsg: null,
        parentMsgA: Number,
        parentMsgB: [String, Number],
        parentMsgC: {
            type: String,
            required: true,
        },
        parentMsgD: {
            type: Number,
            default: 100
        },
        parentMsgE: {
            type: Object,
            default: function(){
                return {
                    message : 'Hello Vue!'
                }
            }
        },
        parentMsgF: {
            validator: function(value){
                return value > 100
            }
        },

    },
    data:function(){
        return {
            message : '子元件資料'
        }
    },
    template:'#my-component'
})

let vm  = new Vue({
    el:'#app',
    data:{
        message : '父元件資料'
    }
})
```
此時的`props`部分已經不是使用`array`的方式當作對象而是使用`object`的方式，並且該物件的`key`則是用來設定我們傳入的`props`對象名稱,`value`則是用來設定我們傳入數據對象的型態檢查與預設值。例如第一個pair的部分可以看到`parentMsg`的`value`為`null`這意味著`parentMsg`傳進來的數據對象不會做型別檢查。

而`parentMsgA`的部分，同理意思就是會需要傳進來數據對象型態為`Number`，此時若傳進來的數據對象型態不是`Number`而是`String`時，在使用瀏覽器開發時，開發人員控制台會拋出一個`warn`，提醒你傳進來的數值他預設為`Number`，但是他得到了一個型態為`String`，並且數值是什麼等等。

`parentMsgB`的部分，則是檢查時的數據對象型態為`String`或`Number`都可以接受。
`parentMsgC`的設定，則是除了他的數據對象型態必須為`String`之外，還強迫元件必須得要傳入數據對象。
`parentMsgD`的設定，則是數據型態須為`Number`之外，若元件沒有傳入數據對象，他會預設數據對象的數值為`100`。
`parentMsgE`的設定，則是數據型態須為`Object`之外，預設數據對象還會返回一個物件對象。
`parentMsgF`的設定`,則是我們可以自行寫一個驗證器的部分來驗證傳進來的數據對象是否符合我們所返回的條件。

### 參考資料

- [MVVM維基百科：https://zh.wikipedia.org/wiki/MVVM](https://zh.wikipedia.org/wiki/MVVM)
- [官方網站文件：https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)
- [六角學院影片：https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA](https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA)
- [Kuro Hsu與六角學院合作的課程ppt：https://drive.google.com/file/d/0B5TNzeyWT1lqc2k0SEZtSnFuMXc/view](https://drive.google.com/file/d/0B5TNzeyWT1lqc2k0SEZtSnFuMXc/view)