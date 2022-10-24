---
title: 【進階ノ章】覆蓋率（Coverage）
date: 2022-10-18 17:40:05
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

# 程式碼覆蓋率（Code Coverage）

在測試領域中，覆蓋率（Coverage）一詞泛指的是以百分比表示測試程式碼能夠涵蓋多少產品程式碼的範圍，而依據不同的覆蓋率種類，其細微的定義也會有所不同。

接下來我們以覆蓋率工具庫 c8 來說明覆蓋率的概念與如何透過 c8 在 Vitest 測試環境中檢視當下的測試覆蓋率，最後再來談談有關於覆蓋率的相關議題。

<!-- more -->

## c8

要在 Vitest 測試環境中使用 c8 產生覆蓋率報告，我們首先需要安裝 `@vitest/coverage-c8`：

```bash
npm i -D @vitest/coverage-c8
```

接著就可以在 `package.json` 中新增指令：

```json
{
  "scripts": {
    "test:coverage": "vitest --environment jsdom --coverage"
  }
}
```

執行 `npm run test:coverage` 後，預設會在終端機產生出覆蓋率報告：

![https://ithelp.ithome.com.tw/upload/images/20221018/20119062lKkr6nTtkH.png](https://ithelp.ithome.com.tw/upload/images/20221018/20119062lKkr6nTtkH.png)

而 c8 覆蓋率報告總共有四種類型：

- 行數覆蓋率（line coverage）：以行數為單位來計算。
- 函式覆蓋率（function coverage）：以內部的函式為單位來計算。
- 分枝覆蓋率（branch coverage）：以每個判斷式為單位來計算。
- 語句覆蓋率（statement coverage）：以每個語句（statement）為單位計算。

測試程式碼涵蓋多少範圍的產品程式碼，甚至於每行程式碼個被執行了幾次

並且若有未覆蓋行數的情況， c8 則會在 Uncovered Line 中顯示未涵蓋的行數範圍，如下圖中的 `13-17,19-28`

![https://ithelp.ithome.com.tw/upload/images/20221018/20119062H4yYnGfHBS.png](https://ithelp.ithome.com.tw/upload/images/20221018/20119062H4yYnGfHBS.png)

躺若你覺得這種報告形式不方便觀看，或是希望將它製作成文件，則可以在 config.js 檔中設定 `coverage.reporter` 的形式：

```js
// vite.config.js or vitest.config.js
export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
```

其中 c8 提供的報告（reporter）選項有以下三種：

- `text`： 在終端機中呈現覆蓋率報告。

![https://ithelp.ithome.com.tw/upload/images/20221018/201190627GKM0l78fQ.png](https://ithelp.ithome.com.tw/upload/images/20221018/201190627GKM0l78fQ.png)

- `json`： 以 JSON 格式產生覆蓋率報告。

![https://ithelp.ithome.com.tw/upload/images/20221018/20119062Kt7ISm9g3h.png](https://ithelp.ithome.com.tw/upload/images/20221018/20119062Kt7ISm9g3h.png)

- `html`： 產生一個可互動的 HTML 覆蓋率報告。

![https://ithelp.ithome.com.tw/upload/images/20221018/2011906268egcXCSuM.png](https://ithelp.ithome.com.tw/upload/images/20221018/2011906268egcXCSuM.png)

其中 HTML 的版本中，我們還可以點擊測試檔案來查看未覆蓋的行數有哪些，相較終端機的版本，我們就不必再拿著行數去對程式碼了：

![https://ithelp.ithome.com.tw/upload/images/20221018/20119062lC3REV70h1.png](https://ithelp.ithome.com.tw/upload/images/20221018/20119062lC3REV70h1.png)

## 覆蓋率目標

而在瞭解怎麼查看覆蓋率報告後，那麼究竟覆蓋率目標要達到多少才是合理呢？

以 《可測試的 JavaScript》一書作者 Mark Ethan Trostler 提供的答案是單元測試大約要介於 80 % 左右。

以 Martin Fowler 於 [Test Coverage](https://martinfowler.com/bliki/TestCoverage.html) 一文中，則是指出大約會在於 80 至 90 % 附近。

至於為什麼不是達到百分之百呢？接下來我們來探討有關於覆蓋率相關的議題。


## 覆蓋率議題

### 覆蓋率與付出的心力

雖然以理論上來說盡可能得達到高覆蓋率，測試程式碼將涵蓋的越完全，然而為了追求 100 % 的覆蓋率所要付出的心理將會截然不同。

Jeroen Mols 在 [The 100% code coverage problem](https://jeroenmols.com/blog/2017/11/28/coveragproblem/) 一文中的提到了心力付出與覆蓋率的關係表。

![https://ithelp.ithome.com.tw/upload/images/20221018/20119062DxhbP4mmbR.png](https://ithelp.ithome.com.tw/upload/images/20221018/20119062DxhbP4mmbR.png)
> 引用自 Jeroen Mols 《The 100% code coverage problem》一文中的圖

從上圖中可以看見，在覆蓋率從 0 提升至 80% 我們僅需要付出一些心力就可以輕易達成，然而要將 90% 提升至接近 100% 我們則幾乎要投入兩到三倍以上的心力才能完成。

因此，有些人雖然會認為 100% 的覆蓋率是一個不錯的目標，但是在實際上，我們可能會因為追求 100% 的覆蓋率而付出過多的心力，而導致測試程式碼的品質反而變差。

### 覆蓋率 100% 的誤區

在費盡千辛萬苦後，我們終於達到了 100% 覆蓋率的情況了。

然而，100 % 的覆蓋率僅能代表測試程式碼完整（Complete）的覆蓋了產品程式碼，並非代表測試程式碼的品質達到完美（Perfect），接下來我們用個簡單的例子來說明：

```js
const max = (x, y) => return x

test('max', () => {
  expect(max(2, 1)).toBe(2)
})
```

在上方案例中，我們可以看見 `max` 測試案例基本上已經完全覆蓋了 `max` 函式的實作情況，而我們可以從這個案例中看出兩個問題：

- 產品程式碼本身有問題，即便測試程式碼覆蓋了 100% 的情況下，產品程式碼本身仍然是有問題的。
- 測試程式碼案例與路徑不足，導致覆蓋率為 100% 的情況下，並沒有測出產品程式碼中的問題與邊際案例（edge case）。

因此覆蓋率 100% 充其量只是一個指標，用來告訴我們測試程式碼是否完整的覆蓋了產品程式碼，而非「完全沒有問題」。

倘若我們想要盡可能避免這種情況的發生，這時我們就可以透過突變測試（Mutation Testing）來協助我們。

## 突變測試（mutation testing）

突變測試（Mutation Testing）是一種驗證與改善測試程式碼的測試方法，概念上來說，他會盡可能的抽換產品程式碼中的每個角落，接著依照抽換規則來預期測試程式碼的檢測結果。

假設我們有個比較函式如下：

```js
const greaterThan = (x, y) => x > y
```

而這時我們測試程式碼可能會這麼處理：

```js
it('should return true if x is greater than y', () => {
  expect(greaterThan(2, 1)).toBe(true)
  expect(greaterThan(0, -1)).toBe(true)
  expect(greaterThan(100, 0)).toBe(true)
})
it('should return false if x is less than y', () => {
  expect(greaterThan(1, 2)).toBe(false)
  expect(greaterThan(-1, 0)).toBe(false)
  expect(greaterThan(0, 100)).toBe(false)
})
```

接著突變測試可能會將 `greaterThan` 函式中的 `>` 符號替換成 `>=` 符號，此時理論上來說應該會有測試案例失敗，但是實際上測試程式碼卻沒有檢測到這個問題，那就表示我們的測試程式碼並沒有覆蓋到這個案例。

此時我們就可以針對這種情況，再補上對應的測試案例：

```js
it('should return true if x is greater than y', () => {
  expect(greaterThan(2, 1)).toBe(true)
  expect(greaterThan(0, -1)).toBe(true)
  expect(greaterThan(100, 0)).toBe(true)
})
it('should return false if x is less than y', () => {
  expect(greaterThan(1, 2)).toBe(false)
  expect(greaterThan(-1, 0)).toBe(false)
  expect(greaterThan(0, 100)).toBe(false)
})
// 新增案例
it('should return false if x is equal y', () => {
  expect(greaterThan(1, 1)).toBe(false)
})
```

接著突變測試再度將 `>` 符號替換成各種符號（e.g. `<=`），甚至是將 `{}` 語句（statement）清空，而諸如此類的手法，就是突變測試的核心概念。

> 若想手動置換產品程式碼中的符號，可以從這些方法下手
> - operator: `+`, `-`, `*`, `/`
> - condition: `<`, `>`, `<=`, `>=`, `==`, `===`, `!=`, `!==`
> - statement: `{}`, `if`, `else`, `for`, `return`, `throw`, `try`, `catch`
> - expression: `&&`, `||`, `!`
> ..., etc.

### 突變測試的工具

雖然說我們可以手動置換產品程式碼中的各種符號，但是這樣的作法會讓我們的工作量變得非常龐大，因此我們可以透過工具來協助我們完成這些工作。

以前端領域來說，我們可以透過 [Stryker Mutator](https://stryker-mutator.io/) 底下的 [`stryker-js`](https://github.com/stryker-mutator/stryker-js) 工具來完成這些工作。

![https://ithelp.ithome.com.tw/upload/images/20221018/20119062cbZHth4wOw.png](https://ithelp.ithome.com.tw/upload/images/20221018/20119062cbZHth4wOw.png)

Stryker Mutator 的概念就是透過替換不同的符號產生出突變的內容，而我們的測試程式碼應該要捕捉到那些不合理的情況，藉此來保證我們的測試案例有一定的穩固性。

然而，可惜的是 `stryker-js` 目前僅支援到 Jest 環境，尚未支援 Vitest 的環境，因此我這邊就暫不做介紹了，有興趣者可以追蹤該 [issue](https://github.com/stryker-mutator/stryker-js/issues/3465) 目前的最新進度。

---

以上便是有關於覆蓋率的基本概念與如何在 Vitest 中透過 c8 查看目前覆蓋率的介紹，雖然突變測試工具目前尚未支援 Vitest，因此暫時只能透過手動替換來增加穩固度，但是確實是個能夠增強我們測試案例的好方法，若你有更好提升測試案例的穩定性的方法與工具，歡迎在下方留言分享與討論！