---
title: JavaScript 深入淺出 陣列處理迴圈的方法（forEach、map、filter、reduce）
date: 2000-01-01 00:00:00
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

今天要來介紹四個陣列中處理迴圈的常見方法，還在用 `for` 迴圈打天下嗎？來看看這些 cool 東西吧 (?)

<!-- more -->

下面要介紹的方法目的都在於可以使程式碼更加的簡潔易懂：

# Array.prototype.forEach()

`forEach` 方法簡單說就是將陣列整個遍歷一次，並且不回傳值。

例如原本 `for` 迴圈中我們要把 `arr` 陣列中的每個值加到 `acc` 當中：
```js
let arr = [1, 2, 3]
let acc = 0

for (let i = 0; i < arr.length; i++) {
  acc += arr[i]
}

console.log(acc) // 6
```

用 `forEach` 的寫法：

```js
let arr = [1, 2, 3]
let acc = 0

arr.forEach(function(val) {
  acc += val
})

console.log(acc) // 6
```

如果你想額外拿到遍歷時陣列的索引值或原先的陣列可以透過第二、第三參數拿到：

```js
let arr = [1, 5, 9]
let acc = 0

arr.forEach(function(val, index, array) {
  console.log(val)  // 分三次印出 1, 5, 9
  console.log(idx)  // 分三次印出 0, 1, 2
  console.log(array) // 分三次印出 [1, 5, 9], [1, 5, 9], [1, 5, 9]
})
```

# Array.prototype.map()

`map` 方法與 `forEach` 類似，但他可以回傳一個運算完的陣列：

例如原先我們要取得另一個運算完的陣列可能會這麼做：

```js
let arr = [1, 2, 3]
let newArr = []

for (let i = 0; i < arr.length; i++) {
  let newNumber = arr[i] * 2
  newArr.push(newNumber)
}

console.log(newArr) // [2, 4, 6]
```

但用了 `map` 後：

```js
let arr = [1, 2, 3]
let newArr = arr.map(function(val, idx, array){
  return val * 2 //  建立一個新的陣列，並將 1, 2, 3 分別乘 2 後依序傳入到陣列當中
})

console.log(arr) // [1, 2, 3]
console.log(newArr) // [2, 4, 6]
```

# Array.prototype.filter()

`filter` 作用最主要是用來篩檢內容，例如原先我們會這麼處理：

```js
let arr = [1, 2, 3]
let newArr = []

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]) // 1, 2, 3

  if (arr[i] > 1) {
    newArr.push(arr[i]) // 只有 2, 3 符合
  }
}

console.log(arr) // [1, 2, 3]
console.log(newArr) // [2, 3]
```

用了 `filter` 後：

```js
let arr = [1, 2, 3]
let newArr = arr.filter(function(val, index, array){
  return val > 1
})

console.log(arr) // [1, 2, 3]
console.log(newArr) // [2, 3]
```

# Array.prototype.reduce()

最後一個則是累加器 `reduce`，他最主要的作用就是依序取出與整理。

原先我們需要整理陣列可能會這樣寫：

```js
let arr = [1, 5, 9]
let sumArrAddTwo = 0

for (let i = 0; i < arr.length; i++) {
  sumArrAddTwo += (arr[i] + 2) // 依序取出 1, 5, 9 並加上 2，也就是將 3, 7, 11 累加給 sumArrAddTwo
}

console.log(sumArrAddTwo) // 21
```

用了 `reduce` 後：

```js
let arr = [1, 5, 9]
let sumArrAddTwo = arr.reduce(function(total, val){
  return total + val + 10
}, 0) // 這裡的 0 代表累加器初始值為 0，

/* 分解開來就像是
第一次：0 + 1 + 10 = 11
第二次：11 + 5 + 10 = 26
第三次：26 + 9 + 10 = 45
*/ 

console.log(sumArrAddTwo) // 45
```

但要注意的是，若你沒有給予 `reduce` 第二個參數的話，他預設會將第一個陣列值當作初始值，因此會變成：

```js
let arr = [1, 5, 9]
let sumArrAddTwo = arr.reduce(function(total, val){
  return total + val + 10
}) // 這裡沒有給予初始值

/* 分解開來就像是
第一次：1 + 5 + 10 = 16      // 陣列中的第一個值被當作初始值來看待
第二次：11 + 9 + 10 = 26
*/ 

console.log(sumArrAddTwo) // 36
```

但這種累加我自己是偏好使用 forEach 另外存一個變數會相對直覺一點。

不過若是要用來整理資料結構跟扁平化的時候 `reduce` 的優勢會比較明顯：

## reduce 整理資料結構

```js
let arr = [
  {
    id: 1,
    firstname: 'Audy',
    lastname: 'Lin'
  },
  {
    id: 2,
    firstname: 'Berry',
    lastname: 'Chen'
  },
  {
    id: 3,
    firstname: 'Cath',
    lastname: 'Chang'
  }
]
let member = arr.reduce(function(total, val){
  return total.concat({
    memberID: val.id,
    fullname: val.firstname + ' ' + val.lastname
  })
}, [])


console.log(member)

/*
[
  {
    "memberID": 1,
    "fullname": "Audy Lin"
  },
  {
    "memberID": 2,
    "fullname": "Berry Chen"
  },
  {
    "memberID": 3,
    "fullname": "Cath Chang"
  }
]
*/
```

~~雖然如果是 API 打下來的資料通常我都會叫後端直接整理好~~

但自己有需要的時候還是可以用這種方式快速整理好資料喔！


# 參考資料

- [MDN - Array.prototype.reduce](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Javascript迴圈函式Reduce、ForEach、Filter、Map 應用範例](https://www.ucamc.com/e-learning/javascript/261-javascript-reduce%E3%80%81foreach%E3%80%81filter%E3%80%81map)
- [上手使用 JavaScript 的 Map、Reduce 吧！](https://fred-zone.blogspot.com/2017/01/javascript-mapreduce.html)
- [JavaScript 陣列處理方法 [filter(), find(), forEach(), map(), every(), some(), reduce()]](https://wcc723.github.io/javascript/2017/06/29/es6-native-array/)