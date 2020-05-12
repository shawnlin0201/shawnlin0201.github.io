---
title: 重新解構：無瑕的程式碼（Clean Code） Chapter 2 有意義的命名（上）－命名心法
date: 2000-00-00 00:00:00
tags:
- [w3HexSchool]
- [Book]
- [Clean-Code-A-Handbook-of-Agile-Software-Craftsmanship]
categories: 
- [Book, Clean-Code-A-Handbook-of-Agile-Software-Craftsmanship]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/Book/Clean-Code-A-Handbook-of-Agile-Software-Craftsmanship.jpg' width='200px' height='200px' />
</div>

命名，對於工程師來說是一門重要的學問，因為它無所不在。不僅除了變數與函式，廣泛到連圖片、資料夾、甚至是文章標題、標籤都得經過命名的環節。

好的命名，可以讓其他人清楚的瞭解它的作用、功能；壞的命名，則會讓人擁有錯誤的印象，得花更多時間來釐清原本所該敘述的內容。

那麼，我們要怎麼取出有意義的命名呢？

<!--more-->

在這一章節中，作者整理了幾個概念來闡述，而其中許多的概念是可以融會貫通的。因此我以命名的心法與規則為劃分，將其重新整理：

- 命名心法：為何這樣命名？詮釋在命名前心中所具備的前提。
- 命名規則：實際怎麼命名？遵循與避免什麼樣的規則才可以接近所謂好的命名。

# 命名的心法
在命名前，工程師可以先想想以往所碰過的程式碼是如何命名的？有沒有遇過命名實際上與本身作用不同？或是實際上做的事情比命名本身來的多？

而在命名心法之中，我們將試著揣測往後看到同段程式碼時，自己或他人的想法。我將其區分了幾個性質來做為解釋：
- 闡述性
- 符合性
- 一致性


## 闡述性
闡述性即為命名本身做了什麼。具有闡述性的命名，可以使其解釋被命名的性質、作用，讓其他人能夠瞭解原先命名者的思維。

```js
let list =  ['apple','banana'];
```

較好的作法：

```js
let shopping_basket =  ['apple','banana'];
```

透過 `shopping_basket` 來取代 `list`，讓後續閱讀的人可以知道這個陣列內容其實代表的是什麼。

## 符合性
與闡述性的概念相近，但符合性更在意的是命名不只是解釋（explain），更是命名本身要能夠符合（match）背後的意義，才能避免解釋反而誤導了它人。以下舉例如果命名只具備了闡述，但不具備符合性時會發生什麼事情？

```js
// 位於某個檔案中的函式呼叫
getBook(function (book)) {
  console.log(book) // 預期會返回某個書籍的詳細資料
})

// 另一處檔案中，被呼叫的函式本身
function getBook(callback) {
  fetch('某個書籍清單')
    .then(res => res.json())
    .then(res => callback(res)) // 只有回傳書籍清單，並沒有詳細資料
}
```

上面的程式呈現了一個預期從回呼函式（callback function）中拿到書籍的詳細資料，結果返回的是一個書籍的清單資料。

的確 `getBook` 函式解釋了拿取書籍有關的內容，但它並沒有說明拿的應該是什麼，因此名稱不完全符合它背後所做的事情。

而顯而易見的是我們可以讓命名再加上符合它所做的事情來解決這個問題。

```js
// 取得書籍清單的函式
function getBookList () {
  // ...
}

// 取得含有書籍詳細資料的函式
function getBookDetail () {
  // ...
}
```

## 一致性
命名的一致性則是在說明同個概念、想法、作用的名稱，應該盡量用同個命名來代表它，不要用兩個或多個以上的詞彙。

如果命名時不考慮到一致性的話，影響的是下一個接手維護的人（甚至是半年後的自己）無法連貫。例如下列程式碼：

```js
// 位於某個檔案中的資料來源
let member = [{
  name: 'xxx',
  age: 20,
}]

// 位於某個檔案中的函式
function getAccountInfo() {
  // 裡面操作有關於 member 變數中的內容
}

```

在這段程式碼中，你可能會好奇 `account` 與 `member` 之間的不同點在哪？甚至如果後續維護的時候又不慎出現了一個被命名為 `getMemberInfo`　的函式時會有多頭痛。

因此我們將有關於同個概念的內容修改一致：

```js
// 位於某個檔案中的資料來源
let member = [{
  name: 'xxx',
  age: 20,
}]

// 位於某個檔案中的函式
function getMemberInfo() {
  // 裡面操作有關於 member 變數中的內容
}
```

如此一來我們可以透過名稱就能大概猜想這個函式與資料物件是有關聯的。

這章節整理了比較偏向心法方面的設計理念，而下一篇將會整理有關於命名實際上的規則與做法。