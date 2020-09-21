---
title: 【事前準備】1-6 準備工具
tags: 《透過認知模型認識 JavaScript》
---

# 準備工具

工欲善其事，必先利其器！再接下來要進入【建立模型】的章節前，我們要來準備以下工具：

- 撰寫程式的工具
- 寫字繪圖的工具

## 程式開發工具
程式開發工具接下以實際開發會使用的編輯器與線上編輯器來做為劃分，請依你的喜好需求擇一即可：

### 實際開發時常用的程式編輯器

雖然說程式是可以藉由簡易的文字編輯器（如 txt 檔）作為編輯，但是如果你想體驗工程師日常的開發生活，在這裡我推薦你使用專門開發程式用的編輯器，例如： [Visual Studio Code](https://code.visualstudio.com/)！

>![](https://i.imgur.com/MG3iIrr.png)
> Visual Studio Code 編輯器
> photo: Visual Studio Code official website hero section image. https://code.visualstudio.com/


為什麼工程師一般來說要使用開發專用的編輯器呢？

因為它除了讓你坐在咖啡廳光打開螢幕就感覺好像與眾不同之外，跟其他一般文字編輯器最不同的地方就是它通常提供了以下的輔助功能：

- 語法突顯（Syntax Highlighting）：編輯器會根據該語言的語法、關鍵字（keyword）、識別字（identifier）等等著色，讓你更輕鬆看程式碼。
- 語法檢查（Linting）：編輯器會幫你檢查是否一些語法上的錯誤。
- 語法快捷（Snippets）：編輯器依據特定的單字組成快速產出常用的內容。
- 自動完成（Auto Complete）：編輯器會根據語法的判斷，列出你接下來可能想使用的內建方法等等。
- 自動排版（Formatter）：可以客製設定縮排等等功能。
- 擴充工具（Extensions），由社群所開發的各種輔助工具，甚至還可以串連各種服務與溝通軟體等等。
- 族繁不及備載……

雖然這些輔助功能看似不起眼，但是它們是能夠大幅加快你的開發速度和豐富你寫程式時的使用者體驗，所以基本上我們採用專門的程式編輯器來開發。

安裝的方法也很簡單，基本上就是依照電腦的作業系統（Windows、macOS）等挑選對應的版本來下載穩定版（Stable），接著按照安裝後的指示一步一步點選即可。

#### 擴充工具

再安裝完程式編輯器後，接著要來順便裝個擴充工具，如果你是也是安裝 VSCode 的讀者，這裡我推薦你下載：[LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)。

它最主要的功能就是可以以你本機的檔案作為的站點來開啟本機伺服器，如此一來你就可以馬上看到你寫的程式碼的結果，並且還擁有熱更新（Hot Reload）的效果，讓你可以一邊改一邊看到實際的呈現。

> ![](https://i.imgur.com/ccYUFGr.gif)
> photo: Live Server introduction https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

要開啟的方法一個是在 HTML 檔案中嵌入你的 JavaScript 檔案，接著在 HTML 檔案中點選視窗右下角的 Go Live，另一種是透過按鍵盤上的 `alt+l` 與 `alt+o` （maxOS：`cmd+l` 與 `cmd+o`）來啟動伺服器即可。

> ![](https://i.imgur.com/TgKkwOH.jpg)
VSCode 上啟動的位置。
> photo: Live Server introduction https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

如果你覺得 Live Server 要學習按一些指令才能開啟、切換不同專案資料夾很麻煩的話，你也可以考慮透過這款 [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)，這個工具跟 Live Server 一樣都是幫助你建立本機伺服器，不過這款擴充工具還多了圖形化的介面可以讓你操作：

![](https://i.imgur.com/gYkUQLc.png)

使用方法就是點擊 `CHOOSE FOLDER`，接著開啟你用來編輯檔案的位置，接著點選 `Web Server` 旁邊的按鈕，顯示為 `STARTED` 後就可以靠下方的 `https://127.0.0.1:8888` 來連到你所建立的網站。

### 線上程式編輯器

如果你還是覺得安裝程式編輯器太麻煩的話，你可以使用一些線上程式編輯器，這些線上的編輯器雖然相較之下功能少了一些，但是對於單純在測試以及呈現程式效果來說也算是非常的不錯工具。

以下推薦幾個前端在使用的線上程式編輯器：
- [Codepen](https://codepen.io/)
- [JS Bin](https://jsbin.com/?html,css,js,console,output)
- [JSFiddle](https://jsfiddle.net/)
- [CSS Deck](https://cssdeck.com/)
- [Liveweave](https://liveweave.com/)

 個人推薦 Codepen，我之前偶爾也會刻了一些小東西放在上面，比如在兩年前我在上面放了一個簡單的 [時鐘](https://codepen.io/ShawnLin0201/pen/gqJarj)。

![](https://i.imgur.com/yK1Me7X.gif)

而除了可以存放自己所做的小東西之外，你也可以探索其他人所做的一些有趣的小作品！

## 寫字繪圖的工具

挑選完適合你的程式編輯器後，最後要來挑選寫字繪圖工具的部分了！

而為何學習寫程式會需要繪圖工具呢？這塊的想法主要是採用由視覺思維（Visual Thinking）與空間思維（Spatial Thinking）的概念而衍生的技術。

視覺思維主要探究的是藉由通過視覺處理（Visual Processing）來幫助思考，比如有時候我們能從一幅畫中揣測出繪者當時的心靈狀態；空間思維則是對空間的認知與方向、位置上的判斷，比如從腦中形成一個物體，而你可以透過想像的方式去旋轉該物體（Mental rotation）。

> ![](https://i.imgur.com/Gqpdbft.png)
> Mental rotation
> photo: Carlos Esteves(2006-02-21). Chess your turn.  https://unsplash.com/

因此現在我們要做的是將你原先較為「抽象」思考邏輯，透過繪圖的方式將思維邏輯「具體」的呈現出來，而我們就可以藉此檢視思維邏輯上是否有地方可以做為修正、幫助記憶上也能更容易地被穩固，最後提升學習 JavaScript 的效果。

> 根據 Silverman（2005）的研究結果中指出，在 750 位小四至小六年級的受試者中，偏好採用視覺與空間思維邏輯的思考方式有助於學習上的成效。
> > Silverman, Linda Kreger (2005), Upside-Down Brilliance: The Visual-Spatial Learner, Maria J. Krabbe Foundation for Visual Thinking
>
> 而前面我們所提過的認知結構，其文章也有指出透過流程圖的方式可以提升學習的效率。

也因為過程涉及到抽象的轉換，因此工具的選用很重要，最好使用你習慣的工具或是容易上手的工具來記錄，否則當你在記錄這些內容時會很容易受到工具的影響而打亂原先所想的邏輯。

<!-- > ![](https://i.imgur.com/51TXHMl.jpg)
> Med Badr Chemmaoui(2018-04-15). UI Wireframe Saturday. https://unsplash.com/ -->


若你喜好實體的紀錄工具最簡單就是準備一隻筆跟一些紙，而這張紙大小必須讓你有足夠的發揮空間而不會受限，建議至少要有 A5 以上的大小（A4 的一半）。

若你喜好透過電腦來繪圖，除了 Photoshop、小畫家等繪圖軟體外，你也可以嘗試使用如 [draw.io](https://app.diagrams.net/) 等等這一類的線上工具來協助你繪圖，但自由度就沒有辦法像手寫一樣這麼靈活了。

### 整理思維的圖形種類

挑選完整理用的工具後，接下來就要來思考要手寫或繪置什麼圖形！而常見整理思維邏輯的圖形有下列這幾種，你可以依據想整理的方式來採用：

- 「心智圖」：具有發散的特性，可以幫助你釐清抽象中的組織
- 「樹狀圖」：具有列舉的特性，可以用來整理知識的層級。
- 「流程圖」：具有具象問題步驟的特性，可以幫助釐清事情的先後發生順序。

> ![](https://i.imgur.com/rW04Yhy.jpg)
> photo: marco antonio torres(2007-08-13). DSC_0083.  https://www.flickr.com/

而接下來的章節中我們也將會陸陸續續的提到這些圖表如何整理我們當下的認知模型！
