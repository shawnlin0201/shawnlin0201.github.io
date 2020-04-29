# JavaScript

## Compilation
JavaScript 是一種編譯型語言（但並非預先編譯）而是撰寫完後由 V8 負責編譯部分（但有人覺得這比較偏向直譯）。

而在 JavaScript 執行前的編譯（compilation）至少有三個步驟：
- Tokenizing/Lexing（程式碼化、詞彙分析）
- Parsing（解析）
- Code-Generation（產生程式碼）

其中可能會有些優化等等的處理，但主要架構可是為這三個步驟。


### Tokenizing/Lexing
將一串字串轉化為對語言有意義的符號（token）。
```js
var a = 1;
```

將他拆成 `var`、`a`、`=`、`1`。

### Parsing（解析）
將 token 轉化成抽象語法樹（AST，Abstract Syntax Tree）。

例如 `var a = 1;` 會建立一個被稱為 `VariableDeclaration` 的節點，而節點底下有一個被稱為標示符（Identifier）的 `a`，另有一個 `AssignmentExpression` 節點，裡面含有 `NumericLiteral` 的 `1`。


### Code-Generation
將抽象語法樹（AST）轉換成實際可執行的程式碼。

## Nested Scope
if a variable cannot be found in the immediate scope, Engine consults the next outer containing scope.
如果在直接作用域中找不到一個變量的話，引擎就會諮詢下一個外層作用域

```js
var y = 2
function plusTwo(x) {
    return x + y // 這裡的 y 在當前的 plusTwo scope 中找不到 y，因此會找到 global scope 所定義的 y。
}

plusTwo(1) // 3
```
## 查詢類別（LHS、RHS）
LHS（Left-hand side）、RHS（Right-hand side）主要是用來描述賦值操作的關係。

- LHS 的目的在於找到所描述內容的 **容器**。
- RHS 的目的在於找到所描述內容的 **值**。

```js
let a = 1;
console.log(a)
```

在這段程式碼中，第一段的 `a` 是一個 LHS 查詢，目的是找出有沒有宣告過 `a`，如果有的話，按 `let` 的特性是不能重複宣告的。

而第二段的 `a` 則是一個 RHS 查詢，用意是找到 `a` 容器裡面所儲存的值是什麼？而最後找到值是 `1`。

## 巢狀作用域（nested scope）
基本上 scope 的最小單位是 `function`，另外還有像是 `try/catch` 中的 `catch`，還有少見的 `with` 關鍵字。
題外：使用 `let`、`const` 則會綁定在當前的區塊。

當 LHS、RHS 在當前作用域找不到時候會往外層作用域尋找。

```js
let a = 1;
function test() {
    console.log(a)
}
```
上面的範例是 RHS 尋找，但在當前 test function scope 中找不到，所以往外層的 global scope 尋找。

## 錯誤
LHS 查詢在找不到該容器時，預設情況下會建立一個全域變數來儲存（詳見 Variable Object）：

```js
function test() {
    a = 1 // LHS 找不到 a 曾經宣告的
}
```
https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/scope%20%26%20closures/ch1.md#%E9%94%99%E8%AF%AF
https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/scope%20%26%20closures/ch1.md#errors


