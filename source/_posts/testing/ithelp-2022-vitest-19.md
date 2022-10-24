---
title: 【語法ノ章】元件測試：容器方法（Wrapper methods）－選擇器與陷阱
date: 2022-10-04 19:16:43
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

# 容器方法（Wrapper methods）

在進行測試時，前面章節有提到我們會使用 `mount` 或 `shallowMount` 來包裹元件，從而得到一個 `VueWrapper`，而在這個 `VueWrapper` 裡頭有許多實用的容器方法（Wrapper methods），雖然官方文件中並沒有特意分類，但大意上可分為幾種方法：

- 查詢、選擇指定的元素、元件等選擇器
- 取得目標屬性或內容（class, attribute）
- 觸發 DOM 事件（如滑鼠點擊、鍵盤輸入與按鍵⋯⋯等）
- 取得 emit 事件、設置 data 或 prop、甚至觸發元件 `unmmount` 等 Vue API 相關的方法

而今天要著重在於介紹選擇器的方法使用與測試應用，最後補上相關的討論：
- 元素、元件選擇器
- 判斷目標是否存在：`exists` 與 `isVisible`
- 使用 `data-*` attribute

<!-- more -->

## 選擇器

在進行元件測試（component testing）的過程中，有時我們可能只想關注在某個特定 DOM 或元件的相關資訊時，這時我們就可以透過容器中的選擇器方法來尋找，而選擇器根據選取對象的不同，主要分為：

- 元素（element）選擇器
- 元件（component）選擇器

### 元素選擇器

元素選擇器語法基本上有兩種寫法，一種是基於元素的 `refs`，另一種則是 `querySelector`：

```html
<template>
    <p ref="dogcat">???</p>
    <p id="dog">科基</p>
    <p class="cat">橘貓</p>
    <p class="cat">黑黑</p>
</template>
```

```js
/* ref */
wrapper.find({ ref: 'span' })

/* querySelector */
wrapper.find('#dog')
wrapper.find('.cat')
```

而容器方法有關選取元素的選擇器一共分為三種：
- find
- findAll
- get

這三種選擇器在選取到目標後主要都是返回 `DOMWrapper`，此時我們就可以在串連其他容器方法（Wrapper methods）如 `classes` 或 `text` 等等來取得屬性或內容資訊，只是返回的結果內容會有些差異。

比方 `find`、`findAll` 的部分主要差別在於 `findAll` 返回的內容會被放置於陣列當中：

```html
<template>
    <p id="dog">科基</p>
    <p class="cat">橘貓</p>
    <p class="cat">黑黑</p>
</template>
```

而我們可以透過像這樣的方式取得陣列內的資訊：
```js
it('should be display correct content', () => {
    const wrapper = mount(component)
    const target= wrapper.find('#dog') // <DOMWrapper> 
    expect(target.text()).toBe('科基')
})
it('should be display correct content', () => {
    const wrapper = mount(component)
    const target= wrapper.findAll('.cat') // <DOMWrapper>[]

    expect(target[0].text()).toBe('橘貓')
    expect(target[1].text()).toBe('黑黑')
})
```

> 注意：透過 `findAll` 斷言時是「有序」的，很容易受到順序改變而導致測試案例失敗，除非撰寫測試案例目標之一就是要確保順序不會調動，否則改用 `find` 斷言會比較不容易受影響。

而 `find` 與 `get` 的差別在於 `find` 找不到目標時返回的是 `{}` 後續若仍繼續操作、斷言時才會由拋出錯誤（由 `ErrorWrapper` 提供）；然而 `get` 一開始若找不到目標時就直接拋出錯誤（throw `Error`）了。

根據 `ErrorWrapper` [原始碼](https://github.com/vuejs/test-utils/blob/f61b8aeb84352b29e29666326939531cd81c3bd6/src/errorWrapper.ts)，可以看見他主要是針對容器方法中的 `exists()` 會返回 `false`。

因此在針對找不到元素的測試案例合法的寫法可以這麼做：
```js
expect(() => wrapper.get('.something-that-does-not-exist')).toThrowError()
expect(wrapper.find('.something-that-does-not-exist').exists()).toBeFalsy()
```

#### find 判斷元素陷阱

魔鬼藏在細節裡，或許你可能會想說為什麼不直接用 `find` 還要再另外透過 `exists` 判斷呢，讓我們看看一個案例：

```html
<p>無關緊要的東西</p>
```

如果這時你這麼寫了：
```js
expect(wrapper.find('.something-that-does-not-exist')).toBeTruthy()
// 通過 ！？
```

原因在於 `find` 在找不到的情況下目標的情況所返回的值會是 `ErrorWrapper` 物件，所以透過 `toBeTruthy` 斷言就會通過。

> 而為了避免這種情況發生，官方文件其實只有[輕描淡述](https://test-utils.vuejs.org/api/#get)地說道：
>
> > **As a rule of thumb**, always use `get` except when you are asserting something doesn't exist. In that case use `find`.
>
>但上方經驗考量在哪，只有在追了他們相關的 issue 才會逐漸明白考量的根據，而關於這部分，甚至開發團隊未來可能也會考慮將 `find` 方法給[拔掉](https://github.com/vuejs/test-utils/issues/138)，剩下 `exists` 本身，但礙於這會是個 breaking change 的做法，所以在 `vue-test-utils` 跳大版本號之前應該都會暫時維持原樣。 

---

### 元件（component）選擇器
- findComponent
- findAllfindComponents (注意有個 s）
- getComponent

原則上使用方式與元素選擇器差不多，只是選取語法上除了 `refs` 與 `querySelector` 語法之外，還多了：
- Component name： `findComponent({name: '元件名稱'})`
- 將 import SFC 直接放入方法中： `findComponent(Component)`

但由於使用 `querySelector` 上也有一些[小陷阱](https://test-utils.vuejs.org/api/#findcomponent)（怎麼又是陷阱？），所以個人建議以 SFC 方式引入或是乾脆透過 `shallowMount` 將子層元件 stub 掉也是一種方式。

---

## 判斷目標存在
經由剛剛陷阱的部分大家應該都很清楚 `exists()` 的存在了，而判斷選取目標其實他還有個好朋友就是 `isVisible()`，但他們判斷存在的定義上有一些差別：

`exists()` 主要判斷的是該目標存不存在 DOM 上：
```html
<p>Hello</p>
```

```js
it(exist, () => {
    const wrapper = mount(Component)
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('span').exists()).toBe(false)
})
```

`isVisable()` 主要判斷的是該目標存在 DOM 上之外，視覺上有無顯示在畫面中：
```html
<template>
  <p v-if="false" class="dog">科基</p>
  <p v-show="true" class="orange-cat">橘貓</p>
  <p v-show="false" class="black-cat">黑黑</p>
</template>
```
```js
it('v-if false', () => {
  const wrapper = mount(component)
  expect(wrapper.find('.dog').isVisible()).toBeFalsy() // Error： 直接噴錯
})
it('v-show true', () => {
  const wrapper = mount(component)
  expect(wrapper.find('.orange-cat').isVisible()).toBeTruthy() // 測試通過
})
it('v-show false', () => {
  const wrapper = mount(component)
  expect(wrapper.find('.black-cat').isVisible()).toBeFalsy() // 測試通過
})
```

關於 `isVibile` 更為詳細的判斷如下：
- CSS style 中 含有 display: none => `false`
- CSS style 中 含有 visibility: hidden => `false`
- CSS style 中 含有 opacity :0 => `false`
- <detail> 元素中 hidden 屬性為 `true` => `false`

綜合結論上方陷阱與判斷方法：
- 若要判斷元素是否存在 或 `v-if`：使用 `get` 方法是最保險的，真的要用 `find` 則一定要搭配 `exists`
- 若要判斷 `v-show`：使用 `find().isVisible()`

## 使用 `data-*` attribute

在撰寫測試情境時，若依照上面的 `querySelector` 選了元素、id 或 class 時，初期一定會很開心，因為不會遇到太多困難，但往後在開發的過程執行測試時就很容易有機會遇到各種問題。

原先：
```html
<template>
    <p class="content">content</p>
</template>
```
改成：
```html
<template>
    <p class="content" data-test="content">content</p>
</template>
```

使用 `data-*` 作為選擇目標好處最主要在於顯著標記測試內容，而這影響到的範圍有：
- 開發期，過程不用擔心會影響到測試，如上方所見，我只要變更 `data-test` 以外的內容，預期應該不會影響到測試選擇的目標，使測試案例錯誤能更專注在斷言的目標上，而非選擇目標被替換導致的錯誤。
- 重構（refactor）過程，能清楚比較範圍，若將來調整結構，只要將屬性轉移到對應的位置即可。
- 生產期，能夠針對特定的屬性移除，避免留下各種測試痕跡，對於像是輔助閱讀裝置等技術來說就不會被影響到。

### 在生產環境刪除 `data-*` attribute

若想在 `vitest` 中移除 `data-*` 也非常的簡單，我們只需要在 `vite.config.js` 設定中，針對 Vue 底下的編譯選項做一些調整即可（底下示範的版本為移除 `data-test`，若使用其他命名請自行調整囉）：

```js
const isProd = process.env.NODE_ENV === 'production'
const removeDataTestAttrs = (node) => {
  const NodeTypes = Object.freeze({
    ELEMENT: 1,
    ATTRIBUTE: 6,
  })
  if (node.type === NodeTypes['ELEMENT']) {
    node.props = node.props.filter((prop) => (prop.type === NodeTypes['ATTRIBUTE'] ? prop.name !== 'data-test' : true)) // 請自行替換命名 data-test 
  }
}

export default defineConfig(() => {
  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            nodeTransforms: isProd ? [removeDataTestAttrs] : [],
          },
        },
      }),
    ]
  }
})
```

以上內容便是容器方法（Wrapper Methods）中有關選擇器的用法與相關議題，明天我們將繼續來看其他容器方法！