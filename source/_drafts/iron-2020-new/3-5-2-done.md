---
title: 【強化模型】3-5 瀏覽器中的儲存機制（下集）
tags: 《透過認知模型認識 JavaScript》
---

在上一篇中，我們提到了一些與伺服器溝通的儲存機制概念，今天我們要來談談那些不與伺服器互動的那些儲存機制。
## Web Storage

在瀏覽器的儲存機制當中，除了伺服器可以主動設置 `cookie` 給客戶端瀏覽器或透過 JavaScript 主動設置 `cookie` 之外，另一種主要的儲存機制便是 Web Storage。

Ｗeb Storage 主要是負責儲存不與伺服器溝通的內容，會這麼說是因為儲存在這裡面的資料並不像 `cookie` 一樣會隨著資源請求（request）中一起帶過去到伺服器上。

所以若不是每次都需要向伺服器請求資源都要附帶的客戶端狀態、沒有安全性考量等等的資料，就可以透過 Web Storage 來儲存。

且儲存的容量相比 `cookie` 的 4KB 之下，Web Storage 也都足足達到 5MB 的容量，可以儲存的容量又更多了，只是與 `cookie` 相同的是會受到同源政策（Same-origin policy）的影響，要同個網域底下才能共用儲存的資料。

另外，在 Web Storage API 中，主要可還分為兩種儲存位置：

- localStorage
- sessionStorage

這兩者相同的地方除了在於操控的新增、修改與刪除的 API 之外，其**儲存的時間與影響範圍** 卻不太相同。

以 `localStorage` 來說，只要你沒有主動去清除這一個部分，基本上就會一直存在，所以需要自行主動去驗證更新或清除，並且即使你是開啟分頁，只要是在同源的情況之下都還是能存取到共用的資源。

而 `sessionStorage` 儲存的時間只有在保持 `session` 的時間，也就是說你一關閉瀏覽器就沒了，另外在不同分頁的情況下也沒辦法共享同個儲存資源，這是他們之間最大的差別。

### 操作 Web Storage API

在操作 Ｗeb Storage 的時候不像是 `cookie` 需要設定 `path`、`expires` 等等條件，我們基本上只要透過原生的四個方法就可以快速操作我們的資料。

- `getItem(key)`：取得有關 `key` 所對應的 `value`
- `setItem(key, value)`：修改 `key` 物件並存入 `value`。
- `removeItem(key)`：移除有關於 `key` 的 `value`（變成 `null`）
- `clear()`：將同源中的所有資料都清除。

因此若我想實作一個簡易版本的版本提醒功能我就可以藉由 `localStorage` 來這麼做：

```js
function checkVersion(currentVersion){
    var localVersion = localStorage.getItem('version')

    if(currentVersion > localVersion){
        // 顯示本次更新版本
    }
}


function initPage(){
    var currentVersion = '1.0.1'
    checkVersion(currentVersion)
}


initPage()
```

另一個 [實作範例](https://shawnlin0201.github.io/hexschool-2020-challenge-blog-list/) ，同樣也是透過檢測 `localStroage` 的版本來提醒使用者更新的內容，甚至使用 `localStorage` 來實作暫時性收藏，因此不需要登錄也不用藉由資料庫來存入內容。

然而透過上述實作範例也可以有效得知另一個議題就是，當透過 Web Storage 實作這些功能時，若需要考慮到跨平台（桌機、手機）時，由於 Web Storage 沒有個 Session 機制能夠驗證來提供對應的資料，因此就不適合應用在該需求中。

但倘若你能發現他的美好應用在對的地方，比如實作不需登入的購物車收藏效果等等，那麼 Web Storage 將成為你的助力！

以上是在瀏覽器中的儲存機制，在下一章節中我們將來提提瀏覽器裡面的垃圾回收機制！