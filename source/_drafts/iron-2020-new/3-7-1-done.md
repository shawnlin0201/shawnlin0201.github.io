---
title: 【驗證模型】3-7 「今晚，我想來點⋯⋯」動手做的餐點選擇器進化！
tags: 《透過認知模型認識 JavaScript》
---


## 實作餐點選擇器，進化！

在 2-7 章節中，我們曾經實作了一個餐點選擇器：

```js
function getTodayCatFood(food) {
    var result = '';
    var randomFood = food[Math.floor(Math.random() * food.length)]

    switch(new Date().getDay()){
        case 1:
        case 2:
        case 4:
        case 5:
        case 6:
            result = randomFood
            break;
        case 0:
        case 3:
            result = randomFood + ' 肉泥' // 透過引數傳入
            break;
    }
    return result
}
getTodayCatFood(['杜格','喜碗','優格','金罐','星球']) // 透過引數傳入
```

而今天我們就要透過這個函式再將它進化得更完整一點，並讓它能夠藉由瀏覽器來呈現！

### 釐清問題

與上次同樣的是，我們在進行開發之前要先來釐清問題究竟在哪，如此一來當我們在實作的時候才不會既沒有解決到痛點，也不會在中途才改變解決的方向，造成開發上不必要的浪費，因此我們再來快速回顧一次當時的情境：

> 在我們家中有兩隻貓咪，一隻叫做橘橘、一隻叫做黑黑，每當下班的時候，總是要思考今天到底要餵什麼食物給他。
> 
> 有關於飼料的部分，在我們家總共有杜格（乾飼料）、喜碗（乾飼料）、優格（乾飼料）、金罐（罐頭）、星球（罐頭）等等飼料，另外還有點心肉泥。
>
> 每個禮拜一到日的時候，我們會從乾乾或罐罐中隨機選擇一種飼料作為他們當日的主食，另外我們還會在禮拜三以及禮拜日的時候加上肉泥當作他們的點心。
> 
> 而我們平常很難決定到底今天要餵什麼食物給他們，並且還要記得給予點心，你能做出功能提醒我今天要給他們吃什麼樣的食物嗎？

經過上面的情境與需求方 ~~（也就是自己？）~~ 討論過後，我們可以列出下面幾個基本的需求：

- 畫面上要顯示出今日的飼料，並且要有儲存的功能以方便忘記的時候可以回來察看。
- 畫面上要有地方可以填入飼料清單，而每日飼料便是從這裏面篩選出其中一種。
- 需求方是個手機重度使用者。

因此為了使用者體驗我們規劃了以下的 Wireframe：

![](https://i.imgur.com/ggrvlom.png)

後續經由一些頁面、功能流程以及設計確認等等流程或許還會有微調的事項，但最終最好要有個完整的設計稿來確認，再進入到下個環節。

## 流程一：刻畫頁面

經過漫長的討論之後，現在假設我們已經拿到了確認好的設計稿，而我們第一步就是先按照設計稿的需求，先將頁面刻畫出來。

在這個流程中，我們最主要是透過 `HTML`、`CSS` 與素材等等先刻畫出整體的頁面，此時先不考慮到有些內容是往後要透過 `JavaScript` 產出的，因為到時候要產生 **樣板（template）** 的過程中，我們可以藉由已經刻畫好的畫面將 `HTML` 的部分直接複製回我們的函式中使用。

另外，在刻畫畫面時，可以藉由事先規劃好之前提過的邏輯流程，藉此幫助你釐清哪些區塊需要成為一個整體，方便後續調整區塊時使用，例如 `header`、`footer` 等等區塊。

> 若還是不太清楚有哪些區塊可以拆分的話，可以參考底下樣式庫中的元件（component）頁面，這些樣式庫基本上實作的元件都是網站中常用功能元件，例如分頁（pagination），卡片（card）等等功能區塊。
> - [Bootstrap](https://getbootstrap.com/docs/4.5/components/alerts/)
> - [Material Design](https://material.io/develop/web/components/app-bars-top)

而最後完成的 [畫面](https://codepen.io/ShawnLin0201/pen/RwRPRvQ) 大概會長成這個樣子：

![](https://i.imgur.com/4J62SDV.png)

此時的版應該是什麼都不能點，但基本上功能都有在畫面中呈現。

## 流程二：渲染頁面函式

在刻畫完畫面之後，接著我們最大的目標之一就是要先將各個頁面各自拆分出去，接著我們才可以依照各個頁面來實作裡面的功能。

然而依照現代網頁開發的設計，我們現在可以透過部分渲染的單頁式設計（Single Page Application）來完成我們的實作。因此，我們會需要一個函式來幫助我們渲染出不同的頁面，

而整體預計的流程邏輯是：

1. 初始化頁面
2. 渲染主頁面
3. 後續依照點擊的頁面

因此我們按照這個順序來一步一步寫出函式。

一開始我們先撰寫 **初始化頁面** 用的函式，而這個函式乘載著之後所有在第一次進入頁面時所需要的各種資源，常見的會有渲染頁面事件、綁定操作事件、初始化資料等等步驟都會在這裡出現，而這裡我們暫時先關注在渲染頁面的邏輯上即可，因此在這裡除了撰寫初始化頁面韓式之外，另外也先預期將會有個渲染頁面用的函式：
```js
function initPage(){
  renderPage('mainpage') // 在初始化頁面後，這裡預期要有個渲染頁面函式
}

initPage() // 初始化頁面
```

接著，我們開始撰寫渲染頁面用的函式，在這裡我們指定了需要更新的區域，並透過 **取得樣板函式** 來取得需要渲染的樣板：
```js
var view = document.querySelector('.view-wrapper')

function renderPage(pagename){
  view.innerHTML = getTemplate(pagename) // 預期藉由傳入不同的頁面名稱來取得各自的樣板
}
```

這裡你可能會覺得為什麼我不把樣板直接寫進去就好，而最大的原因是因為考量到函式的作用儘量要 **保持在做同一件事情上**，而渲染頁面與組裝樣板這件邏輯其實是可以再切分開來的，因此我選擇將它列為另一個函式，來強調各自的作用。

而在負責提供樣版的函式，由於我們剛剛已經將渲染的邏輯切到 `renderPage` 函式當中，因此在 `getTemplate` 的邏輯當中，我們可以關注在於要提供什麼樣版給各自的頁面，這時我們就可以直接從 `HTML` 上拷貝需要渲染的內容：

```js
function getTemplate (pagename){
  var template = {
    mainpage: `
      <div class="card-wrapper">
        <h1 class="card-title">Today's meal</h1>
        <div class="card-content">
            <p class="meal-text">Gooold</p>
        </div>
        <div class="card-footer">
            <div class="btn btn-get">Get Meal</div>
        </div>
      </div>
    `,
    settingpage: `
      <div class="card-wrapper">
        <h1 class="card-title">Menu</h1>
        <div class="card-content">
            <ol class="meal-list">
                <li class="meal-item">test <div class="btn btn-delete">delete</div></li>
            </ol>
        </div>
        <div class="card-footer">
            <div class="btn btn-add">Add Meal</div>
        </div>
      </div>
    `
  }
  return template[pagename]
}
```

最後渲染頁面所需要的各個函式都已經撰寫完畢了，接著我們回到初始化頁面的函式中，將點擊渲染頁面的事件綁上：

```js
var btn_mainpage = document.querySelector('.tab-item.mainpage')
var btn_setting = document.querySelector('.tab-item.setting')

function initPage(){
  renderPage('mainpage')

  btn_mainpage.addEventListener('click', function(){
    renderPage('mainpage')
  })

  btn_setting.addEventListener('click', function(){
    renderPage('settingpage')
  })
}
```

完成後的程式碼大概會像 [這樣](https://codepen.io/ShawnLin0201/pen/VwjLKeX)，在這份程式碼當中你會發現我們可以透過 `initPage` 這隻函式來追查程式碼（tracing code）中的邏輯。

若一開始自己嘗試撰寫時沒辦法將邏輯拆分的比較清楚也是在正常的範圍內，因為這些得要靠大量時間的練習與觀摩他人的程式碼慢慢練習而來。

後續第五章節中也會提到如何藉由重構來逐步提升撰寫邏輯的技巧。

而以上是在瀏覽器中實作出餐點選擇器的渲染功能部分，接下來我們會將剩下的功能逐一的完成。


