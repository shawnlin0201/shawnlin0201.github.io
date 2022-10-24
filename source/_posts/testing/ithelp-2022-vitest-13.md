---
title: 【語法ノ章】Setup & Teardown：beforeAll, beforeEach, AfterAll & AfterEach
date: 2022-09-28 21:38:45
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

## 準備（Setup）與清理（Teardown）

經過了基本的測試情境與測試案例語法，加上簡單的斷言語法 `expect().toBe()` 就能夠測試許多簡單的東西了，然而在測試過程中有時會遇到大量重複的「前置操作」或是每次測試後「需要清理測試中的環境」，這時我們可以透過 `Vitest` 提供的 Setup & Teardown API 來處理：

<!-- more -->

- beforeEach：在每個測試案例執行前呼叫一次
- beforeAll：在所有測試案例執行前呼叫一次
- afterEach：在每個測試案例執行後呼叫一次
- afterAll：在所有測試案例執行後呼叫一次

```js
beforeEach(() => {
    // 針對測試案例重新初始化
    initTestEnv()
})
```

## Setup & Teardown API 的範疇

Setup & Teardown API 「所有」的定義是根據當下的範疇（context）來決定，除了測試檔案本身之外，使用 `describe` 來定義測試情境也會形成一個 `context`，因此假如測試情境有巢狀的情況如下：

```js
const history = []
describe('父層情境', () => {
  beforeAll(() => {
    history.push('beforeAll - 父層情境')
  })
  beforeEach(() => {
    history.push('beforeEach - 父層情境')
  })
  afterAll(() => {
    history.push('afterAll - 父層情境')
  })
  afterEach(() => {
    history.push('afterEach - 父層情境')
  })
  describe('子層情境 A', () => {
    beforeAll(() => {
      history.push('beforeAll - 子層情境 A')
    })
    beforeEach(() => {
      history.push('beforeEach - 子層情境 A')
    })
    afterAll(() => {
      history.push('afterAll - 子層情境 A')
    })
    afterEach(() => {
      history.push('afterEach - 子層情境 A')
    })
    it('案例 1', () => {
      history.push('子層情境 A 案例 1')
    })
    it('案例 2', () => {
      history.push('子層情境 A 案例 2')
    })
  })
  describe('子層情境 B', () => {
    beforeAll(() => {
      history.push('beforeAll - 子層情境 B')
    })
    beforeEach(() => {
      history.push('beforeEach - 子層情境 B')
    })
    afterAll(() => {
      history.push('afterAll - 子層情境 B')
    })
    afterEach(() => {
      history.push('afterEach - 子層情境 B')
    })
    it('案例 1', () => {
      history.push('子層情境 B 案例 1')
    })
    it('案例 2', () => {
      history.push('子層情境 B 案例 2')
    })
  })
})
```

此時將透過 `console.log(history)` 查看並歸納整理就能得到以下結果：

```
--- 進入測試程式碼本身的 Context
--- 進入父層情境的 Context
beforeAll - 父層情境
--- 進入子層情境 A 的 Context
beforeAll - 子層情境 A
beforeEach - 父層情境
beforeEach - 子層情境 A
子層情境 A 案例 1 // 執行 情境 A 案例 1 的時間點
afterEach - 子層情境 A
afterEach - 父層情境
beforeEach - 父層情境
beforeEach - 子層情境 A
子層情境 A 案例 2 // 執行 情境 A 案例 2 的時間點
afterEach - 子層情境 A
afterEach - 父層情境
afterAll - 子層情境 A
--- 離開子層情境 A 的 Context

--- 進入子層情境 B 的 Context
beforeAll - 子層情境 B
beforeEach - 父層情境
beforeEach - 子層情境 B
子層情境 B 案例 1 // 執行 情境 B 案例 1 的時間點
afterEach - 子層情境 B
afterEach - 父層情境
beforeEach - 父層情境
beforeEach - 子層情境 B
子層情境 B 案例 2 // 執行 情境 B 案例 2 的時間點
afterEach - 子層情境 B
afterEach - 父層情境
afterAll - 子層情境 B
--- 離開子層情境 B 的 Context
afterAll - 父層情境
--- 離開父層情境的 Context
--- 離開測試程式碼本身的 Context
```

因此我們在使用這類 API 時要注意當下 context 所包含的範圍。

## 避免誤區：在 expect 後做清掃處理

除了上面的用法，有時候你可能會認為既然要清掃，那我何不在斷言後處理就好呢：

```js
describe('', () => {
    it('', () => {
        expect().toBe()
        // 在這裡做清除
        resetTestingEnv()
    })
})
```

這麼做當你在測試案例都是通過的情況下都沒有問題，但是一但某個測試案例發生了錯誤，由於測試案例就會在斷言時拋出 `AssertionError` 後停止，因此很有可能因為一個測試案例壞了導致接下來所有測試都受到影響：

```js
describe('', () => {
    it('', () => {
        expect().toBe() // AssertionError，這個測試案例就停在這了
        resetTestingEnv() 
    })
    it('', () => {
        // 在沒有經過 `resetTestingEnv()` 下進行測試
    })
    it('', () => {
        // 在沒有經過 `resetTestingEnv()` 下進行測試
    })
    it('', () => {
        // 在沒有經過 `resetTestingEnv()` 下進行測試
    })
    it('', () => {
        // 在沒有經過 `resetTestingEnv()` 下進行測試
    })
})
```

因此較佳的作法還是使用 Setup & Teardown API 來處理會比較好：

```js
describe('', () => {
    beforeEach('', () => {
        setupTestingEnv()
    })
    afterEach('', () => {
        resetTestingEnv() 
    })
    it('', () => {})
    it('', () => {})
    it('', () => {})
    it('', () => {})
    it('', () => {})
})
```

## 避免過度使用 Setup & Teardown API

> 才剛介紹完 API，馬上又叫人不要用未免也太機車了（？），但凡事有原因請聽我娓娓道來。

一名對於測試領域頗有研究的 Kent C. Dodds 在 twitter 上發表：

![https://ithelp.ithome.com.tw/upload/images/20220928/20119062ywW29eVn1i.png](https://ithelp.ithome.com.tw/upload/images/20220928/20119062ywW29eVn1i.png)

許多人一看了紛紛表示中槍，心想這不就是我在寫的東西嗎？因此發文一出不少人就好奇那麼到底為什麼上方的用法會比較好呢？且讓我們從抽象光譜介紹起。

### 抽象光譜（The Spectrum of Abstraction）

Kent C. Dodds [提出](https://kentcdodds.com/blog/aha-testing)在抽象光譜中主要分成了三種概念：
- ANA：Absolutely No Abstraction
- AHA：Avoid Hasty Abstraction
- DRY：Don't Repeat Yourself

而後並將此概念應用在 Testing 身上並分別解說了三種抽象型態下的測試的優劣分析。

其中我們往往一開始學習可能因為對語法不熟稔，因此可能會寫出 ANA Testing 形式：

```js
describe('', () => {
    it('' , () => {
        // 準備
        // 操作
        // 斷言
    })
    it('' , () => {
        // 準備：重複的準備類似的內容
        // 操作
        // 斷言
    })
    it('' , () => {
        // 準備：重複的準備類似的內容
        // 操作
        // 斷言
    })
})
```

而隨著測試經驗越來越熟稔之後，我們可能會想盡各種方法來「節省」撰寫測試上的時間，甚至參考 DRY 心法寫出這樣的測試：

```
describe('', () => {
    // 統一的事前準備
    const testEnv = new TestEnv()
    beforeEach(() => {
        testEnv.init()
    })
    it('' , () => {
        // 直接操作事先準備好的內容
        // 斷言
    })
    it('' , () => {
        // 直接操作事先準備好的內容
        // 斷言
    })
})
```

而這樣的下場將會在複雜的巢狀測試情境下越來越難以閱讀與調整：

```
describe('', () => {
    const testEnv = new TestEnv()
    beforeEach(() => {
        testEnv.init()
    })
    describe('', () => {
        const testEnv = new TestEnv()
        beforeEach(() => {
            testEnv.init()
        })
        // ...
    })
    describe('', () => {
        const testEnv = new TestEnv()
        beforeEach(() => {
            testEnv.init()
        })
        // ... 等等 這裡的初始準備有什麼 ？？？
    })
    // ...
})
```

而除了巢狀情境本身是個議題之外，Kent C. Dodds 認為我們應該兼容的方式去看待他，也就是說他不排斥我們去做抽象這件事情，但是首先要做的應該是先保持單純，直到我們看到足夠多共同的案例來分析能抽取出的部分，如果不夠多那甚至原先 `inline` 的測試案例版本也比過多抽象的版本要好得多。

> [避免過度巢狀情境](https://kentcdodds.com/blog/avoid-nesting-when-youre-testing)

最後，共用的部分除非真的有必要透過 setup & teardown 實作處理，否則共用的部分大多也可以透過諸如工廠模式（factory pattern）的形式產生。

```js
/* 擷取自我某個專案內的元件測試 */
const factory = (
  options = {
    createSpy: vi.fn,
  },
) => {
  const wrapper = mount(component, {
    global: {
      plugins: [createTestingPinia(options)],
    },
  })
  const store = useMainStore()
  return { wrapper, store }
}
```

所以往後若有使用到這類 API 時不仿先思考一下我們真的需要嗎，還是有更加優雅的方式能夠解決重複的問題呢。

以上便是今日 Setup & Teardown API 的介紹，明天再見~