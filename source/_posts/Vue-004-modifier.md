---
title: Vue.js 修飾符 modifier
date: 2019-09-07 01:04:53
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

## 修飾符
上一章節介紹到指令的部分，還蠻多的東西需要一點時間消化，而今天要來介紹一點相對簡單的東西，那就是修飾符(modifier)啦！在 Vue.js中，修飾符以半形句號(`.`)**後綴**在指令上來表示**觸發事件時會另外使用什麼方法**，而修飾符的種類分別有：
- [事件修飾符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)
- [按鍵修飾符](https://cn.vuejs.org/v2/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)
- [系統修飾鍵](https://cn.vuejs.org/v2/guide/events.html#%E7%B3%BB%E7%BB%9F%E4%BF%AE%E9%A5%B0%E9%94%AE)

## 事件修飾符
事件修飾符是將常用的一些事件處理事件綁定在我們所觸發的指令上，例如我們常會在實作上遇見的**點擊冒泡**觸發事件，以往我們會透過`event.preventDefault()`來處理這一類事件，而在 Vue.js 中我們可以在`@click`後面加上`.prevent`就能夠在觸發`handleOnClick`後觸發`event.preventDefault()`：
```
<button type="button" @click.prevent="handleOnClick">Click Me!</button>
```

除此之外的事件修飾符還有：

- `.stop`：可以阻止原先綁定的指令繼續傳播回其他元素。
- `.once`：該指令所綁定的事件只會執行一次。
- `.passive`：被修飾的指令若條件符合將會立即觸發，例如在監聽捲軸滾動時`v-on:scroll.passive`，只要捲軸一滾動就會立即觸發，並不需要等到完成捲軸滾動的行為。
- `.prevent`：有如在方法上使用 `event.preventDefault()` 來阻止冒泡事件。
- `.capture`：在冒泡事件中，原本會先到**目標元素**才執行，並往回觸發而被此修飾符修飾的元素將會優先執行。

舉例來說，下方例子原本會因為**冒泡事件**的關係，點擊`#div2`的元素後會先觸發`handleOnClickTwo`，在冒泡觸發`handleOnClickOne`，但因為現在有在`#div1`的點擊事件增加`.capture`修飾符，所以反而會先觸發`handleOnClickOne`，在到達目標元素`#div2`，並觸發`handleOnClickTwo`。

```
<div id="app">
    <div id="div1" @click.capture="handleOnClickOne">
        <div id="div2" @click="handleOnClickTwo">
        </div>
    </div>
</div>
```

- `.self`：類似上面的範例概念，但這個修飾符是當指令是觸發在自己元素身上的時候才會去執行，例如下面範例點擊元素`#div2`，原先一樣原本會依序觸發`handleOnClickTwo`、`handleOnClickOne`，但因為元素`#div1`的指令增加了`.self`修飾符所以不會觸發`handleOnClickOne`。

只有在是點擊元素`#div1`的情況下，才會觸發`handleOnClickOne`。

```
<div id="app">
    <div id="div1" @click.self="handleOnClickOne">
        <div id="div2" @click="handleOnClickTwo">
        </div>
    </div>
</div>
```
冒泡事件相關的修飾符概念比較難懂一些，大家可以多練習看看，順便跟黑黑一起複習[冒泡事件](https://javascript.info/bubbling-and-capturing)！
![https://ithelp.ithome.com.tw/upload/images/20190907/20119062ODC8RZPq34.jpg](https://ithelp.ithome.com.tw/upload/images/20190907/20119062ODC8RZPq34.jpg)

## 按鍵修飾符
第二個要介紹的按鍵修飾符則是提供**偵測鍵盤按鍵**觸發方法(`methods`)的功能，例如當我們要使用按下`enter`鍵時啟用方法可以這麼做：
```
<input type="text" @keyup.enter="sumbitValid"/>
```

這樣一來如果有一些 input 欄位想要讓使用者快速 keyin 就可以使用這個修飾符增加使用者良好體驗。

另外，按鍵修飾符在更早的版本也支援`keycode`的用法，只可惜目前已經廢除了。
```
<input type="text" @keyup.13="sumbitValid"/>
```

其他官方提供的按鍵修飾符：
- `.enter`
- `.tab`
- `.delete`
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

## 系統修飾鍵

系統修飾鍵則是將事件綁定在要按下相對應的按鍵才能觸發方法的功能，假如上方範例還要多一個同時按下`shift`才能觸發的情境，就會變成：
```
<input type="text" @keyup.enter.shift="sumbitValid"/>
```

其他也可以使用的系統修飾鍵：
- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

透過本篇 Vue.js 所介紹的修飾符，搭配昨天的指令，已經可以組合出許多花樣！而下一章節將會介紹 Vue.js 實體一些常用 api(`data`、`computed`、`methods`以及`watch`)。

