---
title: JavaScript 深入淺出 Execution Content（執行上下文）
date: 2000-01-01 00:00:00
tags:
- [w3HexSchool]
- [JavaScript]
categories: 
- [JavaScript]
- [JavaScript, 深入淺出]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/JavaScript/JavaScript-logo.png' width='200px' height='200px' />
</div>

# Execution Content
根據 [ECMA 262 8.3](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-execution-contexts) 的解釋，
執行環境是指追蹤執行時期所計算的程式碼， JavaScript 引擎（V8）是如何透過模組化來直譯（interpret）程式碼的情境。

https://pjchender.blogspot.com/2015/12/javascriptscope-chainouter-environment.html
http://notepad.yehyeh.net/Content/WebDesign/Javascript/ECMA/Core/JavaScriptCore.php#section8
https://dev.to/gemhar/execution-context-the-secret-life-of-functions-1bl1

而執行環境可分為兩種：
- 全域執行環境（Global Execution Context）
- 函式執行環境（Function Execution Context）

##
每當呼叫（invoke）函式時 JavaScript 引擎便會建立起一個執行環境（Execution context），而在 ，。
JavaScript 執行主程式時底層會建立起一個全域執行環境（global execution context）



執行環境裡面主要包含了
- 變數物件（Variable Object or Activation Object）
- `this`
- 作用域鏈（Scope Chain）

其中變數物件與作用域鏈的關聯而產生的概念也就是一般大家在提的作用域（Scope）

## Execution Context Phase
- 創造階段（creation phase）
- 執行中階段（executing phase）

### Creation Phase
- 建立全域物件（Global Object）或區域物件
- 建立 `this`
- 建立變數環境（Variable Environment）
- 初始化變數物件（Variable Object）：將每個變數物件中的每個變數值為 `undefined`，如果有宣告函式則將函式直接賦值到變數物件中。（詳見 提升 Hoisting）

### Excuting Phase
一行一行（line by line）的執行該執行環境的程式碼。

# 參考資料
- [ECMA 262 8.3Execution Contexts](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-execution-contexts)
- [ECMA-262 Javascript核心 譯文](http://notepad.yehyeh.net/Content/WebDesign/Javascript/ECMA/Core/JavaScriptCore.php#section8)
- [所有的函式都是閉包：談 JS 中的作用域與 Closure](https://blog.techbridge.cc/2018/12/08/javascript-closure/#scope)
- [你不可不知的 JavaScript 二三事#Day5：湯姆克魯斯與唐家霸王槍——變數的作用域(Scope) (1)](https://ithelp.ithome.com.tw/articles/10203387)
- [Execution Context & the Secret Life of Functions](https://dev.to/gemhar/execution-context-the-secret-life-of-functions-1bl1)