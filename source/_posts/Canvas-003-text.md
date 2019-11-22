---
title: Canvas 繪製文字
date: 2019-10-27 10:30:21
tags:
- [前端]
- [Canvas]
- [JavaScript]
categories: 
- [前端, Canvas]
---

# 前情提要

在 Canvas 系列上一篇中探討了如何針對 Canvas 裡的圖形來更改顏色、套用樣式，而本篇 Canvas 將會著重在文字的身上，

## 繪製文字

繪製文字歷經改版後，現在主要是透過兩個屬性來渲染：
- `fillText(text, x, y [, maxWidth])`：透過 X Y 座標來定義文字位置，並且可以給予最大寬度來限制文字的渲染
- `strokeText(text, x, y [, maxWidth])`：如同 `fillText` 一樣是渲染文字，但 `strokeText` 只會渲染文字的外框線。

```javascript
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.font = '24px Arial';
  ctx.fillText('Hello Canvas!', 0, 24);
}
draw();
```

![](/images/canvas/Canvas_filltext.png)

```javascript
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.font = '24px Arial';
  ctx.strokeText('Hello Canvas!', 0, 24);
}
draw();
```

![](/images/canvas/Canvas_stroketext.png)

---

## 文字樣式
在 Canvas 中繪製文字時，可透過文字屬性來更改文字渲染的樣式：
- `font = value`：支援與 CSS font 一樣的語法。
- `textAlign = value`：文字對齊，有 `start`、`center`、`end`、`left`、`right`等等選項。
- `textBaseline = value`：設定文字基準線，提供選項請參考下方圖文。
- `direction = value`：文字方向，可設定從左到右的 `ltr` 或從右到左的 `rtl`。

裡面文字樣式與一般使用 CSS 上大同小異，主要在於 `textBaseline` 當中所參考的文字基準線，WTATWG 組織對 Canvas 基準線的樣式做出了[定義](https://html.spec.whatwg.org/multipage/canvas.html#text-styles)，並繪製出一張圖來表示：

> ![](/images/canvas/Canvas_baselines.png)
> 圖片來源為 WTATWG Canvas baselines 說明

其中，文字基準線的預設值為 `alphabetic`，`alphabetic` 是一種以拼音文字為準則所訂定出的基準線，而通常為了保持平衡，文字通常容納在 `em` 區域的上方以及 `ideographic` 表意文字線的內部，因此若是使用中文的情況之下，使用預設值 `alphabetic` 的基準線文字底部是會超出去的，因為中文的基準其實是要參考 `ideographic` 表意文字基準線。

## 測量文字
若是有時候需要偵測由 Canvas 渲染的文字寬度等屬性時，可以藉由 `measureText()` 來取得相對應的資料。

```javascript
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  var text = ctx.measureText('永');
  ctx.font = '24px Arial';
  ctx.fillText('永', 0, 22);
  console.log(text);
  // actualBoundingBoxAscent: 8
  // actualBoundingBoxDescent: 2
  // actualBoundingBoxLeft: 0
  // actualBoundingBoxRight: 10
  // width: 10
}
draw();
```

# 結尾

比起套用樣式來說，繪製文字的部分東西較少，但還是得瞭解到底如何透過 Canvas 來渲染文字，畢竟將來實作 Canvas 相關專案時一定多多少少會遇到他！

# 參考資料

- [MDN-Canvas](https://developer.mozilla.org/zh-TW/docs/Web/API/Canvas_API/Tutorial)
- [WTATWG](https://html.spec.whatwg.org/multipage/canvas.html#text-styles)
