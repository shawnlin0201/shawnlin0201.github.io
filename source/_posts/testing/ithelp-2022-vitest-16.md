---
title: 【試験ノ章】第一個測驗：測試情境案例、Setup & Teardown 與 Matchers
date: 2022-10-01 23:24:15
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
回顧目前語法章節的部分我們已經學了有關於：
- 測試案例與情境：`describe`、`it`
- 測試案例中 Setup 與 Teardown 環節有關的語法： `beforeEach`、`beforeAll`、`afterEach` 與 `beforeAll`
- 測試斷言中的各種 `Matchers` 與快照

而基於上述幾個語法加上先前的測試概念，我們已經滿足了撰寫基本單元測試的條件了！所以現在是⋯⋯測驗時間！！！

在測驗章節我們主要流程將會是：
- 閱讀故事與題目，釐清需求與規則。
- 規劃測試情境與測試案例，並列好描述的部分。
- 撰寫測試程式碼（Testing Code），並執行測試時得到測試案例失敗。
- 按照題目要求完成產品程式碼（Production Code）
- 再次執行測試確保測試通過。

而本文撰寫測試程式碼與產品程式碼的環節我也會提供 demo 的範例供參考與撰寫思路，那麼就讓我們開始吧！

<!-- more -->

## 故事

「柯基」在完成上次提到的[任務](https://ithelp.ithome.com.tw/articles/10299474)後，中午下樓到公司附近覓食時，遇到了一隻橘色虎斑貓「阿橘」，然而阿橘正面有難色地看著眼前的機台一直噴出好多貓食乾乾⋯⋯柯基決定上前瞭解狀況。

「你好我是柯基，怎麼這台機器一直噴出乾乾啊！？」柯基驚訝地看著眼前的機台。

「我是乾乾銀行的開發人員，眼前這台是『自動乾乾提存機』」阿橘嘆了口氣說「這台機器主要是供應平常貓貓們在日常被飼主餵太多乾乾，但又不想一次吃完的時候可以把乾乾存到這裡面來。」

「可是⋯⋯」阿橘話還沒說完，機器又噴出更多乾乾把阿橘埋起來了。「⋯⋯這台機器程式不知道為什麼一直有問題，所以我們打算重新來處理他。」

「當然，如果你協助我們的話就給你一年份的乾乾」阿橘邊說邊咬了一口嘴邊的乾乾，然後遞了一張規格書給柯基。柯基直接原地傻眼了幾秒後緩緩說道。



「那⋯⋯乾乾可以換成狗狗可食用的嗎？」

## 題目

自動乾乾提存機軟體控制主要是由一個 `FoodBank` 類別在負責處理，其中核心的功能主要有「開戶」、「存款」和「提款」：

而規格對上述程式功能介面上有一些限制要求：
- 資料規格
  - 銀行紀錄格式為：
    ```js
    safe: {
      name: { 
            food: <number>
        }
    }
    ```
  - `name`：開戶者名稱，預設資料類型為 `string`。
  - `food`：「乾乾」單位，預設資料類型為 `number`。
- 開戶
  - 需傳入 `name`，並檢查是否開過戶頭，若有開過戶頭則回應 `您已開過戶頭囉`。
  - 交易成功，在 Safe 物件中建立用戶資料。
  - 開戶完成後該方法要回應 `開戶完成`。
- 存款
  - 需傳入 `name`，若查詢不到戶頭則交易失敗，該方法要回應 `查詢不到該用戶，請重新確認。`
  - 交易成功，將傳入 `food` 存入 Safe 物件中
  - 交易完成後該方法要回應 `存款完成，戶頭目前餘額 {該用戶乾乾數量}`
- 提款
  - 需傳入 `name`，若查詢不到戶頭則交易失敗，該方法要回應 `查詢不到該用戶，請重新確認。`
  - 若傳入的 `food` 要求超過該用戶戶頭則交易失敗，該方法要回應 `餘額不足，你帳戶目前餘額為 {該用戶乾乾數量}`
  - 交易成功，從 Safe 物件中扣除該用戶的 `food`
  - 交易完成後該方法要回應 `提款完成，戶頭目前餘額 {該用戶乾乾數量}`

> 看到這裡，若有想法的讀者可以先按照自己的方式來寫測試哩，若沒想法或遇到困難時也可以參考底下 demo 的部分。
> 本文可利用[系列文專用專案](https://ithelp.ithome.com.tw/articles/10292537)來一邊學習，幫你準備好測試所需要的環境，快來安裝吧！

# demo

## 撰寫測試脈絡

依據之前測試脈絡章節提到的部分，規劃測試時要考量到有以下內容。
- 決定測試類型工具：本系列文主要專注在 Vitest 的單元測試
- 決定測試情境與測試案例
- 思考測試案例路徑
- 撰寫測試案例 3A

### 決定情境與測試案例

> 使用系列文專用檔案的讀者 demo 用的檔案位置如下：
> 測試程式碼 `/src/practice/practice-04.spec.js`
> 產品程式碼 `/src/practice/practice-04.js`

首先建立好測試程式碼並準備好產品程式碼檔案與基本介面：
```js
import { describe, it} from 'vitest'
import { FoodBank } from './FoodBank.js'
// ....
```
```js
export class FoodBank {
  constructor() {
    this.safe = {}
  }
  openAccount(name){}
  deposit(name, food){}
  withdraw(name, food){}
}
```

與接下來開始撰寫測試碼情境，這邊主要依據 FoodBank 提供的方法來拆分：
```js
describe('openAccount()', () => {
  // ...
})
describe('deposit()', () => {
  // ...
})
describe('withdraw()', () => {
  // ...
})
```

再來依據規格與設計思考要測試案例與案例路徑的部分：
```js
describe('開戶', () => {
  // happy path
  it(`開戶完成，Safe 物件中應有用戶資訊' `, () => {})
  it(`開戶完成，應該回應 '開戶完成' `, () => {})
  // sad path
  it(`若開過戶頭，應該回應 '您已開過戶頭囉。' `, () => {})
  // ... 請自由發揮
})
describe('存款', () => {
  // happy path
  it(`存入 100 單位，Safe 物件中該用戶的乾乾應為 100 單位`, () => {})
  it(`交易完成，應該回應 '存款完成，戶頭目前餘額 {該用戶乾乾數量}' `, () => {})
  // sad path
  it(`若查詢不到戶頭，應該回應 '查詢不到該用戶，請重新確認。' `, () => {})
  // ... 請自由發揮
})
describe('提款', () => {
  // happy path
  it(`提款 100 單位，Safe 物件中該用戶的乾乾應減少 100 單位`, () => {})
  it(`交易完成，應該回應 '存款完成，戶頭目前餘額 {該用戶乾乾數量}' `, () => {})
  // sad path
  it(`若查詢不到戶頭，應該回應 '查詢不到該用戶，請重新確認。' `, () => {})
  it(`餘額不足，應該回應 '餘額不足，你帳戶目前餘額為 {該用戶乾乾數量}' `, () => {})
  // ... 請自由發揮
})
```

接著撰寫測試案例 3A 部分。

開戶情境：
```js
describe('開戶', () => {
  // happy path
  it(`開戶完成，Safe 物件中應有用戶資訊' `, () => {
    // Arrange
    const bank = new FoodBank()
    // Act
    bank.openAccount('Orange')
    // Assertion
    expect(bank.safe).toEqual({ Orange: { food: 0 } })
  })
  it(`開戶完成，應該回應 '開戶完成。' `, () => {
    // Arrange
    const bank = new FoodBank()
    // Assertion
    expect(bank.openAccount('Orange')).toBe('開戶完成。')
  })
  // sad path
  it(`若開過戶頭，應該回應 '您已開過戶頭囉。' `, () => {
    // Arrange
    const bank = new FoodBank()
    // Act
    bank.openAccount('Orange')
    // Assertion
    expect(bank.openAccount('Orange')).toBe('您已開過戶頭囉。')
  })
  // ... 請自由發揮
})
```
存款情境：
```js
describe('存款', () => {
  // happy path
  it(`存入 100 單位，Safe 物件中該用戶的乾乾應為 100 單位`, () => {
    // Arrange
    const bank = new FoodBank()
    const user = 'Orange'
    // Act
    bank.openAccount(user)
    bank.deposit(user, 100)
    // Assertion
    expect(bank.safe[user]).toEqual({ food: 100 })
  })
  it(`交易完成，應該回應 '存款完成，戶頭目前餘額 {該用戶乾乾數量}' `, () => {
    // Arrange
    const bank = new FoodBank()
    const user = 'Orange'
    const food = 100
    // Act
    bank.openAccount(user)
    // Assertion
    expect(bank.deposit(user, food)).toEqual(`存款完成，戶頭目前餘額 ${food}`)
  })
  // sad path
  it(`若查詢不到戶頭，應該回應 '查詢不到該用戶，請重新確認。' `, () => {
    // Arrange
    const bank = new FoodBank()
    const user = 'Orange'
    const food = 100

    // Assertion
    expect(bank.deposit(user, food)).toEqual(`查詢不到該用戶，請重新確認。`)
  })
  // ... 請自由發揮
})
```
提款部分：
```js
describe('提款', () => {
  // happy path
  it(`提款 100 單位，Safe 物件中該用戶的乾乾應減少 100 單位`, () => {
    const bank = new FoodBank()
    const user = 'Orange'
    // Act
    bank.openAccount(user)
    bank.deposit(user, 100)
    bank.withdraw(user, 100)
    // Assertion
    expect(bank.safe[user]).toEqual({ food: 0 })
  })
  it(`交易完成，應該回應 '存款完成，戶頭目前餘額 {該用戶乾乾數量}' `, () => {
    const bank = new FoodBank()
    const user = 'Orange'
    // Act
    bank.openAccount(user)
    bank.deposit(user, 100)

    // Assertion
    expect(bank.withdraw(user, 100)).toBe('存款完成，戶頭目前餘額 0')
  })
  // sad path
  it(`若查詢不到戶頭，應該回應 '查詢不到該用戶，請重新確認。' `, () => {
    const bank = new FoodBank()
    const user = 'Orange'

    // Assertion
    expect(bank.withdraw(user, 100)).toBe('查詢不到該用戶，請重新確認。')
  })
  it(`餘額不足，應該回應 '餘額不足，你帳戶目前餘額為 {該用戶乾乾數量}' `, () => {
    const bank = new FoodBank()
    const user = 'Orange'
    // Act
    bank.openAccount(user)

    // Assertion
    expect(bank.withdraw(user, 100)).toBe('餘額不足，你帳戶目前餘額為 0')
  })
  // ... 請自由發揮
})
```

接著執行測試，確認測試案例應該是錯誤之後，接著利用 `only` 將測試案例鎖定在各個情境下，一邊開發產品程式碼，這樣就不會受到其他測試情境底下的案例錯誤干擾開發過程：

```js
describe.only('開戶', () => {
  // 專注在這邊的開發
})
describe('存款', () => {
  // 先忽略這部分測試案例
})
describe('提款', () => {
  // 先忽略這部分測試案例
})
```

最後按著平常開發流程去補齊產品程式碼，完成一部分的情境就透過 `.only`, `.skip` 等輔助 API，來觀察測試結果：

```js
export class FoodBank {
  constructor() {
    this.safe = {}
  }

  openAccount(name) {
    if (this.safe[name]) return '您已開過戶頭囉。'
    this.safe[name] = { food: 0 }
    return `開戶完成。`
  }

  deposit(name, food) {
    if (!this.safe[name]) return '查詢不到該用戶，請重新確認。'
    this.safe[name].food += food
    return `存款完成，戶頭目前餘額 ${this.safe[name].food}`
  }

  withdraw(name, food) {
    if (!this.safe[name]) return '查詢不到該用戶，請重新確認。'

    if (this.safe[name].food >= food) {
      this.safe[name].food -= food
      return `存款完成，戶頭目前餘額 ${this.safe[name].food}`
    } else {
      return `餘額不足，你帳戶目前餘額為 ${this.safe[name].food}`
    }
  }
}
```

此時一邊開發的過程應該會看到錯誤的部分逐漸陸續通過，直到最後將所有 `.only`, `.skip` 等輔助 API 拔除後依然都是通過的情況，就能確保你的開發既符合測試，後續測試也將繼續保護你的產品程式碼！

而這個開發過程也就是所謂的「測試驅動開發（TDD, Test-driven development）」中的「紅燈開發（Red-Green-Refactor）」，很有趣吧！

後續進階章節將會補上有關於 「測試驅動開發（TDD, Test-driven development）」更為詳細的介紹，而明天我們將來繼續學習其餘語法的部分，讓我們能夠測試更多的東西！

> 題外話：今天文章寫到最後時已經大概十一點多了，電腦突然一個卡死，差點嚇爆⋯⋯