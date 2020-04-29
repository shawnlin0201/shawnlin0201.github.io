---
title: JavaScript 深入理解 Call Stack
date: 2000-01-01 00:00:00
tags:
- [JavaScript]
categories: 
- [JavaScript]
- [JavaScript, 深入理解]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/JavaScript/JavaScript-logo.png' width='200px' height='200px' />
</div>

搞不清楚函式處理先後順序嗎，你需要的是一起來深入理解

呼叫堆疊（Call Stack）！

<!-- more-->

# Call Stack
呼叫堆疊（Call Stack）顧名思義，其結構是一個堆疊（Stack），而堆疊資料結構特色就是後入先出（LIFO，Last in First out）。

已 JavaScript 陣列來說就相當於對於一個陣列執行 `push` 塞入一個值後再 `pop` 出去。

```js
let arr = [1, 2]

arr.push(3)
console.log(arr) // [1, 2, 3]

arr.pop()
console.log(arr) // [1, 2]
```

而呼叫堆疊（Call Stack）就是透過這樣的機制處理 JavaScript 中的函式呼叫（call function）。

我們每呼叫一次函式也就會將此函式結構放入到呼叫堆疊當中，執行完畢就將其從呼叫堆疊移除。

```js
function func1 () {
  func2()
  console.log('func1')
}

function func2 () {
  console.log('func2')
}

console.log('func start')
func1()
console.log('func end')
```

在呼叫堆疊中：
- 初始化呼叫堆疊
> []

- 執行整段程式前會放入 `main` 函式，用意在於包裹主程式，因此也要進入呼叫堆疊  
> [main()]

- 首先遇到 `console.log('func start')`，將其放入堆疊  
> [main(), console.log('func start')]

- 執行 `console.log('func start')`，完成顯示 `func start` 後並將其從堆疊中移出  
> [main]

- 接著往下遇到 `func1()`，將其放入堆疊  
> [main(), func1()]

- 執行 `func1()`時，先遇到了 `func2()`，因此將其放入堆疊  
> [main(), func1(), func2()]

- 遵循 LIFO 原則，現在要先來執行 `func2()`，遇到 `console.log('func2')`，將其放入堆疊  
> [main(), func1(), func2(), console.log('func2')]

- 執行 `console.log('func2')`，完成顯示 `func2` 後並將其從堆疊中移出  
> [main(), func1(), func2()]

- 接著 `func2()` 內也沒其他要做的事情了，表示完成 `func2()` ，並將其從堆疊中移出  
> [main(), func1()]

- 回來 `func1()` 中繼續處理下一行，遇到 `console.log('func1')`，將其放入堆疊  
> [main(), func1(), console.log('func1')]

- 執行 `console.log('func1')`，完成顯示 `func1` 後並將其從堆疊中移出  
> [main(), func1()]

- 接著 `func1()` 內也沒其他要做的事情了，表示完成 `func1()` ，並將其從堆疊中移出  
> [main()]

- 處理完 `func1()` 後，回到原本執行的地方，於下一行遇到 `console.log('func end')`，將其放入堆疊  
> [main(), console.log('func end')]

- 執行 `console.log('func end')`，完成顯示 `func end` 後並將其從堆疊中移出  
> [main()]

- 最後終於整個主程式執行完畢，可以移除用來包裹主程式的 `main()` 函式了。  
>[]

基本上對於呼叫堆疊（Call Stack）本身，不提別的概念就是到這邊而已。

然而事情當然沒這麼簡單，因為有一群任務虎視眈眈的盯著主程式的結束……

後續詳見（Event Loop）一文。