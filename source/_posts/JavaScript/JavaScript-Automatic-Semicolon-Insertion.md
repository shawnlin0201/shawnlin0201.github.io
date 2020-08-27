---
title: JavaScript 深入淺出 Automatic Semicolon Insertion 自動插入分號機制
date: 2020-08-24 13:16:12
tags:
- [w3HexSchool]
- [JavaScript]
- [ECMAScript]
categories: 
- [JavaScript]
- [JavaScript, 深入淺出]
- [JavaScript, ECMAScript]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/JavaScript/JavaScript-logo.png' width='200px' height='200px' />
</div>

在 JavaScript 當中 `;` 被用來作為分隔表達式語句（statement）符號；然而，你知道在 2000 年時的 ECMAScript（ES3）中，有自動插入分號機制（Automatic Semicolon Insertion）會幫你自動插入分號嗎？

<!-- more -->

# 結尾是否一定得分號？

如序文所述，在 JavaScript 當中主要是用來分隔表達式語句（statement）符號，而在 ES3 中新增的自動插入分號機制（Automatic Semicolon Insertion）則是基於當你一段程式碼後按下 `Enter` （也就是實際上寫入一個換行符號（`\n`））時，JavaScript parser 就有一定規則的幫你補分號進去程式。

瀏覽器基於 ECMAS-262 spec Automatic Semicolon Insertion 規則而實作的結果就是，有些地方就算你不寫他也會幫你補、有些則是你不寫他也不會幫你補；但另一群例外則是你一定得補分號跟不能補分號的情況。

所以情境大致上可分為：
- 不會 ASI 的情境
- 會 ASI 的情境
- 一定要補分號的情境
- 一定不能補分號的情境
- 不需要補分號的情境

#  不會 ASI 的情境

- 該行沒有結束程式碼區塊時

```js
var frult = [
  'apple',
  'banana'
]

var lyrics = `    
  你看這碗又大又圓
  你看這麵又長又寬
`
```

- 下一行開頭是運算子的時候

```js
var a = 1
+1
++
a

console.log(a) // 3
```

- 條件陳述句沒有用花括號 `{}` 包起來時。

```js
var a = 1
if(a)
  console.log('true')
else
  console.log('false')
```

- 使用空白分隔程式碼時

```js
if(a)
  console.log('true')


else
  console.log('false')
```

# 一定要補分號的情境

- 表達式與表達式之間

```js
var a; var b;

if (a); if (b)

```

- 下行開頭為 `[` 、 `(`

```js

console.log('log') // SyntaxError: console.log(...) is not a function

(function(){
  console.log('IIFE')
}())
```

防禦手段可以透過前置分號來幫忙：

```js
;(function(){
  console.log('IIFE')
}())

;['array'].map(function(element){
  console.log(element)
})
```

# 一定不能多補分號的情境

- for 迴圈小括號中的兩個分號是固定值
```js
for (;;){ } // 合法

for(i=0; i<3; i++;) {} // 不合法

```

- 條件、迴圈等陳述式中小括號的後方

# 不需要補分號的情境

- 陳述式花括號的後方

```js
if () {} // 不需要補
```

```js
if (); {} // SyntaxError
for (;;); {} // SyntaxError
```


# 懂了 ASI 之後

在知道 Automatic Semicolon Insertion 後應該要瞭解到結尾分號是一種**選項**，因此團隊風格可以決定要不要採用；另外一定要的情況是採用了不支援沒分號的壓縮工具，但現在大部分的工具應該都有支援沒分號的寫法。更重要的是絕對不會是為了減少程式碼的大小而不寫，因為最後壓縮工具都會幫你補上去。



