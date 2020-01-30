---
title: 網路優化不可不知的測評工具 Lighthouse, PageSpeed Insights & Web.dev
date: 2020-03-23 22:13:41
tags:
- [w3HexSchool]
- [Optimization]
categories: 
- [Optimization]
- [Optimization, tool, lighthouse]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="lighthouse-logo" src='/images/Lighthosue/lighthouse-logo.png' width='200px' height='200px' />
</div>

# Lighthouse、PageSpeed Insights
Lighthouse 是由 Google 團隊所開發的檢測工具，主要用來檢測網站使用者體驗、效能與 SEO 等等網站優化的部分，若沒有聽過 Lighthouse，那麼應該有聽過同樣為 Google 為所開發的 [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=zh-TW) 檢測網站，而 PageSpeed Insights 也在 2018 年的某次改版中將 Lighthouse 評分整併到 PageSpeed Insights 中。

而兩者相較之下， PageSpeed Insights 整併後主要是增加了較多視覺報表呈現的部分，並且可以選擇語系來看分析後的優化方案；而 Lighthouse 則有多個管道可以查看檢測後的結果：

- Google DevTools
- Google Extensions Lighthouse
- Web.dev

接下來便介紹這三個工具的用法與差異：

<!--more-->

## Google DevTools
在 Google Chrome 瀏覽器中有著非常好用的 DevTools，而在 Chrome 60 版本後， DevTools 新增了一項面板 Audits 便是基於 Lighthouse 所製作出來的。我們只要打開 DevTools 在面板 Audits 執行 Run audits 即可開始測分。

採用這個方法的好處是可以針對於一些未實際架在 server 上的網頁做檢測，例如想在測試機上調校 SEO，或是以 local 端方式開啟的網站也能用這個方法評分。

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="lighthouse-devtool-audits" src='/images/Lighthosue/lighthouse-devtool-audits.png' width='500px' height='500px' />
</div>

## Google Extensions Lighthouse
第二項方法則是下載 [Google Extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=zh-TW)，接著就可以在 Chrome 瀏覽器右上角直接點選使用。

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="lighthouse-google-extension" src='/images/Lighthosue/lighthouse-google-extension.png' width='500px' height='500px' />
</div>

採用這個方法的好處是可以快速檢測每個頁面，但基本上功能與 DevTools 裡 Audits 面板差不多，若 Chrome 版本已經升到 60 的話直接用 Audits 可能會比較方便。

另外要注意的是使用 Google Extension 版本的 Lighthouse，它產生的 Report Viewer 是會藉由 Server 去訪問的，因此如果是沒對外開放的測試機或以 local 端執行的網站要進行測試就會沒辦法使用。

## Web.dev
[Web.dev](https://web.dev/measure/) 也是由 Google 團隊所開發檢測工具裡面的東西，由於基於 Lighthouse 所開發，用起來與 PageSpeed Insights、Lighthouse 基本上是差不多的，比較不一樣的地方在於它的測評是依據衝擊度（Impact）來排名，可以較直覺從比較重要的項目開始優化。另外則是下載報表時會稍微方便一點。


<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="web-dev-page" src='/images/Lighthosue/web-dev-page.png' width='500px' height='500px' />
</div>


# Optimization 項目
上面介紹了一些基於 Lighthouse 有關的檢測工具，緊接著要來介紹有關 Lighthouse 上的設定以及要如何搭配檢測結果來調校我們的程式。

以 Google DevTools 為例，在跑分打開 Audits 面板會看到如下圖所示的設定：

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="lighthouse-devtool-audits" src='/images/Lighthosue/lighthouse-devtool-audits.png' width='500px' height='500px' />
</div>

- Device：設定模擬使用桌機還是行動裝置來檢測當前的網頁。
- Audits：設定要檢測的項目，可以適當的關掉沒有需要檢測的項目加速檢測時間（例如沒有考慮 PWA 的情況）。
- Throttling：設定模擬檢測的網路速度，心臟不夠大顆的話可以考慮先從 `No throttling` 開始，否則一般慢速模擬的情況通常是以**悲劇**收場，~然後你就會想關掉 Lighthouse 結束這回合~。

我們實際以目前這個 Blog 來跑分。可以看到大致上還算滿意，但仍然可以再補足一些缺漏：

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="lighthouse-devtool-audits-my-personal-blog" src='/images/Lighthosue/lighthouse-devtool-audits-my-personal-blog.png' width='500px' height='500px' />
</div>

最後檢測報告主要可分為以下幾個面向：

- Performance：網站效能類，通常會反映在**客戶端與伺服器端上的溝通**為主。
- Accessibilty：網站無障礙設計類，面相在**使用非典型裝置（桌機手機平板）類的輔助裝置觀看網站時，能否讓使用者也能順暢的使用**。
好比 Modern Web 設計時常使用 CSS 去改動 `<a>`、`<button>` 連結按鈕，若標籤內沒有任何文字的話會被視為不可觸及的對象，因此被扣分。
- Best Practices：網站最佳實作類，主要是在於**程式碼上的優化**類別，像是使否使用緩存機制與是否用了不推薦的語法。
- SEO：搜尋引擎優化類，這個部分應該是最多人關注的點，畢竟很可能會直接影響到網站在搜尋引擎的排名。例如 `<meta>` 方面的資料有沒有設定完整，`<img>` 有沒有確實加上 `alt` 屬性等等都會被考慮在內。
- PWA：

而要修正的方式也很直覺，往下拉就會看到 Lighthouse 是以什麼樣的檢測標準在審核，並且提示你是哪個地方出了問題，**可能** 需要解決。

不過看到分數有時先不用驚慌，好比將剛剛測驗結果拉到 Best Practice 區，可以看到有用了 `document.write` 的語法問題，但我們將它打開一看：

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="lighthouse-devtool-best-practices.png" src='/images/Lighthosue/lighthouse-devtool-best-practices.png' width='500px' height='500px' />
</div>

可以看到哪段程式使用了該段語法。~然後就會發現有時所謂的問題，實際上也是可能我們自己無法處理的部分（google ads）。~

# 總結
透過上面例子，我們可以總結出 Lighthouse 的確可以使我們很直接地看出網站目前有哪些問題有需解決，有時可能會為了**視覺**上的美化、**效能、程式實作**上的考量、**第三方**提供的 SDK 等等問題，而拉低分數。但不盡然到要完全符合才能成為一個優質的網站，而在優化上面，最終檢測面向的依舊是要端看使用者**平均的實際體驗**。


# 參考資料

- [WEB.DEV – Google SEO 工具](https://ithelp.ithome.com.tw/articles/10210147)
- [Google PageSpeed Insights 大改版，整合 Lighthouse 引擎提供更多 SEO 細節數據](https://seo.whoops.com.tw/pagespeed-insights-revamped-with-lighthouse/)
- [Chrome 推出 Lighthouse 前端稽核功能 – 為了更好的 SEO 與使用者體驗](https://www.astralweb.com.tw/google-lighthouse-for-front-end-audits-to-imporve-better-seo-and-user-experience/)