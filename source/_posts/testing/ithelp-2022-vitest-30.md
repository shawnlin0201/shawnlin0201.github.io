---
title: 【語法ノ章】Vue Ecosystem 篇：Vue Router 測試
date: 2022-10-15 23:00:42
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

前幾天測試替身相關章節最主要的強項主要都是在當我們專案實作過程中有依賴外部模組或工具時，我們可以透過替身的方式來測試我們的邏輯，而不需要真的去執行外部模組或工具，這樣可以減少測試時間，也可以避免測試時因為外部模組或工具的問題而造成測試失敗。

因此測試替身我們必須先走過一次概念，才能更好的理解替身本身要做的事情；接著語法的部分則要瞭解到 Vue Test Utils 與 Vitest 提供了哪些語法可以供我們選擇使用；最後，在測試的部分我們才能透過洽當的概念和語法來撰寫出更好的測試案例。

所以今天我們就要來看看當我們在使用 Vue 周邊工具時，我們要如何利用測試替身來撰寫測試案例！

<!-- more -->

# Vue Router 測試

- Vue Router 簡介
- Vue Router 測試關注點
- Vue Router 測試實作
    - 孤立型測試：以 Mocked Router 作為受測物
    - 社交型測試：以專案中的 Router 作為受測物

## Vue Router 簡介

Vue Router 提供了 SPA 類型專案一個良好管理路由的工具，並與 Vue 有良好的整合，讓我們在開發以 Vue 為基底的專案，處理路由時能更加的輕鬆愜意。

而在使用 Vue Router 時，我們主要會一個基本的路由設定：

router.js
```js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // ... more routes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

接著再將設定引入到我們的 Vue 專案中：

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

如此一來，在元件開發的過程中就能透過 Vue Router APIs 來做路由上的處理：

App.vue:
```html
<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <button @click="goToContactPage">Contact Me</button>
    <router-view />
  </div>
</template>
```

```js
import { useRouter } from 'vue-router'

export default {
  setup() {
    const $router = useRouter()
    const goToContactPage = () => $router.push('/contact')
    return { goToContactPage }
  }
}
```

## Vue Router 測試關注點

在撰寫有關 Vue Router 的測試時，我們主要會關注在模擬 End User 操作過程中，是否有正確的觸發 Vue Router 的 API，比方像是：

- 使用者點擊 `<router-link>` 時，是否有正確的觸發 `router.push()` 等 API？
- 根據行為在觸發 Router APIs 時所帶的參數是否正確？
- 根據我們所設定的「潛在規則」最後所導向的路由是否正確？

而我們只要確保這部分能正確的被測試到，基本上就能確保我們大部分的 Vue Router 相關內容。

## Vue Router 測試實作

在撰寫 Vue Router 測試時，我們主要可以分為兩種類型：

- 孤立型測試：以 Mocked Router 作為受測物
- 社交型測試：以專案中的 Router 作為受測物

這兩種類型的差異純屬於測試的觀察角度不同，對應實作上的差異則在於測試案例中我們要如何取得 Router 實例。

而接下來我們以部落格當中常見的編輯文章按鈕為例，並以 options API 與 composition API 版本來分別撰寫兩種類型的測試。

### Options API

在 options API 風格中，我們主要是透過 `this.$router` & `this.$route` 來取得 Router 相關資訊與控制方法：

App.vue
```html
<template>
    <!-- 元件某處 -->
    <button data-test="button" @click="goToEditPage">編輯文章</button>
</template>
```

```js
export default {
    props: {
        isUserLogin: false // 這裡為了理解方便單純模擬判斷使用者是否登入，並非最佳實踐
    },
    methods: {
        goToEditPage() {
            if(this.isUserLogin){
                this.$router.push(`/articles/${this.$route.params.id}/edit`)
            } else {
                this.$router.push(`/login`)
            }
            
        }
    }
}
```

#### 在 Options API 中以孤立型測試撰寫 Vue Router 測試

在孤立型測試中，我們可以透過 Vue Test Utils 中的容器（Wrapper）中的選項 `global.mocks` 來模擬 `vue-router` 中的 `$route` & `$routes` 操作：

```js
const wrapper = mount(App, {
  global: {
    mocks: {
      $route: {
        params: {
          id: 1
        }
      },
      $router: {
        push: vi.fn()
      }
    }
  }
})
```

而在 `$router` 中的 `push` 方法，我們可以透過 `vi.fn()` 來模擬呼叫行為，如此一來我們就可以捕捉到相關資訊。

最後，我們就可以根據 `isUserLogin` 選項，產生 Happy Path 與 Sad Path 的測試案例：

- 若使用者登錄狀況下點擊編輯文章按鈕，則應該要導向 `/articles/{根據路由取得文章的 id}/edit` 的路由
- 若使用者未登錄狀況下點擊編輯文章按鈕，則應該要導向 `/login` 的路由
App.spec.js:
```js
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
    it('should go to edit page when click button if user is Login', async () => {
        // Arrange
        const mockRoute = {
            params: {
                id: 10308907,
            }
        }
        const mockRouter = {
            push: vi.fn(),
        }
        const wrapper = mount(App, {
            props: {
                isUserLogin: true,
            },
            global: {
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter,
                }
            }
        })
        // Act
        await wrapper.find('[data-test="button"]').trigger('click') // 點擊後應觸發 router.push() 事件

        // Assert
        expect(mockRouter.push).toHaveBeenCalledTimes(1)
        expect(mockRouter.push).toHaveBeenCalledWith('/articles/10308907/edit')
    })
    it('should go to login page when click button if user is not Login', async () => {
        const mockRoute = {
            params: {
                id: 10308907,
            }
        }
        const mockRouter = {
            push: vi.fn(),
        }
        const wrapper = mount(App, {
            props: {
                isUserLogin: false,
            },
            global: {
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter,
                }
            }
        })
        await wrapper.find('[data-test="button"]').trigger('click')

        expect(mockRouter.push).toHaveBeenCalledTimes(1)
        expect(mockRouter.push).toHaveBeenCalledWith('/login')
    })
})
```

#### 在 Options API 中以社交型測試撰寫 Vue Router 測試

在社交型測試中，我們會直接在測試案例中引入 Route 設定，並真實透過 Vue Router 創造一個 Router 來進行測試：


```js
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"

const router = createRouter({
    history: createWebHistory(),
    routes
})
```

而在測試案例中，我們則要改由用容器選項中的 `global.plugins` 來注入 `router`：

```js
const wrapper = mount(App, {
  global: {
    plugins: [router]
  }
})
```

另外，撰寫測試案例中若有透過 `router.push()` 來導向路由，則需要透過 `router.isReady()` 來確保路由已經準備好：

```js
router.push('/articles/10308907/edit')
await router.isReady()
```

除此之外，若有需要斷言網頁內容的資訊時，則需要透過 Vue Test Utils 所提供的 `flushPromises` 來確保所有非同步的行為都已經完成：

```js
await flushPromises()
expect(wrapper.html()).toContain('After async action')
```

最後我們將上述內容組裝起來，完整的社交型 options API 的測試案例如下：

```js
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"

const router = createRouter({
    history: createWebHistory(),
    routes
})

describe('App.vue', () => {
    beforeEach( async() => {
        // 在每個測試案例執行前，都會先將路由準備好
        router.push('/')
        await router.isReady()
    })
    it('should go to edit page when click button if user is Login', async () => {
        // Arrange
        const wrapper = mount(App, {
            props: {
                isUserLogin: true,
            },
            global: {
                plugins: [router]
            }
        })

        // Act
        await wrapper.find('[data-test="button"]').trigger('click') // 點擊後應觸發 router.push() 事件

        // Assert
        expect(router.push).toHaveBeenCalledWith('/articles/10308907/edit')
    })
    it('should go to login page when click button if user is not Login', async () => {
        const wrapper = mount(App, {
            props: {
                isUserLogin: false,
            },
            global: {
                plugins: [router]
            }
        })

        await wrapper.find('[data-test="button"]').trigger('click')

        expect(mockRouter.push).toHaveBeenCalledWith('/login')
    })
})
```

### Composition API

在 Composition API 風格中，我們主要是在 `setup` 函式，透過 `useRouter`、`useRoute` 來取得 Vue Router 的相關資訊與操作方法：

App.vue
```html
<template>
    <!-- 元件某處 -->
    <button data-test="button" @click="goToEditPage">編輯文章</button>
</template>
```

```js
import { useRouter } from 'vue-router'
export default {
    props: {
        isUserLogin: false // 這裡為了理解方便單純模擬判斷使用者是否登入，並非最佳實踐
    },
    setup(props){
        const $router = useRouter()
        goToEditPage() {
            if(props.isUserLogin){
                $router.push(`/articles/${this.$route.params.id}/edit`)
            } else {
                $router.push(`/login`)
            }
            
        }
        return {
            goToEditPage
        }
    }
}
```

#### 在 Composition API 中以社交型測試撰寫 Vue Router 測試

與 options API 相同，在社交型測試中我們一樣需要在測試案例準備好 Router 的相關設定，並且引入 `createRouter`、`createWebHistory` 來建立 Router 實體：

```js
import { vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

const router = createRouter({
    history: createWebHistory(),
    routes,
})
```

但由於這次我們是使用了真實的 Router 來當作測試對象，因此這時後我們若想要捕捉 Push 的行為，就必須透過 `vi.spyOn` 來替身出 `router.push` 方法，最後我們才能透過這個替身斷言結果：

```js
const spyPush = vi.spyOn(router, 'push')
```

完整的測試案例如下：

```js
import { vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

describe('App.vue', () => {
    beforeEach( async () => {
        router.push('/')
        await router.isReady()
    })
    it('should go to edit page when click button if user is Login', async () => {
        // Arrange
        const wrapper = mount(App, {
            props: {
                isUserLogin: true,
            },
            global: {
                plugins: [router],
            },
        })

        // Act
        const spyPush = vi.spyOn(router, 'push')
        await wrapper.find('[data-test="button"]').trigger('click') // 點擊後應觸發 router.push() 事件

        // Assert
        expect(spyPush).toHaveBeenCalledWith('/articles/10308907/edit')
    })
    it('should go to login page when click button if user is not Login', async () => {
        const wrapper = mount(App, {
            props: {
                isUserLogin: false,
            },
            global: {
                plugins: [router],
            },
        })

        const spyPush = vi.spyOn(router, 'push')
        await wrapper.find('[data-test="button"]').trigger('click')

        expect(spyPush).toHaveBeenCalledWith('/login')
    })
})
```

以上便是我們在進行 Vue Router 測試中，針對不同風格時的撰寫測試案例與技巧，相信看到這邊你應該會對於測試替身的應用有更深層的認知了，往後遇到其他第三方套件的測試時就可以應用這些技巧來撰寫測試案例。

而雖然以天數來說今天系列文已經完賽了，但我們還有一些東西可以繼續來看看哩，而明天我們將會來看看要如何撰寫新一代的 Vue Store 工具 Pinia 要如何來進行測試，敬請期待！
