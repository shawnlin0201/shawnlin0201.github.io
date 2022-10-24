---
title: 【初始ノ章】測試建置：Vitest Config Setting
date: 2022-09-19 15:33:53
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

開發的過程中，有時候工具原先的設定並不符合當下開發的需求，因此本章節將來看看要如何調整 Vitest 設定，段落的部分將分為：

- Vitest Config 設定方式
- 瀏覽常見的 Vitest Config Option

<!-- more -->

--- 

## Vitest Config 設定方式

Vitest 測試在執行的時候預設會基於原先專案中的 `vite.config.js` 設定檔，所以沒有需要調整的話不太需要另外設置，需要調整的話 Vitest 也提供了三種方法讓你在不同開發情境下選擇調整方式：

- 透過 `vitest.config.js` 檔案調整測試設定
- 執行 `npm` 指令時帶參數指定設定檔案路徑
- 直接在原先 `vite.config.js` 中調整


### 透過 vitest.config.js 檔案調整測試設定
若想區隔開發與測試用的設定時，可以在專案根目錄中新增 `vitest.config.js` 檔案，這會比原先參考的 `vite.config.js` 擁有更高的優先權。

不想將原先在 `vite.config.js` 設定都重新全寫一次的話，也可以在 `vitest.config.js` 中，使用 `mergeConfig` 來融合 `vite.config.js` 的設定：

    
```js
import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config' // 原先的 vite 設定檔案

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // 在這裡加入測試設定
  },
}))
```

### 執行 npm 指令時帶參數指定設定檔案路徑
若想要在執行的時候去引入不同的設定檔案，則可以在 `package.json` 指令中透過 `--config` 加上設定檔案的路徑（e.g. `vitest --config ./src/scripts/vitest.config.js` ）：

```js
{
  //...
  "scripts": {
    "test:unit": "vitest --config ./src/__test__/config/vitest.config.js",
  }
  //...
}
```
接著該檔案就如設定 `vitest.config.js` 一樣調整就可以了：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  test: {
    // 在這邊加入設定
  },
})

```
       


### 在專案中的 vite.config.js 中調整測試設定

若想在原先的 `vite.config.js` 中調整測試設定，有兩種方式可以使用：

第一種是直接在最上方加入 `/// <reference types="vitest" />` 後，在 `test` 屬性中加入設定：
    
        
```js
/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // 在這邊加入設定
  },
})
```
        
第二種，把原先的 `defineConfig` 改由 `vitest/config` 傳入後，在 `test` 屬性中加入設定：
    
        
```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // 在這邊加入設定
  },
})
```
        
    
## Vitest config option

至於 Vitest config 能調整什麼內容呢，這裡列了幾個常見的調整選項：

- ****include****
- ****exclude****
- **globals**
- **environment**

> 註：以下部分資料引用 [Vitest Config Option](https://vitest.dev/config/) 並翻譯與補充。

### include

- Type：`string[]`
- 預設值：`['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']`



藉由這個欄位我們可以提供 glob 格式讓 vitest 去比對哪些是測試檔案，也可以放入多個條件在陣列中。

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.spec.js'],
  },
})
```

這個設定主要會影響到後續我們要如何擺放測試程式碼，因此做規劃時可以按需求考量調整。

### **exclude**

- Type： `string[]`
- 預設值： `['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**']`


藉由這個欄位我們可以提供 glob 格式讓 vitest 去排除哪些不是測試檔案，也可以放入多個條件在陣列中。

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**'],
  },
})
```

與 `include` 相反，這次則是要排除哪些路徑不需要尋找是否有測試檔案，其中如果有用到 `cypress` 做 E2E 測試的話，預設規則中就已經有另外排除了，所以沒必要的話不必特別設置，但可以先記得有這個方便的欄位。

**Globals**

- Type：`boolean`
- 預設值： `false`


由於在撰寫測試時，Vitest 預設是需要自己按需要引入對應的方法等等，如果要類似像 Jest 以全域的方式注入到測試中，就可以透過在執行時加上 `--globals` 選項，或是在 vitest config 選項中加入 `globals: true` 。

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
  },
})
```

原先設定前，測試程式碼需要如下方引入：

```js
import { describe, it, expect } from 'vitest'

describe('HelloWorld', () => {
  it('1 + 1 should be 2', () => {
    expect(1 + 1).toBe('2')
  })
})
```

加入 `Globals: true` 後，就不需要顯示引入 vitest 測試相關的 API，讓測試看起來更乾淨：

```js
describe('HelloWorld', () => {
  it('1 + 1 should be 2', () => {
    expect(1 + 1).toBe('2')
  })
})
```

### **environment**

- Type：`'node' | 'jsdom' | 'happy-dom' | 'edge-runtime' | string`
- 預設值： `'node'`


由於 Vitest 本身默認環境 Node.js，因此若要在測試中仿造瀏覽器的應用程式，可以透過類似 `jsdom` 等工具來取代，而已經介紹過的npm 指令的寫法之外 `-environment jsdom` ，還可以在測試檔案上以 docblock 或 comment 風格的方式註記。

Docblock 風格：

```js
/**
 * @vitest-environment jsdom
  */

it('use jsdom in this test file', () => {
  const element = document.createElement('div')
  element.innerHTML = '<p>Hello, HTML!</p>'
  expect(element.innerHTML).toBe('<p>Hello, HTML!</p>')
})
```

Comment 風格：

```js
// @vitest-environment jsdom

it('use jsdom in this test file', () => {
  const element = document.createElement('div')
  element.innerHTML = '<p>Hello, HTML!</p>'
  expect(element.innerHTML).toBe('<p>Hello, HTML!</p>')
})
```

寫在 vitest config 中：

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
})
```

如此一來在測試中我們就可以模擬 Web 端環境來操作了。

---

以上是 Vitest 幾個比較常見的設定，其餘的設定後續也會按需求陸續提到，若對於其他設定選項有興趣的，也可以直接到官方文件中的 [config 分頁](https://vitest.dev/config/) 查看。

明天開始，我們將進入測試概念的環節，開始深入探討測試價值、什麼時候需要測試與撰寫測試的流程等等相關議題。