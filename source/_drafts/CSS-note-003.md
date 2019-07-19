---
title: CSS系列（三）視覺的藝術：圖片顯示與文字單位（相對單位、絕對單位）
date: 2019-07-18 11:58:50
tags:
- [前端]
- [CSS]
categories: 
- [前端, CSS, 筆記系列]
---

![](/images/CSS-logo.svg)

# 前言

以前端工程上來說，視覺主要接觸到的會有文字與圖片，以文字單位來說，w3c官方主要分為絕對單位、相對單位與長度百分單位，細分下去還有螢幕用（px、em、%...)以及印刷用單位（pt、mm、cm、in...)，而圖片視覺上則會考量到DPI、PPI等等，而本篇主要介紹。

## 視覺顯示

在裝置上視覺顯示單位分為DPI與PPI，DPI（Dots per inch，每英吋點數）意思即為在一英吋中點的數量，通常是用於印刷單位使用；而PPI（Pixels Per Inch）則為一英吋中像素的數量，主要用於顯示器螢幕的部分。以下用px、pt來介紹dpi實際上的應用：

![](/images/CSS-dpi.jpg)

假設圖中為一平方英吋的方框，而左邊橫排格數為1、右邊橫排格數為2，因此左邊的ppi為1，右邊的ppi就是2，而紅色中的方塊範圍即為1px（Pixel）。

而1pt（Point）的大小即為1/72英吋，也就是一個方格切成72*72的方格時，每個方格代表即為1pt，正好同等1px。因此在72ppi情況下其實1pt就會同等於1px。

然而事情並不會如我們所意，目前各家顯示器的規格並不統一，較常見到的電腦螢幕ppi為96，而Apple公司出產的設備螢幕可從218ppi的5K螢幕到高達458ppi的iphone X，同時也代表前端工程在放圖片時也需考量到不同解析器顯示的問題（@1x、@2x、@3x等等），而再有了顯示單位的概念後再來理解長度單位應該會輕鬆許多。

## 長度單位
在螢幕顯示器中的長度單位可分為絕對單位與相對單位，並且在網頁端的CSS中也有額外提供屬性值的內容。

### 絕對單位
- **pt**：Point，主要為印刷用，1pt＝1/72 英吋，也就是說當ppi為72的情況下，1pt = 1px。
- **px**：Pixel，螢幕上最小單位，正常網頁預設值為16px。
- **xx-small**：h6預設值，以medium為基準的3/5倍(約0.6倍)。
- **x-small**：以medium為基準的3/4倍(約0.75倍)。
- **small**：h5預設值，以medium為基準的8/9(約為0.89)倍。
- **medium**：h4預設值，為網頁文字大小預設值。
- **large**：h3預設值，以medium為基準的6/5(約為1.2)倍。
- **x-large**：h2預設值，以medium為基準的3/2(約為1.5)倍。
- **xx-large**：h1預設值，以medium為基準的2倍。

### 相對單位
- **%**：
根據**父元素**的font-size做倍率調整。

- **em**：
根據**元素自己本身**的font-size，再加大倍率（最常被誤會為根據父元素變動大小，實際上是因為font-size擁有繼承屬性）。**IE9.0才支援**

- **rem**：
根據**根元素**的font-size，再加大倍率，而如果根元素有調整大小，則會依根元素變動大小。**IE9.0才支援**

- **vw**：
根據**初始化的容器**（如果有設置viewport則依據viewport）的寬度的1%當做比例。**IE12.0才支援**

- **vh**：
根據**初始化的容器**（如果有設置viewport則依據viewport）的寬度的1%當做比例。**IE16.0才支援**

- **vmin**：
比較vw與vh中較小的當作數值。

- **vmax**：
比較vw與vh中較大的當作數值。

- **smaller**：
根據CSS屬性相對欄位表推斷，若該文字為medium大小則將其設置往上一級的small大小，若無設置則會尋找最接近的字級當作基準再設置，而超過欄位表則需自行推斷（約80%）。

- **larger**：
根據CSS屬性相對欄位表推斷，若該文字為medium大小則將其設置往下一級的large大小，若無設置則會尋找最接近的字級當作基準再設置，而超過欄位表則需自行推斷（約120%）。

**CSS屬性相對欄位表： [ xx-small | x-small | small | medium | large | x-large | xx-large ]**



# 參考資料
- [PPI wiki](https://zh.wikipedia.org/wiki/%E6%AF%8F%E8%8B%B1%E5%AF%B8%E5%83%8F%E7%B4%A0)
- [DPI wiki](https://en.wikipedia.org/wiki/Dots_per_inch)
- [Retina wiki](https://en.wikipedia.org/wiki/Retina_display)
- [w3cschools-css_units](https://www.w3schools.com/cssref/css_units.asp)
- [w3cschools-font-size](https://www.w3schools.com/cssref/pr_font_font-size.asp)
- [w3-font-size](https://www.w3.org/QA/Tips/font-size)
- [w3-font-size-CSS3](https://drafts.csswg.org/css-fonts-3/#propdef-font-size)
- [w3-absolute-size](https://www.w3.org/TR/CSS2/fonts.html#value-def-absolute-size)
- [w3-relative-size](https://www.w3.org/TR/CSS2/fonts.html#value-def-relative-size)
- [一次搞懂 CSS 字體單位：px、em、rem 和 %](https://www.oxxostudio.tw/articles/201809/css-font-size.html)
- [px、pt、dp、sp 大混戰](https://blog.akanelee.me/2018/07/31/dpi-px-pt-dp-sp/)