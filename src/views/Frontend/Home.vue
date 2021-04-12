<template>
  <div>
    <Introbanner :introImage="image_website" :introImage_1="image_website1" :introImage_2="image_website2"></Introbanner>
    <AlertMessage/>
    <div class="container main-content my-3">
      <div class="row mt-5">
        <div class="col-12 text-center">
          <small class="text-muted">教練推薦課程</small>
          <p class="h2 mb-4 font-weight-normal">Recommended</p>
          <carousel :autoplay="true" :loop="true" :paginationEnabled="false" :perPageCustom="[[320, 1], [560, 1], [768, 2], [1024, 3]]">
            <slide v-for="(item, index) in aerobicArray" :key="index">
              <div class="card h-100 border-0 mr-2 rouded-0">
                <img class="card-img-top" :src="item.imageUrl" :alt="`${item.title}課程`">
                <div class="card-body pt-1">
                  <p class="card-title font-weight-bold mb-1 h5">{{ item.title }}</p>
                  <p class="card-title medium-text text-muted">{{ item.description }}</p>
                  <div class="d-flex justify-content-between align-items-end">
                    <small class="card-text text-muted small-text" v-if="item.origin_price!==item.price">原本售價<del>{{ item.origin_price| currency }}</del></small>
                    <strong class="card-text text-muted ml-auto">現在售價 <span class="h4 text-danger">{{ item.price | currency }}</span></strong>
                  </div>
                  <button class="btn btn-outline-dark rounded-0 btn-md-lg rounded-0 w-100" type="button" @click="getProduct(item.id)">前去課程介紹</button>
                </div>
              </div>
            </slide>
          </carousel>
        </div>
      </div>
      <div class="row my-6" data-aos="fade-up"  data-aos-duration="2000" data-aos-once="true">
        <div class="col-md-6">
          <img src="https://i.postimg.cc/gJrm7Kyk/nXupqk.jpg" class="img-fluid" alt="Berserker Fitness 護具圖片">
        </div>
        <div class="col-md-6">
          <h2 class="font-weight-bold">均衡的飲食 加速得到理想身材</h2>
          <p class="h5 text-muted">均衡的肉類和蔬菜，可以為您經過刻苦的訓練而撕扯的肌肉進行修補，在經過日積月累的正確訓練和飲食控制，讓就可以加速您達成您想要的身材。</p>
          <p class="h5 text-muted">本健身房就有專業的教練來為您進行飲食控制 和 正確的訓練，加速您達到理想的身材。</p>
        </div>
      </div>
      <div class="row my-6 flex-row-reverse" data-aos="fade-up"  data-aos-duration="2000" data-aos-once="true">
        <div class="col-md-6">
          <img src="https://i.postimg.cc/L8M4sLSN/6vFw7G.jpg" class="img-fluid" alt="Berserker Fitness 護具圖片">
        </div>
        <div class="col-md-6">
          <h2 class="font-weight-bold">最專業的訓練</h2>
          <p class="h5 text-muted">我們擁有最專業的教練和器材讓您在最安全與最正確的姿勢下，進行訓練。</p>
          <p class="h5 text-muted">讓您增強最基本的身體能力之外，又可以讓您達到您想要的理想身形，也可以讓您吃更多您喜歡的東西~</p>
        </div>
      </div>
      <div class="row my-6" data-aos="fade-up" data-aos-duration="2000" data-aos-once="true">
        <div class="col-md-4">
          <a href="#" class="content-option d-flex w-100" @click.prevent="ToProduct('重訓')">
            <div class="cover"></div>
            <span class="text h2 font-weight-bold">重訓課程</span>
            <div class="content_img w-100" style="background-image:url('https://upload.cc/i1/2021/03/05/3ezsnD.jpg');"></div>
          </a>
        </div>
        <div class="col-md-4">
          <a href="#" class="content-option d-flex w-100" @click.prevent="ToProduct('有氧')">
            <div class="cover"></div>
            <span class="text h2 font-weight-bold">有氧課程</span>
            <div class="content_img w-100" style="background-image:url('https://upload.cc/i1/2021/02/05/6lcXf2.jpg');"></div>
          </a>
        </div>
        <div class="col-md-4">
          <a href="#" class="content-option d-flex w-100" @click.prevent="ToProduct('飲食課程')">
            <div class="cover"></div>
            <span class="text h2 font-weight-bold">飲食課程</span>
            <div class="content_img w-100" style="background-image:url('https://upload.cc/i1/2021/03/29/nXupqk.jpg');"></div>
          </a>
        </div>
      </div>
      <router-link class="btn btn-outline-dark btn-lg d-block rounded-0 mt-3 goTolecture_btn" to="/lecture/LectureProduct">前往課程頁一覽</router-link>
      <div class="row text-center mt-5">
        <div class="col-12">
          <small class="text-muted small-text">大家都怎麼推薦</small>
          <p class="h2 mb-4 font-weight-normal">How is Everyone feeling</p>
          <div class="row">
            <div class="col-md-4">
              <div class="card h-100 border-0 text-justify">
                <img class="card-img-top mx-auto" src="https://randomuser.me/api/portraits/women/10.jpg" alt="`客戶評價頭像`" style="width:100px; height:100px; border-radius:50%;">
                <div class="card-body">
                  <p class="card-text mb-0 text-center font-weight-bold">來自深淵的女子</p>
                  <small class="card-text text-muted medium-text">Berserker Fitness真的解救了我多年來苦惱的肉肉，看著肉肉越來越少，褲子越來越鬆，我的身心靈彷彿就得到了淨化，
                  強烈推薦你/妳來Berserker體驗練到腿軟的滋味。</small>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card h-100 border-0 text-justify">
                <img class="card-img-top mx-auto" src="https://randomuser.me/api/portraits/men/3.jpg" alt="客戶評價頭像" style="width:100px; height:100px; border-radius:50%;">
                <div class="card-body">
                  <p class="card-text mb-0 text-center font-weight-bold">基隆的嗨先生</p>
                  <small class="card-text text-muted medium-text">Berserker Fitness無話可說無可救藥的<strong class="h4">就是讚!!!</strong></small>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card h-100 border-0 text-justify">
                <img class="card-img-top mx-auto" src="https://randomuser.me/api/portraits/men/90.jpg" alt="客戶評價頭像" style="width:100px; height:100px; border-radius:50%;">
                <div class="card-body">
                  <p class="card-text mb-0 text-center font-weight-bold">來自日本的小林先生</p>
                  <small class="card-text text-muted medium-text"><strong class="h4">紅豆泥!!!</strong>你/妳還沒有加入Berserker Fitness的健身房，妳是不是阿搭麻
                  控估力</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header text-dark">
            <h3 class="modal-title" id="exampleModalLabel" v-html="product_detail.title"></h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="card border-0">
              <img class="card-img-top rounded-0" :src= "product_detail.imageUrl" :alt="`${product_detail.title}課程圖片`">
              <div class="card-body">
                <div v-html="product_detail.content"></div>
                <div class="d-flex justify-content-between align-items-end">
                  <del class="origin_price_text">原價{{ product_detail.origin_price }}元</del>
                  <strong class="special_price_text">現在只要<span class="text-danger">{{ product_detail.price }}</span>元</strong>
                </div>
                <div class="form-group mt-3">
                  <div class="form-group">
                    <select class="form-control form-control-lg rounded-0" aria-label="Default select example" v-model="lecturenum">
                      <option value='' disabled>請選擇數量</option>
                      <option :value="num" v-for="num in 10" :key="num">選購{{ num }} {{ product_detail.unit }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <span class="h4 text-muted">小計 {{ product_detail.price*lecturenum }} 元</span>
            <button type="button" class="btn btn-warning rounded-0" @click="addToCart(product_detail, lecturenum)">加到購物車</button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Introbanner from '../../components/Introbanner.vue'
import Footer from '@/components/Footer.vue'
import AlertMessage from '../../components/AlertMessage.vue'
import $ from 'jquery'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'Home',
  data () {
    return {
      lecturenum: '',
      product_detail: [],
      searchText: '',
      status: {
        loadingItem: ''
      },
      image_website: 'https://upload.cc/i1/2021/03/10/0QKA7j.jpg',
      image_website1: 'https://upload.cc/i1/2021/02/18/cyrh8S.jpg',
      image_website2: 'https://upload.cc/i1/2021/03/05/4UWMBe.jpg'
    }
  },
  methods: {
    getProducts () {
      this.$store.dispatch('getProducts')
    },
    getProduct (id) {
      this.$router.push(`/lecture/${id}`)
    },
    getDetail (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.status.loadingItem = id
      vm.$http.get(api).then((response) => {
        $('#productModal').modal('show')
        vm.product_detail = response.data.product
        vm.status.loadingItem = ''
      })
    },
    addToCart (data, qty = 1) {
      const vm = this
      vm.$store.dispatch('addToCartLocal', { data, qty })
      vm.$bus.$emit('messsage:push', '已加入購物車', 'success')
      $('#productModal').modal('hide')
      $('body').toggleClass('without-padding')
      vm.lecturenum = ''
    },
    getCart () {
      this.$store.dispatch('getCartLocal')
    },
    activeCart () {
      $('.cart_list_cover').fadeToggle()
    },
    ToProduct (selected) {
      const vm = this
      vm.$store.state.selectLecture = selected
      document.documentElement.scrollTop = 0
      vm.$router.push('/lecture/LectureProduct')
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  },
  components: {
    AlertMessage,
    Introbanner,
    Carousel,
    Slide,
    Footer
  },
  computed: {
    workoutArray () {
      return this.products.filter((item) => item.category === '重訓')
    },
    aerobicArray () {
      return this.products.filter((item) => item.category === '有氧')
    },
    products () {
      return this.$store.state.products
    },
    cart () {
      return this.$store.state.cart
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Lecture:hover{
  cursor:pointer;
  box-shadow:3px 3px grey;
  transition: all .5s;
}
.list-group-item.active{
  background:rgba(228, 225, 225, 0.5);
  font-weight:600;
}
.lecture_option{
  width:50%;
}
.Recommended_class_frame{
  overflow:hidden;
}
.Recommended_class{
  transform:translateX(0px);
  transition:all .5s;
}
.Recommended_class{
  .card-footer{
    .btn{
      width:60%;
      font-size:10px;
      color:grey;
    }
    .btn:hover{
      color:white;
    }
  }
}
.swiper-container2{
  height:100%;
}
.small-text{
  font-size: 14px;
}
.medium-text{
  font-size: 16px;
}
.goTolecture_btn{
  width: 60%;
  margin:0 auto 0 auto;
}
.special_price_text{
  font-size: 1.5rem;
}
.origin_price_text{
  font-size: 1rem;
}
@media(max-width:768px){
  .Recommended_class{
  .card-footer{
    .btn{
      width:100%;
    }
  }
}
}
@media(max-width:680px){
  .lecture_option{
    width:100%;
  }
  .goTolecture_btn{
    width:100%;
  }
}
@media(max-width:380px){
  .special_price_text{
    font-size:1.2rem;
  }
}
.content-option{
  position:relative;
  height: 300px;
  overflow: hidden;
  color:black;
  justify-content:center;
  align-items:center;
  text-decoration: none;
}
.text{
  z-index:3;
  writing-mode: vertical-rl;
  transition:all .5s;
  color: yellow;
}
.cover{
  border:1px solid black;
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background:yellow;
  opacity:0.2;
  z-index:1;
  filter: blur(5px);
  transition:all .5s;
  transform:translateY(-400px);
}
.content_img{
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-position: center center;
  background-size: cover;
  filter: blur(5px);
  transition:all .5s;
}
a:hover{
  text-decoration: none;
  color:black;
}
a:hover .content_img{
  -webkit-filter:blur(0px);
  filter:blur(0px);
  transform: scale(1.4);
  -webkit-transform: scale(1.4);
}
a:hover .cover{
  filter:blur(0px);
  transform:translateY(0px);
}
a:hover .text {
  color: #000;
}
</style>
