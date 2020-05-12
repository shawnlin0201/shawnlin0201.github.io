---
title: 重新解構：無瑕的程式碼（Clean Code） Chapter 4 註解
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


- 註解如規定，規定如測試，但我們都知道測試寫太死就會對被測試的東西綁手綁腳，註解同樣。

- 身為 Library、Tool 或  Framework 作者更要避免無意義、規則型、干擾型註解。

<!-- # 函式名稱（naming）

解構函式的個項目：
- 函式語句
    - 語句類別
        - 輸出型
        - 輸入型
        - 指令型（command）
        - 查詢型（query）
    - 語句結構
        - 避免巢狀
        - 避免 switch
    - 語句脈絡
        - 越短越好
        - 由上而下的敘述
        - 一件目的（順便提到錯誤處裡就是一件事情，catch 後應該要無任何事情）
        - 無副作用
        - 結構化函式：一個進入點、一個離開點。
- 函式參數：
    - 零個參數：
    - 一個參數：
    - 兩個參數：有序、自然組合
    - 物件參數：解決多個參數的方法
    - 布林參數：超糟的
- 函式名稱：使用有描述能力的名稱
    - 一個參數：動詞名詞 -->