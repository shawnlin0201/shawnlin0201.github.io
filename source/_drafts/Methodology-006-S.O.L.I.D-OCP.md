---
title: 程式設計心法 S.O.L.I.D 之開閉原則（OCP，Open-Close Principle）
date: 2020-01-01 00:00:00
tags:
- [w3HexSchool]
- [Methodology]
categories:
- [Methodology, S.O.L.I.D.]
---

# 開閉原則 Open-Close Principle

在 Agile Software Development 這本書中，對於開閉原則的描述為：

> *Software entities (class, modules, functions, etc.) should be open for extension, but closed for modification.*

意思為軟體實體應該對於擴充要**保持開放**，對於修改要**保持關閉**。

好比購買主機遊戲時，我們時常會看到一種含有 DLC（Downloadable content）擴充的販賣機制，這種機制的遊戲通常會有一個最主要的遊戲本體，另外加上一些遊戲擴充（例如新春版本、萬聖節版本）等等。

這一類遊戲便是開閉原則最好的例子，因為他們做到了只需要遊戲本體即可遊玩，並且額外的擴充（DLC）基本上並不會修改到原有的遊戲機制，而是增添了新的內容進去。

> 如 Nintendo Switch 中的《薩爾達：曠野之息》，即便沒有買遊戲擴充，你也還是能當個勇者、去冒險、煮料理、打倒魔王以及拯救公主。

另一個例子是每天吃早餐的時候，你可能固定會去特定一兩家店吃，並且固定都會點個黑胡椒鐵板麵。而店家力求向上，努力想新菜色以及新花樣來吸引客人，於是開放客人在黑胡椒鐵板麵上可以加蛋、加肉排等等。這也是一種開閉原則，你沒有加點蛋肉，你還是能吃到你的黑胡椒鐵板麵；加點了蛋肉，原本黑胡椒鐵板麵也不會走味。

回到主題，現在我們知道了開閉原則的概念了；但是，為何會需要開閉原則會受到許多工程師的青睞，開閉原則不就只是換個想法優化而已嗎？

<!--more-->

# 優勢

前面提到，遊戲與 DLC 之間的關係，DLC 是個額外擴充的內容，如果 DLC 會修改到原本的遊戲機制會發生什麼事情？





# 風險
過早最佳化（permature optimization）=>經驗、Rule of Three=>重構





# 參考資料

- [看到 code 寫成這樣我也是醉了，不如試試重構？](https://ithelp.ithome.com.tw/users/20102562/ironman/1338)
- [亂談軟體設計（2）：Open-Closed Principle](http://teddy-chen-tw.blogspot.com/2011/12/2.html)
- [開放封閉原則 Open-Closed Principle OCP](https://medium.com/@f40507777/%E9%96%8B%E6%94%BE%E5%B0%81%E9%96%89%E5%8E%9F%E5%89%87-open-closed-principle-31d61f9d37a5)