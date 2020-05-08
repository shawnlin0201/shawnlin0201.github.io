

# Memory Management
Variable Object
Execution Context
Call Stack & Event Loop ^ Job Queue
Promise
V8 Engine -> Garbage Collection -> Memory Management

## Memory Management

Memory Life Cycle
Memory Garbage Collection
Memory Garbage Collection Algorithm: Mark and Sweep
- Mark and Sweep

Memory Leak




# OOJS
class
prototype
this

# keyword
用語類
## single threaded 單執行緒
一次執行一個指令
JavaScript is single threaded 意思是指從人的角度看是一次一行看，而非瀏覽器看的角度。

## syntax parsers 語法解析器
## lexical environment 詞彙環境
## execution contexts 執行上下文


## Invocation
執行、呼叫函式
對於 JS 來說，要告訴 JS invocation 的方法是使用 `()`

## not defined & undefined
- LHS 與 RHS 差別
- 不要自己設 undefined (& Null)



# execution context
每當 function 被呼叫時就會建立一個 execution context，而執行 JavaScript 時，一開始則會使用 main() 來呼叫整個程式
=> 也就是全域環境


```js
var a = 'Hello, JavaScript.'

console.log(a) // 'Hello, JavaScript.'
console.log(window.a) // 'Hello, JavaScript.'
```


## Execution context phase
- creation phase
- execution phase

### Execution context creation phase
EC 被建立時包含了
- global object
- this
- outer environment(只有 global EC 沒有，其他的 EC 都有)
- Variable Object (初始化階段)

### Execution context creation phase
V8 逐行轉譯將 Varable Object （或說 Variable Environment）覆值，

#### Execution context global object
- 在瀏覽器全域物件指的是 `window`。
- 在 Node.js 全域物件指的是 `global`。

#### Execution context this
在全域環境中，`this` 指向的便是全域物件。

#### Execution Outer Environment
=> scope chain => 參考自 code 實際寫的位置的外面
所以找不到該變數時並非依據 execution context stack 來往下找
而是找 scope chain 也就是實際 code 寫的位置的外面

# Hoisting 提升
當 EC 被建立時，除了會包含 global object、this、outer environment 之外
會形成 variable object (VO)的初始化

```js
console.log(a) // undefined
var a = 1;
console.log(a) // 1
console.log(b) // undefined
console.log(c) // function c(){}
var b = function (){}
function c(){}
```

比如一執行這段程式碼時，EC 建立形成一個基本的 VO，
並且檢查是否有宣告（declare）函式。 **注意！並非賦值（assign）函式的用法**
有函式宣告式的話就直接將它寫進記憶體 VO 當中
```js
VO = {
    a: undefined,
    b: undefined,
    c: function c(){}
}
```
接著才一行一行直譯，遇到第一個 console ，它要 a，所以給它 undefined
第二行給 a 1,VO:
```js
VO = {
    a: 1,
    b: undefined,
    c: function (){}
}
```
遇到第2個 console ，它要 a，所以給它 1
遇到第3個 console ，它要 b，所以給它 undefined
遇到第4個 console ，它要 x，所以給它 `function (){}`
接著才將 function (){} 覆值給 b
```js
VO = {
    a: 1,
    b: function (){},
    c: function c(){}
}
```

所以從這可以看得出來函式宣告式跟函式運算式的差異。

## 避免 Hoisting 陷阱
- 宣告放在程式碼最開頭

# Execution stack
當新的 EC 被建立時，會使用 stack 結構堆疊，然後同樣執行 EC 的兩階段，直到執行階段完畢才從將其 EC 移除。
而其中每個 EC 都包含著 VO(Variable Object 或說 Variable Environment)。
堆疊起來後，每

# scope
scope 指的是每個 EC 裡面的 VO
但 scope chain 則是依靠 lexical environment 決定的（視覺上的外層）

## scope => let
let 採用 block scoping
- let 一樣會 hoisting
- let 在 VO 覆值前取用會報 TDZ 而非拋出 undefined => V8 hole


# sync & async
## synchronous execution 同步執行
=> JavaScript Engine => V8 => is synchronus.
引擎一定是同步一行一行執行的。
但非同步怎麼半？
產生一個 event quene 排隊，等EC stack（Call Stack）都清除完才會去處理。(檢查機制稱為：continueous check 持續檢查)

## async
但對於其他的瀏覽器工具, e.x
- Rendering Engine
- HTTP Request
- 其他瀏覽器操作（如使用者點按鈕）
都是 async






# Type
- type system
- data types
## type system
- static type
- dynamic type
### static typing 靜態類別
宣告時指定變數類別
Java, C++ 等等採用此方法
### dynamic typing 動態類別
不需要宣告時指定變數類別
JavaScript 採用此方法
=> JavaScript 引擎自己會看

## data type
- primitive types：原始型別（基本型別）
- Non-primitive types（Object type）

### primitive types
- string
- number
- boolean
- undefined
- null
- symbol (ES6)

# Operators