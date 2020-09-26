---
title: 【建立模型】2-4 流程與計算：運算式（Expression）與運算子（Operators）上集
tags: 《透過認知模型認識 JavaScript》
---

# 計算與結果

![](https://i.imgur.com/VxsCNiF.jpg)
> cover picture sponsor: [gleammming.art](https://www.instagram.com/gleammming.art/?hl=zh-tw)

在日常生活中，人們總是無時無刻的在進行決策（Decision-making），從挑選早餐要吃什麼、上課或上班前思考一下今天要做什麼，處處都會需要判斷，而我們對於這些決策的根基點，往往便是來自於「計算」出的結果來決定下一步要做什麼。

---

## 運算式（Expression）

在 JavaScript 當中，我們可以如說故事般地撰寫程式，其中的脈絡、流程同樣也少不了「計算」，而有些程式碼段落在被解析的過程當中，會被視為要估算出（evaluate）一個數值，而這些程式碼段落我們稱其為 **運算式（Expression）**，其中運算式的種類大概可以歸類成以下幾種：


- 原始型別運算式（Primitive Expressions）
```js
1; // 1
```
- 算數運算式（Arithmetic Expressions）
```js
1 + 2; // 3
```
- 字串運算式（String Expressions）
```js
'Hello, ' + 'JavaScript!'; // 'Hello, JavaScript!'
```
- 邏輯運算式（Logical Expressions）
```js
5 > 1; // true
```
- 賦值運算式（Assignment Expressions）
```js
box = 360; // 360
```

在這些運算式當中，我們可以配合變數章節中的 LHS、RHS 概念結合使用，讓變數能儲存計算完的值，也能在需要的時候透過變數來呼叫之前計算過的值：

```js
var one = 1;
var two = 2;
var five = 5;
var text = 'Hello, ' + 'JavaScript!';
var box;

one; // 1
one + two; // 3
text; // 'Hello, JavaScript!'
five > one; // true
box = (one + five) * two; // 12

console.log(box); // 12
```

如此一來我們便可以透過 **變數的命名** 來表達出該資料運算的狀態：

```js
var ownMoney = 200;
var stockPrice = 300;
var haveEnough = ownMoney > stockPrice;
```

### 真值與假值：運算式的另個含意

透過運算式所算出的值其實都有相對代表的布林值（Boolean），而我們一般會稱會被視為 `true` 的值為 **真值（truthy）**，而偏向 `false` 的值為 **假值（falsy）**。

至於要檢測值到底是真還是假，我們可以透過 `Boolean()` 來判斷：

```js
Boolean('test'); // true
Boolean(0); // false
```

而在 JavaScript 當中，屬於假值的值有：
- `false`
- `0`
- `''`
- `undefined`
- `null`
- `NaN`

屬於真值的有：

- `1`
- `true`
-  其他不是假值的都是真值。

基於第三點來說，也就是說這些看起來像是假值的值其實都是真值：

- `-1` 
- `' '` 包含一個空白的字串
- `'false'` 字串
- `{}` 空物件
- `[]` 空陣列

也就是說當運算式為 `1+3` 的時候，其結果為 `4`，對於 JavaScript 來說它就是個真值。

而為什麼運算式的運算結果要區分真假值的原因在於，後續我們提到的敘述句（statement）會藉由給予運算式的結果來區分 **要不要繼續進行**：

```js
var ownMoney = 200
var stockPrice = 300
var haveEnough = ownMoney > stockPrice // false

if (haveEnough) {
    console.log('You have enough money to pay this!')
} else {
    console.log('Sorry! You need more money for this.')
}
```

在 `haveEnough` 變數當中，我們透過 `ownMoney > stockPrice` 算出結果是 `false`，而對於 `if/else` 敘述句來說，條件句中的結果若為 `truthy` 則會執行 `if` 語句內的程式碼；相反的，則會執行 `else` 語句中的程式碼，因此，上面程式碼中執行的最後結果將是顯示 `'Sorry! You need more money for this.'`。

而我們便是藉由不同資料來源中的資料進行運算，在程式中依不同的資料結果來撰寫敘述句的邏輯，藉此透過程式碼來完成我們要開發的各種功能。

> ### 延伸閱讀：有副作用（Side Effects）的運算式
> 上面提到的運算式當中，還可分為有副作用的（Side Effects）與無副作用的運算式。
> 而無副作用的運算式意思是它只是 **單純用來取值**：
> ```js
> 1 + 2; // 3
> ```
> 有副作用的運算式則表示它除了 **計算出值之外它還會做一些其他事情**：
> ```js
> var a = 1; // 1
> a = 2; // 2
> ```

## 運算子

現在我們瞭解在 JavaScript 當中有些程式碼的部分是屬於計算的部分，而這些特定的表示符號，我們稱其為運算子（operators）或稱為運算元，可參考 MDN [運算式與運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators) 章節查看所有運算子，而接下來主要會講幾個比較重要的概念。

## 算數運算子（Arithmetic Operators）

算數運算子除了基本的加減乘除之外，有兩種值得一提的是遞增（`++`，increment）與遞減。（`--`，decrement）。

以遞增為例，它的用法是將一個特定的運算元（變數、陣列元素或物件）轉為數字後再加上 `1`，並且可分為前遞增（pre-increment）與後遞增（post-increment）的差別。

前遞增：對於該運算元加 `1`，並顯示加完後的值。
```js
var box = 0;

++box; // 1

console.log(box); // 1
```

後遞增：先顯示原先的值，再對於該運算元加 `1`。
```js
var box = 0;

box++; // 0

console.log(box); // 1
```

從這個範例中可以很清楚的看見兩者的差異，若怕搞混的話，最簡單的記憶方式是看符號是前置還是後置，若在前面就是先加（減）再顯示，若在後的話就是先顯示後加（減）。

在實戰當中這個運算元最常被用來處理迴圈相關的處理：

```js
var mixedCatsColor = ['black', 'white', 'orange', 'tuxedo', 'tortoiseshell', 'tabby'];

for(var i = 0; i < mixedCatsColor.length; i++) {
    console.log('There is a(n) ' + mixedCatsColor[i] + ' cat!')
}
```

### 比較運算子（Comparison Operators）

由於比較運算子皆會返回一個 **布林值**，也就是它將告訴你這個運算結果 **符合** 或 **不符合** 字面上的意義，因此實戰中可以用來比對它 **是否符合某種狀態**。

比如要計算在速食店能不能買套餐時，宣告的部分我會拆成 **資料來源等等基本數值** 與 **比較** 的區域。

```js
// 資料來源、從 API 取得等等數值。
var wallet = 100;
var frenchFriesPrice = 60;
var hamburgerPrice = 50;
// 比較邏輯類
var setMeal = frenchFriesPrice + hamburgerPrice;
var isWalletEnoughToBuySet = wallet >= setMeal
```

> 若想加強語意可考慮在常數上多下工夫，如宣告採用 `const`，命名上採用全大寫等等技巧。

接著比較的時候就能夠輕易的透過識別字語意來表達程式中的邏輯：

```js
var wallet = 100;
var frenchFriesPrice = 60;
var hamburgerPrice = 50;
var setMeal = frenchFriesPrice + hamburgerPrice;
var isWalletEnoughToBuySet = wallet >= setMeal

if (isWalletEnoughToBuySet) {
    buySetMeal()
};
```

#### 自動轉型（coercion）

另一個值得注意的點是，除了全等於（`===`）與全不等（`!==`）之外，在進行比較運算的過程當中，都會透過 `valueOf()` 或 `toString()` 來將值轉成原始型別（primitive types），接著才會在進行比較，更常見的說法叫做自動轉型（Coercion）。

```js
'100' == 100; // true => (100).toString() => '100'
```

而物件型別的值與其他物件型別皆會不相等，即便是「看」起來一模一樣：

```js
[] == [] // false
```

除非今天比較的物件是位於 **同個記憶體位置** 時，就會顯示 `true`：

```js
var a = []; // 0x00 => undefined, 0x02 => []
var b = []; // 0x01 => undefined, 0x04 => []
var c = a;  // 0x02 => []

a === c // true，因為都指向 0x02 中的 []
a === b // false，指向不同的記憶體位置
c === b // false，指向不同的記憶體位置
```

而在實戰中，即使我們知道自動轉型的這個議題，但較多開發者習慣是傾向使用全等來比較，增強團體協作上的穩定性。

此外，從網頁中的 Input 表單取值時的資料型態也要特別注意：

```js
var stockPrice = document.querySelector('#age').value; // 從表單上取值，假設使用者填入了 100

stockPrice += 100 // 試著加上 100...

if (stockPrice > 500) {
    console.log('Guess what!'); // 猜猜發生了什麼事情。
}
```

而這些自動轉型的議題在實作的過程當中就能夠逐步瞭解何時會發生。

有關於運算子的另一些經典概念我們明天將繼續追蹤！