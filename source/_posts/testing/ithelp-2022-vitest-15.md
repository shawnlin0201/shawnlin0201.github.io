---
title: 【語法ノ章】斷言（Assertion）下篇： 替身、快照（Snapshot）與拋出錯誤
date: 2022-09-30 19:40:18
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
昨天有關斷言（Assertion）的部分我們已經瞭解到「斷言風格」（Assertion Style）在寫法上有非常大的差異，並且也從裡頭選擇介紹了 Jest 的斷言 `expect` 相關的 `Matcher`：

- 常用：`toBe`, `not`
- 純值比對（Primitive）類型: `String`, `Number`, `Boolean`..., etc.
- 陣列比對與檢查
- 物件比對與檢查

而剩下還沒介紹到的 `Matcher` ，每個部分除了語法本身之外，都有一些值得一提的地方，因此特地拆成另一篇來介紹他們有哪些不同之處！

<!-- more -->

## 再戰 Jest expect Matchers

- 監聽函式
- 快照
- Error

### 監聽函式

在測試的過程中，有時候我們不僅只是斷言受測物（SUT, System Under Test）的狀態，有時候可能會對受測目標的「依賴物」（DOC, Depended-on Component）狀態有興趣，而這時我們就無法單純以 Matchers 來斷言，因為我們需要監聽依賴物前後的變化。

而在程式測試領域中，測試替身（`test double`）主要就是負責處理這一類非受測物本身所做的事情，並且在需要時還能幫我們紀錄必要的資訊

假若我們今天測試案例受測物本身會去呼叫到的依賴目標是個「函式」時，這時我們可以透過 `Vitest` 所提供的 `vi.fn()` 來模仿（spy）函式。

`vi.fn()` 本身會回傳一個實體（`CallableMockInstance`），在這個實體中會記錄著有關測試函式時會需要的資料與方法：
```js
console.log(vi.fn())

/*
  called: false,
  callCount: 0,
  results: [],
  calls: [],
  impl: [Function (anonymous)],
  reset: [Function: i],
  nextError: [Function (anonymous)],
  nextResult: [Function (anonymous)],
  restore: [Function: w],
  ...
*/
```

因此將受測的目標函式放入 `vi.fn` 中，後續只要測試過程中如果測試目標去調用了已被 Spy 過的函式時，`CallableMockInstance` 就會幫我們紀錄相關的資訊，接著我們就可以使用斷言語法相關的 Matcher 去比對我們預期的結果，比方說：

- `toHaveBeenCalled`：斷言函式有被呼叫過
```js
const sayHi = (something) => something
const spyOnSayHi = vi.fn(sayHi)

spyOnSayHi()
expect(spyOnSayHi).toHaveBeenCalled()
```

- `toHaveBeenCalledTimes`：斷言函式被呼叫過幾次
```js
const sayHi = (something) => something
const spyOnSayHi = vi.fn(sayHi)

spyOnSayHi()
spyOnSayHi()
spyOnSayHi()

expect(spyOnSayHi).toHaveBeenCalledTimes(3)
```

- `toHaveBeenCalledWith`：斷言函式被呼叫時所帶的參數
```js
const sayHi = (something) => something
const spyOnSayHi = vi.fn(sayHi)

spyOnSayHi('Hello, Unit-Test!')

expect(spyOnSayHi).toHaveBeenCalledWith('Hello, Unit-Test!')
```

- `toHaveReturned`：斷言函式呼叫後應該至少要返回值一次
```js
const sayHi = (something) => something + ' Hello, Spy!'
const spyOnSayHi = vi.fn((val) => sayHi(val))

spyOnSayHi('Hello, Unit-Test!')

expect(spyOnSayHi).toHaveReturned()
```

- `toHaveReturnedTimes`：斷言函式經過操作後應該要返回值幾次
- `toHaveLastReturnedWith`：斷言函式經過操作後最後應該要返回的值
- `toHaveNthReturnedWith`：斷言函式經過操作後第 N 次應該要返回的值
```js
const sayHi = (something) => something
const spyOnSayHi = vi.fn((val) => sayHi(val))

spyOnSayHi('Nice to meet you!')
spyOnSayHi('See you again!')

expect(spyOnSayHi).toHaveReturnedTimes(2)
expect(spyOnSayHi).toHaveLastReturnedWith('See you again!')
expect(spyOnSayHi).toHaveNthReturnedWith(1, 'Nice to meet you!')
```

- `toHaveReturnedWith`：斷言函式呼叫後返回的值
```js
const sayHi = (something) => something + ' Hello, Spy!'
const spyOnSayHi = vi.fn((val) => sayHi(val))

spyOnSayHi('Hello, Unit-Test!')

expect(spyOnSayHi).toHaveReturnedWith('Hello, Unit-Test! Hello, Spy!')
```

而測試替身（test double）除了像是 `vi.fn()` 這類間諜類型（Spy）之外，還有許多不同的測試替身，它們在測試中都有各自的用途來協助我們更好的測試，後續將會有一篇專門來解說不同測試替身概念與相關的語法。

### 快照測試（Snapshot Testing）與快照 matchers 

在[測試金字塔](https://ithelp.ithome.com.tw/articles/10296174)一文中我們有提到，Edd Yerburgh 在規劃測試類型時除了單元測試外最多佔比的部分就是快照測試（Snapshot Testing），可見快照測試的重要性如此之高，那麼快照測試是什麼呢？

#### Jest Snapshot

在 Jest 的 [Snapshot Testing](https://jestjs.io/docs/snapshot-testing) 說明文件的定義中主要指的是用來防止 UI 出現尚未預期的變化：

```html
<template>
    <a data-test="link" href="http://ithelp.ithome.com.tw"> Ithelp  </a>
</template>
```

```
import { mount } from '@vue/test-utils'
it('渲染連結', () => {
  const wrapper = mount(component)
  expect(wrapper.find([data-test="link"]).toMatchSnapshot();
});
```

然而這邊的變化，並非你所想像的把視覺畫面給照相下來比對像素或比例的那種視覺回歸測試（Visual Regression Testing），而是藉由將目標元件透過渲染（Render）元件產生了一個 DOM 結構的文字，並在測試程式檔路徑底下的 `__snapshots__` 資料夾生成一個 `.snap` 檔案來做紀錄：

```js
exports[`渲染連結`] = `
<a
    data-test="link"
    href="http://ithelp.ithome.com.tw"
>
    Ithelp
</a>
`;
```
> 截至 Jest Snapshot 頁面中的[程式碼]https://jestjs.io/docs/snapshot-testing)

在第二次執行測試的時候，就會再次做一次同樣的流程，而這次所產生的結果會與先前的 `.snap` 紀錄做比對。

假設比對上有落差就會拋出錯誤：
```
- Snapshot - 1
+ Received + 1

<a
-  href="http://ithelp.ithome.com.tw"
+  href="https://ithelp.ithome.com.tw"
> Ithelp
</a>
```

藉由這個比對機制從而實現「防止 UI 出現尚未預期的變化」的功能。

#### Vitest Snapshot

而前面有提到 `Vitest` 本身兼容了 `Jest` 的斷言（assertion）語法，所以快照（Snapshot）的 matcher 自然也是不能放過。

在 `Vitest` 中主要兼容的 matcher 部分有：
- `toMatchSnapshot`
- `toMatchInlineSnapshot`

基本上概念與 Jest Snapshot 相似，都是在做結構快照這件事情，然而 `Vitest` 文件部分則是沒有特地強調 UI 的部分，而是關注在值（`value`）的比對。

因此我們單純放入一個陣列物件
```js
  it('cat snapshot', () => {
    const target = [
      {
        name: 'Orange',
        age: 4,
      },
      {
        name: 'Blank',
        age: 6,
      },
    ]
    expect(target).toMatchSnapshot()
  })
```
`.snap` 的結果：
```js
exports[`component > cat snapshot 1`] = `
    [
        {
          "age": 4,
          "name": "Orange",
        },
        {
          "age": 6,
          "name": "Blank",
        },
    ]
`;
```
甚至也可以引入 JSON 檔案來做快照：
```js
import Area from './area.json'
it('static json snapshot', () => {
expect(Area).toMatchSnapshot()
})
```
當然元件快照也是能做的：
```js
import { mount } from '@vue/test-utils'
it('snapshot', () => {
    const wrapper = mount(component)
    const target = wrapper.find('[data-test="content"]')
    expect(target).toMatchSnapshot()
})
```

而以上快照部分如果你覺得要生成一個檔案來管理有點囉唆，那麼你可以透過 `toMatchInlineSnapshot` 來處理這類的需求，其差別在於生成的位置會是在 `toMatchInlineSnapshot()` 函式本身裡面：

```js
  it('cat snapshot', () => {
    const target = [
      {
        name: 'Orange',
        age: 4,
      },
      {
        name: 'Blank',
        age: 6,
      },
    ]

    // 原先 toMatchInlineSnapshot 內沒有任何東西
    // 在執行測試後就會將快照內容自動生成在 toMatchInlineSnapshot 裡
    expect(target).toMatchInlineSnapshot(`
      [
        {
          "age": 4,
          "name": "Orange",
        },
        {
          "age": 6,
          "name": "Blank",
        },
      ]
    `)
  })
```

最後，如果遇到變更的部分是我們所預期的時候，此時就需要更新快照的部分，可以在執行測試的 `watch` 模式時按下 `u` 鍵，就將新的快照保存起來，或是透過新增 `npm scripts` 指令來執行命令：

```js
{
  "scripts": {
    "test:update": "vitest -u",
  },
}
```

總結一下快照部分，若有需要預防未預期變更的靜態檔案如「JSON 檔」、「UI 元件」⋯⋯等，都可以透過快照來處理，如果不想特地開一個檔案來管理，可以透過 `toMatchInlineSnapshot` 來斷言。



### Error

最後想介紹到的則是錯誤類型的 Matcher：
- `toThrowError`
- `toThrowErrorMatchingSnapshot`
- `toThrowErrorMatchingInlineSnapshot`

先前我們有提到測試案例預想的[三個路徑](https://ithelp.ithome.com.tw/articles/10297571)（Happy path, sad Path & Bad Path），`Bad Path` 從產品角度上來說 End-User 使用上的錯誤，應該考慮從產品使用角度上去思考要怎麼協助他們去使用，所以不應該為了拋出錯誤而拋出。

但假設今天拋出錯誤的情境是較為合理的部分，比方是針對開發人員在開發時期誤用導致的錯誤⋯⋯等等情況，這時我們就可以透過這一類 Matcher 來處理。

而使用上要比較小心的是，受測目標若會拋出錯誤則要透過 wrap function 的形式來處理，否則拋出的錯誤會造成測試案例的斷言錯誤：
```js
it('', ()=>{
    const food = (name) => {
      // ...
      if(name === '小黃瓜'){
        throw new Error('我不吃小黃瓜')
      }
    }
    expect(food('小黃瓜')).toThrowError('我不吃小黃瓜') // 若這樣寫的話裡頭的 Error 會導致測試案例失敗
    expect(() => food('小黃瓜')).toThrowError('我不吃小黃瓜') // 需要透過這種方式才能正確斷言
})
```

以上包含昨天的部分，主要就是將來我們在撰寫測試案例中的斷言（Assert）時會用到的 Matcher 概念與使用方法，而由於 Matchers 真的有不少東西，所以還有些許部分沒介紹到，若有興趣查看的話可以到 Vitest expect API [文件](https://vitest.dev/api/#expect)中查閱。

而明天的部分我們將要來綜合這三天所習得的語法來個小小的測驗，畢竟學習最快的方式就是動手直接下去做哩！那麼我們明天見！祝大家週末愉快。