---
title: 【概念ノ章】測試替身（Test Double）：Dummy, Stub, Spy, Fake & Mock
date: 2022-10-11 23:44:02
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

目前有關測試相關文章幾乎都會提及的 **測試替身（Test Double）** 一詞，主要可追溯自 Gerard Meszaros 於 2007 年所寫的[《xUnit Test Patterns》](https://www.tenlong.com.tw/products/9780131495050)。

在書中的測試替身模式（Test Double Patterns）章節裡。作者詳細描述測試替身在做的事情，並根據測試替身所模擬的環節再進一步細分出五種不同測試替身各自能做的事情，而本文主要將參照該書中所提及的內容，以前端測試的角度來詮釋測試替身的概念。

<!-- more -->

---

# 受測物（SUT）與依賴物（DOC）

要認識測試替身最有效的方式，要從觀察受測物（System Under Test，SUT）與依賴物（Depended-On Component，DOC）在測試案例中的關係開始。

首先，我們假設專案中有 `SectionBlock` 與 `SectionBlockTitle` 兩個元件可供我們使用：

SectionBlock.vue：
```html
<template>
    <section>
        <section-block-title :title="title" />
        <slot></slot>
    </section>
</template>
```

SectionBlockTitle.vue：
```html
<template>
    <h2> {{ title }} </h2>
</template>
```

其中 `SectionBlock` 在樣版中使用了 `SectionBlockTitle` 元件。

後續若針對 `SectionBlock` 元件在撰寫元件測試的時候，我們可能會遇到下列這種情況：

```js
import component from './SectionBlock.vue'

it('should ...', () => {
    const wrapper = mount(component) // 實際上依賴於 SectionBlockTitle 元件

    expect(wrapper.html()).toMatchInlineSnapshot()
})
```

在這個測試案例中，我們測試目標主要是以 `SectionBlock` 元件為主，因此 `SectionBlock` 即為受測物（SUT），而受測物本身依賴的 `SectionBlockTitle` 元件即為依賴物（DOC）。

然而，由於我們現在尚未把依賴物給取代掉，因此測試結果會受到依賴物的影響；也就是說，未來若 `SectionBlockTitle` 元件的更動了，都會有機會間接導致 `SectionBlock` 的相關測試案例失敗。

這時，若我們想要使測試案例更加的單純，讓測試結果更加地專注在受測物身上，此時我們就會需要測試替身來隔離我們的依賴物。

---

# 測試替身

![https://ithelp.ithome.com.tw/upload/images/20221011/20119062N17Kuqdtxl.png](https://ithelp.ithome.com.tw/upload/images/20221011/20119062N17Kuqdtxl.png)
> 上圖參考《xUnit Test Patterns》一書重新繪製

測試替身（Test Double）最主要的概念，就是以不同的模仿程度與模仿方式替代我們的依賴物（DOC），而最終目標之一則在於使我們的測試流程能夠更加單純。

以上方的測試案例來說，若我們想更專注於 `SectionBlock` 元件本身的行為時，這時可以透過先前提過的 `shallowMount` 容器來隔離子層元件：

```js
it('should ...', () => {
    const wrapper = shallowMount(component) // 透過 shallowMount 底下的元件將強迫渲染成 <-stub> 元件

    expect(wrapper.html()).toMatchInlineSnapshot()
})
```

經由 `shallowMount` 的幫助，現在 `SectionBlockTitle` 將會被固定渲染為 `<section-block-title-stub>` 元素，因此接下來在測試案例中我們就不用時時刻刻擔心 `SectionBlockTitle` 元件所帶來的任何影響，而這個 `<-stub>` 元件，即是測試替身的其中一種類型的呈現。

現在我們已經瞭解測試替身在整個測試中大致上的定位了，然而我們還有什麼時候會需要他呢？

## 使用時機

當我們在使用測試替身時，此時可能意味著我們在撰寫測試案例時有下列需求：

- [孤立型（Solitary）](https://ithelp.ithome.com.tw/articles/10296174) 門派的單元測試寫法會想將受測物本身邏輯隔離出來，盡可能不受依賴物影響。
- 觀察並斷言受測物與依賴物之間的互動，但是沒有可以紀錄的方式。
- 想查看依賴物所產生的結果，但依賴物本身並不會直接返回結果，因此無法斷言。
- 依賴物需要執行較長一段時間才會回應受測物需要的內容，固定將其假扮成某個特定回傳值來減少等待時間。（遵循優良測試 [F.I.R.S.T](https://ithelp.ithome.com.tw/articles/10298760)中的快速原則）

只要有上面的需求，基本上我們就可以透過測試替身來協助我們達成，而我們要做的事情，便是根據不同的使用時機與目的來挑選合適的測試替身。

## 測試替身種類與用法
測試替身型態百百種，而依據 Gerard Meszaros 於《xUnit Test Patterns》一書所劃分的版本，測試替身根據概念來說，總共可以分為以下五大種類型：
- Dummy Object
- Test Stub
- Test Spy
- Mock Object
- Fake Object

接下來，我們將參考自 Martin Fowler 在 [Test Double](https://martinfowler.com/bliki/TestDouble.html)一文中對 Meszaros 五種測試替身的概念解說，配著 Gerard Meszaros 的測試替身概念圖，來瞭解各種測試替身的用法。

---

### Dummy Object
在整個測試案例過程中，有時候我們可能會遇到某些方法因為參數、介面需要，一定要填入某個資料，但是該資訊跟測試案例中的邏輯完全沒有關聯。

```js
it('should showing when props isShow = true' , () => {
    const wrapper = mount(component, {
        props: {
            isShow: true, // 真正要測試的項目
            content: 'test' // 此項在 component 被設為 require 選項，所以一定要填內容。
        }
    })

    // 斷言時用不到 content 中的內容，我們關注在 isShow 參數與視覺上的呈現
    expect(wrapper.get('[data-test="target"]').exists()).toBe(true)
})
```
---

### Stub
![https://ithelp.ithome.com.tw/upload/images/20221011/201190626HAgRbrP7V.png](https://ithelp.ithome.com.tw/upload/images/20221011/201190626HAgRbrP7V.png)
> 上圖參考《xUnit Test Patterns》一書重新繪製

在撰寫測試時，有時候我們可能會遇到針對受測物斷言時，會受到依賴物的干擾，此時我們可以透過 `Stub` 的測試替身種類來替換掉我們不在意的部分。

```js
it('should stubs by custom component', () => {
  const StubComponent = {
    name: 'StubComponent',
    template: '<p>stub content</p>'
  }

  const wrapper = mount(Component, {
    global: {
      stubs: { TargetComponent: StubComponent }
    }
  })

  expect(wrapper.html()).toEqual('<div><p>stub content</p></div>')
})
```
---

### Spy
![https://ithelp.ithome.com.tw/upload/images/20221011/20119062mc0g2WHPpS.png](https://ithelp.ithome.com.tw/upload/images/20221011/20119062mc0g2WHPpS.png)
> 上圖參考《xUnit Test Patterns》一書重新繪製

類似於 `Stub` 的測試替身情況，但這次我們關注在受測物原先要與依賴物互動的詳細資訊，而這一部分會由測試替身來代替我們捕捉。

```js
it('...', () => {
  const getApples = vi.fn(() => 0)

  const collectFruit = () => getApples()

  collectFruit()
  collectFruit()

  expect(getApples).toHaveBeenCalledTimes(2)
})
```

---

### Mock
![https://ithelp.ithome.com.tw/upload/images/20221011/20119062JtEfErRYBf.png](https://ithelp.ithome.com.tw/upload/images/20221011/20119062JtEfErRYBf.png)
> 上圖參考《xUnit Test Patterns》一書重新繪製

當我們使用 Mock Object 這類型的測試替身來捕捉受測物的行為時，這時我們測試所關注的焦點會改為放在受測物是否如我們預期般的使用測試替身，間接證明原先使用依賴物時是否正確。

```js
import axios from 'axios'
import { fetchSomething } from './servce'

vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn(),
    },
  }
})

it('fetch something and axios.get should have been called', async () => {
  await fetchSomething()

  expect(axios.get).toHaveBeenCalledTimes(1)
})
```

---

### Fake
![https://ithelp.ithome.com.tw/upload/images/20221011/20119062rj1rMnx4ip.png](https://ithelp.ithome.com.tw/upload/images/20221011/20119062rj1rMnx4ip.png)
> 上圖參考《xUnit Test Patterns》一書重新繪製

Fake 這一類的測試替身，基本上可以看作是依賴物的輕量版本，基本上會實作出與依賴物原先差不多的功能，但多半會為了方便測試而調整實作的內容。

比方在 `Vitest` 中有提供一個 API 叫 `vi.useFakeTimers`，若我們在測試案例中使用它時，我們就可以操弄有關於 `setTimeout` 或 `setInterval` 等等原先計時相關的 API。（e.g. 控制 `setTimeout` 固定幾秒回傳）

---

看到這裡，相信讀者應該對於測試替身有個基礎的認知了，而明天開始我們將要來介紹到在 Vitest 或 Vue Test Utils 有哪些關於測試替身的語法部分，並結合今天學到的概念，完善我們的測試案例，讓測試更加的簡潔！

> 最近變天有點小感冒，差點來不及發文 （怕爆