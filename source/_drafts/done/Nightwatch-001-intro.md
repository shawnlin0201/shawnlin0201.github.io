---
title: NightWatch.js 入門、環境建置與範例（Install, Build environment）
date: 2000-00-00 00:00:00
tags:
- [w3HexSchool]
- [JavaScript]
- [Testing]
- [NightWatch.js]
categories: 
- [JavaScript]
- [JavaScript, NightWatch.js]
---

<div style="display:flex;justify-content:center;">
  <img style="object-fit:cover;" src='/images/Nightwatch/nightwatch-logo.png' width='400px' height='200px' />
</div>

Nightwatch 是一款老牌的端對端測試（E2E testing，End-to-end testing）框架，主要是藉由 [WebDriver](https://www.w3.org/TR/webdriver/) API 來操作瀏覽器，並藉由斷言（assertion）來檢測網頁當中的各個項目。

<!--more-->

# 為什麼需要端對端測試？
在網頁端的測試當中，端對端測試可以說是非常重要的一環，不同於單元測試（Unit testing）一般，只面向開發中最小粒度的測試（在 JavaScript 中即為 function 間的測試）；端對端測試面向的是**模擬使用者對於網頁的操作**，也就是說當整個產品開發結束時，產品最終應該要有的樣子，而當端對端測試通過時，也就意味那些被測試到的地方是我們所預期的。

除此之外，端對端測試可以避免在後續維護時，其中相關或依賴的程式碼受到影響，但是又難以被察覺的問題點被略過（例如：更改 A 頁面的元件，但是卻造成共用該元件的 B 頁面出現破版的情況）。另一方面端對端測試還能提升後續維護、重構等開發方面上的信心度與測試時間。

而當端對端測試撰寫好時，你就能拿測試替你節省下的時間，看更多你還沒來的及看完的程式文件 （？

# 端對端測試應用時機？
並且不是所有頁面、網站都需要到端對端測試的情境。從長遠的角度來看，端對端測試適合應用在**需求已進入低迭代環節**的網站，因為端對端面向的開發層面很高，新的需求極有可能破壞到原先已有撰寫測試的地方，最終端對端測試程式碼將會隨著需求而遠去，近而導致端對端測試的價值降低。

因此成熟且迭代速度低的網站，但偶爾會有需求維護並且想優化細節時，將會是端對端測試最佳的舞台。

# 選擇 NightWatch 原因
首先 Nightwatch.js 是以 Node.js 為基底所開發而成的，且設定部屬、測試等等相關的設定基本上依靠 JavaScript 就能完成，對於前端或熟悉 JavaScript 的人來說可以很快就上手。

並且 Nightwatch 簡化了測試的過程，它將測試碼轉換為 HTTP Request 並發送到 Web Driver 來代發到網頁瀏覽器中，再接收 HTTP Response 回傳給我們，我們最終只要專注再測試程式碼中的撰寫即可。

最後則是 Nightwatch 支援了 Headless 的測試模式，我們將從中得到更大的收益：
- 測試速度更快：繞過載入頁面資源、繪製時的流程。
- 獲取資料更容易、可以使其自動化：


# Nightwatch 環境部屬
一如以往的簡單，大部份部屬可以藉由 npm 來安裝，如果還沒有 Node.js 可以點 [這裡](https://nodejs.org/en/) 下載。

## Nightwatch
首先安裝 Nightwatch 測試框架：
```
$ npm install nightwatch -g
```
## Web Driver
接著視你所要測試的瀏覽器環境來決定要安裝哪個 Web Driver，如果是 Google Chrome 的話，可以執行：
```
$ npm install chromedriver --save-dev 
```
而 Nightwatch 官網也整理了一份[列表](https://nightwatchjs.org/gettingstarted/installation/#install-webdriver)，在這裡你可以找到其他的瀏覽器所需的 Web Driver。

## Nightwatch 測試設定檔案
當 Nightwatch 與 WebDriver 都安裝好時，我們可以在該資料夾中建立一個 `nightwatch.conf.js` 來設定測試相關的內容。

```js
module.exports = {
    src_folders : ["tests"], // 設定測試資料夾
    webdriver: { // 引入 Web Driver 相關設定
      start_process: true,
      port: 9515,
      server_path: require('chromedriver').path, // 這裡需引入對應瀏覽器的 Driver 名稱
    },
    test_settings: {
      default: {
        launch_url: 'https://nightwatchjs.org', // 預設載入的網址
        desiredCapabilities: {
          browserName: "chrome", // 測試的瀏覽器名稱
          chromeOptions: {
            args: [
              "--headless", // 啟用 Headless 模式，建議第一次使用可以不要啟用這個設定，你可以親自看一看端對端測試是如何運作的。
            ]
          }
        }
      }
    }
  }
```

## 端對端測試檔
設定完 Nightwatch 設定檔後就可以開始撰寫測試碼了，接著我們要模擬在 Google 首頁輸入 Nightwatch 關鍵字搜尋後，檢查搜尋結果是否真的有 Nightwatch 相關的文字結果。

首先，在剛才 `src_folders` 所指定的資料夾下建立一個 `poc.test.js` 檔案：

```js
module.exports = {
    'Google Page E2E testing' (browser) {
      browser
        .url('https://www.google.com.tw/') // 打開 Google 首頁連結
        .waitForElementVisible('body') // 等待 body 元素出現
        .useXpath() // 使用 Xpath selector 模式
        .setValue('//*[@id="tsf"]/div[2]/div[1]/div[1]/div/div[2]/input', 'Nightwatch') // 使用 Xpath selector 選取元素，並輸入 'Nightwatch'
        .click('//*[@id="tsf"]/div[2]/div[1]/div[2]/div[2]/div[2]/center/input[1]') // 使用 Xpath selector 選取元素，並點擊元素（搜尋按鈕）
        .pause(2000) // 等待兩秒
        .assert.containsText('//*[@id="res"]', 'Nightwatch') // 使用 Xpath selector 選取元素，檢查該元素中有沒有含有 'Nightwatch' 的相關內容
        .end() // 結束測試
    }
  }
```

接著在撰寫完端對端測試檔後，在專案根目錄的終端機下輸入：
```
$ nigthwatch
```

如果此時是關閉無頭模式的話，可以開始看到端對端測試的整個運行過程，包含輸入文字、點擊及換頁等等操作；開啟的話則是會將整個網頁測試的資訊顯示在終端機當中。

最後測試完畢的資訊：
```
[Poc Test] Test Suite
=====================
/ Connecting to localhost on port 9515...

i Connected to localhost on port 9515 (1032ms).
  Using: chrome (80.0.3987.132) on Windows platform.

Running:  Basic e2e Test

√ Element <body> was visible after 31 milliseconds.
√ Testing if element <//*[@id="res"]> contains text 'Nightwatch' (543ms)

OK. 2 assertions passed. (5.415s)
```
透過測試完的資訊結果可以看到整個測試秒數只有 5.415 秒，這個秒數如果是手動測試的話，可能光是打開瀏覽器並輸入 Nightwatch 就已經很緊繃了，更何況如果是上百個測試案例要跑的話，就算手速跟得上，腦也疲乏了差不多阿。

而透過 Nightwatch 執行端對端測試可以幫你做到同樣的事情，我們只需要撰寫測試程式碼，執行，接著就可以省下親自去一一確認的時間了！

# 參考資料
- [nightwatchjs](https://nightwatchjs.org/)