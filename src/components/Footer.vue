<template>
  <footer class="bg-light text-muted py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 d-flex flex-column justify-content-between">
          <div class="h3 text-center text-lg-left">Berserker Fitness</div>
          <div class="text-center text-lg-left mb-2">© Copright 2021 Berserker Fitness運動有限公司</div>
          <p class="text-center text-lg-left">SINCE 2019</p>
          <p class="text-muted mt-1 mt-lg-5 text-center text-lg-left mb-1">Berserker Fitness Information</p>
          <div class="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start">
            <div class="mt-1 mr-2 CompanyInfo_content">
              <font-awesome-icon :icon="['fas', 'caret-right']" />
              <router-link to="/Company/CompanyDetail" class="location_search_btn mt-2 ml-1">了解Berserker Fitness</router-link>
            </div>
            <div class="mt-1 CompanyInfo_content">
              <font-awesome-icon :icon="['fas', 'caret-right']" />
              <router-link to="/Company/LocationInfo" class="location_search_btn mt-2 ml-1">Berserker Fitness據點查詢</router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <p class="text-center text-md-left d-none d-lg-block mb-1">Contact us</p>
          <p class="text-center text-lg-left d-block d-lg-none text-muted mt-4">如有任何疑問歡迎隨時與我們聯繫。</p>
          <div class="d-flex align-items-lg-start flex-column flex-lg-row align-items-center">
            <p class="text-dark mr-4 footer-tel">0800-123-4567</p>
            <div class="d-flex flex-lg-column flex-row mb-2">
              <small class="text-dark small-text mr-1">服務時間</small>
                <small class="small-text">08:00-18:00</small>
            </div>
          </div>
          <p class="text-center text-lg-left mb-1">粉絲團</p>
          <div class="d-flex justify-content-center justify-content-lg-start">
            <p class="mr-3">
              <a class="text-info text-dark" href="#" title="facebook粉絲團">
                <font-awesome-icon :icon="['fab','facebook-square']" size="3x"></font-awesome-icon>
              </a>
            </p>
            <p>
              <a class="text-info text-dark" href="#" title="IG粉絲團">
                <font-awesome-icon :icon="['fab','instagram']" size="3x"></font-awesome-icon>
              </a>
            </p>
          </div>
          <p class="text-center text-lg-left mb-1">聯絡信箱</p>
          <div class="d-flex align-items-center justify-content-center justify-content-lg-start">
            <font-awesome-icon :icon="['fas', 'caret-right']" />
            <a class="text-center text-lg-left d-block ml-2 mail_btn" href="mailto:randychen510.gmail.com">randychen510.gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.footer-tel{
  font-size: 25px;
}
.location_search_btn{
  color:#000;
}
.location_search_btn:hover{
  color:grey;
  transition:all .2s;
}
.mail_btn{
  color:#000;
}
.mail_btn:hover{
  color:grey;
  transition:all .2s;
}
.small-text{
  font-size: 14px;
}
@media(max-width:768px){
  .footer-tel{
    font-size: 20px;
  }
}
@media(max-width:568px){
  .CompanyInfo_content{
    text-align:center;
  }
}
</style>
