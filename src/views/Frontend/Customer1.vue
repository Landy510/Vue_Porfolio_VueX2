<template>
  <div>
    <AlertMessage/>
    <div class="container my-5">
      <div class="d-flex h3 alert alert-primary bg-transparent progress_bar mx-auto border-0 text-center justify-content-center align-items-center mb-5 mt-3 rounded-0">
        <p class="m-0 text-dark font-weight-bold">STEP1. 購物車內容</p>
      </div>
      <div class="row">
        <div class="col-12 cart-shadow py-3">
          <h2 class="text-center py-2 bg-transparent">購物車內容</h2>
          <table class="table mt-4">
            <thead>
              <th class="border-bottom-0" width="10"></th>
              <th class="d-none d-md-block border-bottom-0">商品圖片</th>
              <th class="border-bottom-0 table_product" >商品名稱</th>
              <th class="border-bottom-0" >金額</th>
            </thead>
            <tbody>
              <tr v-for="(item, key) in carts" :key="key">
                <td>
                  <button type="button" class="btn btn-outline-danger rounded-0" @click="delProduct(item.product_id)">
                    <font-awesome-icon :icon="['fas', 'trash-alt']"/>
                  </button>
                </td>
                <td class="d-none d-md-block">
                  <img :src="item.imageUrl" width="90px" height="70px" :alt="item.title">
                </td>
                <td class="h5">
                  <div class="d-flex justify-content-between">
                    <span class="h5 font-weight-bold mb-0">
                      {{ item.title }}
                    </span>
                    <div class="input-group w-40 d-none d-md-flex">
                      <div class="input-group-prepend">
                        <button type="button" class="btn btn-grey border border-dark rounded-0" @click="addToCart(item, -1)" :disabled="!clickable">-</button>
                      </div>
                      <input type="text" class="form-control text-center qty h-100" placeholder="0" aria-label="1" aria-describedby="basic-addon1" v-model="item.qty">
                      <div class="input-group-append">
                        <button type="button" class="btn btn-grey border border-dark rounded-0" @click="addToCart(item, 1)" :disabled="!clickable">+</button>
                      </div>
                    </div>
                  </div>
                  <span class="text-muted h5">{{ item.price| currency }}
                  </span>

                  <div class="input-group w-100 d-flex d-md-none">
                    <div class="input-group-prepend">
                      <button type="button" class="btn btn-grey border border-dark rounded-0" @click="addToCart(item, -1)" :disabled="!clickable">-</button>
                    </div>
                    <input type="text" class="form-control text-center qty" placeholder="0" aria-label="1" aria-describedby="basic-addon1" v-model="item.qty">
                    <div class="input-group-append">
                      <button type="button" class="btn btn-grey border border-dark rounded-0" @click="addToCart(item, 1)" :disabled="!clickable">+</button>
                    </div>
                  </div>
                </td>
                <td class="h5 text-right">
                  {{ item.qty*item.price| currency }}
                </td>
              </tr>
              <tr>
                <td colspan=4 class="text-right h4">總金額 <span class="ml-4">{{ total| currency }}</span></td>
              </tr>
            </tbody>
          </table>
          <button type="button" class="btn btn-warning btn-lg w-50 rounded-0 d-block ml-auto" @click="readyPayOrder">確認訂單</button>
        </div>
      </div>
      <div class="d-flex h3 alert alert-primary bg-transparent progress_bar mx-auto border-0 text-center justify-content-center align-items-center mb-5 mt-5 rounded-0">
        <p class="m-0 text-dark font-weight-bold">推薦課程</p>
      </div>
      <div class="container mb-5">
        <div class="row">
          <div class="col-12">
            <carousel :autoplay="true" :loop="true" :paginationEnabled="false" :perPageCustom="[[320, 1], [560, 2], [1024, 3]]">
              <slide v-for="(item, index) in products" :key="index">
              <div class="card h-100 border-0 mr-3 pb-2">
                <div class="card_image">
                  <img class="card-img-top rounded-0" :src="item.imageUrl" :alt="item.title">
                </div>
                <div class="card-body p-0">
                  <h5 class="card-title">{{ item.title }}</h5>
                  <div class="d-flex justify-content-between align-items-end">
                    <del class="text-muted">原價{{ item.origin_price }}元</del>
                    <strong class="h5 mb-0">現在只要<span class="text-danger">{{ item.price }}</span>元</strong>
                  </div>
                  <button type="button" class="btn btn-outline-dark rounded-0 btn-md-lg rounded-0 w-100" @click="addToCart(item, 1)">加入購物車</button>
                </div>
              </div>
              </slide>
            </carousel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from '../../components/AlertMessage.vue'
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'Customer1',
  data () {
    return {
      coupon_code: '',
      product_length: 0,
      final_total: 0,
      hasCoupon: false,
      clickable: true
    }
  },
  methods: {
    getCart () {
      this.$store.dispatch('getCartLocal')
      this.clickable = true
    },
    getProduct () {
      this.$store.dispatch('getProducts')
    },
    delProduct (id) {
      this.$store.dispatch('delCartLocal', id)
      this.$bus.$emit('messsage:push', '已刪除商品', 'danger')
    },
    addCouponCode () {
      const vm = this
      vm.$store.state.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const couponcount = (vm.coupon_code.substr(vm.coupon_code.length - 1, 1)) * 0.1
      const coupon = {
        code: vm.coupon_code
      }
      vm.$http.post(api, { data: coupon }).then((response) => {
        if (response.data.success) {
          vm.$store.state.isLoading = false
          vm.hasCoupon = response.data.success
          vm.final_total = vm.$store.state.cartTotallocal * couponcount
          vm.$bus.$emit('messsage:push', response.data.message, 'success')
        } else {
          vm.$store.state.isLoading = false
          vm.hasCoupon = response.data.success
          vm.$bus.$emit('messsage:push', response.data.message, 'danger')
        }
      })
    },
    CalQty (data, cal, num) {
      if (cal) {
        data.qty += num
      } else {
        data.qty -= num
      }
    },
    addToCart (data, qty) {
      if (data.qty + qty === 0) return
      const vm = this
      vm.hasCoupon = false
      vm.clickable = false
      vm.$store.dispatch('addToCartLocal', { data, qty })
      vm.$bus.$emit('messsage:push', '已加入購物車', 'success')
      vm.clickable = true
    },
    readyPayOrder () {
      const vm = this
      const cacheID = []
      const Api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$store.state.isLoading = true
      vm.$http.get(Api).then((response) => {
        if (response.data.data.carts) {
          const cart = response.data.data.carts || []
          cart.forEach(item => {
            cacheID.push(item.product_id)
          })
        }
      }).then(() => {
        cacheID.forEach((item) => {
          vm.$http.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMERPATH}/cart/${item}`)
        })
      }).then(() => {
        vm.$store.state.cartlocal.forEach(item => {
          const id = item.product_id
          const qty = item.qty
          const cache = {
            product_id: id,
            qty
          }
          vm.$http.post(Api, { data: cache }).then((res) => {
            vm.$store.state.cartlocal = []
            localStorage.removeItem('cartData')
            vm.$router.push('customer2')
            vm.$store.dispatch('getCart')
          })
        })
      })
    }
  },
  created () {
    this.getCart()
    this.getProduct()
  },
  components: {
    AlertMessage,
    Carousel,
    Slide
  },
  computed: {
    carts () {
      return this.$store.state.cartlocal
    },
    products () {
      return this.$store.state.products
    },
    total () {
      return this.$store.state.cartTotallocal
    }
  }
}
</script>

<style scoped lang="scss">
.progress_bar{
  height: 50px;
  z-index: 1;
}
.table_product{
  width:400px;
}
.samll-text{
  font-size:14px;
}
.progress-connect{
  width:200px;
  height:3px;
  background-color:black;
}
.cart-shadow {
  box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.2);
}
@media(max-width:760px){
  .table_product{
    width:200px;
  }
}
@media(max-width:680px){
  .progress-connect{
    width:100px;
  }
}
@media(max-width:380px){
  .progress-connect{
    width:50px;
  }
}
</style>
