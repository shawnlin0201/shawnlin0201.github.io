---
title: 【語法ノ章】Vue Ecosystem 篇：Pinia 測試
date: 2022-10-16 20:59:18
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

# Pinia 測試
- Pinia 簡介
- Pinia 測試關注點
- Pinia 測試實作
  - 測試 Store 本身行為
  - 測試 Store 與 Vue 元件之間的互動

<!-- more -->

## Pinia 簡介

隨著專案規模越大，在管理共用狀態上就越不容易，這時後就會需要一個狀態管理工具來協助我們處理這些問題。

而 Pinia 便是一個以 Vuex 的概念為基礎的狀態管理工具，它除了沿用了部分 Vuex 概念之外，還兼容了 Vue 3 中的 Composition API 的語法，讓我們在專案中可以更方便的管理狀態之外，還能讓專案中的程式碼風格統一。

## Pinia 測試關注點

根據不同專案中的設計與應用，測試 Pinia 的難度與複雜度也會有所不同，而依據受測物的不同我們大概能分為兩類：

- 以 Pinia 作為受測物，測試本身行為所影響的狀態結果是否正確
- 以 Vue 元件作為受測物，測試與 Pinia 互動的行為是否正確

接著底下實作的部分就以這兩個關注點為主，來介紹如何測試 Pinia。

## Pinia 測試實作

### 測試 Store 本身行為

在測試 Pinia 本身行為時，由於我們會使用到真實的 Store 來進行操作，因此在測試案例前我們必須先透過 `setActivePinia` 來活化（active）Pinia 實體：

```js
import { setActivePinia, createPinia } from 'pinia'

let store
beforeEach(() => {
  setActivePinia(createPinia())
  store = useStore()
})
```

接著就可以根據我們 Store 的設計來撰寫測試案例：

Store
```js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount() {
      return this.count * 2
    },
  },
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
})
```

在撰寫測試案例時，要注意到我們只關注在 state 的預期變化，也就是說：

- 操作 action 後 state 最後的變化是否正確
- 使用 getter 取值時，最後預期的結果是否正確

Counter.spec.js
```js
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '@/stores/counter'

describe('Counter Store', () => {
  let store
  beforeEach(() => {
    setActivePinia(createPinia())
    store = useCounterStore()
  })

  it('should increment count', () => {
    store.increment()
    expect(store.count).toBe(1)
  })

  it('should decrement count', () => {
    store.decrement()
    expect(store.count).toBe(-1)
  })

it('should return double count', () => {
    expect(store.doubleCount).toBe(0)
    store.increment() // count = 1
    expect(store.doubleCount).toBe(2)
    store.increment() // count = 2
    store.increment() // count = 3
    expect(store.doubleCount).toBe(6)
  })
})
```

### 測試 Store 與 Vue 元件之間的互動

在進行 Pinia 與 Vue 元件互動時，由於我們受測物主要為 Vue 元件，因此我們要使用到 `@pinia/testing` 提供的 `createTestingPinia` 方法來幫助我們建立模擬 Pinia 實體，方便我們從中得到有關 store 的呼叫紀錄與參數等。

因此，首先我們要先下載 `@pinia/testing`：

```shell
npm i -D @pinia/testing
```

接著在撰寫測試案例時，由於現在我們是使用模擬的 Pinia 實體，因此我們不需要再使用 `setActivePinia` 來活化 Pinia，而是直接使用 `createTestingPinia` 來建立模擬實體，所以在測試案例建立容器時，我們可以透過 `globals.plugins` 來載入它：

```js
const wrapper = mount(component, {
    globals: {
        plugins: [createTestingPinia()],
    }
})
```

`createTestingPinia` 本身除了回傳 Pinia 實體讓我們不需要在測試案例中活化 Pinia 之外，還有提供了參數讓我們操作與改變 Store 的行為：

- initialState
- stubActions
- createSpy
- plugins

#### initialState

`initialState` 可以讓我們在測試案例中，將 Store 的 state 初始化為我們指定的值。

而在使用 `initialState` 時，要帶入欲初始化 Store 的名稱，再傳入要模擬的 State 值：

```js
const wrapper = mount(component, {
    global: {
    plugins: [
        createTestingPinia({
            initialState: {
                // 將 counter store 的 state 初始化為 10
                counter: {
                    count: 0,
                },
            },
        }),
    ],
    },
})
```

#### stubActions

在孤立型的測試風格中，由於 Vue 元件與 Pinia 互動之間，我們比較在意的會是操作 Vue 元件時，有無呼叫到 Store 中的 Action，而不會在意 Action 內部的邏輯是否正確。

因此使用 `createTestingPinia` 作為測試案例的 Pinia 實體時，**「預設」** 會將所有的 Action 都以模擬替身（stub）的型態替換掉，改為回傳預設值。

所以在測試案例中無論怎麼操作 Store，都不會影響到 Store 本身的 State 值。

```js
const wrapper = mount(component, {
    global: {
    plugins: [
        createTestingPinia(),
    ],
    },
})
const store = useCounterStore() // state: { count: 0 }
store.increment() // add 1 to count
expect(store.count).toBe(0) // state: { count: 0 }
```

倘若你希望能在測試案例中能真實交互 Store 的行為，可以透過 `stubActions: false` 來關閉對 Store Action 的隔離：

```js
const wrapper = mount(component, {
    global: {
    plugins: [
        createTestingPinia({
            stubActions: false,
        }),
    ],
    },
})
const store = useCounterStore() // state: { count: 0 }
store.increment() // add 1 to count
expect(store.count).toBe(1) // state: { count: 1 }
```

#### createSpy

在使用 Vitest 或 Jest 作為測試環境時，根據設定 `createTestingPinia` 會自動透過 `vi.fn` 或 `jest.fn` 來建立 Action 的模擬替身。

假如你有想要使用其他隔離庫（e.g. Sinon.js）中的測試替身函數就可以透過 `createSpy` 帶入：

```js
import sinon from 'sinon'

const wrapper = mount(component, {
    global: {
        plugins: [
            createTestingPinia({
                createSpy: sinon.spy,
            }),
        ],
    },
})
```

#### plugins

若在使用 Pinia 時有使用到插件（plugins）來擴充 Pinia 的功能，由於活化 Pinia 機制不同，因此我們需要透過 `plugins` 參數來顯性的將插件加入到 `createTestingPinia` 中：

```js
import { myPlugin } from './stores/plugins'
const wrapper = mount(component, {
    global: {
    plugins: [
        createTestingPinia({
            plugins: [myPlugin],
        }),
    ],
    },
})
```

而綜合以上 `createTestingPinia` 的參數，最後若我們想要撰寫孤立型測試風格的測試案例，就會像是這樣：

```js
  it('should increment', async () => {
    const wrapper = mount(component, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              counter: {
                count: 0,
              },
            },
          }),
        ],
      },
    })
    const store = useCounterStore()

    await wrapper.find('[data-test="button_increment"]').trigger('click')
    await wrapper.find('[data-test="button_increment"]').trigger('click')

    expect(store.increment).toHaveBeenCalledTimes(2)
    expect(wrapper.find('[data-test="content_count"]').text()).toBe('1')
  })
```

若想要撰寫社交型風格的測試，則會像這樣撰寫：

```js
it('should increment', async () => {
    const wrapper = mount(component, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              counter: {
                count: 0,
              },
            },
            stubActions: false,
          }),
        ],
      },
    })

    await wrapper.find('[data-test="button_increment"]').trigger('click')

    expect(wrapper.find('[data-test="content_count"]').text()).toBe('1')
  })
```

但要注意到的是，如此一來將來在 Store 發生變更時，元件中的測試案例也會因此發生錯誤，因此在撰寫測試案例時，要適度的取捨與規劃。

以上就是有關於在 Vue 3 中，若使用 Pinia 作為狀態管理工具時，要如何撰寫有關於 Pinia 的測試案例！