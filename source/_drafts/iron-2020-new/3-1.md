---
title: 【強化模型】3-1 瀏覽器中的 JavaScript
tags: 《透過認知模型認識 JavaScript》
---

# 瀏覽器

跟著第二章節學習的過程當中，你可能會透過瀏覽器所提供的開發者工具列（developer tools）進行測試時；這時，你可能會發現除了你藉由 `console.log` 顯示出的內容之外，裡面還提供了一些內建好的一些方法（methods）可以使用⋯⋯

---

## BOM

在瀏覽器最早剛開始支援 JavaScript 時，各家瀏覽器除了會在瀏覽器上裝上先前在第一章節中提過的 JavaScript 引擎之外，通常還會內置了一個物件供 JavaScript 所執行用，而隨著年代的演進以及網頁委員會的出現制定了一套標準後，各家瀏覽器所提供的這個額外的物件，才逐漸慢慢統一起來，而這個物件我們稱之為瀏覽器物件模型（BOM，Browser Object Model）：

![](https://i.imgur.com/wkns0oo.png)

### window

在瀏覽器物件模型當中，最主要是由一個名為 `window` 的物件所組成的，而 `window` 也作為 JavaScript 執行時的全域物件宣告時所存的環境，除了在函式區塊程式碼中所宣告的區域變數之外，其餘的全域變數都會變成這個物件底下的屬性。

```js
var welcome = 'Hello, Browser!'

function init(){
    var innerWelcome = 'Hello, Browser!'
}
init()

window.welcome // 'Hello, Browser!'
window.innerWelcome // undefined
```

除此之外，我們開發時常用到的一些計時器 API、彈跳視窗等等功能也都屬於 `window` 物件底下的屬性：

```js
window.setTimeout()
window.clearTimeout()
window.setInterval()
window.clearInterval()
window.alert()
window.confirm()
window.prompt()
```

而實際上使用時我們可以省略掉 `window` 的部分：

```js
setTimeout()
clearTimeout()
setInterval()
clearInterval()
alert()
confirm()
prompt()
```

接著在瀏覽器物件模型裡頭，還有其他幾個也相當重要的屬性：

### navigator

在 `navigator` 中存放著有關於當下使用瀏覽器的資訊， 比方說我們可以藉由 `navigator.userAgent` 來取得使用者當下所使用的瀏覽器：

```js
navigator.userAgent // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
```

但其中一點要注意的是用 `navigator.userAgent` 來判斷瀏覽器以應對不同瀏覽器上的功能是相較不好的做法，比較理想的方法應該是針對該方法來 **優雅降級（Graceful degradation）**：

```js
if("IntersectionObserver" in window) { // 判斷瀏覽器使否提供 IntersectionObserver API
    // 若有 IntersectionObserver API 可以使用的處理方法 
} else {
    // 若沒有 IntersectionObserver API 時的處理方法
}
```

### location

`location` 則是用來處理有關於網頁瀏覽器中的 **統一資源定位器（URL，Uniform Resource Locator）**，比如藉由 `location.href` 你可以拿到 URL 中整串的網址，你也可以藉由 `location.pathname` 只取得該網址中的路徑：

```js
location.href // "https://ithelp.ithome.com.tw/"
location.pathname // "/users/20119062/ironman/2952"
```

除此之外你還可以藉由 `location.reload()` 來整頁面，或是使用 `location.replace` 來替換當下 URL 中的路徑並跳轉。

```js
location.replace('/') // 跳轉到當下 URL 中的根目錄
location.reload() // 重整當下的頁面
```

### history

`history` 簡單來說就是瀏覽器中的歷史紀錄，但他的權限由於隱私方面上的問題，並不能讓你瀏覽其他歷史頁面的相關資訊，而能做的部分主要為切換頁面：

```js
history.forward() // 向前一頁
history.back() // 向後一頁
```

也可以透過 `history.go()` 來跳轉到相對的頁面：

```js
history.go(0) // 當下頁面
history.go(1) // 向前一頁
history.go(-1) // 向後一頁
```

所以透過這些方法我們可以輕鬆實作出類似於瀏覽器中上下頁的按鈕功能。

> 若網頁採用 SPA（Single Page Application)式設計，由於都是在同一頁當中，因此前端得自行設計出對應歷史紀錄與路由（route），進而實現切換上下頁的功能，此時便可以運用 `history.pushState()`、`history.replaceState()` 來實作。

### screen

`screen` 則紀錄著有關於瀏覽器中螢幕部分的資訊，例如視窗的寬、高等等。此外，我們可以藉由 `screen.orientation.type` 來取得目前螢幕是屬於直式或屬於橫式的狀態（純粹以螢幕寬度為識別）：

```js
window.screen.orientation.type // "landscape-primary"，表示橫式（寬大於高）
```

> 使用此屬性在實作時也要小心有些雷點，比如在手機上實作時，若開啟打字視窗，此時原先視窗高度在不同的手機上可能會出許多不如預期的反應。

### frames

`frames` 會處理有關於網頁中有關於當下視窗以及與 `iframe` 元素有關的資訊，若沒有的話則會返回目前視窗中的資訊。

```js
frames // 若沒有別的視窗會單獨返回 window 物件
```

### document

最後一個則是在瀏覽器物件當中我們最常會碰到的物件 `document`，因為他不僅代表著整個 HTML 檔案文件之外，最主要也是我們唯一能與瀏覽器頁面中文件互動的唯一入口。

```js
var target = document.querySelector('#test') // 藉此我們可以選取到 HTML 中所有 id 為 test 的元素
target.innerHTML = 'Hello, #test Element!' // 藉由選取到元素內的屬性來有關更改畫面上的內容。
```

而有關於 `document` 詳細的部分我們將在下個小節中介紹！