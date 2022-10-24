---
title: 【雜談ノ章】那些沒說到的內容、完賽感言、TOC 與參考資料們
date: 2022-10-20 18:51:11
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

# 那些沒說到的部分
在開賽時，起初寫了個預期的 TOC 來規劃要講哪些內容，然而隨著每天撰文下來，覺得有部分內容比較偏向額外的學習，因此在評估後，決定調整原先 TOC 的內容，定義一下我認為至少先學到哪個部分就已足夠開始在實際專案中應用，而這一段落主要是來小談一下這些異動的章節有哪些，以及為什麼會有這些異動與將來是否會再陸續補充。

<!-- more -->

- 訪問實際導入測試的團隊心路歷程：會想擷取其他團隊經驗最主要是擔心導入後的成效問題，但訪問到不少人大部分都是支持充分研究後先寫再來調整，剩下都是怎麼把它運作得更好的後談，後來筆者自己想想學習與導入其實也不衝突，但有些內容真的要試過了才知道，因此想把這部分挪到後續有空時再來補充。

- 測試驅動開發（Test-Driven Development, TDD）：TDD 本身是個值得深入討論的主題，只用一篇短文提及其實有些可惜，但要深入又會模糊了學習測試的焦點，因此後來想想乾脆透過測驗章節中的 Demo 環節稍微展現一下 TDD 精神下的紅燈綠燈要如何開發，若讀者有興趣了自然會對 TDD 感到好奇，這一部分賽後應該會考慮與下方的重構一起討論。

- 測試與重構（Refactor with Testing）：在重構的領域中，其實還能夠再細分為針對測試程式碼的重構與產品程式碼的重構，而測試程式碼的重構主要是基於具有更高的可讀性與可維護性，甚至提升測試程式碼的執行效率等等，這其實很仰賴大量的實作後才能有所體會，而本系列文定位希望是以入門測試為主，所以同樣保留至賽後再來考慮；至於產品程式碼的重構，則已經偏向了 Vue 中的最佳實踐等等議題，雖說測試程式碼與產品程式碼是相生的概念，但這部分建議以測試作為保護的方向去調整產品程式碼即可，後續主要還是會以測試程式碼中的內容為主。

- 漏網之魚：原先是要談談測試中失敗的議題，但同樣這部分需要大量實作才會比較有感，而前面的變異測試（Mutation Testing）也是降低漏網之魚的手段之一，因此先有變異測試的概念我覺得剩下就是在慢慢補足案例已經，重新與團隊思考測試案例路徑的規劃即可。
 
---

# 完賽感言

屏除了上述部分，這邊首先要恭喜的是一起閱讀本系列文的讀者，對於基本的測試概念來說你們也完賽了！你可能會訝異於感覺還有不少東西沒提及，但是其餘的東西都是從基本的概念延伸而來的。就像開發產品程式碼一樣，我們也需要透過實際的測試經驗來慢慢磨練我們的測試技巧，並從中體會更多的心得與不斷精進測試相關的內容。

再來也要恭喜我自己（？），今年參賽其實也是挺突然的，一直到了開賽最後一天才打算來發文 XD，最主要的原因是有些部分希望能準備得更充分一點，但這種東西其實也沒有準備完的一天⋯⋯，因為測試程式碼的工具也不斷在進步，剩下的東西只能靠時間來驗證了。所以最後乾脆一不做二不休，直接給他報名下去，雖然報名後每天都在懷疑人生，好幾天寫到晚上十一點差點超時，不然就是一寫完直接累癱睡爆的那種，可是，我撐過來惹！！！感謝賽期間女友的支持與家中貓貓們的陪伴，另外也感謝同事把我鐵人賽當作在追番一樣閱讀，給了我不少回饋與靈感。

最後想要一起恭喜其他鐵人們，不論完賽與否，我覺得有繁中文件可以閱讀是一件很幸福的事情，更別提如果是追最新技術的鐵人們，在國內文獻上的參考很少的情況下還能夠寫出很多優質的文章，真的非常不簡單。由其每當我沒靈感時我都會邊看看其他鐵人寫了什麼 XD 時常一不注意差點忘記自己也在參賽，現在終於能好好來拜讀了！

---

# TOC

> 寫完文章要列 TOC 簡單多了（？）

此 TOC 是透過 JavaScript 語法直接在[鐵人賽目錄](https://ithelp.ithome.com.tw/users/20119062/ironman/5554?page=1) 頁面上 Console 取得系列文目錄標題與連結，歡迎各位鐵人自行取用下列語法。（迷：等一下，大家應該都寫完 TOC 了吧！！！！）

```js
const titleEl = document.querySelectorAll('.qa-list .qa-list__title')
const linkEl = document.querySelectorAll('.qa-list .qa-list__title a')
const tocList = ['\n']

titleEl.forEach((el, idx) => tocList.push(`- [${el.innerText}](${linkEl[idx].href})\n`)) // 直接產出 Markdown 格式
console.log(tocList.join('')) // 顯示於 Console 控制台中自行複製即可
```

測試案例⋯⋯ （誒
```js
test('it should return markdown list', () => {
    // ... 不知道為什麼寫完當下連這個都想測試一下
})
```

產出結果：

- [【初始ノ章】前言與 TOC](https://ithelp.ithome.com.tw/articles/10287432)
- [【初始ノ章】測試建置：跟著系列文一起學測試](https://ithelp.ithome.com.tw/articles/10292537)
- [【初始ノ章】測試建置：在自己的專案加入單元測試來學測試](https://ithelp.ithome.com.tw/articles/10293368)
- [【初始ノ章】測試建置：Vitest Config Setting](https://ithelp.ithome.com.tw/articles/10294024)
- [【概念ノ章】測試價值：為什麼我需要測試](https://ithelp.ithome.com.tw/articles/10294706)
- [【概念ノ章】測試價值：加入測試的時機](https://ithelp.ithome.com.tw/articles/10295380)
- [【概念ノ章】測試脈絡－1. 決定測試類型](https://ithelp.ithome.com.tw/articles/10296174)
- [【概念ノ章】測試脈絡－2. 決定測試工具](https://ithelp.ithome.com.tw/articles/10296779)
- [【概念ノ章】測試脈絡－3. 決定測試情境與測試案例](https://ithelp.ithome.com.tw/articles/10297571)
- [【概念ノ章】測試脈絡－4. 測試案例中的 3A 模式](https://ithelp.ithome.com.tw/articles/10298229)
- [【概念ノ章】測試脈絡－5. 撰寫測試碼 FIRST 法則與學習步驟](https://ithelp.ithome.com.tw/articles/10298760)
- [【語法ノ章】案例與情境：describe & it 與輔助 API](https://ithelp.ithome.com.tw/articles/10299474)
- [【語法ノ章】Setup & Teardown：beforeAll, beforeEach, AfterAll & AfterEach](https://ithelp.ithome.com.tw/articles/10300210)
- [【語法ノ章】斷言（Assertion）上篇：斷言語法與 Matchers](https://ithelp.ithome.com.tw/articles/10300787)
- [【語法ノ章】斷言（Assertion）下篇： 替身、快照（Snapshot）與拋出錯誤](https://ithelp.ithome.com.tw/articles/10301430)
- [【試験ノ章】第一個測驗：測試情境案例、Setup & Teardown 與 Matchers](https://ithelp.ithome.com.tw/articles/10302202)
- [【概念ノ章】測試工具： Vue Test Utils 與元件測試](https://ithelp.ithome.com.tw/articles/10302568)
- [【語法ノ章】元件測試：容器（Wrapper）](https://ithelp.ithome.com.tw/articles/10303238)
- [【語法ノ章】元件測試：容器方法（Wrapper methods）－選擇器與陷阱](https://ithelp.ithome.com.tw/articles/10303784)
- [【語法ノ章】元件測試：容器方法（Wrapper methods）－取得目標資訊](https://ithelp.ithome.com.tw/articles/10304396)
- [【語法ノ章】元件測試：容器方法（Wrapper methods）－模擬事件](https://ithelp.ithome.com.tw/articles/10304881)
- [【語法ノ章】元件測試：模擬 Vue APIs（data, props）](https://ithelp.ithome.com.tw/articles/10305460)
- [【語法ノ章】元件測試：模擬 Vue APIs（emit, provide/inject）](https://ithelp.ithome.com.tw/articles/10305821)
- [【語法ノ章】元件測試：模擬 Vue APIs（slots, custom directives）](https://ithelp.ithome.com.tw/articles/10306500)
- [【試験ノ章】第二個測驗：容器（Wrapper）與容器方法（Wrapper methods）](https://ithelp.ithome.com.tw/articles/10306965)
- [【概念ノ章】測試替身（Test Double）：Dummy, Stub, Spy, Fake & Mock](https://ithelp.ithome.com.tw/articles/10307288)
- [【語法ノ章】測試替身（Test Double）feat. Vue Test Utils](https://ithelp.ithome.com.tw/articles/10307790)
- [【語法ノ章】測試替身（Test Double）feat. Vitest Mocking API（Date, Timer）](https://ithelp.ithome.com.tw/articles/10308153)
- [【語法ノ章】測試替身（Test Double）feat. Vitest Mocking API（Function, Globals & Modules）](https://ithelp.ithome.com.tw/articles/10308508)
- [【語法ノ章】Vue Ecosystem 篇：Vue Router 測試](https://ithelp.ithome.com.tw/articles/10308907)
- [【語法ノ章】Vue Ecosystem 篇：Pinia 測試](https://ithelp.ithome.com.tw/articles/10309064)
- [【進階ノ章】Vitest UI](https://ithelp.ithome.com.tw/articles/10309162)
- [【進階ノ章】覆蓋率（Coverage）](https://ithelp.ithome.com.tw/articles/10309187)
- [【進階ノ章】寫測試的最佳實踐（Testing Best Practice）](https://ithelp.ithome.com.tw/articles/10309245)
- [【雜談ノ章】那些沒說到的內容、完賽感言、TOC 與參考資料們](https://ithelp.ithome.com.tw/articles/10309267)

---

# 參考資料
不想看我的系列文也沒關係（嗚），但這些文章你絕對不能錯過。

## 文章

### 環境設置
- [Ignacio Falk - Testing with Vitest](https://www.thisdot.co/blog/testing-with-vitest)

### 測試金字塔
- [Martin Fowler - TestPyramid](https://martinfowler.com/bliki/TestPyramid.html)
- [Martin Fowler - The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)

### 單元測試
- [Martin - UnitTest](https://martinfowler.com/bliki/UnitTest.html)
- [otischou - 暸解單元測試](https://otischou.tw/2019/08/02/unit-test.html)

### 測試斷言庫
- [Chris - 讀 Jest Doc - 斷言庫](https://dwatow.github.io/2020/04-18-jest/jest-doc-2/)

### 測試替身
- [Teddy Chen - Test Double（1）：什麼是測試替身？](http://teddy-chen-tw.blogspot.com/2014/09/test-double1.html)
- [Teddy Chen - Test Double（2）：五種替身簡介](http://teddy-chen-tw.blogspot.com/2014/09/test-double2.html)
- [Teddy Chen - Test Double（3）：Dummy Object](http://teddy-chen-tw.blogspot.com/2014/09/test-double3dummy-object.html)
- [Teddy Chen - Test Double（4）：Test Stub](http://teddy-chen-tw.blogspot.com/2014/09/test-double4test-stub.html)
- [Teddy Chen - Test Double（5）：Test Spy](http://teddy-chen-tw.blogspot.com/2014/10/test-double5test-spy.html)
- [Teddy Chen - Test Double（6）：Fake Object](http://teddy-chen-tw.blogspot.com/2014/10/test-double6fake-object.html)
- [Teddy Chen - Test Double（7）：Mock Object](http://teddy-chen-tw.blogspot.com/2014/10/test-double7mock-object.html)
- [Martin Fowler - TestDouble](https://martinfowler.com/bliki/TestDouble.html)
- [被蛇咬到的魯卡 - Unit Test 中的替身：搞不清楚的Dummy 、Stub、Spy、Mock、Fake](https://medium.com/starbugs/unit-test-%E4%B8%AD%E7%9A%84%E6%9B%BF%E8%BA%AB-%E6%90%9E%E4%B8%8D%E6%B8%85%E6%A5%9A%E7%9A%84dummy-stub-spy-mock-fake-94be192d5c46)
- [Julian Chu - 測試中常見的名詞：Stub, Dummy, Mock..等等](https://jchu.cc/2018/08/16-test.html)

### 覆蓋率
- [Teddy Chen - 透過測試涵蓋率讓重構更有信心（上）：分支涵蓋率](http://teddy-chen-tw.blogspot.com/2019/02/blog-post.html)
- [Teddy Chen - 透過測試涵蓋率讓重構更有信心（中）：突變測試](http://teddy-chen-tw.blogspot.com/2019/02/blog-post_19.html)
- [Teddy Chen - 透過測試涵蓋率讓重構更有信心（下）：特徵測試](http://teddy-chen-tw.blogspot.com/2019/02/blog-post_20.html)
- [Martin Fowler - TestCoverage](https://martinfowler.com/bliki/TestCoverage.html)

### TDD
- [就是91 - 30天快速上手TDD](https://ithelp.ithome.com.tw/users/20010292/ironman/462)

### 突變測試
- [wwwzbwcomlv - 测试你的测试：Stryker Mutator + Jest 实现 JS / TS 变异测试](https://juejin.cn/post/6926476489345122317)

### 最佳實踐
- [goldbergyoni/javascript-testing-best-practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

## 書籍
- [XUnit Test Patterns](http://xunitpatterns.com/index.html)
- [Robert C. Martin - 無瑕的程式碼－敏捷軟體開發技巧守則](https://www.tenlong.com.tw/products/9789862017050)
- [Martin Fowler - 重構｜改善既有程式的設計, 2/e](https://www.tenlong.com.tw/products/9789865021832)
- [Roy Osherove - 單元測試的藝術](https://www.tenlong.com.tw/products/9789864342471)
- [Kent Beck 的測試驅動開發：案例導向的逐步解決之道](https://www.tenlong.com.tw/products/9789864345618)
- [Mark Ethan Trostler - 可測試的 JavaScript](https://www.tenlong.com.tw/products/9789863470090)
- [Edd Yerburgh - Vue.js 應用測試](https://www.tenlong.com.tw/products/9787111646709)
- [CODE COMPLETE：軟體開發實務指南, 2/e](https://www.tenlong.com.tw/products/9789864341313)

## Facebook 追蹤
- [91 敏捷開發之路](https://www.facebook.com/91agile/)
- [F2EUnit.tw-單元測試在前端](https://www.facebook.com/groups/2430262353914136)

## 相關工具
- [Vue3 - Testing](https://vuejs.org/guide/scaling-up/testing.html#testing)
- [Vitest](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Stryker Mutator](https://stryker-mutator.io/)
- [Jest](https://jestjs.io/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)

-- 希望將來還有機會與各位鐵人一起共襄盛舉！--