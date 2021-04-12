<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb bg-transparent border border-bottom mb-0">
        <li class="breadcrumb-item">
          <router-link to="/" class="text-muted">
              首頁
          </router-link>
        </li>
        <li class="breadcrumb-item active text-dark" aria-current="page">關於我們</li>
      </ol>
    </nav>
    <div class="d-block d-md-flex">
      <div class="jumbotron rounded-0 bg-cover intro_image d-flex justify-content-center align-items-center">
        <div class="intro_content d-none d-lg-block">
          <h2 class="h1 display-4">讓你更喜歡明天的自己</h2>
          <h3>這就是Berserker Fitness存在的理由</h3>
          <h3 class="mt-5">讓Berserker Fitness跟你一起變得更好</h3>
        </div>
        <div class="d-block d-lg-none intro_content_hide">
          <h2 class="h1 display-4">讓你更喜歡明天的自己</h2>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row flex-row-reverse mb-5 no-gutters">
        <div class="col-md-8">
          <img src="https://i.postimg.cc/MGRT5MrB/YdT3SA.jpg" class="img-fluid" alt="Berserker Fitness 服務圖片">
        </div>
        <div class="col-md-4 d-flex flex-column justify-content-center align-items-start bg-light px-4 pt-3 pt-md-0">
          <h2>最專業的服務</h2>
          <p>在Berserker Fitness，我們提供了大場地與乾淨的器材，為的就是要讓您擁有最佳的體驗</p>
          <p class="font-weight-bold">專線:0500-123-252</p>
          <p>我們以上這支專線，有最專業的客服24小時接聽您任何有疑問的地方</p>
        </div>
      </div>
      <div class="row no-gutters mb-5">
        <div class="col-md-8">
          <img src="https://i.postimg.cc/MHZpzsZ0/vSDXw4.jpg" class="img-fluid" alt="Berserker Fitness 護具圖片">
        </div>
        <div class="col-md-4 d-flex flex-column justify-content-center align-items-start bg-light px-4 pt-3 pt-md-0">
          <h2>專業的護具</h2>
          <p>在Berserker Fitness有關護具的相關產品，是未來Berserker想要拓展的服務，讓您在訓練時更安全</p>
          <p class="font-weight-bold">專線:0500-123-252</p>
          <p>我們以上這支專線，有最專業的客服24小時接聽您任何有疑問的地方</p>
        </div>
      </div>
      <div class="row flex-row-reverse mb-5 no-gutters">
        <div class="col-md-8">
          <img src="https://i.postimg.cc/653pS1mt/jHAQsf.jpg" class="img-fluid" alt="Berserker Fitness 疑問圖片">
        </div>
        <div class="col-md-4 px-2 pt-3 pt-md-0">
          <h2 class="feature-title">常見問題</h2>
          <ul class="list-group companyIntro">
            <li class="list-group-item p-0 border-0">
              <a href="#" class="btn d-block text-left rounded-0">注意事項
                <font-awesome-icon :icon="['far', 'hand-point-down']" />
              </a>
              <p class="hide-menu">
              1. 圖片僅供參考，課程內容請到現場體驗為主。<br>
              2. 若器材有任何損壞，請拍照存證並立即與我們聯繫。
              </p>
            </li>
            <li class="list-group-item p-0 border-0">
              <a href="#" class="btn d-block text-left rounded-0">疫情期間，是否健身房有定期消毒?
                <font-awesome-icon :icon="['far', 'hand-point-down']" />
              </a>
              <p class="hide-menu">目前入場的學員都已經限制入場必須要配戴口罩。教練與學員上課的時候，也都全程會配戴口罩。並且入場也必須在額溫37.5度以下，才能入場。</p>
            </li>
            <li class="list-group-item p-0 border-0">
              <a href="#" class="btn d-block text-left rounded-0">我適合那些課程呢?
                <font-awesome-icon :icon="['far', 'hand-point-down']" />
              </a>
              <p class="hide-menu">
              不管你是健身小白，還是重訓巨巨，我們都可以提供適合你狀況的課程
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'CompanyDetail',
  data () {
    return {
      product_length: 0
    }
  },
  methods: {
    CounterCoupute (cartTotalLength) {
      this.product_length = cartTotalLength
    }
  },
  mounted () {
    $('.companyIntro>li>a').click(function (e) {
      e.preventDefault()
      $(this).toggleClass('bg-warning text-dark')
      $(this).parent().find('.hide-menu').slideToggle()
      $(this).parent().siblings().find('.hide-menu').slideUp()
      $(this).parent().siblings().find('a').removeClass('bg-warning text-dark')
    })
  }
}
</script>

<style scoped>
.intro_image{
  height: 650px;
  background-image:url(https://upload.cc/i1/2021/02/18/6H17VM.jpg);
  width:70%;
  position:relative;
}
.intro_content{
  background:rgba(255,255,255,0.5);
  position:absolute;
  right:-300px;
}
.intro_content_hide{
  background:rgba(255,255,255,0.5);
}
.hide-menu{
  display:none;
  border:1px solid black;
  margin-bottom:0;
}
.companyIntro>li>a:hover{
  background:grey;
  color:white;
}
.feature-title{
  text-align:center;
  position:relative;
}
.feature-title::after{
  right:15%;
  content: "";
  position:absolute;
  background:black;
  top:52%;
  width:9%;
  height:2px;
}
.feature-title::before{
  left:15%;
  content: "";
  position:absolute;
  background:black;
  top:52%;
  width:9%;
  height:2px;
}
@media(max-width:1024px){
  .feature-title::before{
    left:15%;
  }
  .feature-title::after{
    right:15%;
  }
}
@media(max-width:768px){
  .feature-title::before{
    left:10%;
  }
  .feature-title::after{
    right:10%;
  }
}
@media(max-width:900px){
  .intro_image{
    width:100%;
  }
}
@media(max-width:320px){
  .feature-title::before{
    left:15%;
  }
  .feature-title::after{
    right:15%;
  }
}
</style>
