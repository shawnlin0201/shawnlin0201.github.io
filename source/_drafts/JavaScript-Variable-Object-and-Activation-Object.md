---
title: JavaScript 深入淺出 Variable Object & Activation Object
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

理解變數物件（Variable Object，簡稱 VO）與活化物件（Activation Object）的概念對於理解作用域（Scope）、提升（Hoisting）、垃圾回收機制（Garbage collection）、閉包（Closure）與執行環境（Execution context）等等至關重要。

究竟變數物件到底指的是什麼？為何理解它會可以快速打通任督二脈？就讓我們一來看看它吧！

<!-- more -->

根據 ECMA [10.1.3 Variable Instantiation](https://www.ecma-international.org/archive/ecmascript/1999/TC39WG/990220-es2_func.pdf) 對於 Variable Object 的解釋：

> Every execution context has associated with it a variable object. 
> Variables and functions declared in the source text are added as properties of the variable object.
> For function, anonymous, and implementation-supplied code, parameters are added as properties of the variable object.



# 參考資料
- [10.1.3 Variable Instantiation](https://www.ecma-international.org/archive/ecmascript/1999/TC39WG/990220-es2_func.pdf)
- [變數物件(Variable Object)](https://github.com/SDLyu/JavaScript/blob/master/Core/Variable%20Object.md)
- [變數物件(Variable Object)](https://wiki.jikexueyuan.com/project/javascript-depth-understanding/variable-object.html)