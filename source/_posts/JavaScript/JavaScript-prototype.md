---
title: JavaScript 深入淺出 prototype
date: 2020-07-27 10:03:14
tags:
- [w3HexSchool]
- [JavaScript]
categories: 
- [JavaScript]
- [JavaScript, 深入淺出]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/JavaScript/JavaScript-logo.png' width='200px' height='200px' />
</div>

`prototype` 一直是個 JavaScript 核心裡面最難以解釋的概念，因為光是提到 `prototype`，就不得不提相關的概念：`constructor`、`__proto__`、`Function.prototype`、`Object.prototype` ……等等，所以等了一段時間我覺得是時候來講講他了。

<!-- more -->


要說為什麼會有 `prototype` 的出現其實需要考究到當時開發 `JavaScript` 的創造者 **Brendan Eich** 說起。

在 20 年代初期的瀏覽器當中，一開始使用者並沒有與客戶端（client side）互動的能力，頂多就是用來瀏覽與點擊各種連結的工具，假設有表單要使用者去輸入，發送時也僅能在伺服器端（server side）去做欄位檢查。

而當時對於使用撥接數據機上網的，也就是開起來會「嘰－－嘟嘟嘟嚕－－唰唰唰唰」的年代來說，這樣的體驗並不是很好，因為當時可是連開個頁面都要跑個一兩分鐘以上，當你填好表單結果等了一段時間伺服器才跟你說哪個欄位缺少資訊或錯誤，這種使用者體驗並不是很好。

> 那要怎麼辦呢？

在當時網景公司（Netscape）便想要改善這種很鳥的體驗，他們需要一種可以立刻跟使用者有互動的語言，所以便派了工程師去開發一套語言來做這件事情，沒錯，那個人就是 **Brendan Eich**。

當然 `JavaScript` 的命名與 `Java` 之間的關係並不在這篇的討論範圍內，因為我們要來討論 `JavaScript` 為何會有 `prototype` 的這件事：

首先 `JavaScript` 一開始設計理念就是 **不要太複雜**，而在當年程式語言正流行著物件導向設計（oriented），所以在 **JavaScript** 所有的東西都是物件。

如今，我們可以透過 `new` 關鍵字來透過函式建構式（constructor）建立一個實體物件：

```js
function Fruit(name) {
  this.name = name
  this.log = function () {
    console.log('I love ' + this.name + '.')
  }
}

var apple = new Fruit('Apple')
var banana = new Fruit('Banana')
apple.log() // I love Apple.
banana.log() // I love Banana.

```
我們可以由上方例子看到 `apple` 與 `banana` 雖然都是使用 `Fruit` 這個建構式所創造出來的物件，但裡面的 `log` 方法其實是一樣的用法，我們並不需要每次初始化時都建立一個這個函式：

```js
console.log(apple) // { name: 'Apple', log: function(){ console.log('I love ' + this.name + '.') } }
console.log(banana) // { name: 'banana', log: function(){ console.log('I love ' + this.name + '.') } }
```

假如我要更改其中一個實體中的 `log` 函式，因為物件指向不同的地方，所以我得一個一個做更改，這時候我們就可以藉由 `prototype` 來解決這個問題。

# prototype
`prototype` 的功用很簡單，其實就是幫助我們將要繼承的方法從建構式中抽離出來：

```js
function Fruit(name) {
  this.name = name
}

Fruit.prototype.log = function () {
  console.log('I love ' + this.name + '.')
}

var apple = new Fruit('Apple')
var banana = new Fruit('Banana')
apple.log() // I love Apple.
banana.log() // I love Banana.
```

我們可以看見 `apple` 與 `banana` 依然能使用 `log` 方法，但我們來檢查一下他們本身：

```js
console.log(apple) // { name: 'Apple' }
console.log(banana) // { name: 'banana' }
```

不…不…不見了？

對於物件存取很熟悉的我們都知道用了點標示法存取物件內的東西應該要在物件內阿，可是怎麼在物件中找不到 `log` 的存在？

而這一切原來就是 `__proto__` 搞的鬼。

# __proto__
`__proto__` 這個東西主要就是用來指向繼承的物件是誰，而效果簡單來說就是當你在當下物件中尋找不到某個方法（methods）時，就會循著這 `__proto__` 去尋找，直到找到 `Object.prototype` 中的 `__proto__` 為止（因為該值為 `null`，意思即是沒有繼承的物件了）。

所以回過頭來看剛才範例：

```js
function Fruit(name) {
  this.name = name
}

Fruit.prototype.log = function () {
  console.log('I love ' + this.name + '.')
}

var apple = new Fruit('Apple')

apple.log() // I love Apple.
console.log(apple) // { name: 'Apple' }
```

對於 `apple` 來說 `apple.__proto__` 會尋找到 `Fruit.prototype` 當中：

```js
apple.__proto__ === Fruit.prototype // true
```

因此我們透過 `apple.__proto__` 在 `Fruit` 物件裡面找到這個方法並且呼叫他。

```js
console.log(Fruit) 
/*
{
  log: function() { console.log('I love ' + this.name + '.') },
  constructor: function Fruit(name) { this.name = name }
  __proto__: Function.prototype
}
*/
```

假如我們要使用連在 `Fruit` 物件中都沒有的方法，例如：

```js
function Fruit(name) {
  this.name = name
}

var apple = new Fruit('Apple')

apple.toString()
```

現在我們知道透過 `apple.__proto__` 找到 `Fruit.prototype`，但裡面也沒有，所以又沿著 `Fruit.prototype.__proto__`，找到了 `Function.prototype` 裡的方法 `toString()`。

用 JavaScript 來表示的話，其實我們是呼叫到了 `apple.__proto__.__proto__.toString()`：
```js
apple.toString() === apple.__proto__.__proto__.toString() // true
```

而 `__proto__` 之間的連結也就是所謂的原型鍊（prototype chain）。

值得一提的是：
- 所有物件 `__proto__` 最後會找到的是 `Object.prototype.__proto__` 中的 `null`，表示再也找不到所繼承的物件。
- 如果方法名稱相同，比如剛才的 `Fruit` 物件中也有個 `toString` 方法，則在找到 `Object.prototype.toString` 之前就會先找到 `Fruit.prototype.toString`。

# hasOwnProperty
但這樣我們要怎麼確認該方法是該物件實體本來的方法，還是透過原型鍊所找到的方法呢？
除了我們剛剛用 `console.log` 直接將 `apple` 整個叫出來看之外，我們其實可以透過 `hasOwnProperty` 來確認：

```js
function Fruit(name) {
  this.name = name
}

Fruit.prototype.log = function () {
  console.log('I love ' + this.name + '.')
}

var apple = new Fruit('Apple')
console.log(apple) // { name: 'Apple' }
apple.hasOwnProperty('log') // false，log 方法並沒有存在實體中
apple.__proto__.hasOwnProperty('log') // true，log 方法是存在 prototype 當中
```


# constructor
在 `prototype` 中我們可以看到除了有物件的方法與 `__proto__` 之外，裡面還有一個 `constructor`，而這個 `constructor` 其實也就是代表建構函式：

```js
function Fruit(name) {
  this.name = name
}

var apple = new Fruit('Apple')

console.log(apple.constructor) // function Fruit(name) { this.name = name }
```

現在有整體原型鍊的概念了，我們現在看看 `new` 做了什麼

# new
`new` 關鍵字在初始化物件時，做的動作其實就是：
- 建立一個物件
- 將該物件的 `__proto__` 指向該函式建構式（constructor）的 `prototype`
- 呼叫物件中的建構函式（constructor）
- 把物件回傳（所以我們才能用變數接這個物件）。

最後我們要來比較一下初始化物件之間的關係。

# instanceof
`instnaceof` 簡單來說就是比較該實體與被比較的關聯式不是在同個原型鍊上：

```js
function Fruit(name) {
  this.name = name
}

function Person(name) {
  this.name = name
}
var apple = new Fruit('Apple')
var shawn = new Person('Shawn')

console.log(apple instanceof Fruit)   // true，apple 是由 Fruit 所初始化的物件實體
console.log(shawn instanceof Person)  // true，shawn 是由 Person 所初始化的物件實體
console.log(apple instanceof Object)  // true，apple 是由 Fruit 所初始化的物件實體，且 Fruit 物件本身是繼承於 Object 物件
console.log(shawn instanceof Object)  // true，shawn 是由 Person 所初始化的物件實體，且 Person 物件本身是繼承於 Object 物件
console.log(Fruit instanceof Person)   // false，Fruit 並不繼承於 Person
console.log(Person instanceof Fruit)   // false，Person 並不繼承於 Fruit
```

以上就是基礎的 `prototype` 的概念！

（其實還有更多細微的可以講，但一起弄懂可能大家都昏了，我們就慢慢提吧 XD）