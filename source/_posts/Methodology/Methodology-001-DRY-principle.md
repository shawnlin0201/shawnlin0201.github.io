---
title: 程式設計心法 避免重複原則（DRY principle）
date: 2020-04-06 17:00:25
tags:
- [w3HexSchool]
- [Methodology]
categories: 
- [Methodology]
---

# DRY 原則

這次要來介紹的是我覺得開發程式中最有感的**避免重複原則**（簡稱 DRY 原則，意思即為 Don't repeat youself!）。

根據此篇[文章](https://www.sharmaprakash.com.np/four-types-of-duplication-in-source-code/#)所述，在 The Pragmatic Programmer 一書中，DRY 發生的原因總共可以分為四種類別：

- 強加的重複(Imposed duplication)
- 無意的重複(inadvertent duplication)
- 懶惰的重複(impatient duplication)
- 開發者間的重複(inter-developer duplication)：

以下是四種類別所表示的意義：

<!--more-->

## 強加的重複 Imposed duplication
這一類的重複是發生在開發者自認為是**開發環境需要**的、被強迫需要的重複，像是**不必要的註解**以及**開發文件**等等。

例如我們寫了一些有關 cookie 用的函式，並為其加上了使用註解，但其實從函式名稱本身就能夠得知其用途：

```js
// 這是用來取得 cookie 值的函式
function getCookie (cname) {
    let value = "; " + document.cookie
    let parts = value.split("; " + cname + "=")
    if (parts.length == 2)
  return parts.pop().split(";").shift()
}

// 這是用來設定 cookie 值的函式
function setCookie (cname, cvalue, exdays){
    let d = new Date()
    d.setTime(d.getTime() + (exdays*24*60*60*1000))
    let expires = `expires=${d.toUTCString()}`
    return document.cookie = `${cname}=${cvalue};${expires}`
}
```

另一例則是撰寫開發文件上沒有即時更新的結果，使註解變成多餘；即便是撰寫文檔也與程式中的內容重疊：

```js

/**
* get member data via Number type Member ID.
* @param {number} id member ID
* @return {object} member data.
*/
function getMemberData(id) {
  // 結果裡面的處理後來需要使用到 Number 類型的 id
}

```

個人認為對於此分類的解決辦法便是使用**清晰可辨別的命名**，註解與文檔在非必要下的情況可以透過命名的方式來解決，例如第一例已經很清楚地寫出該函式的作用，就不必再重複註解；而若是使用函式的 jsDoc 註解，則應該注意內部邏輯，讓程式**本身敘述正在做的事情**會來得更有效率。


## 無意的重複 inadvertent duplication
第二類是屬於開發者沒有意識到內容上的重複，通常出現在**邏輯設計上**的內容：

```js
function Cube(length, width, height, volumn) {
  this.length = length
  this.width = width
  this.height = height
  this.volumn = volumn
}

Cube.prototype.getVolumn = function () {
  console.log(this.volumn)
}

let sixCMcube = new Cube(6,6,6)
sixCMcube.getVolumn()
```

在這個例子中，首先我們已知 Cube（立方體）長寬高都一樣的情況下，只要給一個邊長（length）即可；除此之外 volumn（體積）其實也就是邊長的三次方，可以由建構式內部算完即可，不應該使其成為公共變數（public variable），因此更改後如下：

```js
function Cube(length) {
  this.length = length
  this.volumn = Math.pow(length, 3)
}

Cube.prototype.getVolumn = function () {
  console.log(this.volumn)
}

let sixCMcube = new Cube(6)
sixCMcube.getVolumn()
```

## 懶惰的重複 impatient duplication
開發者為了節省時間上的重複，可能發生在使用 CV （複製貼上）大法的時候，尤其複製的程式碼量一大的時候，很有可能遺漏某些需要更改的東西。例如在實作多欄位的搜尋表單，有時候只是值上的替換，其程式碼模樣大同小異，就很有可能在複製貼上完後，忘記更改某個表單欄位的 id 值等等。

個人解決辦法是撰寫測試程式碼或模擬（Mock）程式碼，例如單元測試（Unit test）來觀測各函式的結果是否符合預期結果；如此一來可以節省打斷點、寫 `console.log` 的時間又能同時日後對於維護程式碼的信心度。

## 開發者間的重複 inter-developer duplication
最難解決也最常發生的重複議題，通常發生在開發者與開發者之間的~決鬥~ 協作開發或接手開發的時候，因為在同個專案底下很容易有共同的需求，有時候沒有協調好或是接手專案對於架構不清楚時，容易開發出概念上重複的程式碼。

最簡單的例子就如同上面第一則 `cookie` 實作的函式一樣，有可能前人開發時已經有實作 `cookie` 的 `get`、`set` 與 `delete` 等方法，然後自己又實作了一次相關的方法。

# 實行 DRY 時的危險之處？
在遵循 DRY 原則的時候，有時得適度的拿捏這個原則的比例，避免有時為了避免 DRY 而**過度抽象化（Abstraction）**了某個函式的概念，反而犧牲了**可讀性（readability）**。因為就本質上來說其實抽象化與可讀性來說是**矛盾的**概念。因為我們需要抽象來簡化、避免重複程式碼，但同時我們也得兼顧程式碼的易讀性：

```js
function symbolParser (source = '', splitSymbol = '/', filterSymbol = '_', reverseParseResult = false) {
    let parseStorage = {}
    let reverseResult = reverseParseResult ? [0,1] : [1,0]
    source
        .split(' ')
        .join('')
        .split(splitSymbol)
        .filter(req => req.indexOf(filterSymbol) > -1)
        .forEach(req => {
            let parse = req.split(filterSymbol)
            parseStorage[parse[reverseResult[0]]] = parse[reverseResult[1]]
        })
    return parseStorage
}

let text = 'firstname=Shawn&lastname=Lin&Age=25'
 
let textAfterParse = symbolParser(text, '&', '=', true)

console.log(textAfterParse)     // return {firstname: 'Shawn', lastname: 'Lin', Age: "25"}
```

> 雖然這個函式可以應變不同種的字串（如 url 中的 parameter 或 cookie 中的值）並返回其物件形式，使在解析字串上達到了 DRY 原則，只要解析字串就用這個函式便能快速完成！
> 但是當函式有狀況需要更改調整的時候，能夠使其他開發者能**快速的看出各個實作處理是為什麼要這麼做嗎？**

另一個危險的開端則是類似於**過早最佳化原則（premature-optimization）**所提到的概念。在發生 DRY 的時候，我們可能會忍受不住 DRY 的原則，看到重複就忍不住想改動、優化，但是**真的每次都有達到重複的涵義嗎？**

以上方的例子來說，我們有沒有必要使用**同一隻函式**來解決這種解析的需求？針對 `cookies` 時，使用前面提到的 `getCookie`、`setCookie` 會不會更加的容易閱讀？使用了 `symbolParser` 函式得到了含有全部 `cookie` 的值時，是否還要再實作寫入 `cookies` 的函式？諸如此類的問題會在**死命奉守 DRY 原則**時陸續出現，而我們應當使我們的程式保有彈性與自由，才不會因 DRY 而被過度局限於某些情境下。

因此，在遵循 DRY 心法時，仍別忘了考量到避免**過度抽象化（over-abstraction）**與**過早最佳化（premature-optimization）**等議題；適度抽象、適度避免 DRY，最後優化的部分等後續維護時真的出現問題再來解決吧！


# 參考資料

- [優秀程式設計的原則](https://www.itread01.com/p/1318618.html)
- [代码的抽象三原则](http://www.ruanyifeng.com/blog/2013/01/abstraction_principles.html)
- [《程序员修炼之道》笔记(二)](https://www.cnblogs.com/zhixin9001/p/6777608.html)
- [DRY原則的誤區](http://www.rocidea.com/one?id=33839)
- [Is violation of DRY principle always bad?](https://stackoverflow.com/questions/17788738/is-violation-of-dry-principle-always-bad)