---
title: Vue-cli 單一元件檔（ 以 iT 邦幫忙鐵人賽檔案當作開發範例）續
date: 2019-10-06 20:30:33
tags:
- [前端]
- [JavaScript]
- [Vue.js]
- [Vue-cli]
categories: 
- [JavaScript, Vue.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/vue-logo.png' width='200px' height='200px' />
</div>

## 單一元件檔 props
今天要來把昨天製作好的元件檔案拆分的更乾淨一點，昨天我們的資料都還放在**元件自己本身中的 data 裡面**，這樣子在 View 頁面使用時套用該元件都只會讀到元件自己本身中的資料，而我們今天要來將元件中的 data 清除乾淨，透過父層在決定要使用這個元件時，才將要輸入的資料傳遞進去。

<!--more-->

首先，我們將元件自己本身中的 data 給清除，因為我們之後將會由父層去決定塞什麼資料給子元件，並且在裡面塞入 props 欄位，指定這個子元件能夠接收父層傳遞哪個欄位給他：

子元件的 script 區塊：
```
<script>
export default {
  name: "articleBoard",
  props: { json: null }
};
</script>
```

接著，template 區域，改動的地方最主要是在於 li 標籤元素中，原本我們是透過 `this.json.iron` 去抓取子元件自己本身的資料，而現在要改成 `json` 去對應到 script 中 props 所給予的資料（也就是父層傳遞進來的欄位）！

```
<template>
  <section class="board-wrapper">
    <div class="board-header">
      <div class="header-title">鐵人檔案</div>
      <div class="header-deco"></div>
    </div>
    <ul class="board-body">
      <li v-for="(year,index) in json" :key="index">
        <article class="article-wrapper">
          <div class="article-year">{{ year.irontitle }}</div>
          <div class="article-body" v-for="(articles,index) in year.articles" :key="index">
            <a class="article-type">{{ articles.type }}</a>
            <a class="article-title" :href="articles.href">{{ articles.title }} 系列</a>
            <p
              class="article-info"
            >{{ articles.info.success ? '鐵人練成' : '鐵人未練成' }} ｜ 共 {{ articles.info.count }} 篇文章 ｜ {{ articles.info.subscribe }} 人訂閱</p>
          </div>
        </article>
      </li>
    </ul>
    <div class="board-footer"></div>
  </section>
</template>
```

調整完畢後，現在該元件已經可以接受來自父層所傳遞的資料了。現在我們把該元件檔命名為 `articleBoard.vue` 並把它放入 `/src/components/board/ ` 的路徑底下，並且在 `/src/view` 路徑中的元件檔中透過 import 引入這個元件，並取名為 `infoBoard`（可自由命名），然後把資料 data 放在這個父層中模擬由父層給予子元件資料的過程：

```
<script>
import infoBoard from "@/components/board/articleBoard";

export default {
  name: "home",
  components: {
    infoBoard
  },
  data() {
    return {
      json: [
        {
          irontitle: "第 11 屆 iT 邦幫忙鐵人賽",
          articles: [
            {
              type: "Modern Web",
              title:
                "「小孩才做選擇，我全都要。」小白也能輕鬆瞭解的 Vue.js 與 D3.js 。",
              href: "https://ithelp.ithome.com.tw/users/20119062/ironman/2242",
              info: {
                success: true,
                count: 32,
                subscribe: 39
              }
            }
          ]
        },
        {
          irontitle: "2019 邦幫忙鐵人賽",
          articles: [
            {
              type: "自我挑戰",
              title: "挑戰連續三十天喝不同家手搖飲。",
              href: "",
              info: {
                success: false,
                count: 29,
                subscribe: 512
              }
            },
            {
              type: "自我挑戰",
              title: "連續三十天發廢文。",
              href: "",
              info: {
                success: true,
                count: 999,
                subscribe: 87
              }
            }
          ]
        }
      ]
    };
  }
};
</script>
```

在 Home.vue 的 template 中，我們使用剛剛命名的 `infoBoard` 來當作標籤使用，接著使用 `json` 欄位來引入資料，然後這樣只會將後面的值 `"this.json.iron"` 當作資料寫進去，要與 Vue.js 元件本身檔案有關係的話我們仍必須透過 `v-bind` 去引用，因此最後是使用 `:json` 來引入 `this.json.iron` 而非 `json`：

```
<template>
  <div class="page page-home">
    <infoBoard :json="this.json.iron" />
  </div>
</template>
```

完成之後我們就得到了一個由 Home.vue 父元件所引入的 articleBoard.vue 子元件，並且透過父層傳遞資料進去給他，而最後顯示的畫面應該還是要跟之前一模一樣才對：

![https://ithelp.ithome.com.tw/upload/images/20191006/20119062Hl3TkzMIgb.jpg](https://ithelp.ithome.com.tw/upload/images/20191006/20119062Hl3TkzMIgb.jpg)

差異在於今天可以由父層的 data 去給予這個元件不同的資料，而非寫死在子元件裡面的，所以現在每個頁面都可以使用這個元件了！

![https://ithelp.ithome.com.tw/upload/images/20191006/20119062tW3oLgXAz3.jpg](https://ithelp.ithome.com.tw/upload/images/20191006/20119062tW3oLgXAz3.jpg)

然而問題馬上就出現了，現在我們已經可以自由引入這個元件，並透過 data 去引入他的資料，但是萬一這個資料哪天要更動，不就每個引用這個 data 的元件都要改變嗎？因此有個東西叫做 Vuex 他替我們解決了這個問題...

![https://ithelp.ithome.com.tw/upload/images/20191006/20119062BvFnfN60P6.jpg](https://ithelp.ithome.com.tw/upload/images/20191006/20119062BvFnfN60P6.jpg)

> 補班的隔天一整個睡死，起來就看到兩姊弟不知道在討論什麼秘密……？
> ![https://ithelp.ithome.com.tw/upload/images/20191006/20119062nlEYZZB7Dw.jpg](https://ithelp.ithome.com.tw/upload/images/20191006/20119062nlEYZZB7Dw.jpg)