---
title: Markdown筆記
date: 2019-07-04 15:45:07
tags: 
- [Markdown]
categories: 
- [工具, Markdown]
---

# Markdown由來
　　Markdown語言創始人為***John Gruber***，與***Aaron Swartz***共同合作完成。他的宗旨在於創造一個**「易於閱讀、撰寫的純文字格式」**語言，並且觀念圍繞在它的可讀性，因此在編寫時就算沒有解析器的輔助其實也是很容易可以看得懂文章的脈絡。而隨著時間的推移之下，markdown語言由廣大的開發人員開發了許多新的功能，但在沒有規範的情況下使得Markdown解析器的開發人員，在開發解析器的時候感到困難，因此標準化討論的議題便浮上檯面。而作者***John Gruber***在2014年的twitter上對此議題發表了一段話：

> Because different sites (and people) have different needs. No one syntax would make all happy.
> 節自：https://twitter.com/gruber/status/507670720886091776

　　縱使作者認為Markdown不應受到標準化的影響，最終2016年3月還是發布了RFC7763與RFC7764，其中RFC7764的討論也就是目前開發社群知名的網站Github也將其格式註冊了上去**(GitHub Flavored Markdown)**。而在2017年，GitHub也發布了GFM的正式規範，並且在他們的網站上實作了他們的解析器，使得開源專案的說明文件有較為統一的格式，也讓開發人員有一個更容易閱讀文件的模式。

# 使用方法
使用 Markdown 格式在如今的規範下非常的簡單，大部分都只依靠簡單的符號與數字便能完成：

### 1.標題
使用hash符號，來當作標題，越多#符號表示層級越小
效果：
#### 可以當作標題




### 2.粗體與斜體
使用單一星號框住為斜體，兩個為粗體，三個為粗斜體。
效果：
*字體變斜體*
**字體變粗體**
***字體變粗斜體***


### 3.區塊
使用>大於符號，將會把後方文字框住表示
效果：
> 可以用來當作說明文字


### 4.無序清單
使用-星號來來表示清單項目
效果：
- 清單一
- 清單二

### 5.有序清單
使用數字來來表示清單項目
效果：
1. 清單一
2. 清單二

### 6.程式碼
而身為工程師最常需要在文章內使用程式碼片段的部分markdown也有提供啦！
使用‵‵‵　‵‵‵‵來框住的程式碼
效果：
```
let a = 1 ;
let b = 2 ;
console.log( a + b )
```

介紹完了這些基本的Markdown用法外，其實還有更多可以參考[Mircosoft的文件](https://docs.microsoft.com/zh-tw/contribute/how-to-write-use-markdown)，官方文件還是說明得比較清楚啦哈哈哈。我之後文章將會主力討論程式語言的部分，若有其他想要我介紹的部分歡迎來信告知，那麼我們下次再見囉，掰掰！





參考文件：
- https://zh.wikipedia.org/wiki/Markdown
- https://docs.microsoft.com/zh-tw/contribute/how-to-write-use-markdown