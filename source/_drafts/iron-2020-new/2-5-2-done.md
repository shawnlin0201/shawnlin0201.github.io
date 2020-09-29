---
title: 【建立模型】2-5 流程與計算：敘述句（statement）下集
tags: 《透過認知模型認識 JavaScript》
---

## 敘述句（statement）

在開發 JavaScript 程式的過程當中，我們最主要會透過 **敘述句（statement）** 來定義我們的邏輯流程：

|種類|語法|
|-----|:----|
|宣告類|`var`、`let`、`const`
|流程類|`if/else` 、`switch`、`try/catch`|
|迭代類|`for`、`for/in`、`for/of`、`while`、`do/while`|
|跳躍類|`break`、`continue`、`return`|

接著，我將透過之前所用到的這張流程圖來解釋幾個常用敘述句的概念。

![https://ithelp.ithome.com.tw/upload/images/20200918/20119062wHpDMOplce.png](https://ithelp.ithome.com.tw/upload/images/20200918/20119062wHpDMOplce.png)

### block

首先第一個要來介紹的是 **區塊（block，`{}`）** 語法，它最主要是用來組合敘述句成為一個 **區塊**：

```js
{
    var text = 'block syntax!'
}
```

而這個區塊大多數會用來與敘述句結合使用，例如接下來將介紹到的 `if` 敘述句：

```js
if (運算式) {
    // 運算式為真值時就執行這個區塊的程式
}
```

對於 `var` 來說，這個區塊語法並不影響到他的作用域（scope），也就是說使用 `var` 所宣告的變數如同在該區塊外面宣告變數一樣：

```js
{
    var text = 'Hello, JavaScript!'
    console.log('text', text) // 'Hello, JavaScript!'
}

console.log('text', text) // 'Hello, JavaScript!'
}
```

然而，當你今天是使用 `let` 或 `const` 來宣告的話，他們則會限定於當下 **區塊敘述句以內** 的範圍：

```js
{
    let text = 'Hello, JavaScript!'
    console.log('text', text) // 'Hello, JavaScript!'
}

console.log('text', text) // Error: text is not defined
}
```

### if 敘述句
在流程圖中的「身上有錢嗎」的環節當中我們會運用到「是、否」判斷，而在 JavaScript 中我們可以利用 `if` 述句來表達流程：

```js
var cashOnMe = 200;
var foodPrice = 100;

if (cashOnMe >= foodPrice){
 // 買食物...
}
```

其中 `()` 內所放的是前面我們提到的運算式，而當運算式其結果值為 `truthy` 類型時就會執行後面的區塊敘述句內的所有程式碼。

若你需要更多流程你也可以使用 `if/else` 述句：

```js
var cashOnMe = 200;
var foodPrice = 100;

if (cashOnMe >= foodPrice){
 // 買食物...
} else {
 // 回家
}
```

甚至你也可以使用 `if/else if/else` 來定義流程：


```js
var cashOnMe = 200;
var foodPrice = 100;
var haveMoneyInBank = true;

if (cashOnMe >= foodPrice){
    // 有足夠的錢買食物...
} else if ( haveMoneyInBank ) {
    // 沒有錢，但帳戶中有錢，領個錢就可以買東西
} else {
    // 沒有錢，且帳戶中也沒有錢，乾脆回家
}
```

### switch 敘述句

透過上方 `if/else if/else` 中的範例我們可以察覺，若判斷有多種情境時，雖然我們可以在 `if` 與 `else` 敘述句之間插入 `else if` 來增加判斷內容，但如果情境太多我們將會很難追蹤實際上執行到哪個區塊內。而 `switch` 敘述句允許我們透過一個運算結果，來定義不同結果時我們應該要做什麼事情：

```js
var week = new Date().getDay();

switch(week) {
    case 1:
        console.log('隨便吃吃！')
        break;
    case 2:
        console.log('隨便吃吃！')
        break;
    case 3:
        console.log('隨便吃吃！')
        break;
    case 4:
        console.log('隨便吃吃！')
        break;
    case 5:
        console.log('隨便吃吃！')
        break;
    case 6:
        console.log('吃大餐囉！')
        break;
    case 0:
        console.log('吃大餐囉！')
        break;
    default:
        console.log('想一下要吃什麼。')
        break;
}
```

也可以藉由 `switch` 特性，將不同 `case` 情境合併在一起提升閱讀性跟維護性：

```js
var week = new Date().getDay();

switch(week) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        console.log('隨便吃吃！')
        break;
    case 6:
    case 0:
        console.log('吃大餐囉！')
        break;
    default:
        console.log('想一下要吃什麼。')
        break;
}
```

另外若你的情境需要的是一段範圍時，也有很 `tricky` 的作法：

```js
var cashOnMe = 200;

switch(true) {
    case (cashOnMe >= 150):
        console.log('買便當套餐（含飲料、小菜、濃湯）')
        break;
    case (cashOnMe >= 130):
        console.log('買便當、飲料與小菜')
        break;
    case (cashOnMe >= 100):
        console.log('買便當與飲料')
        break;
    case (cashOnMe >= 80):
        console.log('買便當')
        break;
    default:
        console.log('回家')
        break;
}

```

但我個人不建議這麼做，可以的話還是回歸到 `if/else` 寫法。

> 相關討論可參考 stackoverflow 上的這兩篇討論文：
> - [討論文一](https://stackoverflow.com/questions/17145723/how-can-i-use-ranges-in-a-switch-case-statement-using-javascript?noredirect=1&lq=1)
> - [討論文二](https://stackoverflow.com/questions/5619832/switch-on-ranges-of-integers-in-javascript)

### for 敘述句

`for` 迴圈基本上是用在「需要 **重複** 執行某件事情直到……為止」的情境當中，例如流程圖中的「肚子餓嗎？」一直到「吃下食物」後的循環。

而 `for` 迴圈的基本用法是：

```js
for(初始敘述句;條件式;完成敘述句) {
    // 區塊內敘述句
}
```
1. 執行初始敘述句。
2. 條件式若為真值則執行下方區塊內的敘述句，若否則執行完成敘述句後就離開整個 `for` 敘述句。
3. 每完成一次區塊內敘述句就執行小括弧最後的完成敘述句，接著在回到第二部中檢查是否為真值。

套用流程圖情境的概念碼：

```js
var cashOnMe = 200
var foodPrice = 50
var foodProvideSatietyPercentage = 10 // 假設食物給予的飽足感百分比

for(var satiety = 0; satiety =< 100; satiety += foodProvideSatiety){
    if (/* 檢查一下身上的錢是否足夠 */){

        if(/* 判斷是否有想吃的食物 */){
            // 排隊結帳結帳
        } else {
            // 回家    
        }

    } else {
        // 回家
    }    
}
```

> 如 1-3 中我們提到的，檢查到這邊你應該開始發現流程圖中有些流程仍需要改進，所以初步的流程規劃、規格定案相當的重要，若是開發到一半才發現要變更流程與規格，便會使原有的設計受到影響。

## 結合目標分析策略與敘述句練習

而現在我們學了一些常用的敘述句後，這時我們就可以運用前面的 **目標分析策略** 來解決更多的問題：

情境：貓咪橘橘的飼料（呷厚霸）剛好沒了，於是他叼著兩千元大鈔到寵物店，而橘橘最重視的是可以買到最多的飼料，你可以幫忙橘橘算出他最多可以吃到多少的飼料嗎？

條件：
|淨重|價格|
|----|----|
|350 g|300|

解題過程：

我們採用目標分析策略來試著縮短問題與解答之間的距離。雖然他最後要問的是能吃到多少的飼料，但買東西的時候最主要是要看金額夠不夠等等問題。

因此分析路徑後要計算的應該是：
1. 能買到最多幾包。
2. 接著再計算重量。

所以到目前為止的概念碼大概如下：
```js
var cash = 2000;
var bagPrice = 300
// 能買到最多幾包

// 接著再計算重量
```

接下來我們開始實作細節，計算出能買的包數
```js
var cash = 2000;
var bagPrice = 300
// 能買到最多幾包
var remainsCash = (cash % bagPrice)          // 求餘數
var bagCount = (cash - remainsCash) / bagPrice // 透過餘數反推包數
```

算出包數厚現在我們要來計算重量：
```js
var cash = 2000;
var bagPrice = 300
var bagWeight = 350
// 能買到最多幾包
var remainsCash = (cash % bagPrice)
var boughtBagCount = (cash - remainsCash) / bagPrice
// 接著再計算重量
var bagTotalWeight = boughtBagCount * bagWeight

console.log(bagTotalWeight) // 2100 g
```

透過簡單的敘述句與計算我們最終算出了他最多可以吃到 `2100` 克的食物。

以上就是 JavaScript 中敘述句（statement）大致上的概念，接下來我們要來看看如何透過函式來幫助開發時能夠更加地容易。