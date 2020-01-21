---
title: 網路優化不可不知的測評工具 Lighthouse, PageSpeed Insights & Web.dev
date: 2020-04-01 00:00:00
tags:
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
以上介紹了一些基於 Lighthouse 有關的檢測工具，緊接著要來介紹有關 Lighthouse 上的設定以及要如何搭配檢測結果來調校我們的程式。


最後檢測報告主要可分為以下四加一個面向：

- Performance
- Accessibilty
- Best Practices
- SEO
- PWA （有需要的話，再勾選 PWA 檢測選項來檢測）

以目前這個 Blog 來跑分的話，大致上還算滿意，但仍然可以再補足一些缺漏：

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="lighthouse-devtool-audits-my-personal-blog" src='/images/Lighthosue/lighthouse-devtool-audits-my-personal-blog.png' width='500px' height='500px' />
</div>


## Performance

## Accessibilty

## Best Practices

## SEO

## PWA

# 參考資料

- [WEB.DEV – Google SEO 工具](https://ithelp.ithome.com.tw/articles/10210147)
- [Google PageSpeed Insights 大改版，整合 Lighthouse 引擎提供更多 SEO 細節數據](https://seo.whoops.com.tw/pagespeed-insights-revamped-with-lighthouse/)
- [Chrome 推出 Lighthouse 前端稽核功能 – 為了更好的 SEO 與使用者體驗](https://www.astralweb.com.tw/google-lighthouse-for-front-end-audits-to-imporve-better-seo-and-user-experience/)