# vue_hw

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

**作業修改進度**
* 功能部分
	* 將各種元件檔加入VueX的管理。
	* 為CustomerOrder.vue元件檔加入進度bar條的特效。
	* 為introbanner.vue加入innerHeight的效果。
	* 將Home.vue 和 LectureProdut.vue的card的相片裡面限制它高度的內容拿掉，讓照片比例不會失真。
	* 修正LocationInfo.vue中會有X軸的問題，因為，你的row外面沒有加上container-fluid把這個row包起來的關係。
	* 修正OrdierList.vue中Footer沒有置底的問題
	* 修正在解析度568px底下，CustomerCheckOut.vue的內容會和Footer內容交疊的問題。
	* 修正在結帳頁面中的進度bar條不會出現的問題。
* 2021.03.26 修改進度
	* 將所有加入購物車的行為都改成先丟到localStorage裡面，等到，Customer1.vue按下確認付款去，才將localSotarge裡面的所有內容，往後端的購物車拋。 已經全部修改完成。
	* 修改Customer1.vue和Customer2.vue的布局，來達成將localStorage的內容拋到後端的功能。
* 2021.03.28 修改進度
	* 將Navbar修改成可以固定在上方，還有在首頁的收闔的特效。
* 2021.03.29 修改進度
	* 為LectureProduct.vue的頁面加入搜尋課程的功能。
	* 將原本修改後註解的部分全部刪掉。
* 2021.03.31 修改進度
	* 將Home.vue中的aos特效都改為由下往上飛入，因為左右飛入的特效，會造成整個頁面的寬度變大，會讓Navbar和頁面內容的寬度不一致。	
* 2021.04.07 修改進度
	* 修正助教第四次的修改建議部分
	* 功能面
    * 當宣告 const vm = this; 之後可以將 this 替換成 vm，例如： this.$http.get 改為 vm.$http.get 等。 						-> 2021.04.06 ok!
    * 正常來講 assets 底下不會出現 all.css 與 all.css.map(未修改)                                                    		-> 2021.04.06 ok!
    * 似乎已經開始嘗試重新規劃 Layout 但 Footer 似乎還沒改？但版型規畫並沒有特別需要 Footer 單一引入的地方。	        	-> 2021.04.06 ok!
    * Ans: 是的，助教，版型規劃沒有特別要單一引入Footer的地方，它就是大家都會用到的一個元件，我會保持原本的版型布局。
    * 已經全域引入 axios 因此不用再元件內再次引入。                                                                  		-> 2021.04.06 ok!

    * 修改LectureProduct.vue 149 到 152 函式的箭頭函式的寫法																-> 2021.04.06 ok!
    * import Footer from '../../components/Footer.vue' 可以嘗試改成 import Footer from '@/components/Footer.vue' 即可。 	-> 2021.04.06 ok!
    * 統一 {{}} 寫法   -> 2021.04.06 改完了 																													
    * Customer2.vue 的 126 行 alt 屬性似乎寫錯？Customer1.vue 也有該問題。 													-> 2021.04.06 ok!																													
	* isLoading 的關閉時機可以思考一下，建議會放在賦予資料完畢後方，避免使用者打開視窗時資料還沒有賦予完成。     			-> 2021.04.06 ok!，最主要是Customer2.vue那邊的問題，已經修正完了
	
	* 請使用傳統函式縮寫。																									-> 2021.04.07 還沒!!!!!
	* (Qusetion: 是代表所有的傳統函式都要改成箭頭函式的寫法嗎?)

	* Navbar.vue 的 a 連結請注意預設行為。																					-> 2021.04.06 ok!									
	* 請多加注意元件的 name 屬性，建議與元件名稱相同，舉例來講該原件是 AlertMessage.vue 但 Name 卻是 Navbar 會非常讓人疑惑。  -> 2021.04.06 ok!		
	* @import "../../../node_modules/bootstrap/scss/functions"; 可以改成 @import "~bootstrap/scss/functions"; 即可。  		-> 2021.04.06 ok!
			* 請引入 SCSS(@import "./assets/helper/all.scss";) 而不是 css(@import "./assets/helper/all.css";)。				-> 2021.04.06 ok!	
			* 可以將 all.js 內容寫在 App.vue 就好了。                                										-> 2021.04.06 ok!
			* 已經使用 Vuex 了，那麼就可以移除 eventBus。															        -> 2021.04.07 ok!，將Home.vue轉換到LectureProduct.vue的searchText的內容，由eventbus傳遞轉成VueX來傳遞
			* new 1.txt 不應加入版本控制，請移除。																			-> 2021.04.06 ok!
	
	* 圖片大小請不要超過顯示區域的兩倍，某些區塊的圖片高達 6000x4000，但實際顯示只有 525x300。								-> 2021.04.07 還沒!!!!!
    * (Qusetion: 請教助教是哪的頁面的哪個部分有這個問題呢? )
																												
	* 畫面
	* 整體
	* 圖片要注意尺寸壓縮變形的問題																							-> 2021.04.07 ok!，我修改了LectureProduct.vue, Customer1.vue中的card的img的圖片失真問題
	* 首頁																													-> 2021.04.07 ok!
	* Banner 上標題的黑底可以讓 Padding 統一
	* 段落字重不要使用粗體，粗體建議只用在標題
	* 產品頁																												-> 2021.04.07 ok!
	* Banner 過高，且已經在產品頁，來去逛逛的按鈕在這邊好像沒有意義，建議不要讓 Banner 呈現的樣式跟首頁一樣
	* 結帳表單																												-> 2021.04.07 ok!
	* 標題等樣式跟按鈕過於類似，這邊建議修改

	* 行動版
	* 首頁
	* Banner 的圖片最後一張沒有重點，可以再調整一下																			-> 2021.04.07 ok!
	* Menu 點選其他選單後建議自動摺疊																						-> 2021.04.07 ok!

	* 結帳流程
	* 結帳成功圖片沒有重點，可以再調整一下																					-> 2021.04.07 ok!
	
* 2021.04.08 修改進度	
	* 修正Customer2.vue中，getCart取錯資料的部分，從getCartlocal改回getCart
	* 修正從Customer1.vue跳轉到Customer2.vue時，Customer2.vue還沒有完整呈現購物車的問題，等需要再loading一下才能呈現
* 2021.04.09 修改進度
	* 修正當Customer2.vue在執行getCart的程序時，會因為Customer1.vue中的購物車內容還沒有增加完畢，導致Customer2.vue會漏載入購物車內的商品。	
* 2021.04.10 修改進度	
	* 修正傳統函式的縮寫。 -> 2021.04.10 ok!
* 2021.04.12 修改進度		
	* 修正SelfProduct.vue的getCart取錯資料的問題，即getCart改成getCartlocal
	* 刪除不需要的all.js檔案。
	* 修改在CompanyDetail.vue頁面中的圖片的大小。
	