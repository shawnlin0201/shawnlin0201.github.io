---
title: Vue.js 插槽 slot
date: 2019-09-18 10:45:40
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

## 渲染範圍
使用樣本語法時，我們可以在 HTML 中使用**兩對花括號**來表示要顯示的資料，並且透過 Vue.js 實體中的 `el` 來指定 Vue.js 渲染的範圍，並且在子元件的 `template` 中同樣也可以使用，然而如果是在 HTML 中的子元件標籤裡**直接使用則會導致失效**，如下面範例：

HTML部分：

```
<div id="app">
    {{ message }}
    <child-element>{{ childMessage }}</child-element>
</div>
```

JavaScript部分：

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

最後樣板語法將不會顯示任何資料。（這並非是什麼 BUG，而是 Vue.js 預設的渲染。）

## slot

假使想要在子元件標籤中放些自定義的文字或內容，可以透過 `<slot>` 標籤來達成，我們試著將上面的元件稍微改寫一下：

JavaScript 部分：

```
Vue.component('child-element', {
  template:
  `
  <div>
    <slot></slot> // 加入 slot 標籤
  </div>
  `,
  data(){
    return {
      childMessage : 'child component'
    }
  }
})
```

HTML 部分：

```
<div id="app">
    {{ message }}
    <child-element>
        {{ message }} //這裡的message 將會傳入父元件的資料物件
    </child-element>
</div>
```

這樣將會使得在 `<child-element></child-element>` 標籤中的資料，傳入到子元件裡的`<slot></slot>`的位置，將其替換掉。並且我們可以也可以傳入 HTML 元素、甚至是其他的元件以及父元件的資料物件：

**注意**當使用這樣的方法在子元件內使用樣板語法傳入資料，此時傳入的資料將會是**父元件的資料物件**，若要使用子元件的資料物件，仍然只能在子元件的`template`中去呼叫。

而當我們使用 `<slot>` 後，若沒有 HTML 部分中所綁定的元件中傳入資訊，則預設將會顯示`<slot></slot>`所包含的資料：

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

最後顯示的結果會是 `<div>Hello Vue!</div>`。

## 指定slot

當今天 `slot` 所要傳入的對象越來越多時，可以透過指定插入的方式去分配 `slot` 要怎麼對應資料，方法是在子元件中使用 `template` 標籤並加上`v-slot`屬性，`v-slot`的值會對應到的是 `slot` 標籤的 `name` 屬性，這樣一來當我們有需要放多個 `slot` 時就不必擔心對應位置的問題，範例如下：

HTML部分：

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

JavaScript部分：

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

最後 HTML 部分子元件的內容將會對應的傳入子元件中，並顯示出來。而這個 API 好用的地方在於今天有個元件我們純粹只是想要更換部分的顯示內容，就可以在父元件引入該子元件，並且透過 `v-slot` 直接傳入子元件中，而不用資料整筆 props 進去再接出來。

以上是目前 Vue.js 的最後一章節，而實作的部分將會等到我們以 Vue-cli 創建環境時，再搭配 D3.js 一起介紹！

> 隨文附上今日的黑黑，據家人說他今天在同個地方躺了連續八小時 ( XD???
> ![https://ithelp.ithome.com.tw/upload/images/20190917/20119062Gz4i7Zt1Ic.jpg](https://ithelp.ithome.com.tw/upload/images/20190917/20119062Gz4i7Zt1Ic.jpg)