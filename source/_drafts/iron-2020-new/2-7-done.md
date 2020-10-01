---
title: 【驗證模型】2-7 「今晚，我想來點⋯⋯」動手做的餐點選擇器。
tags: 《透過認知模型認識 JavaScript》
---

## 實作餐點選擇器

在這個章節當中，我們在試著結合第二章節所學到的各種語法、技巧來實作一個選擇餐點所用的選擇器。

### 釐清問題

在透過程式進行開發之前最重要的步驟是釐清我們想要 **解決的問題** 以及定義出這個問題的 **解決辦法**。

而有關於這個餐點選擇器的故事是這樣的：

在我們家中有兩隻貓咪，一隻叫做橘橘、一隻叫做黑黑，每當下班的時候，總是要思考今天到底要餵什麼食物給他。

有關於飼料的部分，在我們家總共有杜格（乾飼料）、喜碗（乾飼料）、優格（乾飼料）、金罐（罐頭）、星球（罐頭）等等飼料，另外還有點心肉泥。

每個禮拜一到日的時候，我們會從乾乾或罐罐中隨機選擇一種飼料作為他們當日的主食，另外我們還會在禮拜三以及禮拜日的時候加上肉泥當作他們的點心。

而我們平常很難決定到底今天要餵什麼食物給他們，並且還要記得給予點心，你能做出功能提醒我今天要給他們吃什麼樣的食物嗎？

### 透過需求思考實作

若是實際的專案開發，中間勢必會有更多需要做的前置作業，但我們這邊僅先練習拆解實作的部分。

現在我們將採用前面提到過的 **由上而下的認知歷程** 來提升我們的開發流程體驗。

而現在我們將從最終的需求開始解決，因為對於程式的實作面來說，最後的結果，是許多程式運算結果所組合而成的，所以從最後吐出的結果來開始開發的話整個流程就會像是從 **由整體往細節** ，而這樣的開發方式就如同是由上而下的認知歷程概念的延伸。

接下來我們來看看這個故事的結尾中的需求。

經由上方故事中我們可以釐清出故事主角最後所希望的是是要計算出今天要給他們吃什麼食物，並且要記得禮拜三和禮拜日還要加上肉泥。

因此結果勢必為有個函式要吐出他們今天要吃什麼飼料以及判斷使否要加上點心。

```js
function getTodayCatFood() {
    // 實作細節

    return // 某種飼料加上是否要給予點心
}
getTodayCatFood()
```

這裡我們採用歸納進入點離開點的做法：

```js
function getTodayCatFood() {
    var result = '';

    // 判斷過程中決定他們要吃什麼

    return result
}
```

現在我們範圍縮小到了判斷的過程中要決定給予他們什麼食物，而我們判斷的依據依照故事情節來看最主要是以星期幾來分類，因此我們透過 `switch` 來定義流程以及透過 `new Date().getDay` 運算式來取得星期：

```js
function getTodayCatFood() {
    var result = '';

    switch(new Date().getDay()){
        case 1:
        case 2:
        case 4:
        case 5:
        case 6:
            result = // 只有隨機飼料
            break;
        case 0:
        case 3:
            result =// 隨機飼料加上肉泥
            break;
    }
    return result
}
```

現在我們顯然的需要做出一個運算出隨機飼料的功能，同樣地我們將其製作成一個函式來方便我們後續要重複時使用：

```js
function getRandomFood() {
    var result = ''

    // 隨機選取飼料的運算過程

    return result
}
```

而現在我們先透過陣列將我們所有的飼料列進去，接著就可以透過 `Math.random()` 的運算式來隨機選取陣列中的內容：

```js
function getRandomFood() {
    var result
    var totalFood = ['杜格','喜碗','優格','金罐','星球']
    var random = Math.floor(Math.random() * totalFood.length)
    
    result = totalFood[random]
    
    return result
}
getRandomFood()  // 隨機出現 '杜格'、'喜碗'、'優格'、'金罐'、'星球' 其中一個值
```

> 延伸閱讀：`Math.random()`
> 在 JavaScript 中有提供一些數學運算用的函式，我們可以透過 `Math` 這個物件來取得他們，而在這個物件中有幾個較常用到的函式為：
>
> - `Math.round()`：四捨五入
> - `Math.floor()`：依小數第一位無條件進位
> - `Math.ceil()`：依小數第一位無條件捨去
> - `Math.random()`：製造出一個介於 0 到 1（不包含 1）的小數

現在我們做完了隨機產生飼料的函式後，將它應用在整段程式當中就完成了我們的提醒程式：

```js
function getRandomFood() {
    var result
    var totalFood = ['杜格','喜碗','優格','金罐','星球']
    var random = Math.floor(Math.random() * totalFood.length)
    
    result = totalFood[random]
    
    return result
}

function getTodayCatFood() {
    var result = '';

    switch(new Date().getDay()){
        case 1:
        case 2:
        case 4:
        case 5:
        case 6:
            result = getRandomFood() // 只有隨機飼料
            break;
        case 0:
        case 3:
            result =getRandomFood() + ' 肉泥'// 隨機飼料加上肉泥
            break;
    }
    return result
}
getTodayCatFood()
```

現在我們已經解決了這個故事中的問題，但還有更多細節是我們可以做到的，比如今天我們由呼叫時決定要篩選哪些飼料時，我們就可以運用到重構中的轉移技巧：

```js
function getRandomFood(food) { // 轉移到函式參數
    var result
    var random = Math.floor(Math.random() * food.length)
    
    result = food[random]
    
    return result
}

function getTodayCatFood(food) {
    var result = '';

    switch(new Date().getDay()){
        case 1:
        case 2:
        case 4:
        case 5:
        case 6:
            result = getRandomFood(food)
            break;
        case 0:
        case 3:
            result = getRandomFood(food) + ' 肉泥' // 透過引數傳入
            break;
    }
    return result
}
getTodayCatFood(['杜格','喜碗','優格','金罐','星球']) // 透過引數傳入
```

接著我們透過 **還原變數** 技巧來調整隨機取食物這個函式：

```js
function getRandomFood(food) { // 轉移到函式參數
    var result
    var random = Math.floor(Math.random() * food.length)
    
    result = food[random]
    
    return result
}
```

將 `random` 變數還原：

```js
function getRandomFood(food) { // 轉移到函式參數
    var result

    result = food[Math.floor(Math.random() * food.length)]
    
    return result
}
```

將 `result` 變數還原：

```js
function getRandomFood(food) { // 轉移到函式參數
    return food[Math.floor(Math.random() * food.length)]
}
```

藉著將主程式中的 `getRandomFood` 還原成我們上面的結果：

```js
function getTodayCatFood(food) {
    var result = '';

    switch(new Date().getDay()){
        case 1:
        case 2:
        case 4:
        case 5:
        case 6:
            result = food[Math.floor(Math.random() * food.length)]
            break;
        case 0:
        case 3:
            result = food[Math.floor(Math.random() * food.length)] + ' 肉泥' // 透過引數傳入
            break;
    }
    return result
}
getTodayCatFood(['杜格','喜碗','優格','金罐','星球']) // 透過引數傳入
```

接著在把剛剛還原的部分再轉回變數，好讓我們輕易地了解那串是在運算什麼內容：

```js
function getTodayCatFood(food) {
    var result = '';
    var randomFood = food[Math.floor(Math.random() * food.length)]

    switch(new Date().getDay()){
        case 1:
        case 2:
        case 4:
        case 5:
        case 6:
            result = randomFood
            break;
        case 0:
        case 3:
            result = randomFood + ' 肉泥' // 透過引數傳入
            break;
    }
    return result
}
getTodayCatFood(['杜格','喜碗','優格','金罐','星球']) // 透過引數傳入
```

最後我們透過 **重新命名** 技巧來調整函式，因為顯然我們並不是只可以運算貓咪的食物了：

```js
function getRandomFoodByWeek(food) {
    var result = '';
    var randomFood = food[Math.floor(Math.random() * food.length)]

    switch(new Date().getDay()){
        case 1:
        case 2:
        case 4:
        case 5:
        case 6:
            result = randomFood
            break;
        case 0:
        case 3:
            result = randomFood + ' 肉泥' // 透過引數傳入
            break;
    }
    return result
}
getRandomFoodByWeek(['杜格','喜碗','優格','金罐','星球']) // 透過引數傳入
```

接下來你甚至還可以透過上面的做法拆解星期幾要給獎勵食物、獎勵的食物要替換成什麼等等有趣的功能進去。

另外，如果要避免更改的結果導致錯誤等等問題，此時你就會需要 **版本控制（version control）** 與 **測試（testing）** 的協助，這部分我將會在第五章中做更詳細的介紹。

以上就是結合了第二章節中的語法語概念來展示如何完成一個餐點選擇器的功能。

> 什麼？你說沒有畫面可以操作？

沒問題，接下來第三章節中，我們將透過介紹瀏覽器與 JavaScript 的關係，除了帶領你更加了解 JavaScript 之外，我們也會在第三章節的最後一部分來將這個功能透過瀏覽器賦予它視覺上的介面，使其更加的完整。