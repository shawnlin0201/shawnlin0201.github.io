---
title: 【語法ノ章】斷言（Assertion）上篇：斷言語法與 Matchers
date: 2022-09-29 19:24:05
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

斷言（Assertion）在程式設計領域中主要指的是「針對一個結果指出為真（`true`）或假（`false`）」的邏輯判斷式。

而在測試中斷言主要指的部分如先前提到的 3A 模式中的（Assert）步驟：

```js
describe('', () => {
    it('', () => {
      // 準備：Arrange
      const wrapper = mount(component, {
        props: {
            content: 'Hello, Unit-test!'
        }
      })
      // 操作：Act
      wrapper.find('[data-test="button"]').click()
      // 斷言：Assert
      expect(wrapper.find('[data-test="content"]')).toBe('Hello, Unit-test!')
    })
})
```

其中斷言（Assert）階段中在語法的部分則會使用到所謂的「Matchers」，以上方程式碼為例的話就會是 `expect()` 後方的 `toBe()` 這個語法，而不同的「Matchers」能比對的東西也不太一樣，瞭解什麼時候該選什麼 Matchers 基本上寫斷言的時候就能信手捻來。

<!-- more -->

## 斷言語法

依據不同工具或框架所提供的斷言語法（Assertion），對於 Matchers 來說就會有不同的寫法，所以首先我們要先來簡單認識一下不同工具之間的斷言語法風格上的差異，挑選能接受的斷言風格後再來看該風格的 Matcher 用法，而風格的部分以下將依序介紹：
- Chai 斷言庫
- Jest 框架中的斷言語法
- Vitest 中所能用的部分

### Chai Assertion
Chai.js 本身是一個專注在提供斷言語法的工具庫，它提供了三種[寫法](https://www.chaijs.com/guide/styles/)：
- `Assert`(TDD style)
```js
  it('Chai/Assert', () => {
    const x = 'Orange tabby cat'
    const y = 'fat'
    assert(x !== y, 'Orange tabby cat is not fat')
  })
```

- `Expect`(BDD style)
```js
  it('Chai/Expect', () => {
    expect([1, 2]).to.be.an('array').that.does.not.include(3)
  })
```
- `Should`(BDD style)：透過擴充物件 `prototype` 給予 `should` 屬性的方式使我們可以直接鏈式加入 Matchers 在定義好的變數後。
```js
// 選擇一：在斷言前需要呼叫 `chai.should` 方法，
import chai from 'chai'
chai.should()
// 選擇二：直接引入下方
import 'chai/register-should'

// 底下的測試案例就能直接鏈式加上 Matchers
it('Chai/Assert', () => {
    const foo = 'bar'
    const beverages = { tea: ['chai', 'matcha', 'oolong'] }

    foo.should.be.a('string')
    foo.should.equal('bar')
    foo.should.have.lengthOf(3)
    beverages.should.have.property('tea').with.lengthOf(3)
})
```

> BDD style/ TDD style 是什麼
> 

### Jest Assertion
以 Jest 測試框架中所提供的斷言方法則只有：
- Expect(BDD style)：
```js
it('expect/ BDD style', () => {
expect(1).toBe(1)
})
```

> 需特別注意的是 Jest 中的 `expect` 與 Chai 的 `expect` 所提供的 Matchers 是不一樣的。

### Vitest
以 Vitest 測試工具來說，斷言（Assertion）語法的部分他內建了 Chai 斷言庫與兼容了 Jest 中的斷言語法，因此主要就是在以上介紹的四種寫法中選擇一種使用！

而本系列採用的部分主要會以 Jest Assertion 中的 `expect` 語法為主，因此接下來主要著重介紹這一部分的 Matchers 要如何使用！

## Jest expect Matchers

要學習這類 Matchers 除了把 API doc 翻一輪之外，最快的方式之一就是針對不同的測試結果目標類型去歸納，而依照經驗常見種類有：

- 常用：`toBe`, `not`
- 純值比對（Primitive）類型: String, Number, Boolean..., etc.
- 陣列比對與檢查
- 物件比對與檢查
- 監聽函式
- 快照
- Error

由於 Matchers 繁多，所以從常用跟概念容易搞混的幾個開始先介紹起：

---

### 常用

- `toBe`：
對資料類型為純值（Primitive Value）來說就是比對值相等
```js
expect(1).toBe(1) // passed
expect('1').toBe(1) // failed
```
對非純值（Non-Primitive Value）來說就是比記憶體位置（reference）是否相等
```js
const obj = {}
const obj2 = obj
expect(obj).toBe(obj2) // passed
expect({}).toBe({}) // failed

- `not`：用於反轉斷言的邏輯
```js
expect(1).toBe(1) // passed
expect(1).not.toBe(1) // failed
expect(1).not.toBe(2) // passed
```

---
### 純值資料類型比對

- `toBeCloseTo`：處理浮點數運算時
```js
expect(0.1 + 0.2).toBe(0.3) // failed 符點溢出，結果應該會為 0.30000000000000004
expect(0.1 + 0.2).toBeCloseTo(0.3) // passed
```

- `toBeGreaterThan`, `toBeGreaterThanOrEqual` , `toBeLessThan` & `toBeLessThanOrEqual``
```js
expect(5).toBeGreaterThan(1)
expect(5).toBeGreaterThanOrEqual(5)
expect(6).toBeLessThan(7)
expect(6).toBeLessThanOrEqual(6)
```

- `toBeDefined` / `toBeUndefined`
```js
var a = ''
var b
expect(a).toBeDefined() // passed
expect(b).toBeUndefined() // passed
```

- `toBeTruthy` / `toBeFalsy`
```js
expect(1).toBeTruthy() // passed
expect(0).toBeFalsy() // passed
```

- `toBeNull`、`toBeNaN`
```js
expect(null).toBeNull() // passed
```

- `toMatch`：字串或正則比對
```js
expect('0912345678').toMatch(/^09[0-9]{8}$/) // passed
```

---

### 陣列比對與檢查

- `toContain`：陣列是否含有目標值
```js
expect(['1', '2']).toContain('1') // passed
expect(['1', '2']).toContain('4') // failed
```

- `toContainEqual`： 陣列是否含有該值（類型為純值時檢驗是否相等，類型為物件時檢驗結構是否全等）
```js
// passed
expect(['1', '2']).toContainEqual('1') // passed
expect([{ val: '1' }, { val: '2' }]).toContainEqual({ val: '1' })

// failed
expect([{ val: '1', something: 'other' }]).toContainEqual({ val: '1' })
```

- `toHaveLength`：確認其屬性的長度是否相等
```js
expect('12').toHaveLength(2) // passed
expect([1, 2]).toHaveLength(2) // passed
expect({ length: 2 }).toHaveLength(2) // passed
```

---

### 物件比對與檢查

- `toEqual`：比對物件結構是否相同，而非比對參照來源（reference），而結構中若值為 `undefined` 會忽略
```js
const A = { num: 100 }
const B = { num: 100, secret: undefined }
expect(A).toEqual(B) // passed
```

- `toStrictEqual`：
與 `toEqual` 類似，但 `undefined` 不會被忽略。
```js
const A = { num: 100 }
const B = { num: 100 }
const C = { num: 100, secret: undefined }
expect(A).toStrictEqual(B) // passed
expect(A).toStrictEqual(C) // failed
```
甚至 Class 所創造的物件與物件實字（Object Literals）相比也視為不同。
```js
class MockClass {
  constructor(num) {
    this.num = num
  }
}
expect({num: 1}).toStrictEqual({num: 1}) // passed
expect(new MockClass(1)).toStrictEqual({num: 1}) // failed
```

- `toHaveProperty`：檢查物件含有屬性與其屬性值
```js
const obj = { num: 100 }

expect(obj).toHaveProperty('num') // passed
expect(obj).toHaveProperty('num', 100) // passed
expect(obj).toHaveProperty('num', 200) // failed
```

- `toMatchObject`： 檢查物件的子層
```js
const obj = { nested: { num: 200 }, num: 100 }

expect(obj).toMatchObject({ num: 100 }) // passed
expect(obj).toMatchObject({ num: 200 }) // failed
expect(obj).toMatchObject({ nested: { num: 100 } }) // failed
expect(obj).toMatchObject({ nested: { num: 200 } }) // passed
```
---

光是以上 Matcher 就已經夠眼花撩亂了，所以大家不仿先停下來慢慢練習，避免腦負荷過重 XD！
我們明天將繼續講解下列幾個比較特別的 Matcher，因為其中有些概念上與使用時機要特別注意的地方！

- 監聽函式
- 快照
- Error
