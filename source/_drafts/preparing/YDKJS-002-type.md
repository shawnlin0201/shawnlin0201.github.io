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
