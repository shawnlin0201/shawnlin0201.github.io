---
title: JavaScript 深入淺出 Error & Exception-Handling 錯誤與例外處理
date: 2020-08-31 11:56:40
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

在程式開發中不免會遇到一些錯誤以及例外的狀況，而在 JavaScript 中又是要如何處理錯誤與例外呢？

<!-- more -->

# 錯誤與例外處理

不少的文章其實都指出錯誤（Error）處理與例外（Exception）處理其實雖然都是 `Exception Handling`，但它們的本意上其實不大相同。

第一類的錯誤主要發生的是在程式碼方面的錯誤，比如拼寫錯誤（typo）、語法錯誤（Syntax Error）等等，這一類的錯誤應該是在開發階段中我們可以透過程式編輯器的檢查，甚至是使用 `console.log`、`debugger` 之類的語法，透過瀏覽器提供的開發者工具列（如 Chrome 的 Chrome DevTools）來尋找錯誤並解決。

第二類的錯誤主要則是系統上的錯誤，好比前端的例外處理要關心的是使用者在操作瀏覽器過程中的行為異常，例如網路突然斷掉了，使用者無法正常向伺服器端取得資料時，這時處在客戶端的 JavaScript 程式應該要如何應對？

所以在 JavaScript 中撇除掉錯誤中的型別議題，大部分說明例外處理的時候通常會聚焦偏向後者的討論。

而接下來我們將從第一類的錯誤開始延伸至第二類的錯誤：

# 錯誤 Error
在 JavaScript 中有一個 `Error` 物件專門產生錯誤訊息的實體，我們可以透過傳入字串來顯示出錯誤訊息：

```js
let error = new Error('Hello, Error?')
error // Error: Hello, Error?
```

## 錯誤類型
而除了 `Error` 物件之外，在 JavaScript 中還有另外七種錯誤子類型，它們會透過 `Error` 物件所創建與拋出：
- EvalError（被遺棄）
- InternetError（未標準化）
- RangeRrror
- ReferenceError
- SyntaxError
- TypeError
- URIError

### EvalError
`EvalError` 主要發生在全域函數發生錯誤時會產生，就 MDN 文件看來目前好像已經遺棄這種錯誤訊息。

### InternetError
`InternetError` 主要發生在 JavaScript Engine 在 Runtime 有異常時會警告，而這個錯誤也尚未標準化，畢竟每家的引擎還是會有自己想定義的內容（簡單來講就是你的錯不一定是我的錯，我的錯也不一定你的錯。）

### RangeRrror
範圍錯誤（`RangeRrror`）主要發生在傳入方法參數超出有效範圍就會發生錯誤，最常出現在 `Number` 中的 `toFixed`、`toExponential` 等等方法中，當然我們也可以在函式中自訂錯誤：

```js
function isPositive(x) {
  if(x === 0) { throw new RangeError("Zero is not Positive & Nagative number."); }
  if(x > 0) { return true }
  if(x < 0) { return false }
}

isPositive(1)  // true
isPositive(-1) // false
isPositive(0)  // RangeError: Zero is not Positive & Nagative number.
```

### ReferenceError
引用錯誤（`ReferenceError`）主要發生在試圖存取一個尚未宣告過的變數，最常出現在打錯字、大小寫錯誤而找不到變數的情況：

```js
const PI = 3.1415926
console.log(pi) // ReferenceError: pi is not defined
```

這種錯誤通常在開發階段時，程式編輯器就會透過高亮、深淺來提示是否有輸入錯誤造成無法解析以及宣告變數未使用，此時你就可以檢查是否有引用錯誤的情況。

### SyntaxError
語法錯誤（`SyntaxError`）主要發生在 JavaScript 語法錯誤的情況，同樣的這種錯誤得在開發階段就得排除，否則會造成程式無法執行：

```js
const PI 3.1415926 // SyntaxError: Missing initializer in const declaration
console.log('Hello') // 被上方錯誤中斷了
```

### TypeError
型別錯誤（`TypeError` ）主要發生在資料型別（Data Type）的操作上與 JavaScript Engine 預期不同時就會產生，通常會發生在函式傳參數時，內部行為與引用參數型別有誤所造成：

```js
function murmur(text) {
  return text.split('').join('murmur')
}

murmur('Hello, JavaScript.') // "Hmurmuremurmurlmurmurlmurmuromurmur,murmur murmurJmurmuramurmurvmurmuramurmurSmurmurcmurmurrmurmurimurmurpmurmurtmurmur."
murmur([ // TypeError: text.split is not a function
  'Hello, HTML.',
  'Hello, CSS.',
  'Hello, JavaScript.'
])
```

這是 JavaScript 中最容易出現的錯誤，由於 JavaScript 宣告時並不需要定義型別，並且 JavaScript 還擁有自動強制轉型（Coercion）的議題在，因此這個問題除了工程師要自律的使用函式之外，若真的有需要也可以藉由使用 TypeScript 來強化檢查型別這件事情。

### URIError
`URIError` 主要發生在使用 `encodeURI()` 或 `decodeURI()` 傳入不正常的參數所導致：

```js
try {
  decodeURIComponent('%')
} catch (err) {
  console.log(err instanceof URIError)  // true
  console.log(err.message)              // malformed URI sequence
  console.log(err.name)                 // URIError
}
```

# 例外處理
以上那些錯誤盡量都應該是在撰寫程式時就應該要解決的，然而還有一些使用者在操作時才遇到情況我們通常可以使用 `try`、`catch`、`throw`以及 `finally` 來解決。

- try：放入主要的程式碼
- throw：拋出錯誤訊息
- catch：如果有錯誤，則錯誤訊息會被傳到這個區塊，並且執行這個區塊的行為
- finally：不論有無錯誤最後這個區塊都會被執行

```js
function guessNumber() {
  try {
    let random = Math.floor(Math.random()* 2)
    if (random) {
      console.log('Number is Positive!')
    } else {
      throw 'Number is Zero.'
    }
    console.log('Do something!')
  } catch (err) {
    console.error(err)
  } finally {
    console.log('Stopping guess number.')
  }
}

guessNumber()
/* 情況 1：random 為 1
* Number is Positive!
* Do something!
* Stopping guess number.
*/

/* 情況 2：random 為 0
* Number is Zero.
* Stopping guess number.
*/
```

從上面範例中可以看到若當 JavaScript Runtime 執行到 `throw` 並拋出錯誤時， `try` 區塊原本執行的內容就會中止，並且接著執行 `catch` 區塊內的內容；若沒有的話則是繼續執行 `try` 原先區塊的行為，但無論如何最後 `finally` 區塊都是會被執行的地方。

# 客製化錯誤
如果要客製化錯誤的話我們可以藉由繼承 `Error` 物件本身的 `name` 以及 `message` 來定義錯誤名稱與內容：

```js
function CustomError(message) {
  this.name = 'Status:',
  this.message = message
}

CustomError.prototype = new Error() // 繼承 Error 類別
CustomError.prototype.constructor = CustomError // 將建構子從 Error 轉回 CustomEror
```

```js
try {
  throw new CustomError('[A1] Permission is denied.')
} catch(err) {
  console.error(err.name, err.message) // Status: [A1] Permission is denied.
}
```

# AJAX 中的錯誤

既然最主要是使用者在汲取資料時容易會遇到斷線等等問題而導致操作失敗，所以採用了 Promise 所設計的 AJAX API 本身都有支援 `catch` 的選項來協助除錯，即便沒有也通常會提供相對應的例外處理 API 來協助開發：

```js
// fetch
fetch('url')
  .then(res => res.json)
  .catch(err => console.error(err))
  .then(res => { console.log(res) })

// axios
axios.get('url')
  .then(res => console.log(res.data))
  .catch(err => console.error(err))

// jQuery ajax
$.ajax({
  type: "GET",
  url: "url",
  success: res => {
    console.log(res)
  },
  error: (XMLHttpRequest, textStatus, errorThrown) => {
     console.error(textStatus)
  }
})
```

# 錯誤事件處理器
瀏覽器有提供一個綁定在全域下的錯誤事件處理器，只要觸發下列條件就會啟動 `window.onerror`：
- JavaScript Runtime 的各種 Error。
- 透過元素屬性的 `src` 引入資源時發生異常。

而針對上面兩種不同的情況 callback function 的傳送參數也有不同：

針對 Runtime Error：
```js
windon.onerorr = function (message, filename, lineNumber, columnNumber, errorObject){
  // ...
}
```

針對 Element source Error：
```js
element.onerror = function(event) {
  // ...
}
```

例如載入圖片如果發生異常時我們便可以透過這個 `onerror` 來執行替換預設圖片的程式：

```html
<img src="..." onerror="replaceToDefaultImage(this)">
```

```js
function replaceToDefaultImage(target){
  let defaultImage = 'xxx.png'
  target.src = defaultImage
}

```

以上便是幾種常見的錯誤類型、例外處理與錯誤事件處理器。

最後，錯誤處理就開發上算是一種行為的脈絡，也並非所有情境都會需要這種脈絡，前端應就整體行為流程去斟酌。

# 參考資料

- [PJChen - [JS] 談談 JavaScript 中的錯誤處理 Error Handling](https://pjchender.blogspot.com/2017/12/js-error-handling.html)
- [MDN - Error](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [Eddy Chang - 錯誤與例外處理](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part3/error.html)
- [林信良 - JavaScript錯誤處理](https://www.ithome.com.tw/voice/131812)