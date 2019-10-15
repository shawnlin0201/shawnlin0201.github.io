---
title: Canvas 樣式與文字
date: 2019-10-10 19:25:14
tags:
- [前端]
- [Canvas]
categories: 
- [前端, Canvas]
---

# 前情提要

在 Canvas 系列上一篇中我們已經可以繪製一些基本矩形與線條了，但在 Canvas 中，由於繪製圖形並不是藉由產生 DOM 標籤來形成圖形，因此並沒有辦法透過 CSS selector 來捕捉並更改樣式，而今天便要來研究一下如何使用 Canvas 提供的 API 來更改裡面的樣式。