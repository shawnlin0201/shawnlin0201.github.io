---
title: 【語法ノ章】測試替身（Test Double）feat. Vitest Mocking API（Date, Timer）
date: 2022-10-13 19:05:22
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

今天要來介紹在 Vitest 工具中，有關於測試替身的語法有哪些內容，並且一樣會參考 Gerard Meszaros 的[五大測試替身概念](https://ithelp.ithome.com.tw/articles/10307288)，來看看我們應該如何實際應用在真實的測試案例當中！

<!-- more -->

## Vitest 的測試替身

Vitest 本身作為測試執行環境工具，提供的測試替身（Test Doubles）種類與應用範圍比起 Vue Test Utils 要來的多且廣泛，而在 Vitest 官方[文件](https://vitest.dev/guide/mocking.html)中對於這一類的測試替身相關的內容泛稱為 「Mocking」；因此，本文將以「Mocking API」 統稱這些 Vitest API，並不代表這些 API 都屬於五大分類中 Mock 類型的測試替身喔！


而 Vitest Mocking API，主要都放置於 `vi` 模組底下，因此若要使用 Vitest Mocking API 時，我們只要在測試檔案底下引入即可：

```js
import { describe, it, expect, vi} from 'vitest'
```

若你覺得每個檔案都要這樣引入太麻煩的話，我們可以在 Vitest [Config](https://ithelp.ithome.com.tw/articles/10294024) 中設定 `test.globals` 為 `true`，如此一來 Vitest API 將會以全域性的方式提供，我們就不必每次都要在測試檔案中引入 Vitest 了：

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
  },
})
```

倘若專案中有使用到 [esLint](https://eslint.org/) 工具協助糾錯的話，此時會因為 Vitest API 沒有被引入而顯示宣告上有錯誤，因此我們要在 `.eslintrc.json` 中主動告知有哪些是屬於全域性的變數：

```js
{
  // ...
  "globals": {
    "describe": true,
    "it": true,
    "expect": true,
    "vi": true
  },
  // ...
}
```

若專案中有使用到 TypeScript 的話，則需在 `tsconfig.json` 中補上 `types`，如此一來就能抓到透過全域變數的型別：

```js
{
  // ...
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
  // ...
}
```

在設定完這些後，我們就可以來看看 Vitest Mocking API 有哪些方法。

## Vitest Mocking API

Vitest 本身內建的 Mocking API 主要有以下幾種分類：

- Dates：用於模擬日期
- Timers：用於模擬計時器（`setTimeout`、`setInterval`）
- Functions：用於模擬函式
- Globals：用於模擬全域變數
- Modules：用於模擬模組引入

### Dates

在開發的過程中，有時候我們可能會遇到功能實作與系統時間有關的實作，這時候我們就可以使用這些 API 來協助我們進行測試：

- `vi.useFakeTimers`
- `vi.setSystemTime`
- `vi.useRealTimers`
- `vi.getMockedSystemTime`
- `vi.getRealSystemTime`
- `vi.restoreCurrentDate`

在測試案例中模擬日期時，我們可以透過 `vi.useFakeTimers` 來模擬系統時間，接著就可以透過 `vi.setSystemTime` 設定模擬系統時間：

```js
it('should mock system time', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2022-10-13'))

    expect(new Date()).toEqual(new Date('2022-10-13'))
})
```

若要恢復模擬系統時間，可以透過 `vi.useRealTimers` 來恢復系統時間：

```js

it('should restore system time', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2022-10-13'))
    vi.useRealTimers()

    expect(new Date()).not.toEqual(new Date('2022-10-13'))
})
```

也可以結合先前 Setup & Teardown API 的概念，快速設定各個測試案例：

```js
const formatDateTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${month}-${day}`
}

describe('mock system time', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should mock system time', () => {
    vi.setSystemTime(new Date('2022-10-13'))
    expect(new Date()).toEqual(new Date('2022-10-13'))
  })

  it('should restore system time', () => {
    expect(formatDateTime(new Date())).toEqual(formatDateTime(new Date('2022-10-13')))
  })
})
```

若要取得目前模擬的系統時間，可以透過 `vi.getMockedSystemTime` 來取得：

```js
it('should get mocked system time', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2022-10-13'))

    expect(vi.getMockedSystemTime()).toEqual(new Date('2022-10-13'))
})
```

若要取得目前真實系統的時間，則可以透過 `vi.getRealSystemTime` 來取得：

```js
it('should get real system time', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2022-10-13'))

    expect(vi.getRealSystemTime()).not.toEqual(new Date('2022-10-13'))
})
```

最後，想要將從模擬系統時間恢復成真實系統的時間，可以透過 `vi.restoreCurrentDate` 來恢復：

```js
it('should restore current date', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2022-10-13'))
    vi.restoreCurrentDate()

    expect(new Date()).not.toEqual(new Date('2022-10-13'))
})
```

### Timers

Vitest 也提供了與計時器相關的 API，讓我們可以模擬 `setTimeout`、`setInterval` 的行為：

- `vi.useFakeTimers`
- `vi.runAllTimers`
- `vi.runOnlyPendingTimers`
- `vi.advanceTimersByTime`
- `vi.advanceTimersToNextTimer`
- `vi.restoreAllMocks`

與日期相關的 API 類似，在模擬計時器之前，我們要透過 `vi.useFakeTimers` 讓當下環境中的計時器指定為模擬的計時器，接著就可以使用 `runAllTimers` 讓模擬計時器開始執行計時的功能：

```js
it('should mock timers', () => {
    vi.useFakeTimers()
    const mockFn = vi.fn()

    setTimeout(mockFn, 1000)
    vi.runAllTimers()

    expect(mockFn).toHaveBeenCalled()
})
```

有時候我們計時器可能會有遞迴的情況，這時候可以透過 `vi.runOnlyPendingTimers` 來執行下一個應該要執行的計時器，從而捕捉各個計時器之間發生過程的相關內容：

```js
it('should run only pending timers', () => {
  vi.useFakeTimers()
  const cache = {
    count: 0,
  }
  const mockFn = vi.fn(() => {
    cache.count++

    setTimeout(() => {
      mockFn()
    }, 1000)
  })

  mockFn() // 此時 cache.count === 1

  expect(cache.count).toEqual(1)
  vi.runOnlyPendingTimers() // 執行下一個 setTimeout
  expect(cache.count).toEqual(2)
  vi.runOnlyPendingTimers() // 執行下一個 setTimeout
  expect(cache.count).toEqual(3)
  vi.runOnlyPendingTimers() // 執行下一個 setTimeout
  expect(cache.count).toEqual(4)
})

```

除了階段性的執行計時器，若想直接讓計時器被提前到指定的時間，可以透過 `vi.advanceTimersByTime` 來達成：

```js
it('should advance timers by time', () => {
  vi.useFakeTimers()
  const mockFn = vi.fn()

  setTimeout(mockFn, 1000)

  vi.advanceTimersByTime(999) // 計時器被提前 999 毫秒執行
  expect(mockFn).not.toHaveBeenCalled()
  vi.advanceTimersByTime(1) // 計時器被提前 1000 毫秒執行
  expect(mockFn).toHaveBeenCalled()
})
```

若想直接讓計時器被提前到下一個計時器的時間，可以透過 `vi.advanceTimersToNextTimer` 來達成：

```js
it('should advance timers to next timer', () => {
  vi.useFakeTimers()
  const mockFn = vi.fn()

  setTimeout(mockFn, 1000)
  setTimeout(mockFn, 3000)

  vi.advanceTimersToNextTimer() // 所有計時器提前了 1000 毫秒
  expect(mockFn).toHaveBeenCalled()
  vi.advanceTimersToNextTimer() // 所有計時器被提前了 3000 毫秒
  expect(mockFn).toHaveBeenCalled()
})
```

最後，如果想要將從模擬計時器恢復成真實計時器的時候，可以透過 `vi.restoreAllMocks` 方法達成：

```js
it('should restore all mocks', () => {
    vi.useFakeTimers()
    const mockFn = vi.fn()

    setTimeout(mockFn, 1000)
    vi.restoreAllMocks()

    expect(mockFn).not.toHaveBeenCalled()
})
```

今日 Vitest Mocking API 先介紹到這邊，相信光是模擬日期與計時器的 API，就足夠讓你驚訝於 Vitest Mocking API 的威力，在瀏覽器環境囂張的計時器，在測試環境中，竟然可以如此任由我們所擺佈。

但最重要的是由於我們可以細微的控制日期與計時器的執行時機，因此可以讓我們的測試案例能夠模擬各種不同的狀況，讓我們的測試案例能更加完整與彈性。

而明天我們將會繼續介紹 Vitest Mocking API 的其他功能，學習完這些內容之後，我們就可以開始來寫有關 Vue 周邊工具的測試案例了！