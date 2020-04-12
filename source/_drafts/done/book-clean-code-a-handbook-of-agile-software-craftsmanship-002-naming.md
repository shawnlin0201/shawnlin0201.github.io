---
title: 無瑕的程式碼（Clean Code） Chapter 2 有意義的命名
date: 2020-04-07 22:13:03
tags:
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


# 命名的規則
命名的規則，相較於心法的概念來說，則多了一點明文規定。

諸多的規則限制是來自於許多工程師的長期經驗，以及程式編譯與操作環境設備上的考量，透過命名來能幫助我們加速開發。

而同樣的我將其歸納成下列幾種：
- 常見應避免的用法。
- 依資料型態的命名規則。
- JavaBeans 規範。
- 添加資訊。
- 容易被搜尋的字眼
- 真的還是不行？
## 常見應避免的用法

- 避免使用無意義命名。
例如：`abc`、`a1`、`a2`。

```js
let abc = '...';
let a1 = '...';
let a2 = '...';
```

- 避免單個字命名。
例如：`a`、`b`、`c`。

```js
let a = '...';
let b = '...';
let c = '...';
```

尤其這對搜尋來說非常難以找到這個單字的源頭，試著想一下你打開了搜尋，然後輸入了 `a` 因為你想看看這個變數所儲存的來源是怎麼操作的，電腦只能跟你說很抱歉：這裡有 `9527` 個搜尋到的結果。

但如果是迴圈中常用的 `i`、`j`、`k`，則可以使用，因為這些對於工程師來說是有既定印象的，並且我們並不會在全域範圍中一直使用它。

```js
function sumArrayNumber(array) {
  let result = 0
  for (let i = 0; i < array.length; i++)  {
    result += array[i]
  }
  return result
}
```

- 避免匈牙利命名法。
例如：`string_Phone`、`string_Name`。

```js
let string_Phone = '0912345678';
let string_Name = 'shawn';
```
這裡並非說匈牙利命名不好，因為它是有歷史背景的因素才出現的。

然而，在現代開發環境中，資料型態已經可以透過編譯器來一系列的檢查。

並且在 JavaScript 之中，型態很有可能會轉變，將變數命名型態會有很大的機率誤導他人。如果真的要有效辨別，則可以使用 TypeScript ，透過型別系統來定義變數才更有強制力。

## 依資料型態的命名規則

- 常數與純數字中的命名
如果專案中某個特定的數字有原因的，可以試著賦予一個名稱，這會讓搜尋時與閱讀時更容易瞭解這個數字的來由。

```js
const target_item_price = 30;

if (50 > target_item_price) {
  buyTarget()
}
```

```js
const target_item_price = 30;
const current_balance = 50;

if (current_balance > target_item_price) {
  buyTarget()
}
```

更棒的好處是，當我們後續維護如果要變更該數字，我們也更容易能夠找到它。

- 物件與類別的命名
物件與類別可以使用名詞來命名。

```js
let member = {
  name: 'Shawn'
}
```

- 函式與方法的命名
函式與方法可以使用動詞與動詞片語來命名。

```js
function postArticle () {
  // ...
}
```

- 特定領域的命名
有時候專案中是有關於某些特定領域，一般來說如果能採用工程師能理解的用語為優先。

```js
let title = '某某職稱'
```

若真的找不到用語，至少也要使用該特定領域的名稱，之後也才有辦法詢問名稱的意義。

```js
let agent = '某某代理人'
```

- JavaBeans 規範
JavaBeans 原先是屬於 Java 語言中的一個類別（class），而要使用它必須遵守一些規則。

例如提取統一使用 `get`，修改則是 `set`，布林值判斷則使用 `is`。

另外還有像是類別名稱首個單字大寫後續小寫，方法、變數名稱則是首個單字小寫後續大寫等等

舉例來說好比操作瀏覽器物件中的 localStroage 中的方法：

```js
localStorage.setItem('hello', 'world');
localStorage.getItem('hello');
```

- 添加資訊
有時候單一個詞彙解決不了的東西，那就試試第二個吧！

```js
let name = 'Shawn';
```

```js
let firstName = 'Shawn';
let lastName =  'Lin';
```

但前綴後綴的時候如果有遇到大量的情況，則應該考慮是否要將其便成為一個物件。

```js
let memberFirstName = 'Shawn';
let memberLastName =  'Lin';
```

```js
let member = {
  firstName: 'Shawn',
  lastName:  'Lin'
} 
```

- 容易被搜尋的字眼
最後一個則是容易被搜尋為原則。因為在維護舊專案時，第一件事情可能先要瞭解整個架構，而其中可能會用了大量的方法來建構，如果用了一個不好搜尋到的名稱，可能接手維護的人會感受到很挫折甚至是憤怒，這也跟前面的心法與規則息息相關。

再來複習一次：

```js
t(9527) ;  // 這到底是什麼...
```

搜尋結果:
> 55 個檔案中有 10130 個結果。

- 真的還是不行
有的時候礙於規模大小還是發展的時候，當時的狀況確實沒辦法想到一個最好的命名。因此覺得真的不是一個好命名的時候，那麼就透過註解來提醒後續維護的人，記得幫忙想個好名字啊。

警告：是真的無法才這麼做。
```js
let tmp = 'something'; // 名稱仍有待改進
```

以上是第一章節的觀後感，自己仔細整理過後真心覺得程式中的命名，比玩遊戲創角色時的命名真的難太多了...。