---
title: 【語法ノ章】元件測試：容器（Wrapper）
date: 2022-10-03 19:42:51
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

# 容器(Wrapper)

## mount
當我們需要在測試案例中引入元件時，我們可以透過 Vue Test Utils 提供的方法 `mount` 來包裹 Vue 元件。而 `mount` 所返回的內容除了 Vue 實體之外，還包含了一些方法（Wrapper methods）可以讓我們操作元件：


```js
import component from '@/component/BaseButton.vue'

it('should emit clicked event after clicking button', () => {
    // Arrange
    const wrapper = mount(component)

    // Act
    wrapper.trigger('click')

    // Assert
    export(wrapper.emitted()).toHaveProperty('clicked')
})
```

<!-- more -->

假若我們希望在渲染元件的時候同時帶著預設參數與狀態時（如 `props`, `slots`⋯⋯等），就能夠透過 `mount` 方法的第二個參數傳入設定：

```js
const options = {
    props: {
        content: 'Hello, Props!'
    }
}
const wrapper = mounted(component, options)
expect(wrapper.text()).toBe('Hello, Props!')
```

> 而關於方法（Wrapper methods）與選項（Wrapper options）的部分，會根據元件使用 **Options API** / **Composition API** / **`setup script` 語法糖** 而有不同的用法與限制，因此使用方法與差異的部分將在後續測試各種元件上的章節時陸續會提到。

## shallowMount

在正常的專案開發下，元件時常會嵌入了另一個元件：

RootComponent.vue
```html
<ParentComponent></ParentComponent>
```

ParentComponent.vue
```html
<ChildComponent></ChildComponent>
<ChildComponent></ChildComponent>
<ChildComponent></ChildComponent>
```

ChildComponent.vue
```html
<p>baby</p>
```

RootComponent 的元件測試：
```js
import component from './RootComponent.vue'
it('should render corrent content', async () => {
  const wrapper = mount(component)
  expect(wrapper.html()).toBe(`
<p>baby</p>
<p>baby</p>
<p>baby</p>
`)
})
```

但如此一來若我們在測試 RootComponent 元件的時候，就有可能因為底下的 ChildComponent 元件更改了內容導致 RootComponent 測試案例也跟著失敗：

```html
<p>baby</p>
```

若「有意」想要避免這種情況發生，此時就可以將 `mount` 替換掉，改使用 `shallowMount` 來作為容器使用：

```js
import component from './RootComponent.vue'
it('should render corrent content', async () => {
  const wrapper = shallowMount(component)
  // ...
})
```

`shallowMount` 與 `mount` 在使用上幾乎大同小異，而唯一有差別在於他會將原先內部有用到元件的部分以替換為一個模擬元件（stub component），並且命名改以烤肉串命名法（`Kebab case`）並且在最末端加上 `-stub` 供辨識：

```html
<ParentComponent></ParentComponent>
```

經 `shallowMount` 渲染結果變成：

```html
<parent-component-stub></parent-component-stub>
```

如此一來在撰寫測試案例時，就可以關注在當下「父層元件」與「子層元件」的之間的內容，而不管「子層元件」底下所發生的事情：

```js
import component from './RootComponent.vue'
it('should render corrent content', async () => {
  const wrapper = shallowMount(component)
  // ...
  expect(wrapper.html()).toBe(`<parent-component-stub></parent-component-stub>`)
})
```

往後在撰寫測試時可依照必要的情境來決定要使用 `mount` 還是 `shallowMount` 作為容器，而明天我們要繼續來看用了這個容器後，裡頭有內建了哪些好用的方法來幫助我們撰寫元件測試。
