---
title: 鐵人賽Day002
date: 0000-00-00 00:00:02
tags:
- [鐵人賽]
categories: 
- [鐵人賽, 「小孩才做選擇，我全都要。」30天瞭解Vue.js與D3.js。]
---

# 標題：Vue.js Why Vue.js：我能不要用他嗎？

# Why Vue.js：我能不要用他嗎？

在談談為什麼需要 Vue.js 之前，我想要先來聊聊幾個話題：
- 學完了 HTML、CSS 以及 JavaScript 之後為什麼要學框架？
- 我有 jQuery 了還需要 Vue.js 嗎？
- Vue.js 究竟是何方神聖？我能靠他做到什麼？
- Vue.js 特色

# 為什麼要學框架？

作為一個基礎的前端工程師，HTML、CSS 以及 JavaScript 是不可或缺的技能組合，然而學習完要投履歷時會發現許多公司都會要求至少要有一個框架的經驗，再加上一些工具才達到應徵門檻，不求甚解的話很容易認為框架就只是個公司需求，但可以反問的是，**為什麼公司會有需求呢？**

以 JavaScript 為例，在 JavaScript 程式中，最基礎會知道`=`並不是一般數學上所使用的「等號」，而是「賦予」某變數一個值的意思，後來會開始寫一些基本的函式（`Function`），稍微深入一點會知道作用域、閉包（Closure）等等。學習完了必要的概念後，就能搭配 HTML 與 CSS 就可以開始寫一個完整的應用網站，這也是部分前端自學會經過的路程之一。

一開始前端新鮮人如果是自學的情況下，最容易體驗不到的事情便是**與他人協作**的經驗，然而與他人協作卻又是在公司中時常需要用到的的**一門難題**，團隊開發專案會需要配合互相的 code，翻修、維護舊專案要看前人寫的 code，就連想要在自己專案上加功能，都得要看自己以前寫的 code。在哪都要看 code 的情況下，看 code 顯然就變成了一門藝術，這藝術的價值在哪已有許多文章可以 Google 到（底下連結也有放一些），而框架就我認為在某種程度上是**提升**了這門藝術的**優雅性**。

隨著時代的演進，網路開發已從一人包辦變成前後端分離，而分離出來的前端要實作的功能也越趨複雜，以致於程式碼的維護與管理越來越困難，如果公司沒有固定設計模式的情況下，不同專案的開發人員依自己喜好編寫不一樣的開發架構，未來的維護將會越來越吃緊，直到進來的菜鳥完全看不懂，若依照各個框架本身提供的 **API** 、**風格**、**邏輯**與**架構**開發，下一個人要接手維護時只要懂得該框架的邏輯與用法就能繼續延續前人的程式碼。

當然，現代框架的好處並不止於此而已，但首先我們要來看看下個問題！

# jQuery 不好嗎，為什麼要用 Vue.js？

// todo
// todo
// todo
// todo
// todo
// todo
// todo
// todo
// todo
// todo
// todo
// todo
// todo
// todo
// todo
// todo
// todo
// todo

這個問題首先要知道 jQuery 原本解決的是什麼，且讓我從頭開始說起：

jQuery 出現的歷史原因是 JavaScript 在早期一些原生功能較為薄弱，並且還有瀏覽器不兼容的問題使得寫法會有點繁雜，而既然很常用到，為什麼不把它寫得更短更加完善？這也就是 jQuery 發明的宗旨 ( Write less, do more. ) 的想法。

舉例來說，在操作 DOM (Document Object Model)的時候，原先要使用 `document.getElementById('test')` 這種寫法去捕捉元素，再透過方法來將值輸入進去。但使用 jQuery 的作法則只要透過很炫的 $ 選擇器搭配鍊式語法如 `$('#text').html()` 就可以輕鬆達成，除此之外還有像是對於 **AJAX 的發送**、**建立新的 DOM 元素**、**各種事件**與**動畫**等等，jQuery 都提供更簡潔的方法來解決這類問題。










# 「Vue.js 是什麼？」
簡單來說，Vue.js 是一個基於 JavaScript 的**漸進式框架**，漸進式指的是在不同的專案中，你可以**決定引入 Vue.js 的程度**，小至只使用他提供的**資料綁定(Data Binding)**功能，大到可以藉由 Vue-cli 建立一個較為完整的單頁式應用程式(SPA, Single Page Application)。而框架的意思則是有一套放置與管理程式碼的規則與脈絡，使得在進行多人開發時、維護他人舊專案時，也能夠較為輕易的閱讀程式碼，並且透過框架已經處理好的方法，輕易地去實作較為複雜的功能。




# Vue.js 是什麼？
Vue.js 是基於 **JavaScript** 的一個**漸進式框架**，而框架簡單來說不同於其他主流的框架，它可以依專案的需求來做變化，你可以很單純的只使用它的**資料綁定(Data Binding)**，在深一點的可以考慮把 **DOM (Document Object Model)的渲染**都交給 Vue.js，再更大型一點的會開始需要設定**路由(Router)**，甚至是**狀態集中管理(Vuex)**等等的功能，因此你可以決定不同的專案導入不同深度的 Vue.js。畢竟殺雞焉用牛刀，你可不會想做個簡單的網站結果還裝了一拖拉庫的工具吧？







# 參考文章
- [The deepest reason why modern JavaScript frameworks exist](https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445)
- [前端為什麼使用框架？](https://www.itread01.com/eqycx.html)
- [閱讀他人的程式碼](https://www.ithome.com.tw/node/47717)
- [為何資深開發者寫的程式看起來不怎樣](https://medium.com/@CQD/%E7%82%BA%E4%BD%95%E8%B3%87%E6%B7%B1%E9%96%8B%E7%99%BC%E8%80%85%E5%AF%AB%E7%9A%84%E7%A8%8B%E5%BC%8F%E7%9C%8B%E8%B5%B7%E4%BE%86%E4%B8%8D%E6%80%8E%E6%A8%A3-%E5%8F%88%E5%A6%82%E4%BD%95%E5%BE%9E%E5%8D%83%E9%87%8C%E4%B9%8B%E5%A4%96%E8%AA%8D%E5%87%BA%E8%8F%9C%E9%B3%A5-c1afa754c5e4)
- [Vue.js](https://shan.io/sighting/modern-web-podcast-transcript-vue-js-evan-yu-sarah-drasner/)
- [How to use VueJs instead of jQuery](https://medium.com/kaliop/how-to-use-vuejs-instead-of-jquery-ee6003ba323d)
- [Drop jQuery From Your Bootstrap Project (And Replace it with Vue.js!)](https://medium.com/js-dojo/drop-jquery-from-your-bootstrap-project-and-replace-it-with-vue-js-82230bfca98a)
- [在 Vue.js 中是否還需要 jQuery](https://www.jianshu.com/p/0005487ee299)






