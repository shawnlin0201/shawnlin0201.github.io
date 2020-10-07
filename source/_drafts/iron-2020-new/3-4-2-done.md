---
title: 【強化模型】3-4 瀏覽器中的資源請求與響應（下集）
tags: 《透過認知模型認識 JavaScript》
---

在上篇文章中我們提到了資源請求（resquest）的含義與如何透過回應（response）後的結果實作一些簡單的內容，而今天我們今天將繼續來探討資源請求時最常遇到的——跨源請求問題。

### Same Origin Policy

當我們再進行有關於資源請求的程式開發時，我們很有機會在開發者工具列中會看到下面這一句：

> Error: No 'Access-Control-Allow-Origin' header is present on the 
requested resource.

而會有這樣的錯誤提醒是因為  **同源政策（Same Origin Policy）** 基於安全性的理由會限制網站 **不能透過不同源的網址來進行資源請求**。

而根據同源政策的規定，來源網址與請求網址必須同時符合以下條件時才算是同源網站：
- 相同協定（protocal）
- 相同埠號（port）
- 相同主機位置（host）

因此，假如我們呼叫 API 程式的當下網址是 `https://www.cat.com.tw` 時：

|URL||
|---|---|---|
|`https://www.cat.com.tw/food.html`|同源。|
|`http://www.cat.com.tw`|不同源，因為協定不同。|
|`https://www.cat.com.tw:8081`|不同源，因為埠號不同。|
|`https://member.cat.com.tw`|不同源，因為主機位置不同。|

根據這個判定，往後我們可以輕易的知道什麼時候是同源請求了。

此時的你或許會突然想到，在上一章節中，我們不是使用了 `https://raw.githubusercontent.com/` 這個網站底下的網址來進行資源請求嗎，為什麼在上一章節中我們使用 `fetch` 練習時卻沒有跳出這個錯誤呢？

其實原因就在於雖然我們有同源政策會限制我們對於資源請求時的存取，但我們可以透過在伺服器端上的設定，來讓這條限制被開啟，而這樣跨源的請求，我們稱為 **跨來源的資源分享（CORS，Cross-Origin Resource Sharing）**。

### CORS

CORS，是一種開啟跨源請求不受同源政策規定的其中一個方法，而這個方法最主要是透過在伺服器端回應（response）的標頭（header）上附上一個 `Access-Control-Allow-Origin` 設定。

例如在我們請求 `https://raw.githubusercontent.com/shawnlin0201/ithelp-2020/main/3-4-1-fetch-request.json` 這個網址的當下，我們可以打開 devtools 的 Network 來觀察有關於這個請求與回應的相關資訊，而在 Response Headers 中，我們可以看到以下的資訊

```
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Cache-Control: max-age=300
Content-Encoding: gzip
Content-Length: 81
Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; sandbox
Content-Type: text/plain; charset=utf-8
Date: Wed, 07 Oct 2020 16:21:34 GMT
...
```
而在標頭中我們可以看到 `Access-Control-Allow-Origin` 的設定值為星號（`*`），這也就代表了當任何網站要呼叫這個網址進行跨源請求的時候，都不會因為同源政策的關係而被阻擋下來。

而回到我們上一篇中所提到的 `fetch` 的用法，其實 `fetch` 方法本身是會受到同源政策的影響的，只是因為剛好該網址有設定 CORS，因此我們可以順利的收到回應。

但假如對方網站沒有設定允許跨域請求時，這時我們需要在 `fetch` 的設定中加上 `mode: 'cors'` 來進行跨源請求：

```js
fetch('https://raw.githubusercontent.com/shawnlin0201/ithelp-2020/main/3-4-1-fetch-request.json',{
    method: 'GET',
    mode: 'cors',
})
    .then(res => res.json())
    .then(res => {
        console.log(res)
    })
```

如此一來我們就可以進行跨域的請求了。

### JSONP

另一個解決同源政策的請求方法則是 JSONP（JavaScript Object Notation with Padding），意思即為藉由 JSON 填充，那麼他到底是要填充到哪裡呢。

首先我們先來看看同源政策中沒有限制的地方，其中一個最重要的是沒有限制 `script` 檔案的引入，因此在 `script` 的 `src` 來源是跨源的情況下也不會被防止。

```html
<script src="https://raw.githubusercontent.com/shawnlin0201/ithelp-2020/main/3-4-1-fetch-request.json"></script>
```

如此一來這個 `script` 就會載入那筆連結中的資料，然而這樣我們並沒有辦法取到值，因此在 `script` 的檔案中必須透過某個機制傳遞值給我們。

第一個是透過變數直接傳遞：

```js
var data = [
    {
        "id": "cat001",
        "name": "Orange",
        "age": 3
    },
    {
        "id": "cat002",
        "name": "Black",
        "age": 5
    }
]
```

但這樣的做法會污染全域空間，如果今天其他檔案也操作到 `data` 這個值就會受到影響。

另一種方式就是藉由回呼函式（callback function）直接將資料傳遞給我們，但如此一來我們就要提供一個函式來讓對方知道回資料時要以哪個函式來配合，比如：

```js
<script src="https://...?callback=getCatInfo"></script>
```

這樣該網址的伺服器才能藉由我們傳遞過去的 **查詢字串（Query String）** 來接收並回應結果：

```js
getCatInfo([
    {
        "id": "cat001",
        "name": "Orange",
        "age": 3
    },
    {
        "id": "cat002",
        "name": "Black",
        "age": 5
    }
])
```

接著我們只要在網頁上定義好該函式的區域程式碼即可：

```js
var catInfo = {}
function getCatInfo(info){
    catInfo = info
}
```

而因為我們只能向伺服器傳遞查詢字串的情況下，透過 JSONP 最大的限制是在於比較適合用於 `GET` 方法的情況，要更改裡面的值則是使用 `CORS` 的方法較容易操作。

以上就是網頁在進行資料請求時會遇到跨域請求的情況與解決辦法，我們明天會接著來談談有關於瀏覽器上的一些儲存機制要如何使用！