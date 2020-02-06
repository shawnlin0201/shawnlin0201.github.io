---
title: 程式設計心法 S.O.L.I.D 之單一職責原則（SRP，Single Responsibility Principle）
date: 2020-99-01 00:00:00
tags:
- [w3HexSchool]
- [Methodology]
categories:
- [Methodology, S.O.L.I.D.]
---

# 單一職責原則 Single Responsibility Principle
在 Agile Software Development 這本書中，單一職責原則的描述為：

> *A class should have only one reason to change.*

意思即為一個類（或物件）當中應該**只有一個理由來改變**。

也就是說當我們在撰寫程式時，我們應該讓各運作單位保持單純，不要讓某個模組、函式一次負責多種功能。

例如我們透過建構函式創造了一個人物物件，裡面帶有兩個簡單的功能，用來取得與設置人物物件的資料：

```js
function Person (name, age) {
    this.name = name
    this.age = age
}

Person.prototype.getInfo = function () {
    return {name: this.name, age: this.age}
}

Person.prototype.setInfo = function (name, age) {
    this.name = name || this.name
    this.age = age || this.age
}

let Shawn = new Person('Shawn', 26)
```

經由 `new` 初始化後，我們便可以使用裡面的各種函式：

```js
Shawn.getInfo()  // {name:'Shawn', age: 26}
Shawn.setInfo('Shawn Lin', 26)
Shawn.getInfo()  // {name:'Shawn Lin', age: 26}
```

透過範例可以看見，在使用 `getInfo` 時可以很直覺的取出所有資料，但是在使用 `setInfo` 時我們可能有時只是要傳送 `name` 或 `age` 其中一個。

因此我們將 `setInfo` 拆解成 `setName` 與 `setAge` 兩個部分：

```js
Person.prototype.setName = function (name) {
    this.name = name || this.name
}

Person.prototype.setAge = function (age) {
    this.age = age || this.age
}
```

經由抽象拆解後，將來我要設定名稱就使用 `setName`，設定年齡就只使用 `setAge`，使得使用上更加的方便；另外往後若有錯誤需要修改、維護、加強也會更容易找到修改的位置：

```js
Shawn.setName('Shawn Lin')
Shawn.setAge(26)
```

# 優勢
透過以上範例可以看出單一職責原則的優點在於將**功能職責劃分清楚**，該是哪個功能負責的就由誰來負責。

對於個人來說，遵守此原則時所帶來的**高內聚**（Cohesion）和**低耦合**（Coupling）特性，能**提升在開發除錯上的效率**，尤其在處理邏輯運作時，更容易釐清觀念、設計出好模式。

對於團隊來說，遵循單一職責原則所設計的程式，能夠增加程式碼的**易讀性**，讓後續維護的人員能夠更快理解整體的脈絡。

# 風險
遵守單一職責原則是把雙面刃，處裡妥當能帶來不少的效益，但若執行過頭可能也會帶來不少麻煩。

好比在劃分功能時，應該考量專案大小來決定劃分的粒度要多大，像是上方的 `setInfo` 拆解成 `setName` 與 `setAge` 是否有其必要性？

如果將每個步驟功能都拆解成一隻函式來處理，抽象到最後反而變成數量太多難以理解？像是抽象出來的函式最後根本沒有其他地方會用到？

這一類有關劃分的**責任分配（Responsibiltity  assignment）**的部分將會是單一職責原則中最大的難題。


<!--more-->



# 參考資料

- [看到 code 寫成這樣我也是醉了，不如試試重構？](https://ithelp.ithome.com.tw/users/20102562/ironman/1338)
- [深入理解JavaScript系列（6）：S.O.L.I.D五大原则之单一职责SRP](https://www.cnblogs.com/tomxu/archive/2012/01/06/2305513.html)
- [亂談軟體設計（3）：Single-Responsibility Principle](http://teddy-chen-tw.blogspot.com/2011/12/3.html)