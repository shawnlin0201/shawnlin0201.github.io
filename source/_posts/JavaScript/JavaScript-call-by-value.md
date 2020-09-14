---
title: JavaScript 深入淺出 call by value（call by address）
date: 2020-09-14 10:00:52
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


最近經過一年的淬鍊再回頭看看有關於傳值這篇文
https://blog.techbridge.cc/2018/06/23/javascript-call-by-value-or-reference/

我覺得 call by value(address) 的解釋法應該是最接近且一致的心理模型了，來分享一下我對 JavaScript 中賦值、存取與修改的看法。

我預設的心理模型：
1. 識別字（identity）存取資料時是靠記憶體地址，並不是值本身。
2. 重新賦值時（reassign），無論資料型別，一率另開一個記憶體地址放入該值，並儲存該記憶體地址。
3. 修改物件內容時，修改的目標是該記憶體地址內的值。
4. 賦值一個識別字時，會透過儲存的記憶體地址找到值：
  - 若該值為原始數值（primitive value），則另開一個記憶體地址放入該值，並儲存該記憶體地址。
  - 若該值為非原始數值（Non-primitive value），則直接複製原先目標的記憶體地址。

接著以這個心理模型解釋以下幾種常見的狀況：

# 若複製目標為原始數值並重新賦值：

```js
var primitiveValue = 1 // 賦值一個記憶體地址（0x00）裡面放入 1
var copyPrimitiveValue = primitiveValue // 從 primitiveValue 找到該記憶體地址（0x00）的值為 1，重新分配一個新的地址（0x01），並放入一個原始數值 1 進去（0x01）

copyPrimitiveValue = 2 // 重新分配一個 0x02 的記憶體地址，而原先的 0x01 到時候會被瀏覽器記憶體清除機制標記掃除法（Mark-and-Sweep）清除。

console.log(primitiveValue) // 讀取 0x00 的值 => 1
console.log(copyPrimitiveValue) // 讀取 0x02 的值 => 2
```

# 若複製目標為非原始數值並重新賦值：

```js
var nonPrimitiveValue = {a: 1}  // 賦值一個記憶體地址（0x00）裡面放入 {a: 1}
var copyNonPrimitiveValue = nonPrimitiveValue // 從 nonPrimitiveValue 找到該記憶體地址（0x00）的值為 {a: 1}，發現為非原始數值，直接複製原先的地址（0x00）

copyNonPrimitiveValue = {a: 2} // 重新分配一個 0x01 的記憶體地址

console.log(nonPrimitiveValue) // 讀取 0x00 的值 => {a: 1}
console.log(copyNonPrimitiveValue) // 讀取 0x01 的值 => {a: 2}
```

# 若複製目標為非原始數值並修改：

```js
var nonPrimitiveValue = {a: 1}  // 賦值一個記憶體地址（0x00）裡面放入 {a: 1}
var copyNonPrimitiveValue = nonPrimitiveValue // 從 nonPrimitiveValue 找到該記憶體地址（0x00）的值為 {a: 1}，發現為非原始數值，直接複製原先的地址（0x00）

copyNonPrimitiveValue.a = 2 // 這裡的 copyNonPrimitiveValue.a 屬於一種叫做 MemberExpression 的語法，因此它做的事情是先找到記憶體地址（0x00）中的 {a: 1}，在修改其中的 a 對應的 value 為 2。

console.log(nonPrimitiveValue) // 讀取 0x00 的值 => {a: 2}
console.log(copyNonPrimitiveValue) // 讀取 0x00 的值 => {a: 2}
```

# 傳入函式中並重新賦值

```js
var nonPrimitiveValue = {a: 1} // (1.) 分配至 0x00，value 為 {a: 1}

function reassign(obj) { // (3.) 接收到 0x00
  // (4.) 在 JavaScript 創造期會隱性 assign obj 至 0x00 
  obj = {a: 2} // (5.) 重新分配至 0x01
}

reassign(nonPrimitiveValue) // (2.) 傳入 0x00
console.log(nonPrimitiveValue) // (6.) 讀取 0x00 => {a: 1}
```

# 傳入函式中並修改

```js
var nonPrimitiveValue = {a: 1} // (1.) 分配至 0x00，value 為 {a: 1}

function reassign(obj) { // (3.) 接收到 0x00
  // (4.) 在 JavaScript 創造期會隱性 assign obj 至 0x00 
  obj.a = 2 // (5.) 讀取 0x00 中的 {a: 1} 並將其中的 a 值修改為 2 => 0x00: {a: 2}
}

reassign(nonPrimitiveValue) // (2.) 傳入 0x00
console.log(nonPrimitiveValue) // (6.) 讀取 0x00 => {a: 2}
```

以上通通是用同個心理模型來解釋，所以我目前斷言 JavaScript 最主要是 call by value 而這個 value 指的是記憶體位置的部分。

而對於「賦值」為什麼會有情況原因在於「重新賦值」與「修改」的差別
- 重新賦值（reassign）：給識別字（Identifer）一個新的記憶體地址
- 修改：從原先的記憶體地址中找到值再做修改，也就是物件成員表達式（MemberExpression）中的值。

目前驗證的方法可以透過這個簡易的視覺化工具執行編譯分析，去觀察直接讀取識別字跟識別字成員的差別。

- [視覺化工具](https://ui.dev/javascript-visualizer)

以上是我對於賦值、存取與修改的看法，也歡迎不同的意見來交流與驗證！