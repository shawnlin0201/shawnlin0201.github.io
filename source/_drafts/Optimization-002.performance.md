---
title: Chrome DevTools Performance：名詞解析
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

# 打開 Performance 檢測頁面

在 Google Chrome 中，檢測頁面的位置在開發人員工具列（DevTools）中的 Performance 分頁，點選左上角的灰色圓圈 Records 後，重整、刷新頁面後再點選一次 Record 關閉錄製，此時就會跑出一張效能表：

![chrome-landing-page-lighthouse-performance](/images/google/chrome-landing-page-lighthouse-performance-trace.jpg)

當然我們也可以透過 Google Chrome DevTools 分頁中的 Audit 來檢測網頁相關效能（基於 Lighthouse），在指標（Metrics）一欄我們可以看見幾個被列出來的項目，以及大約執行的秒數（依據每次跑測試環境會有些微差距），而點選左下角的 View Trace，也同樣能產出效能表。

![chrome-landing-page-lighthouse-performance](/images/google/chrome-landing-page-lighthouse-performance.jpg)




# 參考資料

- [[Performance]瀏覽器運作與效能指標評估](http://mis101bird.js.org/metrics/)
- [[IT 鐵人賽] 大型資料載入實例與狀況 Large of DOMs Day 26](https://blog.hinablue.me/2019-ithome-ironman-day-26/)
- [Web性能领域常见的专业术语](https://zhuanlan.zhihu.com/p/98880815)
- [Chrome Performance常见名词解释(FP, FCP, LCP, DCL, FMP, TTI, TBT, FID, CLS)](https://blog.csdn.net/c_kite/article/details/104237256)
- [Chrome Devtool Performance中DCL, L, FP, FCP, FMP, LCP 的含义](https://juejin.im/post/5dfc709b51882579dc6f7f71)