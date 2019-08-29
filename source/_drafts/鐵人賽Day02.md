---
title: 鐵人賽Day002
date: 0000-00-00 00:00:02
tags:
- [鐵人賽]
categories: 
- [鐵人賽, 「小孩才做選擇，我全都要。」30天瞭解Vue.js與D3.js。]
---

# 標題：Vue.js Why Vue.js：我能不要用他嗎？

# Vue.js 是什麼？
Vue.js 是基於 **JavaScript** 的一個**漸進式框架**，而框架簡單來說不同於其他主流的框架，它可以依專案的需求來做變化，你可以很單純的只使用它的**資料綁定(Data Binding)**，在深一點的可以考慮把 **DOM (Document Object Model)的渲染**都交給 Vue.js，再更大型一點的會開始需要設定**路由(Router)**，甚至是**狀態集中管理(Vuex)**等等的功能，因此你可以決定不同的專案導入不同深度的 Vue.js。畢竟殺雞焉用牛刀，你可不會想做個簡單的網站結果還裝了一拖拉庫的工具吧？

# 「不過我目前已經有在用 jQuery 了？我還要 Vue.js 嗎」

這個問題首先要先知道 jQuery 原本解決的是什麼，且讓我從頭開始說起：

jQuery 出現的歷史原因是 JavaScript 在早期一些原生功能較為薄弱，並且還有瀏覽器不兼容的問題使得寫法會有點繁雜，而既然很常用到，為什麼不把它寫得更短更加完善？這也就是 jQuery 發明的宗旨 ( Write less, do more. ) 的想法。

舉例來說，在操作 DOM (Document Object Model)的時候，原先要使用 `document.getElementById('test')` 這種寫法去捕捉元素，再透過方法來將值輸入進去。但使用 jQuery 的作法則只要透過很炫的 $ 選擇器搭配鍊式語法如 `$('#text').html()` 就可以輕鬆達成，除此之外還有像是對於 **AJAX 的發送**、**建立新的 DOM 元素**、**各種事件**與**動畫**等等，jQuery 都提供更簡潔的方法來解決這類問題。

# 「沒錯，這就是我使用 jQuery 的原因，那我可以不要用 Vue.js 嗎？」

老實說，其實可以。~~本系列鐵人賽結束。~~，但我想更好的問法應該是說，**為什麼我會需要這個工具？**每個工具都是在**解決當代環境所遇到的一些問題而相應產生的**，作為 jQuery 最常見的問題是，縱使可以輕鬆的取得目標元素，但當網頁架構一龐大，資料綁定也會越複雜，也越難以管理狀態是受到哪段程式所影響的？

而在單頁式應用(SPA, Single Page Application)漸漸流行起來之後對於 url 的控制也不在只是後端的責任了，前端們得透過各種判斷來取得對應的資料，再把資料輸入回要顯示的頁面，也就是說，如何控制好資料操作的輸出輸入變得越來越重要。

為了解決上述等問題，以資料綁定來說，Vue.js 提供了樣板語法，可以在 HTML 的部分使用花括弧來將 JavaScript 中取得的資料輸出到裡面，不用在 JavaScript 中一個一個綁定輸出，使得程式碼更容易閱讀。而在 SPA 中的 會遇到的 url 問題，在 HTML5 規格發布後有相對應的 API (`history.pushState()`, `history.replaceState`)等等方式來應對，早期也可以透過監聽 # (Hash)的變化來改變，而在 Vue.js 中則可以透過引入 vue-router 來達到同樣的效果，實作起來也較好管理，而怎麼去使用 Vue.js 來做便是本系列接下來的焦點。

# 這麼樣一說，那我們就只用 Vue.js 或其他框架好了，要 jQuery 幹嗎？












# 參考文章

- [How to use VueJs instead of jQuery](https://medium.com/kaliop/how-to-use-vuejs-instead-of-jquery-ee6003ba323d)
- [Drop jQuery From Your Bootstrap Project (And Replace it with Vue.js!)](https://medium.com/js-dojo/drop-jquery-from-your-bootstrap-project-and-replace-it-with-vue-js-82230bfca98a)
- [在 Vue.js 中是否還需要 jQuery](https://www.jianshu.com/p/0005487ee299)






