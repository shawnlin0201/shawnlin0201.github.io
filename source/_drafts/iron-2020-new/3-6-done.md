---
title: 【強化模型】3-6 瀏覽器中的回收機制
tags: 《透過認知模型認識 JavaScript》
---

到了第三章的尾聲，現在我們已經學了不少瀏覽器中有關於 JavaScript 的相關內容，然而在瀏覽器中，除了有可以讓 JavaScript 程式碼執行時的環境之外，其實還存在著一套 **垃圾回收機制（Garbage collection）** 來幫助我們管理記憶體。

---

在暸解要怎麼回收記憶體之前，我們先再一次來暸解 JavaScript 中的與記憶體有關模型。

## 執行環境與記憶體

第二章節中我們曾經陸陸續續地提到了記憶體位置的概念，而在那時也有提過當時的模型是經過簡化用以方便理解並且又盡可能的不失原有的概念。

因為不同的引擎背後解析時的相關實作又不盡相同，從而對於記憶體管理上可能也會有些許差異。

> 真的想瞭解到實作面，可參考各家瀏覽器會遵循的 [ECMA 文件](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-memory-model)。

從抽象過後的角度來看的話，則可以參考到執行環境時的模型中的 `Stack`、`Heap` 以及 `Queue`。

![](https://developer.mozilla.org/files/4617/default.svg)
> Stack, heap, queue MDN https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/EventLoop

而在這模型當中主要是講解 JavaScript 在執行時的環境，而執行面的部分我們稍後會再提到一遍，這裡我們所關心的是那些值到底跑到哪裡去了？

在 `Stack` 當中，所儲存的通常是有關於基本型別的資料，每次當韓式執行時所建立的函式上下文（Function Excution Context）中，當我們透過變數儲存基本型態的值時，就是保留在這個地方：

```js
function init(){
    var a = 'test' // 儲存於 Stack 當中
}

init()
```

而有關於 `Stack` 的特性就是當該函式執行完時，變數所存著的值也就會跟著被釋放，因此較不會有較不會有記憶體洩漏的情形發生。

> 若是透過閉包（closure）產生的值，則會以特殊的包裹器（wrapper）保留下來方便後續使用，有興趣的可以透過 Node.js 拆解 Bytecode 看看。

然而一些複雜類型（Non-primitive types）的值（如物件、陣列）等等則會透過 `Heap` 保留下來，而在這個區域當中彼此是獨立的個體，因此我們就會需要一個記憶體地址（memory address）來獲取它。

```js
var a = ['test'] // 儲存於 Heap 當中

a // ['test']，後續要尋找到該值必續透過記憶體位置來尋找
```

而在這種情況中，若沒有注意到記憶體地址的概念時，往往就會不小心造成原先指向舊值的記憶體位置連結替換成新的，造成舊的值再也存取不到的情況發生：

```js
var a = ['source A'] // 0x00 => undefined, 0x02 => ['source A']
var b =  ['source B'] // 0x01 => undefined, 0x03 => ['source B']

a = b // b 變成改存 0x02 => ['source A']

a // 0x02 ['source A']
b // 0x02 ['source A']

// 現在再也找不到原先儲存 ['source B'] 值的位置了
```

從上述的範例我們可以得知由於我們重新賦值 b 一個指向 a 的位置，而又原先 b 所儲存的記憶體地址沒有其他變數銜接，因此原先 b 所儲存的值就再也無法取得了，而這個飄散在 `Heap` 當中的 `['source B']` 的這種情況我們就稱為記憶體洩漏（Memory leak）。

但這種情況我們要怎麼將這個原先不用的記憶體給刪除呢？這時候我們就要來瞭解瀏覽器中的垃圾回收機制（Garage Collection，簡稱 GC）。

## 垃圾回收機制

在提到瀏覽器的 GC 之前，普遍的做法主要有以下兩種：

- 參考計算演算法（Reference counting）
- 標記掃除演算法（Mark-and-Sweep）

### 參考計算演算法（Reference counting）

在第一種參考計算演算法當中，所採去的作法就是去計算該記憶體有沒有被參考到，理論上很合理，因為沒被參考到的就會是垃圾，也解決了上面的問題。

```js
var a = ['source A']
var b =  ['source B']

a = b

// 現在 ['source B'] 值沒有被參考到了，因此最後會被掃除
```

然而卻有種例外會發生：

```js
function func() {
  var obj = {};
  var obj2 = {};
  obj.a = obj2;   // obj 參考 obj2
  obj2.a = obj;    // obj2 參考 obj
}

func();
```

這種情況就是所謂的循環參考，因為互相參考的情況下，所以變成最後雖然沒用到但是卻也無法刪除的窘境。

### 標記掃除演算法（Mark-and-Sweep）

第二種標記掃除演算法的概念是，當我從根（Root）物件下去一個一個座標記，並且遍歷所有的物件，直到確認所有路徑都走過之後，沒有達到過的物件即為垃圾。

而在瀏覽器當中，由於有個全域物件 `window`，因此只要從這邊開始一步一步掃除時，就可以達成上方所要做到的效果。

如此一來上面循環參考的窘境也就會被解決了。

```js
function func() {
  var obj = {};
  var obj2 = {};
  obj.a = obj2;   // obj 參考 obj2
  obj2.a = obj;    // obj2 參考 obj
}

func(); // 結束時釋放記憶體，最後發現 obj 與 obj2 沒被標記過，所以認為是不可到達之物件，因此最後刪除
```

而這樣的演算法也為大多數瀏覽器最終所實作的參考依據。

只是，瀏覽器到底是什麼時候會掃除這個問題並不是開發者所能決定的部分，因此最終還是得聽瀏覽器而命。

因此開發者能做的就是盡量減少大型資源產生記憶體洩漏的情況，至少可以減少在瀏覽器還沒執行垃圾回收時前的垃圾，以上就是瀏覽器中的垃圾回收機制（Garage Collection）。