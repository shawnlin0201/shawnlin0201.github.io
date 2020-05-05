---
title: JavaScript 深入理解 Garbage Collection 垃圾回收機制
date: 2000-01-01 0:00:00
tags:
- [JavaScript]
- [Memory]
categories: 
- [JavaScript]
- [JavaScript, 深入理解]
- [Memory]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/JavaScript/JavaScript-logo.png' width='200px' height='200px' />
</div>

垃圾回收機制（Garbage Collection）主要是在協助執行於電腦上的應用程式，保留、清除一些儲存於記憶體中一些用不到的資料。

那麼在 JavaScript 中的垃圾回收機制又是如何處理呢？

<!-- more -->

# Memory model
在 JavaScript 中的記憶體模型（JavaScript Memory Model）主要可分為 `call stack` 、 `heap` 與 `constant pool` 的差別。

## constant pool
`constant pool` 簡單來說就像是一些常用的 JavaScript key word 會包含在裡面，如 `console` 與底下的方法 `log`。

要如何看到 `constant pool` 可以透過 `node --print-bytecode <file.name>` 去執行並編譯成 bytecode，接著你就可以在裡面找到它的存在。

> Huli 也有一系列的發表在 coderbridge 上的[文章](https://www.coderbridge.com/series/817c07dc8e1c46f2b0a604b3b4e195c1)，裡頭在講解有關於從 bytecode 看各個 JavaScript 關鍵字的各種議題，有興趣的可以看看。

## Call Stack
每當 JavaScript 呼叫函式時（包含主程式），便會創立一個執行環境（Execution Context），而每個執行環境都會有屬於它的一個變數物件（Variable Object），當我們宣告、操作辨識符時（Identifier），它就會分配（allocate）一個位於 `Call Stack` 的地址（address）。

```js
var x = 1;
var y = 2;
```

其執行環境中的變數物件即為：

```js
{
  x: 1, 
  y: 2
}
```

而對於記憶體來說就像是這樣：

| 辨識符 | 地址        | 該地址所儲存的數值 |
|:------:|:-----------:|:----------------:|
| x      | 228BAD56F62 | 1                |
| y      | 228BAD56F66 | 2                |

所以你那個 `1` 其實是由像是 `228BAD56F62` 這樣的地址而來的。


另外在 `Call Stack` 中所存放的數值必須是**原始類型（primitive type）**，如字串（String）、布林值（Boolean）、數字（Number）。

假如想存放非原始類型（Non-primitive type）數值的話，這時候就會出動到 `Heap`。

## Heap
`Heap` 一樣都是有可供參考的地址與存放的數值，但它與 `call stack` 的不同就在於其結構鬆散，不像 `call stack` 會隨著執行環境有所變動，因此適合用來存放像是一些具有深度的陣列以及物件：

```js
var x = {a: 1};
var y = y;
```


在這個物件變數的執行環境當中，stack 的部分會負責儲存變數 `x` 、變數 `y` 以及 `x` 的值 `1`，而變數 `y` 的值則實際上是紀錄了一段參考到 heap 的指向。




# 記憶體生命週期

配置你程式需要的記憶體空間
使用配置到的記憶體空間(讀，寫)
當不再使用時釋放已被配置的記憶體空間

在所有語言中，第二點的(運作方式)是確定的。第一點以及最後一點在低階語言中是確定的，但是在高階語言如Javascript 則通常是不明確的。
<!-- todo  -->


# Garbage Collection 垃圾回收機制由來
前面提到，垃圾回收機制主要是在協助執行於電腦上的應用程式，保留、清除一些儲存於記憶體中一些用不到的資料，然而早期執行程式不像現在有執行環境（Execution Context）中有 stack、heap 的概念，需要用到記憶體時都是使用**靜態分配**的策略，雖然執行期間的表現相對來說較好，但也理所當然的記憶體處理會受限在編譯期間就要指定好。

而一些採用區塊結構（block）設計的語言則會使用 stack、heap 的機制來動態分配記憶體的各種操作。

其中 stack 資料結構是使用先進後出（LIFO，Last in first out）的資料處理方式，對於 JavaScript 來說就像是執行環境（Execution Context），其執行環境中的 stack 會儲存對應的 heap 內容，並且是可以動態改變的。

```js
var a = {age: 25};
var b = a;

console.log(b) // 變數 `b` 參考的記憶體與 `a` 相同 => {age: 25}

b = {age: 26} // 將 b 的參考重新指向位於 heap 中另一處的記憶體 => {age: 26}

console.log(a) // 此時 `a` 變數所參考的記憶體仍相同 => {age: 25}
```

上面例子我們可以看到兩個不同的變數參考自 heap 中同一個記憶體，後來又將其中一個變數參考指定到另一個記憶體當中。
那麼如果改變參考的都是同一個變數呢？

```js
var a = {age: 25}; // 將 `a` 變數參考指向 heap 中某個記憶體所儲存的物件 => {age: 25}

a = {age: 26}; // 糟了，是記憶體遺失（Memory leak）！
```
在最後一行程式碼中的重新賦值（reassign），將會使 a 的參考重新指向位於 heap 中另一處中的物件 => {age: 26}

原先用來儲存 `{age: 25}` 的記憶體沒有變數去參考，且我們也沒任何手段能再取得他的參考，因此這個記憶體就成了 Garbage 漂失在 heap 的宇宙當中。

那麼我們要如何處理這些宇宙垃圾呢？

# Memory leak 記憶體遺失
上述所提到的記憶體遺失（Memory leak）是一種程式設計中容易不慎發生的錯誤，不同一些程式語言沒有自動回收垃圾的機制（例如時常操控指針的 C 及 C++），身為使用 JavaScript 作為網頁開發的工程師們可以很大聲的說出：我們不需要親自處理這些垃圾！

為何我們不需要處理這些垃圾呢？原因是 JavaScript 的宿主，也就是瀏覽器（browser）有協助我們處理記憶體遺失的問題。（Node.js 表示：...）

- 查 node.js memory leak
- 兩邊的解決辦法

<!-- todo  -->














重點：JavaScript 的 deallocation 不是你決定的，是 browser 決定的

當然你可以自己把 reference 移除，可是你無法直接 deallocate 它，而他什麼時候、在什麼條件下會被 GC 回收基本上也不是由你決定的。


# 記憶體回收機制

談論到記憶體管理，問題通常出現在這個階段。最困難的工作是尋找「已不再被使用的記憶體配置空間」。通常程式要求開發者來決定程式裡面的這塊記憶體空間不再使用且釋放該空間回給系統。

高階的語言都有一個叫作垃圾回收器(garbage collector) 的軟體，他的工作是追蹤記憶體分配的使用情況，以便自動釋放一個不再使用的記憶體空間，還給系統。 但這個垃圾回收器只是「儘量」做到自動釋放記憶體空間，因為判斷記憶體空間是否要繼續使用，這件事是不可判定的（不能用演算法來解決）。

回收機制的演算法主要概念是參考(reference)概念。在記憶體管理的上下文中(context)，如果一個物件可以訪問到另一個物件(無論是隱式或顯式)，即稱為該物件參考另一個物件。例如：JavaScript 的物件都有參考該物件的原型(prototype) (隱式參考) 以及該物件的屬性值 (顯式參考)。

在原型鏈的情況下，物件的概念擴展到比普通的 JavasScript 物件更廣，這個概念還包含函數作用域 (function scopes)（或全局詞法作用域 (global lexical scope) ）


# 記憶體回收演算法：Reference counting

這是一個最務實的垃圾回收演算法。 這個演算法將原本「這個物件再也不會被使用」的廣泛定義縮減到「沒有其他任何物件參考它」。如果一個物件不在被任何物件參考，它將被視為可回收記憶體的垃圾。

限制：循環
當涉及到循環時有一個限制。在下面的例子中，創造兩個物件並相互參考，從而製作一個循環。當呼叫函式時，他們應該超出作用範圍，因此他們實際上是無用且可釋放。但垃圾回收參考計數演算法會認為，兩個物件都至少被參考一次，因此兩個都是不能被回收的。

```js
function f() {
  var o = {};
  var o2 = {};
  o.a = o2; // o 參考 o2
  o2.a = o; // o2 參考 o

  return 'azerty';
}

f();
```

# JavaScript 所採用的演算法：Mark-and Sweep

重點：大部分 GC 使用的是 Mark-and-Sweep 演算法

這個演算法將「這個物件再也不會被使用」的定義縮減到「這個物件不可到達」。

這個演算法假設一組物件，其名為「根 (roots)」（在 JavaScript 中，根(roots)是全局物件）。垃圾回收器定期從這些根開始，尋訪所有被根參考的物件與那些物件參考的物件。垃圾回收器會回收那些沒有被尋訪的到物件。

這個演算法比前一個演算法更好，因為一個不被任何物件參考的物件，一定無法從根被尋訪到。然而，一個無法從根被尋訪到的物件，不一定不被任何物件參考，可以在循環的例子中發現這件事。

截至2012年，所有現代瀏覽器都使用標記和清理的垃圾回收器。 在過去的幾年裡，JavaScript 垃圾回收領域的所有改進都是對這個演算法的實作與改進，但並未改進垃圾回收演算法本身，也沒有縮減垃圾的定義 「這個物件再也不會被使用」。

循環不再是一個問題
在上面的第一個範例中，函式呼叫返回後，那兩個物件不再被全局物件可以尋訪到的物件參考。 因此，它們將被垃圾回收器發現，視為不可達到的。

第二個範例也是一樣的。 一旦 div 和它的處理程序從根本上無法尋訪，它們都會被垃圾回收掉，儘管他們自身相互參考。

限制：物件必須明顯的不可達到
雖然有這個限制存在，但在實務卻很少發生。這也是幾乎沒有人關心這件事的原因。

# 參考文章
- [Garbage Collection wiki](https://zh.wikipedia.org/wiki/%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6_(%E8%A8%88%E7%AE%97%E6%A9%9F%E7%A7%91%E5%AD%B8))
- [Memory wiki](https://zh.wikipedia.org/zh-tw/%E9%9B%BB%E8%85%A6%E8%A8%98%E6%86%B6%E9%AB%94)
- [Memory Management MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Memory_Management)
- [基本算法 mark-and-sweep](https://liujiacai.net/blog/2018/06/15/garbage-collection-intro/#%E5%9F%BA%E6%9C%AC%E7%AE%97%E6%B3%95-mark-and-sweep)
- [garbage-collection](https://zh.javascript.info/garbage-collection)
- [JavaScript 内存泄漏教程](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
- [JavaScript 内存机制](https://juejin.im/post/5b10ba336fb9a01e66164346)
- [How JavaScript works: memory management + how to handle 4 common memory leaks](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)
- [JavaScript’s Memory Model](https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239)
- [JS Demystified 04 — Execution Context](https://codeburst.io/js-demystified-04-execution-context-97dea52c8ac6)
- [Day00：V8 bytecode 系列文介紹](https://www.coderbridge.com/@aszx87410/a5279d9298ab4e75bf75c75a4f391e78)