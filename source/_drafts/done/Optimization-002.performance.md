---
title: Chrome DevTools Performance 與畫面處理
date: 2099-01-01 00:00:00
tags:
- [前端]
- [Book]
- [HTML]
- [JavaScript]
- [D3.js]
- [Vue.js]
- [Vue-cli]
- [Vuex]
- [Vue-router]
- [Optimization]
categories: 
- [Optimization]
- [Optimization, Chrome DevTools]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/google/chrome-devtools-logo.png' width='200px' height='200px' />
</div>

之前有文章寫到在替網頁進行優化時會使用到像是 Google Chrome 瀏覽器的 Lighthouse 網頁檢測工具，並且會給予一些可行方案與提示來協助我們優化。而其中指標（Metrics）提示可能會要我們去觀察像是第一次內容繪製（FCP，First Contentful Paint）或是第一次有意義的繪製（FMP，First Meaningful Paint）等等。

但這些指標名詞代表更實際的意義在哪裡？這篇文章就要來整理一下這些東西：

<!--more-->

# Chrome DevTools Performance

在 Google Chrome 中，檢測頁面的位置在開發人員工具列（DevTools）中的 Performance 分頁，點選左上角的灰色圓圈 Records 後，重整、刷新頁面後再點選一次 Record 關閉錄製，此時就會跑出一張效能表：

![chrome-landing-page-lighthouse-performance](/images/google/chrome-landing-page-lighthouse-performance-trace.jpg)

當然我們也可以透過 Google Chrome DevTools 分頁中的 Audit 來檢測網頁相關效能（基於 Lighthouse），在指標（Metrics）一欄我們可以看見幾個被列出來的項目，以及大約執行的秒數（依據每次跑測試環境會有些微差距），而點選左下角的 View Trace，也同樣能產出效能表。

![chrome-landing-page-lighthouse-performance](/images/google/chrome-landing-page-lighthouse-performance.jpg)

# Performance Timings
在效能表裡的 Timings 中我們可以看見幾個專有名詞的縮寫分別為：
- FP（First Paint）：第一次繪製開始，各使用裝置開始傳輸像素的時間點，也就是載入的空框到有任何一點視覺上的變更的時間點。
- FCP（First Contentful Paint）：第一次內容繪製，比起 FP 來說 FCP 可以看作是一個完整的元素被渲染完畢後的時間點。
- FMP（First Meaningful Paint）：第一次有意義的繪製，[採用推測](https://github.com/berwin/Blog/issues/42)布局載入的大小方式來辨識其時間點。
- LCP（Largest Contentful Paint）：最大元素渲染，透過 [PerformanceObserver API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) 來計算出最大的元素渲染值。
- DCL（DOM Content Loaded）：DOM 載入完畢的時間，也就是開發上時常會監聽的事件。

我們瞭解這些指標的用意了，現在我們要來瞭解對於使用者來說，在**網頁載入過程**時什麼會是他們所在乎的？
- 畫面載入時間與過程。
- 畫面可以開始操作的時間。

# 畫面載入時間
取得畫面載入時間相對容易，我們可以觀察 FP 與 FCP 的時間點來判斷，並搭配 Performance Record 上方的畫面紀錄來觀察，而 FP 與 FCP 載入的時間點越快，也就表示使用者看到畫面在**載入**這件事情越快。

加快 FP 與 FCP 載入的時間點的方法有：
- 盡可能最小化禁止轉譯的樣式表與第三方的程式碼。
- 將一些靜態檔案透過 HTTP Caching 處理，讓使用者再度訪問時能夠盡可能的存取未讀取過的資源。
- 將一些文字化的靜態資源壓縮化、最小化，提升資源載入的時間。

而提升了 FP、FCP、FMP 甚至到 LCP 的時間點後，我們還有另一間事情得處理。

# 畫面操作時間
當畫面載入時，使用者可能就會開始試圖去操作畫面上的內容，而這另外牽扯到主線程阻塞等等的問題，並且有幾項較為代表的時間點：
- FCI（First CPU Idle）：第一次 CPU 空閒下來的時間，也就是說此時可以接收到一些來至使用者的 Event 行為了。
- TTI（Time to Interactive）：指整個頁面完全可以操作的時間點，而不單只是 FCI 的時間點。
- FID（First Input Delay）：使用者第一次嘗試操作頁面元素時所遇到的阻塞時間長度。

而依據整體使用者操作的時間點 與 **主線程** 空閒狀態大概會出現幾種情況：

- 使用者根本不與網頁上的內容互動，也就是根本沒有操作問題 (X。
- 使用者在主線程忙碌時操作，由於此時操作會需要等待主線程空閒時，才能繼續處理，因此需要等待 Input Delay 時間會較長。
- 使用者在主線程空閒時操作，由於此時可以立即處理該操作，所以這時候 Input Delay 時間會較短。

因此面向的問題可能會變成要盡可能的讓使用者可以快速操作（縮短 FCI 時間）。

而解決方法之一可以試著讓主線程忙碌時段分散，如將 Load 量大的程式移交至 Event Loop 當中（例如 `setTimeout(fn, 0)` 的[黑魔法](https://stackoverflow.com/questions/10180391/javascript-how-to-avoid-blocking-the-browser-while-doing-heavy-work)）

另一方法則是將畫面上蓋上 Loading 的畫面狀態，如此一來可以避免使用者在程式完全載入前操作，發生一些不可預期的錯誤，並且讓使用者在進入 FP 階段後，可以安心地等待整體資料 OnLoad 完成。

# 參考資料

- [First Contentful Paint](https://developers.google.com/web/tools/lighthouse/audits/first-contentful-paint)
- [How to Improve First Contentful and Meaningful Paint](https://premium.wpmudev.org/blog/improve-first-contentful-meaningful-paint/)
- [[Performance]瀏覽器運作與效能指標評估](http://mis101bird.js.org/metrics/)
- [[IT 鐵人賽] 大型資料載入實例與狀況 Large of DOMs Day 26](https://blog.hinablue.me/2019-ithome-ironman-day-26/)
- [Web性能领域常见的专业术语](https://zhuanlan.zhihu.com/p/98880815)
- [Chrome Performance常见名词解释(FP, FCP, LCP, DCL, FMP, TTI, TBT, FID, CLS)](https://blog.csdn.net/c_kite/article/details/104237256)
- [Chrome Devtool Performance中DCL, L, FP, FCP, FMP, LCP 的含义](https://juejin.im/post/5dfc709b51882579dc6f7f71)