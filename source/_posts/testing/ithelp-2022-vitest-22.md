---
title: 【語法ノ章】元件測試：模擬 Vue APIs（data, props）
date: 2022-10-07 19:25:39
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

# Vue API
今天要開始介紹的部分是如何透過 Vue Test Utils 工具所提供的 API 來模擬元件的使用，接著我們就可以依照需求模擬出各種情境來測試我們的元件，而今天我們要介紹的部分主要有 `data` 與 `props`：

<!-- more -->

## data

注意：在模擬 data 之前需要注意的是，在大部分的測試時我們通常不必特意去模擬 data，應該讓其與元件本身的私有方法（private method）自然互動即可，若會需要透過模擬 data 來操作元件則要觀察是否資料與元件本身耦合了，這種情況下可能造成元件本身無法高度重複利用。
 
> **私有方法（private method）**
> 封閉在元件、物件⋯⋯等等中的函式，在外部無法存取得到。
> e.g.
> ```js
> function add5(x){
>     const add = (x,y,) => x + y
>     return add5(5, x)
> }
> ```
> 裡頭的 `add` 函式即為私有方法。

若是真的有需要用到模擬 `data` 屬性時，首先要注意元件是用何種方式（options API /composition API 與 `<script setup>`）來使用 `data`，因為寫法上將會有所不同；且依照設定的時機還可分為「初始狀態」與「後續操作」。

### data（options API）
```html
<template>
    <p data-test="target">{{ content }}</p>
</template>
<script>
export default {
    data() {
        return {
            content: ''
        }
    }
}
</script>
```

data（option API）初始狀態模擬，可透過容器（wrapper）的第二個參數帶入：
```js
/* 測試程式碼 */
const wrapper = mount(component, {
    data(){
        return {
            content: 'test'
        }
    }
})

expect(wrapper.find('[data-test="target"]').text()).toEqual('test')
```

若要模擬後續才設定 data（option API），則可以透過容器方法中的 `setData()` 設置，此外由於是非同步的方法，要記得 `async/await` 才能確保斷言正確：

```js
it('...', async () => {
    const wrapper = mount(component)

    await wrapper.setData({
        content: 'test'
    })
    expect(wrapper.find('[data-test="target"]').text()).toEqual('test')
})
```

### data（composition API, `<script setup>` 語法糖）
composition API：
```html
<script>
export default {
    setup() {
        const content = ref('')
        return {
            content
        }
    }
}
</script>
```
`<script setup>` 語法糖：
```
<script setup>
import { ref } from 'vue'
const content = ref('')
</script>
```
這一類透過 `setup()` 所處理的資料，若要模擬會遇到不少問題。

在容器方法中的第二個參數所提供的方式，原先是供應給 `options` API 中的 `data` 屬性所使用，所以我們必須改以注入的方式嵌入 `setup()`：

```js
/* 測試程式碼 */
const wrapper = monut(component, {
    setup(){
        return {
            content:''
        }
    }
})
```

但如此一來，元件中原先其他寫在 `setup()` 內的狀態等就必須一起模擬，還記得好的元件測試守則之一嗎？沒錯，就是不要重複實踐實作。

那比較好的方式之一就是透過容器方法中（wrapper）取得實體來設置變數，並且透過 `nextTick` 方法確保渲染結果：

```js
it('...' , async () => {
    /* 測試程式碼 */
    const wrapper = monut(component)
    wrapper.vm.content = 'text'

    // 版本1: 直接使用 vm 內的 $nextTick
    await wrapper.vm.$nextTick()

    /* 版本2: import { nextTick } from 'vue' */
     * await nextTick()
     */

    expect(wrapper.find('[data-test="target"]').text()).toEqual('test')
})
```

而關於私有方法或變數的模擬，或許將來 Vue Test Utils 開發團隊會對此有些改觀提供一些逃生艙的方法，不過目前比較一致的角度是盡量別對這一類的私有環境才有的變數與方法去做模擬，即時的相關討論可見於[這裡](https://github.com/vuejs/test-utils/pulls?q=composition)。而本系列文後續相關內容也基於此因素不再提供有關與私有環境要如何模擬，避免讀者搞混。

## props
在不模擬私有情境的前提之下，prop 相較起來單純多了，而關於測試 props 的部分主要有：

- 模擬 props 傳入後，斷言「後續的狀態」。
- 斷言「是否傳入對的參數給子元件」。

### 模擬 props 傳入
要模擬 props 傳入的方法依照時機可分為「初始狀態」與「後續操作」：

```html
<template>
    <p data-test="target">{{ content }}</p>
</template>
```

初始狀態同樣是藉由容器（Wrapper）中的第二個參數傳入：
```js
it('', () => {
    const wrapper = mount(component, {
        props: {
            content: 'Hello'
        }
    })
    expect(wrapper.find('[data-test="target"]').text()).toEqual('Hello')
})
```

若想要後續才傳入 `props` 則可以透過容器方法 `setProps`模擬，並且一樣要小心非同步的問題，記得補上 `async` / `await` ：

```js
it('...', async () => {
    const wrapper = mount(component, {
        props: {
            content: 'Hello'
        }
    })
    expect(wrapper.find('[data-test="target"]').text()).toEqual('Hello')
    await wrapper.setProps({ content: 'Good bye' })
    expect(wrapper.find('[data-test="target"]').text()).toEqual('Good bye')
})
```

###  斷言是否傳入對 props 參數給子元件

既然有接收的一方，那就至少會有給予的一方。

在 props 驗證中的另一種方式就是驗證給予其他元件的參數是否正確：

```
<template>
    <BaseLightbox content"Hello" enableMask="true" />
</template>
```

首先我們要做的是透過之前學的選擇器方法選到特定的元件，接著透過容器方法底下的 `props()` 來取的傳送資訊，接著就可以透過斷言 Matcher 來比對 props 給元件的資訊是否正確：

```
import { BaseLightbox } from './BaseLightbox.vue'
it('', async () => {
    const wrapper = mount(component)
    const target = wrapper.get(BaseLightbox)
    
    expect(target.props(content)).toEqual('Hello')
    expect(target.props(enableMask)).toEqual(true)
    expect(target.props()).toEqual({
        content: 'Hello',
        enableMask: true,
    })
})
```
--- 

以上是今日有關於如何在測試案例中模擬元件 `data` 與 `props` 的介紹。

[如先前所提](https://ithelp.ithome.com.tw/articles/10302568)，針對元件在進行測試時，我們所關注的點主要在於「元件溝通介面後續所造成的影響」，比方受測元件做為子層元件的角色時，接收到 `prop` 、 `slot` 或 `inject` 時，是否有「渲染（render）出正確的結果」、「回傳（emit event）預期的內容給父層」等等行為，因此後續寫這方面的測試案例時要多注意是否是因為邏輯設計上的關係，導致必須要用奇形怪狀的方式來寫測試。