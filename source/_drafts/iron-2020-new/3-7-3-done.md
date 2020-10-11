---
title: 【驗證模型】3-7 「今晚，我想來點⋯⋯」動手做的餐點選擇器進化！
tags: 《透過認知模型認識 JavaScript》
---

昨天我們辛苦地完成了飼料清單的渲染與新增刪除後，現在我們要將各個顯示的部分與儲存機制串連起來。

## 流程六：飼料清單之主畫面取得飼料

要處理有關於畫面中的資料第一個當然要找到的是 `getTemplate` 函式當中，而我們最主要是修改位於 `.meal-text` 元素當中的顯示內容，並且我們將預設資料 `currentMeal` 對齊 `mealList` 飼料清單中的格式：

```js
var currentMeal = {
  id: 1602386309696,
  content: '杜格'
}

function getTemplate (pagename){
  var template = {
    mainpage: `
      <div class="card-wrapper">
        <h1 class="card-title">Today's meal</h1>
        <div class="card-content">
            <p class="meal-text">${currentMeal.content}</p>
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

接著由於 `currentMeal` 中的資料並不會平白無故地出現， 因此我們撰寫了一個 `getMeal` 函式，主要用意是從 `mealList` 列表中隨機選取一個餐點來替換：

```js
function getMeal(){
  var random = Math.floor(Math.random() * mealList.length)
  return mealList[random]
}
```

如此一來我們就可以在理應觸發取得隨機餐點的地方，透過執行此函式來更新目前顯示的資料。

如處理負責處理主頁點擊的 `handleMainPageClick` 函式：
```js
function handleMainPageClick(e){
  if(e.target.className === 'btn btn-get'){
    currentMeal = getMeal()
    renderPage('mainpage')
  }
}
```

另外一個則是在剛進入頁面時需要初始化的位置：

```js
function initPage(){
  currentMeal = getMeal()
  renderPage('mainpage')

  // 略⋯⋯
}
```

到此步驟的程式碼請參考[這裡](https://codepen.io/ShawnLin0201/pen/YzWXNYQ?editors=0010)。

## 流程七：飼料清單之儲存機制

現在我們已經完成大部分的功能了，而唯一還沒做到的是將使用者所操作的飼料清單儲存起來。

如同在瀏覽器儲存機制中所介紹的一樣，我們這裡並沒有要實作會員登入與驗證來使用資料庫做儲存，因為並沒有一定要使用這個驗證的理由
，因此我們這裡要暫時透過 `localStorage` 的機制來處理。

而要將原先的飼料清單改為 `localStorage` 做儲存時，第一個是在初始化的時候，我們就要從 `localStorage` 上來取得資料：

```js
var mealList = JSON.parse(localStorage.getItem('mealList')) || []
```

其中，要注意的地方在於第一次使用 `localStorage` 取得資料的時候很有可能裡面是沒有值的，因此我們必須要塞一個預設值 `[]` 進去。

另外，由於在 `localStorage` 中所儲存的是字串資料，因此我們可以透過 `JSON.parse()` 來將字串轉變成物件形式的資料。

接著，我們要調整的地方是與 `mealList` 有關的內容，而真正的核心調整位置會在於有更動 `mealList` 的地方，也就是新增與刪除 `mealList` 資料的兩隻函式。

新增函式：
```js
function addMeal(){
  var mealName = prompt('add meal')
  if(mealName){
    mealList.push({
      id: +new Date(),
      content: mealName
    })

    localStorage.setItem('mealList', JSON.stringify(mealList))
  }
}
```

刪除函式：
```js
function deleteMeal(e){
  var targetID = e.target.dataset.id
  mealList = mealList.filter(item => {
    return item.id !== +targetID
  })

  localStorage.setItem('mealList', JSON.stringify(mealList))
}
```

在這兩隻函式當中，由於 `localStorage` 最主要只接受字串形式的資料（有的瀏覽器允許存入非字串值，但不建議這麼做），因此我們要使用 `JSON.stringify()` 來將陣列轉變成字串。

最後，將原先的用於在主畫面顯示飼料的 `currentMeal` 改成預設值：

```js
var currentMeal = null;
```

並在 `getTemplate` 的該行做判斷：

```js
`<p class="meal-text">${currentMeal ? currentMeal.content : '請新增餐點' }</p>`
```

如此一來就完成了飼料清單保存的功能，到此步驟的所有程式碼可參考[這裡](https://codepen.io/ShawnLin0201/pen/pobJRZm?editors=0010)。

這份餐點選擇器到這邊算是大功告成了！當然，這個選擇器還可以再加入更多的功能，若有興趣可以自由發揮，例如新增紀錄近一個禮拜的餐點，甚至是以早上中午下午為劃分的版本，還可以做出人與貓都可以用的共用版本。

而到目前為止，我們已經累積了不少的開發體驗，此時部分的讀者們在開發的過程中會發現，怎麼有時候程式碼執行時跟我想像的不太一樣？又或是對於函式中的作用域（scope）不太清楚，而導致變數的值一直捉糢不定？

接下來我們將從瀏覽器中的 JavaScript 執行環境(Execution Environment)開始講起，讓你清清楚楚地知道 JavaScript 到底是怎麼運作的！
