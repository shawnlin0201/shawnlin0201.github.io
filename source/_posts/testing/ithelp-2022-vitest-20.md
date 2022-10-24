---
title: 【語法ノ章】元件測試：容器方法（Wrapper methods）－取得目標資訊
date: 2022-10-05 18:41:53
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

## 容器方法（Wrapper methods）

元件經由容器（Wrapper）包裝後，我們就能在測試案例中透過容器方法（Wrapper methods）來測試各種跟元件有關的資訊，而昨天我們主要介紹到了要如何選定到特定的元素、元件，接著介紹了判斷目標物是否「存在(exists)」與是否「顯示（isVisible）」等相關方法。

今天我們主要來介紹其餘有關資訊的部分：
- 取得屬性（attribute）
- 取得內容物（content）

<!-- more -->

---

### 判斷屬性
- attributes
- classes

#### attributes
當你想要確認 `<a>` 中的 `href` 是否帶有指定的連結或是檢查 `<img>` 上的屬性時，這時就可以透過 `attributes` 取得屬性。

而 `attributes` 用法主要有兩種，直接使用時會獲取目標

```html
<a data-test="link" href="https://ithelp.ithome.com.tw/" target="_blank">ithelp</a>
```
```js
wrapper.find('[data-test="link"]').attributes() // { href: 'https://ithelp.ithome.com.tw/', 'target': '_blank' }
```
當想要直接取得特定屬性值時也可以直接將屬性名稱帶入參數中：
```js
wrapper.find('a').attributes('target') // '_blank'
```
#### classes
同樣的，若想要尋找 `class` 屬性的話可以透過 `classes` 語法取得資訊。你可能會直覺地想到 `class` 也是屬性的一種那應該用 `attributes('class')` 查詢。然而這兩者的差別最主要在於產出的結果會有所不同。

```html
<section data-test="wrap" class="container w-full h-full">
    <p>Title</p>
</section>
```

若使用 `attributes('class')` 查詢結果將會是字串形式的資料，後續要處理比對上的問題會稍微麻煩一點：
```js
wrapper.find('[data-test="wrap"]').attributes('class') // "container w-full h-full"
```

若是使用 `classes` 語法查詢的話將得到一個陣列的結果：
```js
wrapper.find('[data-test="wrap"]').classes() // ["container", "w-full", "h-full"]
```

此時就可以配合 `toContain` 等陣列的斷言 Matcher 快速處理測試案例：
```js
expect(wrapper.find('[data-test="wrap"]').classes()).toContain('container')
```

這對於測試樣式採用原子化設計的工具（Tailwind CSS、Windi CSS 等）有奇效，我們可以將視覺層的邏輯透過 `classes` 的結果斷言。

因為這類原子化設計工具往往依賴 `class` 屬性來做樣式上的調整與擴充，通常為了美觀與管理方便會順便在使用這類工具時加裝自動排序（sorting）`class` 屬性等擴充工具，因此 `class` 的順序將變成不穩定的狀態。

因此元素若從：

```html
<p data-test="content" class="A B C">content</p>
```

變成：

```html
<p  data-test="content" class="A C B">content</p>
```

對於快照測試等 Matcher (`toMatchSnapshot`, `toMatchInlineSnapshot`)來說將會顯示測試失敗：

```js
expect(wrapper.find('.content')).toMatchSnapshot()
```

快照比對結果：

```shell
-     class="A B C"
+     class="A C B"
```

而以陣列比對是否「包含」的方式，將不受影響。

```
expect(wrapper.find('.content').classes()).toContain('A')
expect(wrapper.find('.content').classes()).toContain('B')
expect(wrapper.find('.content').classes()).toContain('C')
```

後續也可再依照不同情境的需要，擴展比對的寫法。

---

### 判斷內容物
最後，有關資訊的部分則是取得目標的內容（content）：
- text
- html

#### text
`text` 主要是取得目標元素節點後代的所有文字：

RootComponent.vue
```html
<div data-test="target">
    Root
    <child-component />
    <child-component />
    <child-component />
</div>
```

ChildComponent.vue
```html
<p>child</p>
```

使用 `mount` 包裝元件時 `wrapper.find('[data-test="target"]').text()` 的結果將會是：
```html
Rootchildchildchild
```

使用 `shallowMount` 包裝元件時 `wrapper.find('[data-test="target"]').text()` 的結果將會是：

```html
Root
```

#### html
與 `text` 類似，但 `html` 會將目標元素後代所有元素都記錄下來：

RootComponent.vue
```html
<div data-test="target">
    Root
    <child-component />
    <child-component />
    <child-component />
</div>
```

ChildComponent.vue
```html
<p>child</p>
```


使用 `mount` 包裝元件時 `wrapper.find('[data-test="target"]').html()` 的結果將會是：
```html
Root
<p>child</p>
<p>child</p>
<p>child</p>
```

使用 `shallowMount` 包裝元件時 `wrapper.find('[data-test="target"]').html()` 的結果將會是：

```
Root
<child-component-stub></child-component-stub>
<child-component-stub></child-component-stub>
<child-component-stub></child-component-stub>
```

因此在使用 `text` 與 `html` 來進行斷言時，要注意到「測試所需包含的範圍」以及「元件容器」應採用 `mount` 還是 `shallowMount` 等議題，才能讓測試更加強韌且不會讓後續開發無相關的內容時一直被測試攔住。


以上就是與取得元素、元件資訊相關的容器方法，明天我們將來看看有關模擬鍵盤與滑鼠操作的容器方法。