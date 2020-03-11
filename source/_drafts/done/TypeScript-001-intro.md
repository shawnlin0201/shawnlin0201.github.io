---
title: TypeScript 概論與反思
date: 2099-01-01 00:00:00
tags:
- [前端]
- [TypeScript]
- [w3HexSchool]
categories: 
- [TypeScript]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/TypeScript/TypeScript-logo.png' width='200px' height='200px' />
</div>


# 學 TypeScript 前，先來看看 JavaScript
撰寫 Web 端的工程師對於 JavaScript 應該或多或少有些許程度的瞭解，其特性與彈性的使用方式也讓許多工程師又愛又恨，例如：

```javascript
let age = 26
```

上面這段程式在 JavaScript 中是合法的， 因為 JavaScript 語言並沒有規定在**變數（variable）賦值（assignment）**的時候需要**定義（definite）其資料型別（data type）**，也因此在開發上甚至會遇到這種情況：

```javascript
let a = 5
let b = '10'
let c = a + b
console.log(c)   // 輸出為 '510'
```

這一類擁有**強制轉型（Coerce）**的語言，我們稱其為**弱型別（weakly typed）語言**。

透過上述範例我們已經快速的見識到這一類弱型別語言的威力了，而我們要如何遏止這一類情況發生呢？我們總不可能在每個功能中都將變數型態全部檢查一遍，而這時一個名為 TypeScript 的救世主就降臨了……

<!--more-->

# TypeScript 入門
TypeScript 是由 Anders Hejlsberg （C# 語言之父）所設計而成的一個 JavaScript 的超集（superset）。意思即為 **Typescript 的本質仍然是 JavaScript**，只是另外再加上了諸如型別系統（type system）與介面（interface）的定義，讓平時開發 JavaScript 中一些潛藏的危機畢露出來，並盡可能的協助我們在開發長遇到的一些問題：

- 對於變數名稱、函式、物件、方法等等撰寫上的失誤。（e.g. 模糊搜尋會用到的 `String.prototype.toLowerCase`， DOM 操作中的 `window.document.getElementById('id')`），常常出現大小寫撰寫錯誤問題。
- 使用函式時輸入的傳遞參數（param）以及輸出值的資料型別是否有誤。

以上問題基本上編譯器對於 JavaScript 都有一些基礎的提示，但尚未到強制的範圍，而沒強制的東西通常最後會容易淪落到回歸原本的作法。（像是 Git Flow 中沒透過設定強制成員只能推送至 develop 分支，並由 CI merge 回 master 分支的話，最後容易大家各開一支 branch 來各自維護，各自推送。）

也因為這個盲點存在，因此 TypeScript 對於其訂定的規則會嚴格執行，未符合規定的用法通通會被 TypeScript 檢查出來並且報錯，而這個強制性的做法也使開發能更加地穩定。

除了上面提及的優點之外，TypeScript 也支援了 ECMAScript 的語法，讓我們可以寫出更妖魔鬼怪的程式碼（？

```typescript
const pow: (input: number) => number = input => input * input
```

並且現代三大主流前端框架 Vue、React 與 Angular 也陸陸續續支援 TypeScript，其中 Angular 在早期 2 版的時候就已經開始支援 TypeScript 的寫法（甚至是強迫大家一定要寫？XD），而 Vue 在開發框架（Vue-cli）的第三版中也開始加入了 TypeScript 的支援。就社群趨勢來說，其認可度也間接證明了他的重要性。

# TypeScript 反思
既然 TypeScript 好處這麼多，為何仍有部分工程師未在專案中使用呢？這麼啵棒的東西怎麼會在 Vue 中只是選用，而在 Angular 中則幾乎是標配呢？

**原因很簡單，主要是考量到專案的大小。**

中文有句諺語：「殺雞焉用牛刀。」，替每個變數都定義型別與實作介面固然是替專案增添穩定性，但是對於小型專案、個人專案來說，有時候太多的限制反而是個阻礙。

另外在引用第三方函式庫的時候，TypeScript 也會要求要定義函式庫的相關設定，對於第一次使用 TypeScript 的初學者來說上手的難易度曲線較高，可能還沒開始撰寫到程式本體就已經被第三方引入等等設定給勸退了。

並且若是專案團隊的成員變動速度快，並不是每個團隊成員都熟稔 TypeScript 的話也可能會造成後續維護上的困難與危機。

假使這些問題都不存在的話，那麼 TypeScript 將會是解決一些邊際問題上的強效藥。

# 參考資料

- [強弱型別](https://zh.wikipedia.org/wiki/%E5%BC%B7%E5%BC%B1%E5%9E%8B%E5%88%A5)
- [你懂 JavaScript 嗎？#8 強制轉型（Coercion）](https://cythilya.github.io/2018/10/15/coercion/)
- [讓 TypeScript 成為你全端開發的 ACE！](https://ithelp.ithome.com.tw/users/20120614/ironman/2685)