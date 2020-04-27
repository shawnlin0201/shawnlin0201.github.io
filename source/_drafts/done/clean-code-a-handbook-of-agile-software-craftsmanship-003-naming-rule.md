---
title: 重新解構：無瑕的程式碼（Clean Code） Chapter 2 有意義的命名（下）－命名規則
date: 2020-05-17 00:00:00
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

上一章節整理了偏向心法方面的命名設計理念，本篇將會整理有關於命名實際上的規則與做法。

<!--more-->


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