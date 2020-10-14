---
title: 【修正模型】4-1 執行上下文（Execution Context）
tags: 《透過認知模型認識 JavaScript》
---

經過了二十多天，一路上我們從基本的邏輯思考方式到瞭解 JavaScript 的意義，再從 JavaScript 原生基礎語法到瀏覽器相關 API 的實作，基本上靠著這些內容已經可以完成不少開發專案了。

然而如上章節提到的部分，就在實作的過程中可能會有些執行結果並不如你所預期的，這時你搜尋結果或詢問它人時可能會得到提升（hoising）、作用域（scope）或非同步（asynchronous）……諸如此類的名詞，在不懂的情況下只能硬著將這些概念解釋回你程式碼當中的那些錯誤。

然而其實你可以不必這麼做，因為接下來的第四章中我們將來回顧一下 JavaScript 實際上是怎麼執行的，而在這過程中，你就可以瞭解到那些概念究竟是怎麼衍伸而來的。

# 執行上下文（Execution Context）

執行上下文（Execution Context）是指程式在執行時的過程所產生的環境，而對於開發網頁中的 JavaScript 來說，就是指在瀏覽器 **上一步一步執行的過程與各個資料當下的狀態**。

而 JavaScript 的執行上下文最主要是 **以執行函式（Function）來做為區分**，意思即為每當我執行一個函式時就會產生出一個新的環境，其中還包含了一開始負責執行 JavaScript 的主程式 `Main()`，而主程式與後續呼叫函式時所產生的環境我們可以將其分為：

- 全域執行上下文（Global Execution Context）
- 函式執行上下文（Function Execution Context）

## 全域執行上下文（Global Execution Context）

全域執行上下文意思即為，一開始瀏覽器執行 JavaScript 時所包裹的 `Main()` 函式所產生的環境。

也就是說當我們這麼寫的時候：
```js
var a = 'test'
```

在瀏覽器上執行時其實會被包裹成類似這樣的概念：
```js
function Main() {
  var a = 'test'
}
```
接著執行時就會依據全域執行上下文來依序處理每行程式碼。

而在全域執行上下文中大概包含了以下內容：

- 執行階段（Execution Phase）
- 全域物件（Global Object）
- 變數物件（Variable Object）
- 範圍鏈（Scope Chain）
- this

## 函式執行上下文（Function Execution Context）

而函式執行上下文，則是當我們程式碼中 **執行函式時就會產生的環境**：

```js
function add(a, b){
    return a + b
}

add(1, 2) // 執行到此行時產生函式執行上下文
```

其中全域執行上下文中大概包含了以下內容：

- 執行階段（Execution Phase）
- 全域物件（Global Object）
- 執行物件（Activation Object）
- 範圍鏈（Scope Chain）
- this

基本上與全域執行上下文的內容相同，只差在變數物件（Variable Object）換成執行物件（Activation Object）而已，兩者差異在於執行物件多了個 **參數（arguments）** 的內容物

而接下來，我們將分別介紹上下文中的各個內容，這裡也有個針對 Execution Context 的視覺化的[專案](https://ui.dev/javascript-visualizer/)，可以一邊看這篇文章一邊比對內容加速理解。

---

## 全域物件
第一個我們要來看的是全域物件，全域物件最主要是端看當時執行 JavaScript 的環境，若是在瀏覽器上執行的話，全域物件會綁定在 `Window` 物件上面：

```js
GlobalExecutionContext = {
  Window: [[global object]]
}
```

而我們平時會可以直接透過 `console.log()` 執行的原因也是因為預設的物件是基於 `window` 之上，只是在規定中有表明我們可以忽略 `window` 直接取用：

```js
console.log('Hello, window!') // 省略 window 取用方法

window.console.log('Hello, window!') // 其實實際上是這樣
```

## this
接著第二個我們要來看看 `this` 的部分，`this` 最主要在上下文中代表 **當下執行的程式所屬的物件**。

若是在全域上下文中，由於是全域是由函式 `Main` 當中因此 `this` 則指向了 `window` 中：
```js
GlobalExecutionContext = {
  Window: [[global object]],
  this: window
}
```

若是函式上下文則可能會受到呼叫的函式而有所影響：

```js
var person = {
	talk: function(text){
      console.log(text);
      console.log(this);
	}
};

person.talk('Hello, this');
```

```js
FunctionExecutionContext = {
  Window: [[global object]],
  this: { // 指向呼叫的物件
    talk: function(text){
        console.log(text);
        console.log(this);
    }
  }
}
```

> 除了上述這種方式之外另外也可以透過 `bind`、`call`、`apply` 等等方式來改變 this 的值。

接著我們來看上下文中的範圍鏈（Scope Chain）。

## 範圍鏈

範圍鍊最主要的功能是當程式在執行的過程中，若無法在當下的作用域（Scope）找到該識別字時，會沿著範圍鍊（Scope Chain）來找值：

範圍鍊例子一：
```js
var a = 1;
var b = 2;

console.log('a', a) // 找到當下作用域中的 a，因此顯示 1
console.log('b', b) // 找到當下作用域中的 b，因此顯示 2

function A(){
  var a = 3;

  console.log('a', a) // 找到當下作用域中的 a，因此顯示 3
  console.log('b', b) // 當下作用域沒有 b，但找到外層 main 函式 的 b，因此顯示外層 b 的值 2
  
  funcB()
  function funcB(){
    var b = 4;

    console.log('a', a) // 當下作用域沒有 a，但找到外層 funcA 函式 的 a，因此顯示外層 a 的值 3
    console.log('b', b) // 找到當下作用域中的 b，因此顯示 4
  }
}
funcA()
```

範圍鍊例子二：
```js
var a = 1;
var b = 2;

console.log('a', a) // 找到當下作用域中的 a，因此顯示 1
console.log('b', b) // 找到當下作用域中的 b，因此顯示 2

function A(){
  var a = 3;

  console.log('a', a) // 找到當下作用域中的 a，因此顯示 3
  console.log('b', b) // 當下作用域沒有 b，但找到外層 main 函式 的 b，因此顯示外層 b 的值 2
  funcB()
}

function funcB(){
  var b = 4;

  console.log('a', a) // 當下作用域沒有 a，但找到外層 main 函式 的 a，因此顯示外層 a 的值 1
  console.log('b', b) // 找到當下作用域中的 b，因此顯示 4
}

funcA()
```

從上方兩個例子的比較中可以發現 `funcB` 由於編寫時的位置不同，因此範圍鍊的根據也不同，最後找到的值也會有差異。

而這種單純 **從編寫位置來看作用域方式** 我們稱其為靜態作用域又稱之為詞法作用域（Lexical scope），好處是我們不用等到執行時就能知道它所要存取的變數究竟是哪個。

> 在其他語言中，若是從 **從執行位置來看作用域方式** 則稱為動態作用域。

而綜合上面的概念後，現在我們知道範圍鍊的概念其實就是 **當下自己的作用域跟外層的作用域**，因此在上下文中可以這麼表示：

```js
GlobalExecutionContext = {
  ScopeChain: [[self scope]] + [[outer scope]]
}
```

## 執行階段與變數物件

接著是最重要的執行階段與變數物件部分，會並再一起講是因為這兩者之間有很大的關聯。

```js
var text = 'Hello, Execution Context!';

function say(target){
	console.log(target);
}

say(text);
```

當上方程式碼一開始執行時，首先會進入全域執行上下文的創造階段，因此在 `執行階段（Phase）` 中會顯示 `Creation`：

```js
GlobalExecutionContext = {
  Phase: 'Creation'
}
```

接著在 **執行階段（Phase）** 為 `Creation` 的時候，JavaScript 引擎會先做一次宣告的掃描，此時有關於 `var`、`let`、`const`、`function` 這類型的宣告敘述句（declartion statement）都會一一被掃出來並做以下的動作：

- 如果是宣告變數（如 `var`）時，會先在變數物件（或執行物件）中初始化一個 `undefined` 的值。
- 如果是宣告函數（如 `function`）時，會直接在變數物件中塞入該函式整段程式碼。

因此以上方範例程式碼中的執行階段會產生像這樣子的上下文：

```js
GlobalExecutionContext = {
  Phase: 'Creation',
  VariableObject: {
    text: 'undefined',
    say: function(target){
      console.log(target);
    }
  }
}
```

而當這段初始化宣告完成的時候，接著就會進入**執行階段（Execution）**：

```js
GlobalExecutionContext = {
  Phase: 'Execution', // 進入執行階段
  VariableObject: {
    text: 'undefined',
    say: function(target){
      console.log(target);
    }
  }
}
```

而在這執行階段的過程當中，JavaScript 引擎會類似 **一行一行** 的去解讀每句程式碼的含意，例如剛剛程式碼中在執行階段的第一行中，它會讀到將 `text` 所屬的值賦值為 `'Hello, Execution Context!'`：

```js
var text = 'Hello, Execution Context!';

function say(target){
	console.log(target);
}

say(text);
```

此時上下文中的變數物件就會變成：

```js
GlobalExecutionContext = {
  Phase: 'Execution', // 進入執行階段
  VariableObject: {
    text: 'Hello, Execution Context!', // 讀到第一行後執行賦值的動作
    say: function(target){
      console.log(target);
    }
  }
}
```

也因為創造階段與執行階段的關係，會造成在宣告之前取值時，會有種稱作 **提升（hoisting）** 的錯覺。

變數的提升：
```js
console.log(text) // undefined，因為在 Phase: 'Creation' 時 text 就有 `undefined`值

var text = 'Hello, Execution Context!';

console.log(text) // 'Hello, Execution Context!'
```

函式的提升：
```js
console.log(say) // ƒ say(target){ console.log(target);} ，因為在 Phase: 'Creation' 時 say 就會直接傳入整個函式

function say(target){
	console.log(target);
}

console.log(say) // ƒ say(target){ console.log(target);}
```

但現在你知道那是因為創造階段時的初始化之間的差異。

> ### 延伸閱讀：暫時性死區（Temporal Dead Zone，TDZ）
> `let`、`const` 在創造階段時也會有初始化的行為，然而初始化的值並不像是 `var` 一樣是初始化 `undefined`，而是一個錯誤黑洞，這個值（`ThrowReferenceErrorIfHole`）需要經由 V8 拆解 Byte code 後才能看到，若你嘗試直接取值則會拋出一個錯誤。
> ```js
> console.log(a) // Uncaught ReferenceError: a is not defined
> let a = ''
> ```
> 所以嚴格上來說他們還是有「提升」的行為，只是與你想的不太一樣而已。

現在我們已經講完了全域執行上下文（Global Execution Context）的概念了，此時的你應該要知道程式在執行時主要會 **以函式為劃分** 去創造上下文的空間，接著在每個上下文中分為兩個步驟：初始化值的創造階段（`Creation`）以及負責一行一行解析的執行階段（`Execution`）。

最後我們要來看看函式執行上下文（Function Execution Context）中，在執行物件（Activation Object）中的 arguments 是什麼東西。

## 執行物件（Acativation Object）與 Arguments

執行物件就好比像是全域執行上下文中的變數物件一樣，只是不一樣的是裡面多了個 `Arguments`，而 `Arguments` 顧名思義就是跟函式引數有關的內容通通會被放在這裡面。

```js
var text = 'Hello, Arguments!';

function say(target){

}

say(text);
```

當上方程式執行到 `say(text);` 的時候，此時會創建一個函式執行上下文，裡面有著跟全域執行上下文不同的執行物件（Acativation Object），此時在創造階段的時候除了會將引數（arguments）初始化之外，函式參數（parameters）也會一併被初始化：

```js
FunctionExecutionContext = {
  Phase: 'Creation',
  AcativationObject: {
    target: 'Hello, Arguments!', // 初始化函式參數
    arguments: {
      0: 'Hello, Arguments!' // 初始化函式引數
      length: 1
    }
  },
  this: window
}
```

因此若我們在程式中這麼寫的時候：

```js
var text = 'Hello, Arguments!';

function say(target){
	console.log(target); // ?
  var target = 'another'
  console.log(target); // ?
}

say(text);
```

在 `say` 函式中的第一行 `console.log(target);` 就會先讀到初始化函式參數中的 `'Hello, Arguments!'`，接著才會被第二行的賦值給取代，最後第三行的 `console.log(target);` 才會讀到 `'another'`。

```js
var text = 'Hello, Arguments!';

function say(target){
	console.log(target); // 'Hello, Arguments!'
  var target = 'another'
  console.log(target); // 'another'
}

say(text);
```

以上就是 JavaScript 在執行時引擎如何透過上下文來看待程式碼的方式。

明天我們將繼續來看看瀏覽器主線程中的堆疊與事件循環的機制是如何處理的。