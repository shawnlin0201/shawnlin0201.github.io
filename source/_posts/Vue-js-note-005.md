---
title: Vue.js學習系列(五)components(props, event-bus, Dynamic & Async)
date: 2019-07-10 17:05:04
tags:
- [前端]
- [JavaScript]
- [Vue.js]
categories: 
- [前端, JavaScript, Vue.js, 學習系列]
---

![](/images/vue-logo.png)

# 前言
本篇是繼上一篇講解`components`的續集，還沒有看過的朋友可以先[點此看上一篇](https://shawnlin0201.github.io/2019/07/10/Vue-js-note-004/)。

# props
在使用`component`時，許多需要顯示的資料可能不一定來自本身元件所擁有的，有時候可能是由父層元件所傳遞下來的，而這個傳遞方法就是透過`component`中的`props`來進行，需要額外設定的地方在於HTML部分中，自定義元件`my-component`的屬性加上了一個藉由`v-bind`所綁定的`parent-msg`，這個`parent-msg`所對應的是由JavaScript部分中`Vue.component`全域註冊元件屬性`props`中的`['parentMsg']`，進而使得`x-template`中的元件資料物件`parentMsg`能夠知道這是個被傳遞的物件；而相對的例子便是`x-template`中元件(`<div>Child Message: {{ message }}</div>`)的`message`，這裡指的`message`則是`Vue.component`中的`data`('子元件資料')。而回到原本的HTML部分，藉由`v-bind`所綁定的`parent-msg`，最終會找到其對應的`message`，這裡的`message`則是指初始化實體後根元件的資料物件`vm.$data.message`，範例程式碼如下：
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
而若是HTML部分中`parent-msg`沒有使用`v-bind`綁定的話，其資料物件將會只是產生一般的`innerText`，如下所示：
``` 
<div id="app" >
    <my-component parent-msg="message"></my-component>
</div>
```

# props 型別檢查
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
此時的`props`部分已經不是使用`array`的方式當作物件而是使用`object`的方式，並且該物件的`key`則是用來設定我們傳入的`props`物件名稱,`value`則是用來設定我們傳入資料物件的型態檢查與預設值。例如第一個pair的部分可以看到`parentMsg`的`value`為`null`這意味著`parentMsg`傳進來的資料物件不會做型別檢查。

而`parentMsgA`的部分，同理意思就是會需要傳進來資料物件型態為`Number`，此時若傳進來的資料物件型態不是`Number`而是`String`時，在使用瀏覽器開發時，開發人員控制台會拋出一個`warn`，提醒你傳進來的數值他預設為`Number`，但是他得到了一個型態為`String`，並且數值是什麼等等。

`parentMsgB`的部分，則是檢查時的資料物件型態為`String`或`Number`都可以接受。
`parentMsgC`的設定，則是除了他的資料物件型態必須為`String`之外，還強迫元件必須得要傳入資料物件。
`parentMsgD`的設定，則是資料型態須為`Number`之外，若元件沒有傳入資料物件，他會預設資料物件的數值為`100`。
`parentMsgE`的設定，則是資料型態須為`Object`之外，預設資料物件還會返回一個物件物件。
`parentMsgF`的設定`,則是我們可以自行寫一個驗證器的部分來驗證傳進來的資料物件是否符合我們所返回的條件。

# 單向資料流
元件與元件的溝通在Vue.js是屬於單向資料流的，意思是我們只能透過父元件傳遞資料給子元件，子元件並不能傳遞資料給父元件，這樣做的原因是當今天很有多子元件依賴父元件某項資料物件時，如果每個子元件都可以任意更改父元件的資料時，就容易造成牽一髮而動全身的行為，而一般父元件向子元件傳遞範例如下：
```
<div id="app">
    <p>父元件：<br>
      {{ message }}<br>
      <input type="text" v-model="message">
    </p>
    <p>子元件：
      <child-component :parent-message="message"></child-component>
    </p>
</div>
```
```
Vue.component('child-component',{
    template:'<div>{{ parentMessage }} <br><input type="text" v-model="message"></div>',
    props:{
        parentMessage: String
    },
    data: function(){
        return {
            message : this.parentMessage
        }
    },
})

let vm = new Vue({
    el:'#app',
    data:{
        message : '父元件資料'
    }
})
```
在這個範例中，首先要知道一個前提是當`v-model`綁定在input元素上時預設是將input的`value`作為資料物件，因此在父元件的input輸入資料時，同樣會將父元件的`data`作為更動。接著要理解的是，有兩個資料物件分別為父元件的`message`以及子元件的`message`，父元件的`message`是依靠本身元素的`v-model`綁定的`value`，而子元件的`message`是依靠`props`裡的`parentMessage`傳遞父元件的`message`進來當作資料物件。

因此這個範例結果是，我們在父元件操作input時的資料資料可以傳遞給子元件當作子元件的資料而子元件在操作input時的資料資料只能夠綁定給自己的資料物件。

已知props只能將父元件的資料傳遞給子元件之後，接著或許會有一個疑問，假設有一種情境一定需要子元件傳遞給父元件，要怎麼操作？

答案是**透過發送一個event回傳給父元件！**(類似React.js子元件傳遞給父元件中迂迴的做法)，而做法是在子元件的`methods`中透過`this.#parent.`得到父元件，再透過`$emit( eventName, […args] )`去發送事件，以及將後須參數傳給所註冊的事件作為傳參；而父元件的地方則是在生命週期的鉤子中，使用`$on( event, callback )`去註冊一個監聽事件，而該事件在範例中便是調用在`methods`裡的`selfUpdate`，透過父元件本身自己的方法去改變自己的資料，這樣一來就能達成如同傳遞一般的效果，又能維持單向資料流的思維。範例程式碼如下：

```
<div id="app">
    <p>父元件：<br>
        {{ message }}<br>
        <input type="text" v-model="message">
    </p>
    <p>子元件：
        <child-component :parent-message="message"></child-component>
    </p>
</div>
```
```
Vue.component('child-component',{
    template:'<div>{{ parentMessage }} <br><input type="text" v-model="message"> <button type="button" @click="updateText">Update</button></div> ',
    props:{
        parentMessage: String
    },
    data: function(){
        return {
            message : this.parentMessage
        }
    },
    methods:{
      updateText: function(){
        this.$parent.$emit('update',this.message)
      }
    }
})

let vm = new Vue({
    el:'#app',
    data:{
        message : '父元件資料'
    },
    methods: {
      selfUpdate(value){
        this.message = value
      }
    },
    mounted() {
      this.$on('update', this.selfUpdate)
    },
})
```
# event bus
顧名思義，`event-bus`就像是台公車一樣，當我們今天元件之間不是父子關係，而是兄弟、甚至是多層元件關係時，都可以使用`event-bus`來達成傳遞這項目的，使用範例如下：
HTML部分是兩個平行的元件`element-city1`與`element-city2`：
```
<div id="app">
    <element-city1></element-city1>
    <element-city2></element-city2>
</div>
```
JavaScript部分，首先我們一開始先透過new初始化一個Vue物件並賦值給變數`bus`，使`bus`擁有Vue物件的屬性與功能，接著如同父子元件溝通範例一樣，以`$emit`發送事件然後對象再透過在生命週期鉤子來註冊事件，以`$on`監聽事件。而不一樣的地方在於發送事件與監聽的參考對象要改在`bus`上，這樣就能透過`bus`來當作溝通的橋樑：
```
let bus = new Vue()

Vue.component('element-city1', {
  template:
  `
    <div>
      <input type="text" v-model="message"><br>
      <button type="button" @click="submit">Click</button>
    </div>
  `,
  methods:{
    submit(){
      bus.$emit('receive', this.message)
    }
  },
  data(){
    return {
      message : "this is city1's message"
    }
  }
})

Vue.component('element-city2', {
  template:`<div>{{ message }}</div>`,
  created(){
    let self = this
    bus.$on('receive',function(newMessage){
      self.message = newMessage
    })
  },
  data(){
    return{
      message: "this is city2's message"
  }}
})

let vm = new Vue({
  el:'#app',
  data:{
    text:'Hello Vue!',
  },
  methods:{
    handleOnClick : function(name){
      return this.text = `Hello ${name}!`
    }
  }
})
```

**而要注意的地方是**，由於註冊與監聽事件都是在變數`bus`上，不同元件間註冊與監聽可能事件名稱會有撞名的問題，可以透過初始化另一台`bus`來緩解這個問題。

# 結尾
`components`章節至今已經邁向第二篇啦，元件系統的部分還蠻多東西可以介紹的，因此我們將會三顧茅廬，而接下來將會講到動態的元件處理、樣板語言的編譯範圍以及如何在塞入資料在到元件的編譯樣板內。

# 參考資料

- [官方網站文件：https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)
- [六角學院影片：https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA](https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA)
- [Kuro Hsu與六角學院合作的課程ppt：https://drive.google.com/file/d/0B5TNzeyWT1lqc2k0SEZtSnFuMXc/view](https://drive.google.com/file/d/0B5TNzeyWT1lqc2k0SEZtSnFuMXc/view)