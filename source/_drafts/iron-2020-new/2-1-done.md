---
title: 【建立模型】2-1 瀏覽器是如何看懂我寫的程式？
tags: 《透過認知模型認識 JavaScript》
---

# 程式碼

![](https://i.imgur.com/aFwSH80.png)

你有沒有曾經思考過當你撰寫完 JavaScript 檔案時，為什麼瀏覽器「看」得懂你寫的程式呢？

---

## 編寫時期（Author-time）與執行時期（Run time）

```js
alert('Hello, JavaScript!');
```

當你在 VScode 等程式編輯器上打出這段程式碼時，你可能發現 `alert` 與裡面的 `'Hello, JavaScript!'` 被上了不同的顏色以作區別，它似乎能夠按著某個規律來識別你所寫的程式，若你不慎打錯字，它還會透過紅色波浪符號提示你的程式碼有問題……

![](https://i.imgur.com/Mf1E7v2.png)

在這個撰寫程式碼的期間我們稱其為**編寫時期（Author-time）**，也就是說，JavaScript 程式碼在這個時候並沒有被執行（Execute）。

會有這些效果的出現，最主要是程式編輯器中如：語法檢查（Syntax Check）、語法凸顯（Syntax Highlighting）……等等內建的一些輔助功能，用意主要是來協助你在開發時可能會遇到的各種問題，而這些問題並不需要等到執行時才發現，如此一來你就可以更有效率的撰寫程式與更好的開發體驗。

> 「那麼……什麼時候電腦才會開始執行 JavaScript 呢？」

實際上，電腦並不懂我們所寫的 JavaScript 程式，而是要透過 **JavaScript 引擎（Engine）** **即時編譯（Just-in-time）** 成電腦能讀懂的語言，而 JavaScript 引擎編譯的過程即是所謂的**執行時期（Run time）**。

![](https://i.imgur.com/ZAaejAH.png)

## JavaScript 引擎

JavaScript 最主要一開始發明的原因便是因為早期瀏覽器缺少能夠與使用者立即互動的功能，僅能藉由伺服器的回應來得知一些狀況，但如果像是填寫表單時漏打的情況，在早期你可能要花五分鐘的時間送到該網頁的伺服器上，而伺服器又得花一點時間來回傳給使用者說表單少填那一項。

所以為了解決這個問題，網景公司讓一名叫做 Brendan Eich 的工程師去著手開發一套能放置於瀏覽器上的語言，而那個語言便是如今為大家所稱的 JavaScript。

如今，現代的瀏覽器為了更好的使用者體驗，基本上都一定會放入 JavaScript 引擎，來執行頁面中所引入的 JavaScript 檔案，而 JavaScript 引擎目前的生態就如同 F1 賽車中一般，各個引擎所屬的廠商彼此之間不斷互相較勁，而目各家瀏覽器所採用的 JavaScript 引擎如下：

- Mozilla Firefox（SpiderMonkey）
- Google Chrome（V8）
- Internet Explorer（Chakra-JScript）
- Microsoft Edge（Chakra-JavaScript）
- Safari（JavaScriptCore）

而同樣為了避免各家實作上種種的議題，在 F1 賽車中有個國際汽車聯盟（FIA）負責訂定有關於各部位零件的一些規定，而在對於要如何實作 JavaScript 引擎同樣也有個歐洲電腦製造商協會（ECMA 國際）進行標準化，並在 1997 年 6 月時提出 ECMA-262 第一版，從此網頁工程師基本上只要遵照著 ECMA-262 規範所定義出的 ECMAScript 進行開發，基本上就可以在各大瀏覽器中正常運作。~~（除了某家不合群的瀏覽器……）~~

> 額外補充：Node.js 作者即是看見了 JavaScript 引擎的優勢，取用了 V8 引擎並加入一些模組，製成一個不需依賴瀏覽器即可執行的運行環境（Run-time），使得開發者能透過 JavaScript 來開發有關於網頁伺服器等等有關的技術運用。

## 解析器（parser）與抽象語法樹（Abstract Syntax Tree，AST）

有了引擎之後，我們多少還是會想瞭解引擎究竟是如何將我們的 JavaScript 程式轉為電腦能夠讀懂的機械碼。而一般 JavaScript 引擎作法如下：

- 標記化（tokenization）：將所有程式碼拆解成單個標記（token）。
- 詞法分析（Lexical Analyzer）：分析所有標記的類型與作用。
- 形成抽象語法樹（AST）：依據詞法分析所產生的標記的類型，歸類、整理形成一個語法樹。
- 藉由抽象語法樹來產生對應的機械碼。

但這樣講可能還是沒有想像的畫面，接下來我們以下列程式碼為例：

```js
alert('Hello, JavaScript!');
```

經由解析器（parser）時會形成這樣的概念：

![](https://i.imgur.com/O6n6FFa.png)

接著形成抽象語法樹：

![](https://i.imgur.com/MxsEYNc.png)

最後透過這個抽象語法樹實作出對應的機械碼。

以上便是 JavaScript 引擎編譯時大概所做的事情，當然實際上過程還會涉及更多最佳化的方法來讓整個過程的編譯與執行效能達到更好，但理解到這邊已經對於撰寫 JavaScript 來說很有幫助了！

> 如果你對於解析器這段過程有興趣的話，你也可以透過這兩個服務試試看：
> - [Esprima-parse](https://esprima.org/demo/parse.html#)
> - [Jointjs-javascript-ast](https://resources.jointjs.com/demos/javascript-ast)

## 建立模型時間
目標：瞭解 JavaScript 的意義與程式碼大概是如何被執行的。

### 整理重點：

- JavaScript 是一種用來解決瀏覽器上即時互動問題的程式語言、策略與工具。
- JavaScript 要經過 JavaScript 引擎解析成機械碼後才能讓電腦執行。
- 不同的瀏覽器中的 JavaScript 引擎並不一定相同，其實作上也會有些差異。
- ECMAScript 是基於 ECMA-262 規範所形成的定義範本，基本上照這規格開發理應遵守的瀏覽器都能正常運作。

### 認知模型樹狀圖參考：
請試著透過這張樹狀圖或你自製的圖表回想這章節的概念：
- JavaScript
  - 用途
  - 執行/編譯
    - 標記化（tokenization）
    - 詞法分析（Lexical Analyzer）
    - 抽象語法樹（AST）
  - 瀏覽器
    - JavaScript 引擎

在理解完 JavaScript 基本的執行過程後，接下來我們要開始學一些基本語法，再來放到瀏覽器上一一執行！