---
title: Testing 測試替身 Test Doubles
date: 2020-01-01 00:00:00
tags:
- [前端]
- [JavaScript]
- [Testing]
categories: 
- [JavaScript, Testing]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='' width='200px' height='200px' />
</div>

# Test double 測試替身
在單元測試中我們時常會利用到一些測試替身（Test double），而測試替身主要是在協助我們在某些情境下幫助我們模擬已知的測試條件。譬如我們在做 AJAX 像伺服器請求資料時，我們真正測試的目標可能是在**拿到資料後的後續行為**，這個時候我們就可以利用測試替身去模擬請求的資料，讓測試聚焦在真正的地方並且使測試速度達到顯著的提升。

而依據 MSDN [文件](https://docs.microsoft.com/zh-tw/archive/msdn-magazine/2007/september/unit-testing-exploring-the-continuum-of-test-doubles)中指出，測試替身大致上可分為五個種類：Dummies、Stubs、Spies、Fakes 和 Mocks。

按照模擬程度差異從低到高排序：
- Dummies：基本上就是模擬一些原始類型（primitive type）的資料，並且根本 
- Stubs：
- Spies：
- Fakes：
- Mocks：
 


# 參考資料

 - [MSDN-magazine-Unit Testing: Exploring The Continuum Of Test Doubles](https://docs.microsoft.com/zh-tw/archive/msdn-magazine/2007/september/unit-testing-exploring-the-continuum-of-test-doubles)