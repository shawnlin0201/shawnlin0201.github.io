---
title: 【概念ノ章】測試工具： Vue Test Utils 與元件測試
date: 2022-10-02 14:58:24
tags:
- [前端]
- [Vue.js]
- [Vitest]
- [Vue Test Utils]
- [Unit Test]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="vitest-logo" src='/images/vitest-logo.svg' width='200px' height='200px' />
</div>

# 本文序
經過昨天的練習後，我們現在已經可以對一些透過預設匯出（default export）或具名匯出（named export）的函式、方法或類別等等邏輯進行單元測試了。

接著，若我們想進一步在專案中測試 Vue 元件的話，我們除了基於前面的概念與語法之外，還得依靠能夠幫助能夠解析 Vue 元件並與其模擬互動的工具：

- Vue Test Utils
- Cypress
- Vue Testing Library

而本系列文將著重在介紹要怎麼透過 Vue Test Utils 來進行與 Vue 元件有關的「元件測試」，因此本文要來介紹一下 Vue Test Utils 與元件測試是在做什麼，又這又跟單元測試有什麼關係呢。

<!-- more -->

## Vue-Test-Utils

首先區辨一下他與我們目前用到的測試工具的各自用處，才能更瞭解接下學的內容是由哪個工具負責的，將來有必要查閱資料時就能更清楚的區別他們。

Vue Test Utils 主要是作為提供測試 Vue 元件的相關工具集，讓我們能更輕易的模擬操作元件來進行測試，但本身並沒有運行測試環境（test runner）的功能，因此我們會需要藉由 Vitest 來作為測試環境以及相關的測試情境案例與斷言 Matcher；除此之外我們還需要用來在 Node 環境中模擬瀏覽器環境的 `jsdom` 來協助處理有關 DOM 上的操作，如此一來才能順利地使用 Vue Test Utils。

而版本的部分要特別注意到，由於 Vue Test Utils 為了相容 Vue 不同版本之間的 API 因此我們要安裝對應的版本未來才不會出錯：
- Vue 2：安裝 Vue Test Utils 1
- Vue 3：安裝 Vue Test Utils 2

確認版本沒問題後，模擬元件的部分交給 Vue Test Utils 基本上就沒問題了，但關於「元件測試」目標主要是要測試什麼東西呢？

## 元件測試的目標

測試本質主要是在預期結果與實際是否相等，而在元件測試中作為受測物的元件，其本身主要是負責 UI 上的一切內容，因此我們測試目標在著重於它的「畫面」與「行為」上是否如我們所預期。

因此，在測試案例的操作過程中（也就是 3A 中的 Action 階段），我們主要是藉由操作對元件介面中的：

- data
- props
- slot
- provide
- directive
- Event（瀏覽器中的互動行為）
- API response（模擬回應）

來判斷下列是否如我們所預期：

- DOM 渲染結果
- emit 行為

## 好的元件測試

當然，做到上面的事項基本上已經可以算是個元件測試了，若我們想讓元件測試寫得更好，除了先前在單元測試提過的一些概念之外，還有一些值得注意的事項：

首先，在撰寫元件測試時的角度，我們並沒有要當個全能全知的神，而是作為「使用者的角度」關注元件介面上來預期結果，所以在測試的過程中我們要「避免又寫了一次實作」。

另外，如果內部邏輯過於複雜時，我們則應該先抽取（extract）其邏輯，透過 composables 的寫法來引入，如此一來我們就能「專注於在元件本身的行為上」，另外也能「針對 composable 的邏輯單獨做測試」。

最後，若元件中有使用到 API 的部分，同樣的我們應該把它當作成是他提供給元件去使用，而元件主要是「接收回應」後就能自行處理後續的內容了，所以在測試上我們應該專注在 API 提供了什麼給元件，透過模擬資料的部分來達成先前提過的 FIRST 原則中的 Fast，最後斷言元件最終的行為是否如預期即可。

現在我們知道 Vue Test Utils 在做什麼了，也知道「元件測試」在做什麼了，但這跟單元測試又有什麼關係呢？

## 元件測試與單元測試的關係

在官方文件中測試章節有[提到](https://vuejs.org/guide/scaling-up/testing.html#component-testing)，元件測試（component testing）在顆粒度上其實是高於單元測試（unit testing）的，甚至可以被視為是整合測試（integration testing）的一種形式。

而坊間有不少文章習慣以單元測試來統稱這一類測試，最主要原因是單元測試的定義為「軟體設計」中最小單位的程式或行為，在 Vue 專案中，若以 Vue SFC 類型檔案（.vue）來看其實測試元件也算是最小單位沒錯。

所以從意義上來劃分單元測試與元件測試，某方面來說很容易出現歧異（甚至單元測試本身就已經有分為獨立型與社交型寫法了）。

然而為了接下來在本系列文中方便區分指的測試對象是哪部分，我將名稱含義分為：
- 元件測試：針對 Vue 元件所進行的測試
- 單元測試：針對元件引入函式、類別等 utils、helper 與 composable 的測試。
- 工具本身：Pinia 測試、Vue Router 測試。

而在弄清楚 Vue Test Utils 工具與元件測試的概念與目標之後，明天我們將來針對這一部分學習元件測試下有哪些重要的語法。

