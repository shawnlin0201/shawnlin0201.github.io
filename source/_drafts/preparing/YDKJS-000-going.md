# JavaScript
```js
{
    JavaScript: [
        statment,
        experesssion,
        operators,
        types,
        comments,
        variables,
        blocks,
        condition,
        {loops:
            {
                type:[
                    'for',
                    'while',
                    'do/while'
                ]
            }
        },
        {functions: [
            scope
        ]}
    ]
}
```


## Statment 語句
Most statements in JavaScript conclude with a semicolon (;) at the end.
在JavaScript中大多數語句都以末尾的分號（;）結束。
```js
a = b * 2;
```

Programs are just collections of many such statements, which together describe all the steps that it takes to perform your program's purpose.
程序只是許多這樣的語句的集合，它們一起描述為了執行你的程序的意圖所要採取的所有步驟。


## Experesssion 表達式
Statements are made up of one or more expressions. An expression is any reference to a variable or value, or a set of variable(s) and value(s) combined with operators.
語句是由一個或多個表達式組成的。一個表達式是一個引用，指向變量或值，或者一組用操作符組合的變量和值。
```js
a = b * 2;
```

## Operators 操作符
Operators are how we perform actions on variables and values. 
操作符是我們如何在變量和值上實施操作的方式。

例如 `+` 和 `=`：
```js
a = b * 2;
```

### Ternary operator 三元運算符
```js
var  a  =  42 ;

var  b  =  ( a  >  41 ) ? "hello" : "world" ;
```
如同
```js
if (a > 41) { 
    b = "hello"; 
} else { 
    b = "world"; 
}
```

## Types 資料類型
- Primitive type 原始類型
- Non-primitive type 非原始類型（或稱 Object type，物件類型）

### converting Between Types 轉換資料類型

## Comments 註解
編寫程式不僅僅是寫給電腦，也是寫給開發者的，我們可以透過註解解釋一些事情。

```js
// 單行註解

/*
 多行註解
 多行註解
 多行註解
*/
```

## Variables 變數
declare a variable (container) to hold a specific type of value
聲明一個變量（容器）來持有特定類型的值

```js
var  amount  =  99.99 ;
```
### constant 常數
- es6 `const`
- naming style：大寫與底線（e.g. `MEMBER_NAME`）

## Blocks 區塊
Similarly, in code we often need to group a series of statements together, which we often call a block.
相似地，在代碼中我們經常需要將一系列語句一起分為一組，這就是我們常說的區塊。

```js
// 合法的區塊
{
    var a = 0;
    console.log(a)
}
```
通常會搭配一些條件（condition）來決定是否執行該區塊內的語句（statment）。

## Condition 條件
There are quite a few ways we can express conditionals (aka decisions) in our programs.
The most common one is the if statement.

在我們的程序中有好幾種方式可以表達條件（也就是決定）。
最常見的一個就是if語句。

```js
if (money_in_my_pocket > shoes) {
    buyIt()
}
```

## Loops 循環
Repeating a set of actions until a certain condition fails -- in other words, repeating only while the condition holds -- is the job of programming loops
重複一組動作直到特定的條件失敗—— 換句話說，僅在條件成立時重複—— 就是程序循環的工作

迴圈類型
- for
- do/while
- while

## Functions 函式
Similarly, your program will almost certainly want to break up the code's tasks into reusable pieces, instead of repeatedly repeating yourself repetitiously (pun intended!). The way to do this is to define a function.
將代碼的任務分割成可以重用的片段，而不是頻繁地多次重複自己。這麼做的方法是定義一個function。

```js
function sum (a, b) {
    return a + b
}

let total = sum(1,2) // 3
```
### methods 方法
位於物件中的函式會用方法來稱呼。
```js
let obj = {
    sayHello: function (name){
        return 'Hi! ' + name + '.'
    }
}
obj.sayHello('Shawn') // Hi! Shawn. 這一樣是個函式，但我們更常會稱呼為方法。
```

### scope 作用域
In JavaScript, each function gets its own scope. Scope is basically a collection of variables as well as the rules for how those variables are accessed by name. Only code inside that function can access that function's scoped variables.
每個函數都有自己的作用域。作用域基本上就是變量的集合，也是如何使用名稱訪問這些變量的規則。只有在這個函數內部的代碼才能訪問這個函數作用域內的變量。

```js
function one() {
	// this `a` only belongs to the `one()` function
	var a = 1;
	console.log( a );
}

function two() {
	// this `a` only belongs to the `two()` function
	var a = 2;
	console.log( a );
}

one();		// 1
two();		// 2
```


# Data types
- Primitive type
    - string
    - number
    - boolean
    - undefined
- Non-primitive type ( Object type)
    - null
    - object
    - symbol （ES6新增类型）

## Object 物件
The object type refers to a compound value where you can set properties (named locations) that each hold their own values of any type. This is perhaps one of the most useful value types in all of JavaScript.
object類型指的是一種複合值，你可以在它上面設定屬性（帶名稱的位置），每個屬性持有各自的任意類型的值。它也許是JavaScript中最有用的類型之一。

```js
var obj = { 
    a: "test",
	b: 666
}
```

- dot notation 點號標記法
Properties can either be accessed with dot notation
屬性既可以使用點號標記法（例如，obj.a）訪問

    ```js
    var obj = { 
        a: "test",
        b: 666
    }

    console.log(obj.a) // test
    ```

- [] notation 中括號標記法
Bracket notation is useful if you have a property name that has special characters in it
如果你有一個名稱中含有特殊字符的屬性名稱，方括號標記法就很有用
    ```js
    var obj = { 
        a: "test",
        b: 666
    }

    console.log(obj['a']) // test
    ```


### Array 陣列
Array is an object that holds values (of any type) not particularly in named properties/keys
陣列是物件的一種子類型，它不使用特殊的帶名稱的屬性/鍵持有（任意類型的）值，而是使用數字索引的位置。
- keyword: key-value pair

```js
let fruit = ['apple', 'banana']

console.log(fruit[0]) // apple
console.log(fruit[1]) // banana
```

### Functions 函數
函數是物件的一種子類型，但 `typeof` 會顯示其為 `function`，用來表示他主要的類型。
```js
function sum(a, b) {
    return a + b
}

sum.test = 'test'

typeof sum       // 'function'
typeof sum(1, 2) // 'number'
typeof sum.test  // 'string'

```


## Built-In Type Methods 內建方法
每個原始類型都有一個對應的物件包裝器（wrapper），稱為原生類型（native），而在物件包裝器中的原型（prototype）定義了一些方法可以使用。

```js
let a = 'test'

a.length // 4 ，內建於 String.prototype.length 這個方法（methods）當中
```

## Comparing Values 比較值
There are two main types of value comparison that you will need to make in your JS programs: equality and inequality. The result of any comparison is a strictly boolean value (true or false), regardless of what value types are compared.
在你的JS程序中你將需要進行兩種主要的值的比較：等價和不等價。任何比較的結果都是嚴格的boolean值（true或false），無論被比較的值的類型是什麼。

### Coercion 強行轉換
Coercion comes in two forms in JavaScript: explicit and implicit.
JavaScript中強制轉換有兩種形式：明確的和隱含的

- explicit coercion（明確的轉換）
    ```js
        let a = '13'
        let b = Number(a)
        console.log(a) // '42'
        console.log(b) // 42
        console.log(typeof a) // 'string'
        console.log(typeof b) // 'number'
    ```

- implicit coercion（隱含的轉換）
    ```js
        console.log(typeof 123) // 'number'
        console.log(typeof '123') // 'string'
        console.log(typeof +123) // 'number'
        console.log(typeof '123' * 1) // 'number'
    ```

### Truty/Falsy
when a non-boolean value is coerced to a boolean, does it become true or false, respectively?
Truty/Falsy 是在討論當一個非boolean值被強制轉換為一個boolean時，它是變成true還是false。

但由於 truty 的情形很多種，因此主要面向的邏輯都是看如果不是 falsy 的情況，那他就是 truly：

#### falsy 的情形
    - '' （空字串）
    - 0
    - -0
    - NaN
    - Null
    - undefined
    - false
#### truly 的情形
    - 'test' （含有值的字串）
    - 1, 2, 100... （數字類）
    - -1, -2, -100... （數字類）
    - [] （空陣列）
    - {} （空物件）
    - function () {} （函式）
    - 其餘非 falsy 值的情形

### Equality 等價關係
#### 寬鬆比較
允許在強制轉換的條件下檢查值的等價性
- `==`    ：寬鬆等於
- `!=`    ：寬鬆不等於

- 當值與類別吻合時，會返回 `true`。
- 當類別不同時會有一系列動作去檢查他們是否相同。
![參考 ES5 語言規範 11.9.3](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)

#### 嚴格比較
不允許在強制轉換的條件下檢查值的等價性，也就是值的類別也要吻合。
- `===`   ：嚴格等於
- `!==`   ：嚴格不等於

比較過程參考：
![參考 ES5 語言規範 11.9.3](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.6)

#### 非原始類型（primitive type）比較
如果像是物件與陣列的比較，其比較的內容是參考（reference）是否來自於同一個地方，而非視覺上看起來的值相同。
```js
let a = [1]
let b = [1]
let c = a
console.log(a === b) // false，reference 不同
console.log(a === c) // true，reference 相同
```

#### JavaScript 神奇比較
arrays are by default coerced to strings by simply joining all the values with commas (,) in between.
array默認情況下會通過使用逗號（,）連接所有值來被強制轉換為string。

```js
let a = [1,2,3]
let b = [1,2,3]
let c = '1,2,3'

console.log(a == c) // true
console.log(b == c) // true
console.log(a == b) // false
```

### Inequality 不等價關係
強制轉換呢？與==比較相似的規則（雖然不是完全相同！）也適用於不等價操作符。
- 沒有嚴格不等價比較 `!>=` 這種東西。
- 但有強制轉換的概念。參見ES5語言規範的 [11.8.5](http://www.ecma-international.org/ecma-262/5.1/#sec-11.8.5) 部分

不等價操作符（operator）
- `>`
- `>=`
- `<`
- `<=`


# variable
必須是合法的標識符（identifiers）：須以a- z，A- Z，$，或_開頭。它可以包含任意這些字符外加數字0- 9。

## Function Scopes 函數作用域
宣告變數將屬於當前的函數作用域，位於任何函數外部的頂層，它就屬於全局作用域（global scope）。

```js
var a = 'global scope'

function sum () {
    var a = 'function scope'
    console.log(a) // 'function scope'
}

console.log(a) // 'global scope'
```

### Hoist 提升
無論var出現在一個作用域內部的何處，這個聲明都被認為是屬於整個作用域，而且在作用域的所有位置都是可以訪問的。

```js
function test() {
    console.log(a)
    var a = 3;
    console.log(a)
}
```

實際在直譯（interpret）的過程中，程式碼會被翻譯成類似這樣：

```js
function test() {
    var a;
    console.log(a) // 因此是 undefined
    a = 3
    console.log(a) // 因此是 3
}
```

### Hoist 之 Temporal dead zone（暫時性死區）
這是在 ES6 新增的 `let`、`const` 關鍵字所出現的概念，全名叫做 `Temporal dead zone`

一開始大家會誤以為 `let`、`const` 沒有提升（Hoist）的概念：
```js
console.log(a) // ReferenceError: a is not defined
let a
```

但其實有：
```js
var a = 10
function test(){
  console.log(a) // ReferenceError: a is not defined
  let a
}
test()
```

其實 `let`、`const` 也有被提升，只是提升後的行為跟 var 比較不一樣，所以乍看之下你會以為它沒有提升。

可參考：
https://blog.huli.tw/2018/11/10/javascript-hoisting-and-tdz/

## condition 條件
除了前面提過的內容之外，在 `switch condition` 中是具有掉落（fall through）特性的：

一般的例子：
```js
switch (a) {
    case 1:
        // do something
        break;
    case 2:
        // do another thing
        break;
    default:
        // other things
        break;
}
```

掉落的例子：
```js
switch (a) {
    case 1:
    case 2:
        // do something
        break;
    default:
        // other things
        break;
}
```
現在不論 `a` 的值為 `1`、`2` 都會執行 `do something` 的區塊。

## use strict 嚴格模式
ES5 新增一個嚴格模式，在嚴格模式底下，它不允許因為省略了var而進行隱含的自動全局變量聲明：
```js
'use strict'

a = 'test' // ReferenceError 
```


# function
## function declaration 函式宣告式
```js
function test(){
    //do something
}
```
## function expression 函式表達（運算）式
- Anonymous function expressions 匿名函式表達式。
```js
let test = function () {}
```

- Named function expressions 具名函式表達式。
```js
let test = function something () {}
```

## IIFE 立即被調用的函式表達（運算）式
全名 Immediately Invoked Function Expressions（IIFEs）。
上述不論哪個函式其實都沒有被執行，除非我們使用 `test()` 來呼叫。

