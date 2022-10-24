---
title: 【概念ノ章】測試價值：為什麼我需要測試
date: 2022-09-20 20:55:16
tags:
- [前端]
- [Vue.js]
- [Vitest]
- [Vue Test Utils]
- [Unit Test]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" alt="vitest-logo" src='/images/vitest-logo.svg' width='200px' height='200px' />
</div>

# 本文序

本文將從實作測試的過程中開始，使讀者逐步瞭解基本的測試大概包含了哪些環節，並從中理解到測試工具的好處以及寫了測試後開發的過程或將來能獲得什麼樣的價值。

<!-- more -->

---

# 測試

要加入測試前首先我們要瞭解到測試的本質究竟是什麼。

測試簡單的來說主要就是藉由操控受測物（SUT, System Under Test），觀察由受測物產生的最終狀態是否如我們所預期的樣子：

![https://ithelp.ithome.com.tw/upload/images/20220920/201190625aQs9UAQfn.png](https://ithelp.ithome.com.tw/upload/images/20220920/201190625aQs9UAQfn.png)

若最終狀態符合我們的預期，對於開發者的含義來說，就是受測物符合了我們的期待。

但這點好處看似沒有做「測試」的必要，畢竟我們平時開發能驗收完成不就是符合了規格書的期待嗎？

因此為了能夠更加體會測試背後的價值，我們接下來將實際做一個測試工具來來檢驗我們自己所寫的函式。

---

首先，情境假設在專案中有一處邏輯判斷需要檢測傳進來資料的是否為數值（Numeric），而傳進來的資料可能有 `1`, `null` , `'100'` , `NaN` 等。

我們希望當 `1` 和 `'100'` 時，該判斷應該要為 `true`，而 `null` 與 `NaN` 則是要為 `false`。

接下來的目標我們要做的就是：

1. 製作一個簡易的測試工具
2. 寫測試案例
3. 寫受測程式碼的實作

## 簡易的測試工具

首先規劃一下工具我最後希望用起來像是這個樣子：

`expect(受測物).toBe(預期狀態)`
- 回傳 `true` 表示測試成功 （即為最終狀態與預期狀態相同）
- 回傳 `false` 表示測試失敗 （即為最終狀態與預期狀態不同），然後加上 error 提示預期狀態應該要是什麼，最終狀態目前是什麼。

接著按照上面的設想，先定義了一個宣告函式 `expect`，參數則是預計輸入受測物（`input`）與：

```js
const expect = (input) => {
  // ...
}
```

再來工具本身呼叫時需回傳了一個叫做 `toBe` 的驗證方法，該驗證方法的參數為預期目標（`expected`）

```js
const expect = (input) => {
    const toBe = (expected) => {}
    return {
        toBe
    }
}
```

接著設計該驗證的方法，使其能夠回應測試的結果：

```js
const expect = (input) => {
    const toBe = (expected) => input === expected
    return {
        toBe
    }
}
```

現在我們透過網頁瀏覽器的 devtool console 控制台，就可以透過該測試工具做簡易的測試案例了
```js
const expect = (input) => {
    const toBe = (expected) => input === expected
    return {
        toBe
    }
}
expect(1 === 1).toBe(true)
expect(2 !== 1).toBe(true)
```

但我們希望他能夠在測試案例失敗的時候回應一下當下預期與結果的狀況，後續我們才能針對紀錄的結果做修正。因此我們再修改一下測試方法：

```js
const expect = (input) => {
    const handleOnError = (result, expected) => {
        console.error(`測試失敗：預期應該為 ${expected}，結果現在為 ${result}`)
        return false
    }
    const toBe = (expected) => input === expected ? true : handleOnError(input, expected)
    return {
        toBe
    }
}
```

再執行一個故意寫錯的測試案例：
```js
expect(2 === 1).toBe(true)
```
![https://ithelp.ithome.com.tw/upload/images/20220920/201190627ww12qoxyP.png](https://ithelp.ithome.com.tw/upload/images/20220920/201190627ww12qoxyP.png)

現在可以看到當測試案例發生錯誤的時候，除了會回傳測試結果之外，還會多個錯誤提醒目前錯誤的原因了！


## 寫測試案例

在完成測試工具後，現在我們要來寫測試案例，首先我們先寫一個還沒有寫實作部分的判斷函式（`isNumeric`）：

```js
const isNumeric = (val) => {}
```

接著按照題目所設定的條件，來撰寫測試案例：

> 題目設定：
> 當 `1` 和 `'100'` 時，該判斷應該要為 `true`，
> 而 `null` 與 `NaN` 則是要為 `false`。

```js
const isNumeric = (val) => {}

expect(isNumeric(1)).toBe(true)
expect(isNumeric('100')).toBe(true)
expect(isNumeric(null)).toBe(false)
expect(isNumeric(NaN)).toBe(false)
```

此時執行後會發現會發現四個案例都報錯，因為目前我們還沒撰寫 `isNumeric` 的判斷實作，但到這一步測試案例就已經算是寫好了，因為我們的目的是要寫對的測試案例，讓實作去符合。

## 寫受測程式碼的實作

完成測試案例後，我們將要來寫測試程式碼的實作部分（這裡參考了 [Angular 4.3](https://github.com/angular/angular/blob/4.3.x/packages/common/src/pipes/number_pipe.ts#L172)實作版本）：

```js
const isNumeric = (value) => !isNaN(value - parseFloat(value))
```

最後，將整個測試與實作合併起來就會像這樣子：

```js
// 測試工具程式碼部分
const expect = (input) => {
    const handleOnError = (result, expected) => {
        console.error(`測試失敗：預期應該為 ${expected}，結果現在為 ${result}`)
        return false
    }
    const toBe = (expected) => input === expected ? true : handleOnError(input, expected)
    return {
        toBe
    }
}
// 實作程式碼部分
const isNumeric = (value) => !isNaN(value - parseFloat(value))

// 測試案例部分
expect(isNumeric(1)).toBe(true) // true，即為通過測試
expect(isNumeric('100')).toBe(true) // true，即為通過測試
expect(isNumeric(null)).toBe(false) // true，即為通過測試
expect(isNumeric(NaN)).toBe(false) // true，即為通過測試
```

完成！現在已經不會顯示測試失敗的訊息了，也就表示 `isNumeric` 方法符合我們的預期囉。

而現在假使我想使實作程式碼的部分更加的完善，只要增加合適的測試案例進去就可以增添受測物本身的信賴與穩定度：

```js
expect(isNumeric(1)).toBe(true)
expect(isNumeric(1.123)).toBe(true)
expect(isNumeric(0xFFF)).toBe(true)
expect(isNumeric('100')).toBe(true)
expect(isNumeric(undefined)).toBe(false)
expect(isNumeric(null)).toBe(false)
expect(isNumeric(NaN)).toBe(false)
```

甚至將來改寫實作（`isNumeric`）的時候，既有的測試內容就會提醒你是否違反了之前所寫的測試案例。

# 測試工具

經過上方手刻測試工具後，讀者應該很有感觸，那就是實作測試工具中的驗證其實不太容易，假設今天我想比對的是兩個物件是否結構上相等，就還得自己再生出一個測試驗證方法來。除此之外還有像是測試程式碼的錯誤訊息在不同的情境下可能要更詳細列出比對的值，甚至是測試案例的描述⋯⋯等等功能。

而拜開源生態所賜，現在我們只需要在開發階段中針對需要的測試類型來安裝我們所需要的測試框架與工具即可，基本上測試中所需要的東西工具都幫你準備好了，我們只需要學會如何準備測試後就能享受到測試價值的部分！

# 測試價值

測試的價值主要可以分為兩種類型：一種是由測試本身協助的效果，另一部分則是寫測試過程中所獲得的部分。

## 測試本身

以我們在專案中實際會遇到的例子來說，有時候遇到有依賴關係的邏輯時，最怕的就是改 A 壞 B，而在這一部分測試做得非常的好，在測試案例合適且足夠的情況下，他就像是一名守門員一樣時時刻刻盯著你，若有錯誤的情況下也會第一時間回報給你，省去事後發生錯誤所產生的時間浪費。

另一種情況則是隱性規則的部分，通常來至於沒有規格書或規格書來不及更新的情況下所產生的，這一類隱性規則在開發當下較為無感，通常是事後有需要維護時會遇到，在沒有合適的註解情況下很難以釐清程式碼段落中的特別之處，究竟是屬於規則的一部分，還是單純是當時開發人員撰寫錯誤。所以某方面來說將特殊規則納入測試當中也可以起到專案領域知識的傳承作用。

而有關於提早發現錯誤的必要性，在《軟體開發實務指南 2版》（Steve McConnell 著）一書中有提及，*檢測到缺陷的時間與修復成本**在不同階段**中的影響差別甚巨*。畢竟一個功能上線之後才發現有錯誤，除了造成時間上的浪費之外，生產力也大大地受到影響，如果這些錯誤能在開發階段就被發現那會是一件好事。

## 思考與寫測試的過程

除了測試本身所能起到主動防禦的功用之外，寫測試的過程中其實也能帶來一些好處。

以《可測試的 JavaScript》（Mark Ethan Trostler 著）一書中所提到的概念與我自身經驗作延伸：一個程式碼要能夠可測試，基本上就意味著程式碼的耦合受到了控制，因此程式碼的複雜度也就會越來越低，而複雜度低了之後，測試程式碼也就會越容易寫，形成正向的循環。

而在有可測試的程式碼某方面來說可維護性也越高，我們將更願意試著去改寫而不是整段丟棄；甚至最後達到可閱讀性也越來越好的境界，我們在開發與除錯的過程中也將越來越容易。

當然，價值的部分會依據專案的重要性不同而產生變化，但究竟加入測試合適的時機是什麼時候呢？我們明天繼續來探究這部分。

