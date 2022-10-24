---
title: 【初始ノ章】測試建置：跟著系列文一起學測試
date: 2022-09-17 17:49:06
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

在進入測試的正文前，本文將帶著讀者一起來安裝系列文專用的測試專案，這份專案內含後續文章會介紹到的測試程式碼以及各元件基本的視覺操作介面，接下來的幾天就可以一邊看著文章一邊操作，同時如果想修改測試程式碼來觀看差異也非常方便。

本文章提供兩種安裝指南供讀者閱讀，可視讀者的需求來選擇觀看唷：
- 若讀者本身電腦已安裝並熟悉 `NVM` 與 `Git` 操作，請參考【快速通道】指南。
- 若尚未接觸過 `NVM` 或 `Git` 的讀者，想一步一步操作，請參考【詳細安裝說明】指南。

<!-- more -->

# 【快速通道】：

由於 `Vitest` 需求本身需要 `Node.js` 14 以上的版本，請將 `Node.js` 版本調整至 14 以上複製專案：

`git clone https://github.com/shawnlin0201/ithelp2022-vue3-unit-test.git`

接著透過 `npm install` 安裝依賴工具後，就能透過 `npm run dev` 啟動專案。

![https://ithelp.ithome.com.tw/upload/images/20220917/20119062CcuD1FBnHO.png](https://ithelp.ithome.com.tw/upload/images/20220917/20119062CcuD1FBnHO.png)

而測試的部分則可以透過終端機執行 `npm run test:unit` 。

![https://ithelp.ithome.com.tw/upload/images/20220917/20119062hNv22uoifE.png](https://ithelp.ithome.com.tw/upload/images/20220917/20119062hNv22uoifE.png)

若專案跟測試都能順利啟動，就沒問題了。
作者也會依照當天系列文來更新專案，所以別忘了透過 `Git` 來抓取當天最新進度唷！
接下來讓我們跟著系列文一起學習單元測試吧！

---
# 【詳細安裝說明】：

接下來安裝專案的部分由於有切換或管理 `Node.js` 版本的需求，因此這裡建議安裝 `NVM` 來處理；而專案本身後續會依照每日需要的做即時更新，因此我們需要透過 `Git` 來更新與安裝我們專案程式碼。

所以接下來的步驟主要會是：
一、安裝 NVM
二、透過 NVM 安裝 Node.js 並切換到對應版本
三、安裝 Git GUI Tool
四、透過 Git GUI Tool Clone 系列文專案
五、啟動系列文專案


## 一、安裝 NVM

在開發的過程中，有時候會遇到不同的專案間要使用不同的 Node.js 版本，而透過 `NVM` ，我們就能在不同情境下快速切換到我們需要的 `Node.js` 版本。

### 使用 Ｗindows 系統安裝 NVM：

1. 請至官方 release 文件中下載 [nvm-setup]([https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases))。
2. 依照 Windows 安裝精靈下載完成。
3. 打開「命令提示字元」後輸入 `nvm` ，若有出現 Runnine version x.x.x 版本號碼表示安裝成功。

### 使用 MacOS 系統安裝 NVM：

1. 同時按下 `cmd(⌘) + 空白鍵` ，輸入 terminal 後，打開「終端機」，執行下面一種指令：
- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`
2. 此時應該會自動生成 `nvm` 路徑檔案至你的環境中，請務必關掉「終端機」，再繼續以下步驟。
3. 重新打開「終端機」後，輸入指令 `nvm -v` 確認是否有版本號跳出表示安裝成功，可以準備來安裝 `Node.js` 了。

#### 若步驟 3 時出現 `command not found` 怎麼辦？
正常安裝完 `NVM` 後系統應該會自動根據終端機的指令工具補上對應的語法路徑，若沒有表示可能指令工具的路徑出現了狀況，因此我們需要確認當下的指令工具，並補上對應的 `nvm` 設定。

1. 首先，在終端機輸入 `echo $SHELL` 來檢視目前所使用的指令工具。
2. 接著依據不同的指令工具在對應的地方補上 `nvm` 指令設定：

##### `echo $SHELL` 出來的指令工具為 /bin/bash 或顯示為 bash：
a. 執行 `touch ~/.bash_profile` ，若環境根目錄尚未有 `.bash_profile`檔案會自動會生成出來。
b. 打開 Finder，點開上方「前往」。
c. 點選「個人專屬」。
d. 同時按下 `cmd(⌘) + Shift + .` 顯示隱藏檔案。
e. 用文字編輯器打開 `.bash_profile` 檔案。
f. 將底下程式碼複製貼上到 `.bash_profile` 檔案的末端，並存檔。
            
```jsx
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
            
##### `echo $SHELL` 出來的指令工具為 zsh：

a. 打開 Finder，點開上方「前往」。
b. 點選「個人專屬」。
c. 按下 `cmd(⌘) + Shift + .` 顯示隱藏檔案。
d. 用文字編輯器打開 `.zshrc` 檔案。
e. 將底下程式碼複製貼上到 `.zshrc` 檔案的末端，並存檔。
           
```jsx
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

3. 補上指令後，回到「終端機」執行 `nvm -v` ，這時候應該就會有版本號訊息了。
---

## 二、透過 NVM 安裝 Node.js 並切換到對應版本

在上個步驟我們確認好 `NVM` 已經安裝完畢，接著我們要透過 `NVM` 來下載與切換我們 `Node.js` 的版本號碼。

1. 在命令提示字元或終端機中輸入 `nvm ls` 此時會顯示目前電腦中對應的 `node.js` 版本號，若未下載過則通常會指著 system。

```bash
   ...
-> system
   ...
```

若有透過 `nvm` 裝過不同 `Node.js` 版本的出現像這樣的版本號：
![https://ithelp.ithome.com.tw/upload/images/20220917/201190628Yp8opdtfJ.png](https://ithelp.ithome.com.tw/upload/images/20220917/201190628Yp8opdtfJ.png)

2. 接著執行 `nvm ls-remote` 會列出目前可供安裝的 Node.js 版本號碼列表。

> 補充說明：
> 其中有 `LTS(Long-term support)` 標記的為有長期支援服務的版本。
> 按照 Node.js LTS 維護週期表來說，每年4月份發佈的偶數版本號會在為期 18 個月的 LTS 維護啟動後還多了個 Maintenanece 維護期來保證會處理一些嚴重的 Bug, 安全問題等等的修復。
> 因此除了工具本身的限制以外，若要挑選一個適當的 Node.js 版本來啟動專案，可以尋找偶數 LTS 版本號。

3. 挑選合適的版本後，透過 `nvm install v16.17.0` 來安裝我們所需要的版本號碼。
4. 透過 `nvm use v16.17.0` 便可以切換版本號了，再一次透過 `nvm ls` 確認，此時應該會看到箭頭改為指向 `v16.17.0`。
![https://ithelp.ithome.com.tw/upload/images/20220917/201190620qyiJGjY4K.png](https://ithelp.ithome.com.tw/upload/images/20220917/201190620qyiJGjY4K.png)
---

## 三、安裝 Git GUI Tool

在專案的控管中，版本控管是一門不簡單的學問，而在這個專案我們會使用到 Git 版控系統來管理專案，透過相關指令我們就可以操作基於同個版控系統的專案（新增、複製、修改與更新等等功能）！

> 若對於 Git 指令操作有興趣，想深入學習這裡推薦這本由高見龍前輩所撰寫的[《為你自己學 Git》]([https://www.tenlong.com.tw/products/9789864342662?utm_source=gitbook&utm_medium=site](https://www.tenlong.com.tw/products/9789864342662?utm_source=gitbook&utm_medium=site))書籍！

然而一開始操作大量的指令對於尚未熟悉終端機的讀者可能會感到害怕，因此這裡推薦採用 GitHub Desktop（Git GUI Tool） 來安裝系列文專案：

> Git GUI Tool 
> 其中的 GUI 意思為 Graphic User Interface（圖形使用者介面），因此 Git GUI Tool  簡單來說就是讓你能夠方便操作 Git 指令的圖形化工具。
> 

> GitHub Desktop
> GitHub 所開源的一套 Git GUI Tool ，除了可以快速操作 Git 相關動作也有結合 GitHub 網站本身的一些服務。

1. 首先到 GitHub Desktop [官方網站]([https://desktop.github.com/](https://desktop.github.com/))下載軟體，網站會自動偵測當下的系統環境提供適合的版本。
2. 下載完成後開啟 GitHub Desktop 就會進入歡迎畫面，直接點選 Skip this step（這邊主要是方便原先有在使用 GitHub 的用戶可以快速結合相關服務的地方，所以不用註冊其實也是能使用的。）
    
![https://ithelp.ithome.com.tw/upload/images/20220917/20119062NeaFUosjBZ.png](https://ithelp.ithome.com.tw/upload/images/20220917/20119062NeaFUosjBZ.png)
    
3. 進入下一頁來到 Configure Git，這頁簡單來說主要是讓你後續變更時，Git 版控系統需要紀錄是「誰」在操作的，因此這頁會需要填寫一下基本的稱呼與可以聯絡到你的信箱。
    
![https://ithelp.ithome.com.tw/upload/images/20220917/20119062ELJbe4EQKf.png](https://ithelp.ithome.com.tw/upload/images/20220917/20119062ELJbe4EQKf.png)
    
4. 填寫完畢後就會看到 GitHub Desktop 主要頁面，點選右方的 Clone a repository。
（或是點選左上角 `Current repository` 按鈕，再點選 `Add` 按鈕，也會有個 Clone a repository 。）
    
![https://ithelp.ithome.com.tw/upload/images/20220917/20119062JSkOSHYCf4.png](https://ithelp.ithome.com.tw/upload/images/20220917/20119062JSkOSHYCf4.png)
    
5. 出現小視窗後點選右方的 URL 頁籤，在上方 Repository URL 填入  `[https://github.com/shawnlin0201/ithelp2022-vue3-unit-test.git](https://github.com/shawnlin0201/ithelp2022-vue3-unit-test.git)` ，下方的 Local Path 則可以點選右方的 Choose，自行選擇一個好的位置來放置這個專案（後續若要開啟專案的會這個就會是放置專案的實際位置）。
    
![https://ithelp.ithome.com.tw/upload/images/20220917/20119062DFdHlW74u1.png](https://ithelp.ithome.com.tw/upload/images/20220917/20119062DFdHlW74u1.png)
    
6. Clone 完成後，畫面的佈局就會長得像這樣子（這邊以 MacOS 版本 Dark 模式為例），左上角就會顯示當下檢視中的 repository（`ithelp2022-vue3-unit-test`）。
    
![https://ithelp.ithome.com.tw/upload/images/20220917/20119062pQKDiT5bJz.png](https://ithelp.ithome.com.tw/upload/images/20220917/20119062pQKDiT5bJz.png)
    
7. 後續觀看系列文若想更新當下最新的版本下來，只需要點選軟體上方 Repository 頁籤後，點擊 Pull，即可更新本地端的檔案囉。
    
![https://ithelp.ithome.com.tw/upload/images/20220917/20119062h3s2VuNasT.png](https://ithelp.ithome.com.tw/upload/images/20220917/20119062h3s2VuNasT.png)
    

確認專案已經下載好後，接下來我們要準備安裝專案本身要用的工具，使用 GitHub Desktop 的話則可以從上方 Repository > Open in Terminal 中快速開啟。

![https://ithelp.ithome.com.tw/upload/images/20220917/20119062OKCN0L0k01.png](https://ithelp.ithome.com.tw/upload/images/20220917/20119062OKCN0L0k01.png)

![https://ithelp.ithome.com.tw/upload/images/20220917/20119062ixG26cyrHP.png](https://ithelp.ithome.com.tw/upload/images/20220917/20119062ixG26cyrHP.png)

從這種方式開啟後，終端機所在目錄就會是該專案的根目錄了。
確認沒問題後就可以來安裝專案所需要的工具啦！

## 安裝與啟動系列文專案

在安裝完 NVM 與 Git 之後，讓我們先在終端機執行 `nvm ls` 重新確認一下現在 Node.js 版本號是否為 14 以上：

![https://ithelp.ithome.com.tw/upload/images/20220917/201190624JgnsPQP41.png](https://ithelp.ithome.com.tw/upload/images/20220917/201190624JgnsPQP41.png)

沒問題的話接下來就可以在終端機執行 `npm install` 安裝專案中所需要的工具。

### 啟動專案

待安裝完畢後，終端機執行 `npm run dev` 可啟動專案：

```bash
VITE v3.1.0  ready in 1369 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
```

在瀏覽器中輸入 `[http://127.0.0.1:5173/](http://127.0.0.1:5173/)` （請依據你當下終端機顯示的 Local 為主），開啟後弱看到下方畫面就算完成囉！

![https://ithelp.ithome.com.tw/upload/images/20220917/20119062CUKPJhSrZf.png](https://ithelp.ithome.com.tw/upload/images/20220917/20119062CUKPJhSrZf.png)

### 啟動測試

啟動測試的話，則只需要在終端機執行 `npm run test:unit` ，終端機就會開始執行測試：

![https://ithelp.ithome.com.tw/upload/images/20220917/20119062hL2GGYdyuI.png](https://ithelp.ithome.com.tw/upload/images/20220917/20119062hL2GGYdyuI.png)

由於目前都先將測試案例跳過的關係，因此目前執行測試應該會只有 `skipped` 的結果。

到這邊為止如果啟動專案跟測試都沒問題的話，就可以繼續閱讀後續的章節囉！