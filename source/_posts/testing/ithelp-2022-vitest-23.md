---
title: 【語法ノ章】元件測試：模擬 Vue APIs（emit, provide/inject）
date: 2022-10-08 22:59:35
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

今天我們要來繼續學習元件中若有使用到 Vue API 中的 `emit`、`provide` 與 `inject` 時要怎麼來進行測試並且模擬他們的行為。

<!-- more -->

# emit
在斷言中我們要測試 `emit` 主要是試圖捕獲元件所發生的事件，並斷言事件與值是否如我們所預期，而這時可以透過容器方法中的 `emitted()` 來取得事件發送所有的紀錄。

而 `emitted` 中所紀錄的格式如下：

```js
{
    '事件名稱': [
        [/* 第一次發送的值 */],
        [/* 第二次發送的值 */],
        [/* 第 n 次發送的值 */]
    ]
}
```

因此假設我們有一個 `pagination` 元件如下所示：

```
<template>
    <div>
      <div data-test="first" @click="$emit('changePage', 'first')">
       第一頁
      </div>
      <div data-test="prev" @click="$emit('changePage', 'prev')">
        上一頁
      </div>
      <div data-test="next" @click="$emit('changePage', 'next')">
        下一頁
      </div>
      <div data-test="last" @click="$emit('changePage', 'last')">
        最後一頁
      </div>
    </div>
</template>
```


在斷言的時候我們可以透過下列方式檢查是否發送對應的 `emit` 事件：
- 透過 `toHaveProperty` 確認 `emitted` 屬性確認是否發送「預期事件名稱」
- 透過 `emitted().事件名稱` 確認該事件名稱「發生次數」
- 透過 `emitted().事件名稱[index]` 確認該事件名稱，第幾次送出的「值」

```js
it('...', async () => {
    const wrapper = mount(Component)

    await wrapper.find('[data-test="first"]').trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('changePage')
    expect(wrapper.emitted().changePage).toHaveLength(1)
    expect(wrapper.emitted().changePage[0]).toEqual(['first'])
})
```

---

# provide
對於有使用到 `provide` 的元件來說，我們需要確保他提供預期的 `inject` 內容，因此我們要建立一個用來接收 `provide` 的元件，接著才能透過斷言來測試傳遞的內容是否如預期。

接下來我們以這個元件為例：
```
<template>
  <div>
    <ChildComponent />
  </div>
</template>

<script>
import { ref, provide, readonly } from 'vue'
export default {
  setup() {
    const count = ref(1)
    provide('count', readonly(count))
  },
}
</script>
```

然而我們為了讓測試案例保持獨立性，因此我們要透過造假的元件來測試 `inject` 所接收到的是否如預期。

## 透過元件容器中的 global.stubs 模擬假元件
透過元件容器（Wrapper）中的第二個參數 `global.stubs` 我們可以將子元件渲染成我們想要的樣子，而模擬的方式一共分為兩種：
- 渲染成 `<-stub>` 元件
- 渲染成特定元件

### 渲染成 `<-stub>` 元件

當 `global.stub[目標元件名稱]` 為 `true` 時：
```js
const wrapper = mount(TargetComponent, {
    global: {
          stubs: {
                ChildComponent: true, 
          },
    },
})
```
我們的目標元件將會被渲染為帶有 `-stub` 後綴的元素：
```
<template>
  <div>
    <ChildComponent /> <!-- 會變成 <child-component-stub></child-component-stub>  -->
  </div>
</template>
```

然而這對於我們要測試 `provide` 來說沒有幫助，因為他沒有辦法接收 `inject` 資訊，因此我們要採用下面第二種方法。

### 渲染成特定元件
要渲染成特定元件的方式，就是先製作一個假元件，接著再提供給 `global.stubs` 來當作原先應該要渲染的元件。

首先，我們可以透過 Vue 提供的 `defineComponent` 建造元件：

```js
import { defineComponent } from 'vue'

const TestComponent = defineComponent({
    template: '<p data-test="target">{{ count }}</p>',
    setup() {
      const value = inject('count')
      return { value }
    },
})
```

接著在測試案例就可以透過 `global.stubs` 中直接使用這個測試元件：

```js
import { defineComponent } from 'vue'

const TestComponent = defineComponent({
    template: '<p data-test="target">{{ count }}</p>',
    setup() {
      const value = inject('count')
      return { value }
    },
})

it('...' , () => {
  const wrapper = mount(TargetComponent, {
    global: {
      stubs: {
        ChildComponent: TestComponent,
      },
    },
  })
})
```

如此一來元件 `ChildComponent` 在測試案例中的渲染結果將變成我們指定的樣子。

```html
<div>
  <p data-test="target">1</p>
</div>
```

因此我們現在就可以斷言 `provide` 提供的內容是否正確了：

```js
const TestComponent = defineComponent({
    template: '<p data-test="target">{{ count }}</p>',
    setup() {
      const count = inject('count')
      return { count }
    },
})
it('...', async () => {
  const wrapper = mount(TargetComponent, {
    global: {
      stubs: {
        ChildComponent: TestComponent,
      },
    },
  })

  expect(wrapper.find('[data-test="target"]').text()).toBe('1')
})
```

---

# inject
對於有使用到 `inject` 的元件來說，我們在意的是提供 `provide` 特定的值之後，畫面上渲染的結果是否正確。

```
<template>
  <div data-test="target">{{ count }}</div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    const count = inject('count')

    return { count }
  },
}
</script>

```

此時我們可以透過元件容器（Wrapper）中的第二個參數 `global` 來指定要提供的 `provide` 值：

```js
const wrapper = mount(TargetComponent, {
    global: {
      provide: {
        count: 1,
      },
    },
})
```

最後我們就可以直接斷言渲染的結果是否如預期：

```js
it('should be render correct content after providing count', async () => {
  const wrapper = mount(TargetComponent, {
    global: {
      provide: {
        count: 1,
      },
    },
  })

  expect(wrapper.find('[data-test="target"]').text()).toBe('1')
})
```

---

以上便是如何在測試案例中模擬元件  `emit`、`provide` 與 `inject` 行為的介紹，而這一部分在模擬的過程中會主要需要注意到像是 `global.stubs` 的模擬元件用法，以及要模擬 `provide` 的話，須在容器中的 `global.provide` 中指定，若放錯位置就會沒效果囉。

而明天我們將來介紹最後有關於 Vue 常用的 `slot` 與指令 `directive` 要怎麼模擬並測試！