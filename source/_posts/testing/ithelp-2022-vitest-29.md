---
title: 【語法ノ章】測試替身（Test Double）feat. Vitest Mocking API（Function, Globals & Modules）
date: 2022-10-14 19:33:23
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

## Vitest 的測試替身－續篇

今天要來繼續介紹 Vitest 的這些 Mocking API：

- Functions：用於模擬函式
- Globals：用於模擬全域變數
- Modules：用於模擬模組引入

接下來的內容會稍微有複雜一點點，但且讓我們先專注在學習語法的部分！

<!-- more -->

### Function

在 Vitest 中，主要有下列兩種 API 讓我們可以模擬函式的各種行為：

- `vi.fn`
- `vi.spyOn`

在使用 `vi.fn` 時，我們可以透過 `vi.fn` 來建立一個模擬函式，而裡頭的實作可以由我們自己決定；因此 `vi.fn` 除了可以用來模擬（Fake）某個函式的實作、搭配等等會介紹到的 `vi.mock` 來作為 `Mock Object` 的紀錄工具，甚至還能用來作為某個函式的替身（Spy）以便取得被呼叫的次數、被呼叫時帶入哪些參數等等詳細資訊：

```js
it('should mocking a function', () => {
  const mockFn = vi.fn() // 返回一個可呼叫的模擬函式

  mockFn(1, 2, 3)   // 呼叫模擬函式

  // 取得模擬函式的呼叫紀錄
  expect(mockFn).toHaveBeenCalled()
  expect(mockFn).toHaveBeenCalledWith(1, 2, 3)
  expect(mockFn).toHaveBeenCalledTimes(1)
})
```

而在使用 `vi.spyOn` 時，我們最主要是用來綁定一個物件的既有方法，在不破壞原有方法實作的情況下作為該方法的替身（Spy）：


```js
it('should spying a function', () => {
  const cache = {
    count: 0,
  }

  const utils = {
    add: () => cache.count++,
  }

  const spy = vi.spyOn(utils, 'add') // 測試替身綁定在 utils.add 身上

  utils.add() // 呼叫 utils.add

  // 透過 spyOn 取得該方法的相關紀錄
  expect(spy).toHaveBeenCalled()
  expect(spy).toHaveBeenCalledTimes(1)
  expect(cache.count).toEqual(1)

})
```

# MockInstance API

而在透過 `vi.fn()` 或 `vi.spyOn()` 模擬與綁定過方法時，這兩隻 API 會返回一個 `MockInstance` 物件，而透過這個物件，我們就可以取得當下模擬函式、方法的相關資訊，甚至進一步對模擬的內容進行更細微的控制來達到測試案例的各種需求。

而 `MockInstance` 物件本身主要包含了兩大部分：

- MockInstance Properties
- MockInstance Methods

## MockInstance Properties

`MockInstance` 屬性大部分都是讓我們取得模擬函式、方法呼叫有關的資訊：

- mock.calls
- mock.lastCall
- mock.results
- mock.instances

### mock.calls & mock.lastCall
當我們需要斷言呼叫函式所帶入的參數時，可以透過 `mock.calls` 來取得，其儲存的格式為二維陣列：

```js
it('should get mock.calls', () => {
  const mockFn = vi.fn()

  mockFn(1, 2, 3) // first call
  mockFn(4, 5, 6) // second call

  expect(mockFn.mock.calls).toEqual(
    [
        [1, 2, 3], // first call
        [4, 5, 6], // second call
    ]
  )
})
```

若只想查詢最後一次呼叫時的參數，則可以透過 `mock.lastCall` 來取得，其儲存的格式為一維陣列：

```js
it('should get mock.lastCall', () => {
  const mockFn = vi.fn()

  mockFn(1, 2, 3) // first call
  mockFn(4, 5, 6) // second call & last call

  expect(mockFn.mock.lastCall).toEqual(
    [4, 5, 6] // last call
  )
})
```

### mock.results
以陣列紀錄函式被呼叫時的回傳值，其中每個物件都有兩個屬性：
- type： 回傳值的類型。（`return` 或 `throw`）
- value：回傳值的內容。

```js
it('should get mock.results', () => {
  const mockFn = vi.fn()

  mockFn(1, 2, 3) // first call
  mockFn(4, 5) // second call

  expect(mockFn.mock.results).toEqual(
    [
        { type: 'return', value: undefined }, // first call
        { type: 'throw', value: Error }, // second call
    ]
  )
})
```

### mock.instances
以陣列紀錄函式被呼叫時的參照來源（reference）：

```js
it('should get mock.instances', () => {
  const mockFn = vi.fn()

  const obj1 = { name: 'obj1' }
  const obj2 = { name: 'obj2' }

  mockFn.call(obj1, 1, 2, 3) // first call
  mockFn.call(obj2, 4, 5, 6) // second call

  expect(mockFn.mock.instances).toEqual(
    [
        obj1, // first call
        obj2, // second call
    ]
  )
})
```

## MockInstance Methods

除了上述的屬性（MockInstance Properties）外，`MockInstance` 物件還包含了一些方法，讓我們可以進一步控制模擬函式、方法的行為，依據不同的用途還可進一步分為：

將 Mock 復原：
- mockClear
- mockReset
- mockRestore

仿造函式、方法實作：
- mockImplementation & mockImplementationOnce

仿造回傳內容：
- mockReturnValue & mockReturnValueOnce
- mockResolvedValue & mockResolvedValueOnce
- mockRejectedValue & mockRejectedValueOnce

### mockClear
清除 `mock.calls`、`mock.results` 屬性中原先的內容並回傳空陣列：

```js
it('should clear mock.calls & mock.results', () => {
  const mockFn = vi.fn()

  mockFn(1, 2, 3) // first call
  mockFn(4, 5, 6) // second call

  mockFn.mockClear()

  expect(mockFn.mock.calls).toEqual([])
  expect(mockFn.mock.results).toEqual([])
})
```

### mockReset
除了做了與 `mockClear` 一樣的事情之外，還會將實作替換成一個空的函式並且固定回傳 `undefined`：

```js
it('should reset mock.calls & mock.results', () => {
  const mockFn = vi.fn(() => 'mock')

  mockFn(1, 2, 3) // first call
  mockFn(4, 5, 6) // second call

  mockFn.mockReset()

  expect(mockFn.mock.calls).toEqual([])
  expect(mockFn.mock.results).toEqual([])
  expect(mockFn()).not.toBeUndefined()
})
```

### mockRestore
除了做了與 `mockReset` 一樣的事情之外，還會將實作替換成原本的實作：

```js
it('should restore mock.calls & mock.results', () => {
  const mockFn = vi.fn(() => 'mock')

  mockFn(1, 2, 3) // first call
  mockFn(4, 5, 6) // second call

  mockFn.mockRestore()

  expect(mockFn.mock.calls).toEqual([])
  expect(mockFn.mock.results).toEqual([])
  expect(mockFn()).not.toBeUndefined()
  expect(mockFn()).toBe('mock')
})
```

### Mock Implementation
`mockImplementation` 會將函式、方法的實作替換成傳入的函式：

```js
it('should mockImplementation', () => {
  const mockFn = vi.fn(() => 'original')
  mockFn.mockImplementation(() => 'mock')
  expect(mockFn()).toBe('mock')
  expect(mockFn()).toBe('mock')
})
```

若你想要只替換一次的話，可以使用 `mockImplementationOnce`：

```js
it('should mockImplementationOnce', () => {
  const mockFn = vi.fn()
  mockFn.mockImplementationOnce(() => 'mock')
  expect(mockFn()).toBe('mock')
  expect(mockFn()).not.toBe('mock')
})
```


### Mock Return Value
若想要將將函式、方法的回傳值替換成傳入的值，可以使用 `mockReturnValue` 替換：

```js
it('should mockReturnValue', () => {
  const mockFn = vi.fn()
  mockFn.mockReturnValue('mock')
  expect(mockFn()).toBe('mock')
  expect(mockFn()).toBe('mock')
})
```

同樣地若你想要只替換一次的話，可以改使用 `mockReturnValueOnce` ，這裡不再展示了。

### Mock Promise Value
- mockResolvedValue
- mockResolvedValueOnce
- mockRejectedValue
- mockRejectedValueOnce

若想要仿造 `Promise.resolve` 的回傳值，可以使用 `mockResolvedValue`，仿造一次的話則是使用 `mockResolvedValueOnce`：

```js
it('should mockResolvedValue', async () => {
  const mockFn = vi.fn(() => 'original')
  mockFn.mockResolvedValue('mock')
  expect(await mockFn()).toBe('mock')
  expect(await mockFn()).toBe('mock')
})
```

而若是要仿造 `Promise.reject` 的回傳值，則是替換為 `mockRejectedValue` 與 `mockRejectedValueOnce` 即可。


以上就是 `MockInstance` 的所有方法，若弄清楚他的屬性與方法的作用，並且分清楚何時使用 `vi.fn` 與 `vi.spyOn`，接下來要學習其他 Mocking API 就會變得輕鬆許多。

---

### Globals

若要模擬全域變數，可以使用 `vi.stubGlobal` 這個 API，它接受兩個參數：
- `name`：全域變數的名稱
- `value`：全域變數實際的內容

比方我們在測試案例中有邏輯與 `window` 有相關的時候，就可以這樣使用：

```js
it('should stubGlobal', () => {
  const mockWindow = {
    location: {
      href: 'https://example.com',
    },
  }
  vi.stubGlobal('window', mockWindow)

  expect(window.location.href).toBe('https://example.com')
  expect(/* 或針對相關邏輯做斷言 */).toBe('https://example.com')
})
```

若是想模擬 `localStorage` 也沒有問題，甚至結合 `vi.fn` 來捕捉使用情形：

```js
it('should stubGlobal', () => {
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  }
  vi.stubGlobal('localStorage', mockLocalStorage)
  localStorage.setItem('key', 'value')
  expect(localStorage.getItem).toHaveBeenCalledWith('key')
})
```

---

### Modules

最後若我們在開發過程中可能會 import 其他的模組來開發，這時候就可以使用 `vi.mock` 來模擬模組的行為。

而在使用 `vi.mock` 時，主要可以傳入兩個參數：
- `path`：模組的路徑
- `factory`：工廠函式，用來替代模組的實際內容

假設我們有個 `utils` 工具集：

```js
// utils.js
const debounce = (fn, delay) => {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

const throttle = (fn, delay) => {
  let timer = null
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

// 預設匯出(default export)
export default { debounce, throttle }
```

則在測試案例中我們可以這樣使用：

```js
import utils from './utils'

vi.mock('./utils', () => {
  return {
    // 預設匯出(default export)要使用 default 作為屬性名稱
    default: {
      debounce: vi.fn(),
      throttle: vi.fn(),
    },
  }
})

it('should mock', () => {
  utils.debounce()
  expect(utils.debounce).toHaveBeenCalled()
})
```

若是在匯出模組時採用的是具名匯出(named export)：

```js
// utils.js
export const debounce = /* ... */
export const throttle = /* ... */
```

則工廠方法的屬性要使用具名匯出的屬性名稱：

```js
vi.mock('./utils', () => {
  return {
    debounce: vi.fn(),
    throttle: vi.fn(),
  }
})
```

到這裡 Vitest Mocking API 的介紹就差不多結束哩，當然還有一些更細微且深入的用法沒介紹到，不過看到這裡你已經能應付大部分的模擬情境了。

若你覺得意猶未盡的話也可以直接參考 [Vitest 官方文件](https://vitest.dev/guide/mocking.html)，官方也很貼心的準備了 Cheat Sheet，可以根據想模擬的類型來快速找到相關的 API。

而在學習完測試替身之後，接下來我們終於可以來介紹要如何模擬第三方工具庫啦！敬請期待！

