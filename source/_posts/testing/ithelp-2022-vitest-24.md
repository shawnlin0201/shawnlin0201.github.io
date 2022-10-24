---
title: 【語法ノ章】元件測試：模擬 Vue APIs（slots, custom directives）
date: 2022-10-09 22:41:08
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

# slots
在開發的過程中，有時候我們可能為了畫面上的彈性，會在元件中透過 `<slot>` 讓父層來決定要填入什麼內容。

而在針對 `slots` 撰寫測試時，要注意的地方有：
- `slots` 至少會有預設未傳入的狀態與傳入資料後的狀態兩種，斷言時應該至少包含這兩種狀態。
- 以 `slots` 行為作為案例斷言時，斷言內容要專注在 `slots` 所影響範圍內，否則可能會受其他因素干擾。

<!-- more -->

---

## 預設插槽（Default slots）

```html
<template>
  <div>
    <slot></slot>
  </div>
</template>
```

要針對最基本的預設插槽做斷言時，我們可以透過容器中第二個參數帶入 `slots` 欄位來模擬帶入內容並透過 `default` 屬性傳入指定的範圍內。

未傳入測試案例：

```js
it('default slot', async () => {
  const wrapper = mount(Component)
  expect(wrapper.html()).toMatchInlineSnapshot()
})
```

傳入時測試案例：

```js
it('default slot', async () => {
  const wrapper = mount(Component, {
    slots: {
      default: 'Slot Content',
    },
  })

  expect(wrapper.html()).toContain('Slot Content')
})
```

---

## 具名插槽（Named slots）
```html
<template>
  <div>
    <slot name="header"></slot>
    <slot name="body"></slot>
    <slot name="footer"></slot>
  </div>
</template>
```


若在插槽的型態為具名插槽，在撰寫測試案例時的容器選項 `slots` 就可以依據插槽名稱 `name` 指定要傳入的內容。

未傳入測試案例：

```js
it('named slot', async () => {
  const wrapper = mount(Component)

  expect(wrapper.html()).toMatchInlineSnapshot()
})
```

傳入時測試案例：

```js
it('named slot', async () => {
  const wrapper = mount(Component, {
    slots: {
      header: 'ithelp 2022 鐵人賽',
      body: 'vue3 單元測試',
      footer: 'by Shawn',
    },
  })

  expect(wrapper.html()).toMatchInlineSnapshot()
})
```

---

## 作用域插槽（Scoped slots）

```
<template>
  <div>
    <p>貓咪咖啡廳：</p>
    <p>店長：Shawn</p>
    <slot :staffInfo="staffInfo"></slot>
  </div>
</template>

<script setup>
const staffInfo = {
  'black-cat': {
    name: '黑黑',
    'signature-dish': '拿鐵',
  },
  'orange-cat': {
    name: '阿橘',
    'signature-dish': '焦糖瑪奇朵',
  },
}
</script>
```

有時候我們可能想要給予更高度的彈性，使元件透過 `<slot>` 傳遞資料給父層時，這時候就會用到作用域插槽。

未傳入測試案例：

```js
it('scoped slots', async () => {
  const wrapper = mount(Component)

  expect(wrapper.html()).toMatchInlineSnapshot(`
    "<div>
      <p>貓咪咖啡廳：</p>
      <p>店長：Shawn</p>
    </div>"
  `)
})
```

傳入時測試案例：

```
it('scoped slots', async () => {
  const wrapper = mount(Component, {
    slots: {
      default: `
        <template #staffInfo>
          <p>店員：{{ staffInfo['orange-cat']['name'] }}</p>
          <p>限定項目：{{ staffInfo['black-cat']['signature-dish'] }}</p>
        </template>
      `,
    },
  })

  expect(wrapper.html()).toMatchInlineSnapshot(`
    "<div>
      <p>貓咪咖啡廳：</p>
      <p>店長：Shawn</p>
      <p>店員：阿橘</p>
      <p>限定項目：拿鐵</p>
    </div>"
  `)
})
```

---

## 插槽載入選項（Mounting options）
若想在測試案例中用不同的方式來模擬 `slots`，可以透過下面四種語法：

- 傳入 SFC 檔案
- `render function`
- 包含 `template` 屬性的物件
- 直接傳入一個字串

```
it('should render same layout', () => {
  const wrapper = mount(Layout, {
    slots: {
      default: Component
      // default: h('div', '相同內容'),
      // default: { template: '<div>相同內容</div>' },
      // default: '<div>相同內容</div>',
    }
  })

  expect(wrapper.html()).toContain('<div>相同內容</div>')
})
```

---

# custom directives

客製化指令本身搭配了類似元件生命週期的 Hooks，而我們可以在那些 Hook 中任意對我們所綁定的元素做開發，讓繁複的邏輯透過簡單的指令就能夠重複利用，使我們在開發過程中的開發者體驗（Developer experience, DX）有非常良好的體驗。

但相對的來說，要測試客製化指令就有機會運用到各種我們至今學過的許多技巧來斷言，從而使難度大大提升，但我們只要熟悉之前的模擬技巧後，最後只需要關注的一個地方就是，預期指令放入後應達成什麼目標，接著再去尋找要從什麼角度或可取得的資訊去比對來作為我們斷言的內容即可。

而接下來我們以一個 `v-foucs` 的客製化指令來介紹如何斷言客製化指令與尋找比對資訊：

```js
const vFocus = {
  mounted: (el) => el.focus(),
}
```

---
**1.註冊指令**

首先，要進行斷言我們可以透過容器中第二個參數的 `global.directives` 來註冊我們的客製化指令：

```js
  const wrapper = mount(..., {
    global: {
      directives: {
        Focus: vFocus, // 屬性匹配的名稱規則 Abc 會 match 到 v-abc
      },
    },
  })
```

**2.仿造元件並放入指令**

接著我們要使用到仿造元件的技巧，讓容器一開始就載入一個假的元件，並且放入指令與 `data-test` 屬性供捕獲：

```js
const Component = {
    template: '<input v-focus data-test="target" type="text"/>',
}
const wrapper = mount(..., {
    global: {
          directives: {
            Focus: vFocus,
          },
    },
})
```

**3.尋找比對目標**
再來，由於目標是為了驗證是否該元素為瀏覽器中的 `focus` 元素，因此要利用到瀏覽器物件 `Document` 中的 [activeElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement) 屬性，若有被聚焦的情況下那應該要能夠比對到同個元素。（由 `jsdom` 提供模擬的瀏覽器環境）

**4.斷言**
最後在斷言的部分，為了取得目標元素，我們可以透過 `wrapper.find().element` 取得目標的元素實體，最後就可以拿他與 `document.activeElement` 做比對：

```js
it('v-focus', async () => {
  const Component = {
    template: '<input v-focus data-test="target" type="text"/>',
  }
  const wrapper = mount(Component, {
    attachTo: document.body,
    global: {
      directives: {
        Focus: vFocus,
      },
    },
  })

  expect(wrapper.find('[data-test="target"]').element).toBe(document.activeElement)
})
```

如此一來我們就可以確保將來在使用 `v-focus` 指令時，該元素在 `mounted` 後會是聚焦的元素。

以上便是幾個常見的 Vue APIs 要如何在測試案例中模擬的介紹，而到了這邊我們大部分的測試案例都要能寫的出來啦！因此明天將會是我們的⋯⋯測驗時間！！！
