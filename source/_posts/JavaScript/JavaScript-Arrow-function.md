---
title: JavaScript 深入淺出 Arrow Function 箭頭函式
date: 2020-09-07 19:03:56
tags:
- [w3HexSchool]
- [JavaScript]
- [ECMAScript]
categories: 
- [JavaScript]
- [JavaScript, 深入淺出]
- [JavaScript, ECMAScript]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/JavaScript/JavaScript-logo.png' width='200px' height='200px' />
</div>

箭頭函式算是 ECMAScript 中常見的用法之一，但他與一般的函式差別在哪？就讓我們一起來瞭解箭頭函式到底是什麼吧。

<!-- more -->

# 基礎用法

一般我們在使用函式我們可能會這麼做：

```js
// 一般函式宣告（function declaration）的用法
function sum(x, y) {
  return x + y
}

// 或定義在變數當中的函式運算式（function expression）
const sum = function(x, y){
  return x + y
}
```

而箭頭函式最主要是將函式運算式或函式陳述式轉化成這種撰寫方式：

```js
const sum = (x, y) => {
  return x + y
}
```

# 進階用法

## 省略
當函式語句內部只有運算式的時候還可以省略大括號與宣告返回值的部分：

```js
const sum = (x, y) => x + y
```

如果只有一個參數還可以省略中間小括號的部分（如果沒有或有兩個以上的參數就需要小括號）：

```js
const greaterThanOne = x => x > 1
const sum = (x, y) => x + y
```

## 預設參數（Default parameters）與剩餘函數（Rest parameter）

在箭頭函式中一樣可以使用預設函數與剩餘函數：

```js
const sum = (x = 0, ...y) => {
  if (y.length === 0 ) { return x }
  let sumOtherNum = y.reduce((total, value) => total + value)
  return x + sumOtherNum
}

sum()          // 0
sum(1)         // 1
sum(1,3,5,7,9) // 25
```

## this 指向

我們都知道 JavaScript 是採用靜態作用域，而箭頭函式沒有 this 屬性，因此在箭頭函式中的 this 會指向的是父層定義箭頭函式當下的 this：

```js
const ShawnL = {
  name: 'ShawnL',
  sayHi: function(){
    return 'Hi, My name is ' + this.name +'.'
  }
}

ShawnL.sayHi() // Hi, My name is ShawnL .
```

若使用箭頭函式的情況：
```js
const name = 'anonymous'
const ShawnL = {
  name: 'ShawnL',
  sayHi: () => 'Hi, My name is ' + this.name +'.' // this 指向定義 ShawnL 的 this （也就是 window）
}

ShawnL.sayHi() // "Hi, My name is anonymous."  .
```

箭頭函式對於 this 的影響不小，像是在 Vue.js 框架中的 computed 若使用箭頭函式就會因為 this 指向問題而產生錯誤：

```js
new Vue({
  data () {
    return {
      number: 1
    }
  },
  computed: {
    addNumber: x => this.number + x // this 指向 window 了
  }
})
```

而 React.js 則是利用了這個特性，在撰寫 class component 簡化寫法：

```js
class CardWrapper extends React.component {
  constructor(props){
    super(props)
    this.state = {
      cardTitle: 'Title'
    }
  }

  handleChange = event => {
    this.setState({ // 用原先函式宣告寫法會受到呼叫者的指向而有所不同，現在箭頭函式統一指向了這個元件
      cardTitle: event.target.value
    })
  }

  render(){
    return (
      <div>
        <h1>{this.state.cardTitle}</h1>
        <input type="text" onChange={this.handleChange}>
      </div>
    )
  }
}
```

以上就是箭頭函式的用法，我自己是還蠻常用到的，使用時要注意的就是瀏覽器支援度與 this 指向問題，確認沒問題後箭頭函式將會大幅提升程式碼可閱讀性與開發速度。

# 參考資料

- [MDN - Arrow functions](https://wiki.developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions)