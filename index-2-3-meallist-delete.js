var view = document.querySelector('.view-wrapper')
var btn_add = document.querySelector('.btn.btn-add')
var btn_mainpage = document.querySelector('.tab-item.mainpage')
var btn_setting = document.querySelector('.tab-item.setting')
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

function deleteMeal(e){
  var targetID = e.target.dataset.id

  mealList = mealList.filter(item => {
    return item.id !== +targetID
  })
}

function addMeal(){
  var mealName = prompt('add meal')
  if(mealName){
    mealList.push({
      id: +new Date(),
      content: mealName
    })
  }
}

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

function getMealListTemplate(){
  var template = ''

  for(var i = 0; i < mealList.length; i++){
    template += `<li class="meal-item" >${mealList[i].content} <div class="btn btn-delete" data-id="${mealList[i].id}">delete</div></li>`
  }

  return template
}

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

function renderPage(pagename){
  view.innerHTML = getTemplate(pagename)
}

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

initPage()