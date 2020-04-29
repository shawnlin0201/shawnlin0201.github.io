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