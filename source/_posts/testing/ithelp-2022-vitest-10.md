---
title: 【概念ノ章】測試脈絡－4. 測試案例中的 3A 模式
date: 2022-09-25 18:54:25
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

接續昨天的測試情境與測試案例章節後，我們大致上瞭解了測試情境與測試案例的基本架構要如何設立，而今天要提的部分則是關於測試案例執行流程與測試案例撰寫架構。

<!-- more -->

---

## 測試案例的 3A 模式

```js
describe('貓咪', () => {
    it('摸摸，應該會發出「呼嚕嚕」聲', () => {
        // ...
    })
    it('餵食，應該會發出「呼嚕嚕」聲', () => {
        // ...
    })
    it('拿玩具逗，應該會發出「呼嚕嚕」聲', () => {
        // ...
    })
    it('什麼都不做，應該推倒眼前看到的所有東西', () => {
        // ...
    })
})
```

當我們設立好測試情境與測試案例的敘述結構之後，要開始撰寫測試案例內部的實作時就可以利用所謂的 3A 模式來安排。

3A 模式主要是為（Arrange-Act-Assert）三個英文字的縮寫，而他們分別代表了：
- 準備（Arrange）：準備好受測目標需要的一切，包含依賴的隔離等
- 操作（Act）：操作受測物目標
- 斷言（Assert）：預期受測物的某個狀態是否為我們所預期

以上方第一項測試案例來套用 3A 模式的話就會像是：

```js
it('摸摸，應該會發出「呼嚕嚕」聲', () => {
    // Arrange: 準備好一隻貓
    const target = new Cat()

    // Act: 摸摸那隻貓咪
    target.touch()

    // Assert: 觀察那隻貓是否發出呼嚕嚕叫聲
    expect(target.speaking).toBe('呼嚕嚕')
})
```

那如果這時候你可能會想到每個測試案例都要準備一隻貓貓，對於測試案例來說就會一直不斷地去做「準備（Arrange）」這個行為，因此你可能會很直覺的這麼處理：

```js
describe('貓咪', () => {
    const target = new Cat()
    it('摸摸，應該會發出「呼嚕嚕」聲', () => {
        target.touch()
        expect(target.speaking).toBe('呼嚕嚕')
    })
    it('餵食，應該會發出「呼嚕嚕」聲', () => {
        target.feed('乾乾')
        expect(target.speaking).toBe('呼嚕嚕')
    })
    it('拿玩具逗，應該會發出「呼嚕嚕」聲', () => {
        target.play()
        expect(target.speaking).toBe('呼嚕嚕')
    })
})

```

但這樣的後果就是每個測試案例之間就會有關聯了，比方貓貓其實摸太多下他也會覺得厭煩，從而導致測試失敗：

```js
describe('貓咪', () => {
    const target = new Cat()
    it('摸摸下巴，應該會發出「呼嚕嚕」聲', () => {
        target.touch()
        expect(target.speaking).toBe('呼嚕嚕')
    })
    it('再摸一次下巴，應該會發出「呼嚕嚕」聲', () => {
        target.touch()
        expect(target.speaking).toBe('呼嚕嚕')
    })
    it('再摸一次下巴，應該會發出「呼嚕嚕」聲', () => {
        target.touch()
        expect(target.speaking).toBe('呼嚕嚕') // 預期呼嚕嚕，結果貓咪生氣了
    })
})

```

而要寫好測試案例的其中幾個概念就是要盡量讓每個測試案例之間「不受順序影響測試結果」與「保持獨立」。

因此大多數的「測試環境」的工具都會提供類似相關的 API 來協助處理測試開始前的「Setup」與結束後的「Teardown」環節。

```js
describe('貓咪', () => {
    const target = new Cat()
    beforeEach(() => {
        // 每個測試案例開始前要做的事情
        target.init() // 初始化貓貓的各種狀態
    })
    afterEach(() => {
        // 每個測試案例結束後要做的事情
    })
    it('摸摸，應該會發出「呼嚕嚕」聲', () => {
        target.touch() // 這時候的 target 已經是經過 init() 的版本了
        expect(target.speaking).toBe('呼嚕嚕')
    })
    it('餵食，應該會發出「呼嚕嚕」聲', () => {
        target.feed('乾乾') // 這時候的 target 已經是經過 init() 的版本了
        expect(target.speaking).toBe('呼嚕嚕')
    })
    it('拿玩具逗，應該會發出「呼嚕嚕」聲', () => {
        target.play() // 這時候的 target 已經是經過 init() 的版本了
        expect(target.speaking).toBe('呼嚕嚕')
    })
})
```

綜合上述 3A 與處理 Setup & Teardown 的觀念，之後再寫測試案例時，我們可以先從基礎的 3A 模式開始撰寫，而到有需要處理重複的事前準備（Setup）與後續清理時（Teardown），就可以藉由工具來替我們統一處理。後續環節也會提到如何透過工廠模式或模擬物件來快速創造我們要的測試內容。

相信看到這邊讀者應該會發現，測試的基本概念其實不難懂，而在瞭解測試的概念後，剩下的就是把概念轉換為測試工具可讀懂測試程式碼就好了，而明天就要開始講解有關測試程式碼的部分！




