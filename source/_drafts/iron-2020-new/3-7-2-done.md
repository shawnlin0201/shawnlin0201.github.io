---
title: 【驗證模型】3-7 「今晚，我想來點⋯⋯」動手做的餐點選擇器進化！
tags: 《透過認知模型認識 JavaScript》
---

繼昨天的渲染函式後，我們接下來要完成各自頁面的功能。

而根據昨天的 Wireframe 來看，主畫面的顯示與取得新的飼料是需要計算完整個清單後才能從裡頭隨機抽取一個出來，因此，顯而易見的是我們必須先完成填寫飼料頁面的部分，並且順便完成新增與刪除的功能。

## 流程三：飼料清單之渲染功能

在開發飼料清單的功能之前，如同寫渲染頁面函式一樣，我們一樣要先把渲染清單的樣板處理完成，而有關於飼料清單樣板的部分之前在 `getTemplate` 函式裡面是寫死的，因此現在我們將其透過另一個樣板函式 `getMealListTemplate` 來取得其內容：

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
                ${getMealListTemplate()}
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

而在 `getMealListTemplate` 的實作過程中，我們先預設一筆假資料來方便我們產生樣板，同樣地我們採用集中進入點與離開點統一的部分來產生樣板：

```js
var mealList = ['杜格','喜碗','優格','金罐','星球']

function getMealListTemplate(){
  var template = '' // 樣板初始值

  // 組裝樣板的過程
  for(var i = 0; i < mealList.length; i++){
    template += `<li class="meal-item" >${mealList[i]} <div class="btn btn-delete">delete</div></li>`
  }

  return template // 完成的樣板
}
```

完成 `getMealListTemplate` 後，先前產生 `setting page` 的頁面就可以藉由這個函式來動態的計算飼料清單的內容，如此一來，往後我們若是新增或刪除 `mealList` 陣列中的值後，再重新渲染一次頁面即可顯示最新的資料結果。

> 到此流程的程式碼可參考 [這裡](https://codepen.io/ShawnLin0201/pen/xxOGRWe?editors=0010)。

而若是跟著實作的你或許會發現，在先前單純撰寫 JavaScript 程式碼時，我們所關注的點只需要讓整個邏輯流程順暢就好，然而在實作瀏覽器中的功能時，最重要的地方在於 **資料與畫面上的顯示要一致**，也就是說運作功能時的資料邏輯要處理，但也同時要記得處理畫面上的更新才不會看起來沒有運作完成。

## 流程四：飼料清單之新增功能

在上面實作渲染功能時，我們的渲染功能機制是基於 `mealList` 的資料再處理渲染的，也就是說接下來的新增與刪除功能，其實就是基於在 `mealList` 中的操作來更新資料，最後再重新渲染一次就可以完成。

首先在新增飼料之前，使用者的第一步驟一定是透過輸入飼料名稱再點擊新增來完成，而這裡的規劃當初是採用使用原生的 `prompt` 視窗來詢問並新增，因此在這裡我們僅需要先考慮到綁定事件的問題。

而對於綁定的最佳時機來說是在我們一開始渲染這個頁面時再針對所需要的區塊做綁定。

而由於我們最終想觸發的元素是在透過動態產生出來的元素，若是直接綁定在該元素上會無法產生任何效果，因此這時後要回想起在綁定事件的時候我們曾經提過的 **事件代理（event delevation）** 機制的議題：

```js
var view = document.querySelector('.view-wrapper')
var btn_mainpage = document.querySelector('.tab-item.mainpage')
var btn_setting = document.querySelector('.tab-item.setting')

function initPage(){
  renderPage('mainpage')

  btn_mainpage.addEventListener('click', function(){
    renderPage('mainpage')
    view.removeEventListener('click', handleSettingPageClick)
  })

  btn_setting.addEventListener('click', function(){
    renderPage('settingpage')
    view.addEventListener('click', handleSettingPageClick)
    
  })
  
}
```

我們將事件綁定在主要渲染畫面的 `.view-wrapper` 元素上，並且預設統一透過 `handleSettingPageClick` 函式來處理後續的點擊行為，藉此可以讓我們在不同的頁面中，取消不必要的事件綁定。

這時你可以透過簡單的模擬行為來確認是否有綁定成功，此時應該只有在設定飼料的頁面當中才會觸發此函式：

```js
function handleSettingPageClick(e){
  console.log('click')
}
```

在確認完畢 `handleSettingPageClick` 的作用後，我們要透過觸發事件 `Event` 物件中的 `event.target.className` 來捕捉到當我們是點擊新增按鈕時才執行某些事情：

```js
function handleSettingPageClick(e){

  if(e.target.className === 'btn btn-add'){ // 確認點擊新增按鈕才執行
    addMeal() // 預設一個新增餐點的函式
    renderPage('settingpage') // 新增完畢後觸發渲染頁面來更新內容
  }

}
```

接著我們要來處理 `addMeal` 函式，而由於在渲染的部分我們已經交由 `renderPage` 函式來執行了，因此在 `addMeal` 中我們只需要關注更新資料上的問題：

```js
function addMeal(){
  var mealName = prompt('add meal') // 透過原生的 prompt 函式來取得飼料名稱
  if(mealName){ // 確保使用者有輸入才執行
    mealList.push(mealName) // 將飼料名稱新增至 mealList 中，後續渲染時就會根據最新的 mealList 資料來進行處理
  }
}
```

完成 `addMeal` 函式後我們再次回顧整體的的邏輯流程如下：

- 綁定事件
- 點擊後詢問使用者飼料名稱並更新至 mealList 當中
- 渲染函式 renderPage 中的飼料清單會根據 mealList 中的資料來渲染（因此會產生類似新增的效果）

而到此步驟的程式碼可以參考 [這裡](https://codepen.io/ShawnLin0201/pen/qBNdqwB?editors=0010)，眼尖的你或許會發現這個實作其實與常見的待辦清單做法可說是幾乎一致的，所以這種實作都是做久了就能夠融會貫通，常見的功能幾乎都大同小異。

## 流程五：飼料清單之刪除功能

有了新增就有刪除！

刪除功能基本上大同小異，都是在操作 `mealList` 的資料，但在刪除的過程當中有一些地方要注意。

首先我們綁定刪除事件的方式如新增時的作法一樣，我們在 `handleSettingPageClick` 函式中透過 `btn btn-delete` 確定事件代理觸發的對象是刪除按鈕時才觸發後續的行為：

```js
function handleSettingPageClick(e){

  if(e.target.className === 'btn btn-add'){ // 確保代理觸發的對象為 新增按鈕
    addMeal()
    renderPage('settingpage')
  }

  if(e.target.className === 'btn btn-delete'){ // 確保代理觸發的對象為 刪除按鈕
    deleteMeal() // 同樣預設一個刪除函式來處理
    renderPage('settingpage')
  }
}
```

跟著實作到這裡的讀者，可能會開始想像 `deleteMeal` 中的作法：

- 透過 `indexOf` 來搜尋陣列中相同字串，藉此刪除 `mealList` 中的資料
- 透過刪除按鈕的索引值`index`，來刪除陣列中對應索引值的位置

然而以上作法在實作後都會遇到一些問題：

- 透過 `indexOf` 會遇到相同名稱的問題（只是這個故事還尚可接受誤刪相同名稱實際資料卻不同範例）
- 新增與刪除過後的索引值會變得不穩定。

因此較佳的作法是要提供一個幾乎是唯一值的辨識碼，也就相當於資料庫中的 **主鍵（primary key）**。

原先資料：
```js
var mealList = ['杜格','喜碗','優格','金罐','星球']
```

加入 `+new Date()` 時間戳表示的資料：
```js
var mealList = [
  {
    id: 1602386309696,
    content: '杜格'
  },
  {
    id: 1602386312825,
    content: '喜碗'
  },
  {
    id: 1602386315632,
    content: '優格'
  },
  {
    id: 1602386379297,
    content: '金罐'
  },
  {
    id: 1602386385508,
    content: '星球'
  },
]
```

如此一來我們只要核對資料中的 `id` 就可以確保刪除的資料是同一筆資料，而不會誤刪其他看起來相同的資料了。

也因為之後我們要依據這個資料格式的參考，因此這時候要來修改與 `mealList` 有關的函式：

負責處理清單渲染的 `getMealListTemplatealList` 函式：
```js
function getMealListTemplate(){
  var template = ''

  for(var i = 0; i < mealList.length; i++){
    template += `<li class="meal-item" >${mealList[i].content} <div class="btn btn-delete">delete</div></li>`
  }

  return template
}
```

負責新增飼料的 `addMeal` 函式：
```js

function addMeal(){
  var mealName = prompt('add meal')
  if(mealName){
    mealList.push({ // 調整成物件格式
      id: +new Date(), // 新增時給予一個當下的時間戳，由於幾乎不可能在同一毫秒時連續新增兩筆資料，因此幾乎可以當作唯一值來判斷
      content: mealName // 將原先的名稱移至 content 屬性中
    })
  }
}
```

更改完後再回頭測試看看，此時應該會發現畫面上顯示的跟原本沒改過的一模一樣，但這時每筆資料已經從原本的純字串值改為物件型態的值，因此在 `getMealListTemplate` 中，我們還可以加上 `data-id` 在刪除按鈕上來方便後續取得對應的 `id`：

```js
function getMealListTemplate(){
  var template = ''

  for(var i = 0; i < mealList.length; i++){
    template += `<li class="meal-item" >${mealList[i].content}
        <div class="btn btn-delete" data-id="${mealList[i].id}">delete</div>
      </li>`
  }

  return template
}
```

接著就如同處理新增飼料名稱的方式一樣，新增一個 `deleteMeal` 函式來處理刪除事件：

```js
function deleteMeal(e){
  var targetID = e.target.dataset.id // 透過點擊事件中的 Event 物件裡找到剛剛在產生樣板時所加入的 data-id

  mealList = mealList.filter(item => { // 透過 Array.filter 方法與 data-id 來篩選陣列中的資料
    return item.id !== +targetID
  })
}
```

另外也別忘了剛剛 `handleSettingPageClick` 中也要將事件資料 `e` 傳遞進去：

```js
function handleSettingPageClick(e){

  if(e.target.className === 'btn btn-add'){
    addMeal()
    renderPage('settingpage')
  }

  if(e.target.className === 'btn btn-delete'){
    deleteMeal(e)
    renderPage('settingpage')
  }
}
```

到這個階段中，我們刪除飼料的功能就大功告成了。

現在在你的程式中應該能夠渲染出正確的飼料清單並且能夠新增與刪除飼料清單中的任何一筆資料，並且顯示於畫面當中，而到此階段的程式碼可以參考[這裡](https://codepen.io/ShawnLin0201/pen/KKMpadx?editors=0010)。

而我們明天要再把剩下的主畫面顯示與儲存機制的部分完成。