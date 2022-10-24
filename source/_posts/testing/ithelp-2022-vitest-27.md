---
title: 【語法ノ章】測試替身（Test Double）feat. Vue Test Utils
date: 2022-10-12 20:02:07
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
昨天我們提到了 Gerard Meszaros 的五大測試替身概念，釐清我們要在什麼時機下使用何種測試替身來幫助測試案例流程能更加順利，並帶了一點與測試替身相關的語法。

而今天要來詳細談談 Vue Test Utils 工具中有關於測試替身的相關語法有哪些，並思考以五大測試替身的概念去思考其中的應用場景。

## Vue Test Utils 的測試替身

在 Vue Test Utils 工具中的測試替身，大部分都是在協助有關於替換元件渲染以及替換 `<slot>` 等 `stub` 類型的測試替身：

### `shallowMount`
第一個不得不提的就是我們熟悉的 `shallowMount` 元件容器（Wrapper），在前面章節有提過，若我們不使用 `mount` 而是改由 `shallowMount` 容器來渲染元件的話：

App.vue
```html
<div>
    <ChildComponent />
</div>
```

```js
import component from 'App.vue'
const wrapper = shallowMount(component)
```

那麼上方的 `wrapper` 渲染結果將會變成：

```html
<div>
    <child-component-stub></child-component-stub>
</div>
```

這麼一來我們就可以測試有關 `App.vue` 元件本身的行為。

### `shallow`

接下來是同樣概念的 `shallow`，只是差在使用方法是透過 `mount` 元件容器的第二參數帶上 `{ shallow: true }`：

App.vue
```html
<div>
    <ChildComponent />
</div>
```

```js
import component from 'App.vue'
const wrapper = mount(component, {
    shallow: true,
})
```

`wrapper` 將會渲染成：
```html
<div>
    <child-component-stub></child-component-stub>
</div>
```


### global.renderStubDefaultSlot
`renderStubDefaultSlot` 使用場景比較特別，他主要是用來指定是否強迫渲染 `slot` 內容，即使是在 `shallow` 元件的時候：


App.vue
```html
<div>
    <slot></slot>
    <Child-Component />
</div>
```

```js
import component from 'App.vue'
const wrapper = mount(component, {
    shallow: true,
    slots: {
        default: '<p>force render this!</p>'
    },
    global: {
        renderStubDefaultSlot: true
    }
})
```

以上方為例最後 `wrapper` 會變成：

```html
<div>
    <p>force render this!</p>
    <child-component-stub></child-component-stub>
</div>
```

但官方也特別強調由於技術限制的關係，`renderStubDefaultSlot` 語法暫時只支援預設插槽（Default Slots）能被指定渲染。

### global.stubs
前面有稍微提到的 `global.stubs`，最主要是用來指定子元件渲染成 `<-stub>` 元件或特定 `template` 的方法：

App.vue
```html
<div>
    <ChildComponent />
</div>
```

```js
import component from 'App.vue'

it('should be render...', () => {
    const wrapper = mount(component, {
        global: {
          stubs: { ChildComponent: true },
        }
    })
    expect(wrapper.html()).toEqual('<div><child-component-stub></child-component-stub></div>')
})

it('should be render...', () => {
    const wrapper = mount(component, {
        global: {
          stubs: {
            ChildComponent:
                {
                    name: 'StubComponent',
                    template: '<p>custom content</p>'
                }
          },
        }
    })
    expect(wrapper.html()).toEqual('<div><p>custom content</p></div>')
})
```

現在我們就可以針對 `stub` 後的結果開始斷言啦！

> 有沒有覺得看到 `Stub` 術語就有種親切感呢！

### global.mock
最後一個 `global.mock` 主要是用來替身 Vue 開發時常用到的 Router 或 Store 周邊工具庫的語法：

App.vue
```html
<template>
<button data-test="button" @click="handleOnClickButton">Add 1 to Store</button>
</template>

<script>
export default {
  methods: {
    handleOnClickButton() {
      this.$store.dispatch('add')
    }
  }
}
</script>
```

這時我們可以在測試案例中替身（`mock`）掉原先 `store` 的方法，甚至仿照出一個新的 `store`：

```js
import component from 'App.vue'

it('should be mocked', async () => {
    const $store = {
        dispatch: vi.fn(), // Vitest 中用來記錄用的函式
    }
    const wrapper = mount(component, {
        global: {
            mocks: { $store }
        }
    })
    await wrapper.find('[data-test="button"]').trigger('click)

    epxect($store.dispatch).toHaveBeenCalled() // 確認 `dispatch` 有被呼叫
})
```

如此一來我們就可以捕捉原先受測物（SUT）想要對依賴物（DOC）做的事情，是否如我們預期，這也就是昨天測試替身中 `Mock` 類型想要做的事情！

---

以上主要是 Vue Test Utils 中有關測試替身的 API，而明天我們將要來繼續介紹在 Vitest 中有哪些測試替身囉！

> 結果昨天還在說最近變天有點小感冒，今天眼睛就馬上紅腫RRRRRR⋯⋯
> 還好休息一下吃個 B 群什麼的有稍微好一點
> 決定先把 Vue Test Utils 的部分寫好，明天繼續再戰！！！
