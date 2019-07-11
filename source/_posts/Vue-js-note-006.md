---
title: Vue.js學習筆記(六)components(Dynamic component, keep-alive,  slot)
date: 2019-07-11 11:46:25
tags:
- [前端]
- [JavaScript]
- [Vue.js]
categories: 
- [前端, JavaScript, Vue.js]
---

![](/images/vue-logo.png)

# 前言
元件系統經過三顧茅廬後終於來到了他的最終章節，這個章節將會補充`component`有關於動態元件的用法，以及如何在樣板語法的範圍中加入更多的顯示資訊。

# Dynamic component 動態元件
在某些情境下的專案中可能會需要透過標籤來切換頁面，可能第一個想到的會是使用`v-if`或是`v-show`的方式去顯示，並且透過在標籤上綁定資料物件來驅動顯示內容：

HTML部分
```
<div id="app">
    <button type="button" @click="pagename = 'mainpage'">switch to Main page</button>
    <button type="button" @click="pagename = 'aboutpage'">switch to About page</button>
    <button type="button" @click="pagename = 'contactpage'">switch to Contact page</button>
    <mainpage v-if="pagename === 'mainpage'"></mainpage>
    <aboutpage v-if="pagename === 'aboutpage'"></aboutpage>
    <contactpage v-if="pagename === 'contactpage'"></contactpage>
</div>
```

JavaScript部分
```
Vue.component('mainpage', {
  template:`<div>This page is mainpage</div>`,
  created() {
    console.log('created mainpage')
  },
  destroyed() {
    console.log('destroyed mainpage')
  },
})
Vue.component('aboutpage', {
  template:`<div>This page is aboutpage</div>`,
  created() {
    console.log('created aboutpage')
  },
  destroyed() {
    console.log('destroyed aboutpage')
  },
})
Vue.component('contactpage', {
  template:`<div>This page is contactpage</div>`,
  created() {
    console.log('created contactpage')
  },
  destroyed() {
    console.log('destroyed contactpage')
  },
})


let vm = new Vue({
  el:'#app',
  data:{
    pagename : 'mainpage'
  }
})
```

透過這樣的做法確實可以達到切換分頁的效果，但缺點在於進入該頁面的時候，DOM中會載入該元素，解決辦法是透過Vue所提供的API(`:is`)來達成同樣的效果，我們只需要放入一個名為`component`的元素（Vue的內建元素`Built-In Components`），並且透過`:is`來對應元件名稱，最後Vue.js就會依照`:is`的數值來決定被渲染的元件，HTML部分改寫後如下：

```
<div id="app">
    <button type="button" @click="pagename = 'mainpage'">switch to Main page</button>
    <button type="button" @click="pagename = 'aboutpage'">switch to About page</button>
    <button type="button" @click="pagename = 'contactpage'">switch to Contact page</button>
    <component :is="pagename"></component>
</div>
```

# keep-alive
接下來的會遇到的情境是，使用者可能會在某個元件中進行操作，接著又切換到另外一個元件，根據上面的範例所示，只要`v-if`為`false`的情況下，就會觸發`destroyed`的生命週期鉤子，也就是說該元件會被註銷所有的資訊，等到下次使用者切換回來`v-if`為`true`時，會發現原本操作的資料已經消失了（可以透過`created`這個生命週期鉤子被觸發，來證明此時載入的已經是另一個新的元件了）。而要防止這種情況發生，並且保留原本的資料的作法是，使用`<keep-alive>`元素來進行處理，範例的部分則參考上面的來進行改寫：

HTML部分
```
<div id="app">
    <button type="button" @click="pagename = 'mainpage'">switch to Main page</button>
    <button type="button" @click="pagename = 'aboutpage'">switch to About page</button>
    <button type="button" @click="pagename = 'contactpage'">switch to Contact page</button>
    <keep-alive>
      <component :is="pagename"></component>
    </keep-alive>
</div>
```

JavaScript部分
```
Vue.component('mainpage', {
  template:`<div>This page is mainpage. Enter this page : {{ count }} </div>`,
  data(){
    return {
      count : 0
    }
  },
  activated() {
    this.count++
  },
  destroyed() {
    console.log('destroyed')
  },
})
Vue.component('aboutpage', {
  template:`<div>This page is aboutpage. Enter this page : {{ count }} </div>`,
  data(){
    return {
      count : 0
    }
  },
  activated() {
    this.count++
  },
  destroyed() {
    console.log('destroyed')
  },
})
Vue.component('contactpage', {
  template:`<div>This page is contactpage. Enter this page : {{ count }} </div>`,
  data(){
    return {
      count : 0
    }
  },
  activated() {
    this.count++
  },
  destroyed() {
    console.log('destroyed')
  },
})


let vm = new Vue({
  el:'#app',
  data:{
    pagename : 'mainpage'
  }
})
```
透過devtools控制台觀察可以看到此時當元件`v-if`為`false`時，原先應該要觸發生命週期鉤子中的`destroyed`，此時卻沒有顯示，表示元件在這個時候被保留了下來，並且因為設置了`<keep-alive>`元素的關係，此時切換回來的元件，並不會重新初始化，而是觸發了生命週期鉤子中的`activated`，如此一來即使是使用者在某個元件下使用input表單元件輸入資料，切換到其他元件再切回來也不必再次輸入原先的資料了。

# slot
在使用樣板語法顯示資料物件時，我們已經很熟練的知道要使用花括號`{% raw %}{{ something }}{% endraw %}`來作為顯示的語法，並且在初始化宣告的元素範圍內使用會顯示父元件的資料物件，而在子元件中可以在`template`中使用同樣的方式，顯示的會是子元件自有的資料物件。那麼在HTML部分子元件中直接使用樣板語法會發生什麼事情？

HTML部分
```
<div id="app">
    {{ message }}
    <child-element>{{ childMessage }}</child-element>
</div>
```
JavaScript部分
```
Vue.component('child-element', {
  template:`<div></div>`,
  data(){
    return {
      childMessage : 'child component'
    }
  }
})


let vm = new Vue({
  el:'#app',
  data:{
    message : 'parent component'
  }
})
```
這樣渲染的結果將會是子元件沒有顯示其資料`child component`，並非所預期的結果，而實際上其實不論在`<child-element></child-element>`裡面塞什麼東西都不會有任何資料顯示，直到我們在子元件中的`template`裡面加入了`<slot>`元素之後就截然不同：
```
Vue.component('child-element', {
  template:
  `
  <div>
    <slot></slot>
  </div>
  `,
  data(){
    return {
      childMessage : 'child component'
    }
  }
})


let vm = new Vue({
  el:'#app',
  data:{
    message : 'parent component'
  }
})
```
這樣顯示出來的結果將會使得原本在`<child-element></child-element>`中間的資料，傳入到子元件`template`裡的`<slot></slot>`的位置，將其替換掉。並且我們可以也可以傳入HTML元素、甚至是其他的元件以及父元件的資料物件：
```
<div id="app">
    {{ message }}
    <child-element>
        {{ message }} //這裡的message 將會傳入父元件的資料物件
    </child-element>
</div>
```
**注意**當使用這樣的方法在子元件內使用樣板語法傳入資料，此時傳入的資料將會是**父元件的資料物件**，若要使用子元件的資料物件，仍然只能在子元件的`template`中去呼叫。

而當我們使用`<slot>`後，若沒有HTML部分中所綁定的元件中傳入資訊，則預設將會顯示`<slot></slot>`所包含的資料：

```
<div id="app">
    {{ message }}
    <child-element>
        
    </child-element>
</div>
```
```
Vue.component('child-element', {
  template:
  `
  <div>
    <slot>Hello Vue!</slot>
  </div>
  `,
  data(){
    return {
      childMessage : 'child component'
    }
  }
})


let vm = new Vue({
  el:'#app',
  data:{
    message : 'parent component'
  }
})
```
這樣的結果將會是把子元件中`<slot></slot>`的`Hello Vue!`傳入`template`中，最後`template`則顯示`<div>Hello Vue!</div>`。

## 指定slot
當今天`slot`所要傳入的對象越來越多時，可以透過指定插入的方式去分配`slot`要怎麼對應資料，方法是在原先HTML部分中子元件中使用`template`元素並加上`v-slot`屬性，`v-slot`的值會對應到的是`template`裡面`slot`元素的`name`屬性，這樣一來當我們有需要放多個`slot`時就不必擔心對應位置的問題，範例如下：

HTML部分
```
<div id="app">
    {{ message }}
    <child-element>
        <template v-slot:first>First</template>
        <template v-slot:second>Second</template>
        <template v-slot:third>Third</template>
    </child-element>
</div>
```
JavaScript部分
```
Vue.component('child-element', {
  template:
  `
  <div>
    <slot name="first"></slot>
    <slot name="second"></slot>
    <slot name="third"></slot>
  </div>
  `,
  data(){
    return {
      childMessage : 'child component'
    }
  }
})


let vm = new Vue({
  el:'#app',
  data:{
    message : 'parent component'
  }
})
```

# 結尾
經由三顧茅廬之後終於將Vue.js的元件系統寫完了，不過元件系統中其實還有更深入的用法，有興趣的話歡迎到官網文件中去查詢，或許會有意想不到的收穫！接著預告Vue.js系列下一篇內容將會講到快速開發環境Vue-cli的用法！

# 參考資料

- [官方網站文件：https://cn.vuejs.org/v2/guide/](https://cn.vuejs.org/v2/guide/)
- [六角學院影片：https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA](https://www.youtube.com/channel/UC-b2nGm0xLzic38Byti0VjA)