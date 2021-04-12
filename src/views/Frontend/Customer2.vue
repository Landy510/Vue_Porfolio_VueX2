<template>
  <div>
    <AlertMessage/>
    <div class="container my-5">
      <div class="d-flex h3 alert alert-primary bg-transparent progress_bar mx-auto border-0 text-center justify-content-center align-items-center mb-5 mt-3 rounded-0">
        <p class="m-0 text-dark font-weight-bold">STEP2. 填寫資料</p>
      </div>
      <div class="row">
        <div class="col-lg-7 mb-2">
          <h2 class="bg-warning py-2 text-center">收件人資料</h2>
          <h5>星號(*)部分必填</h5>
          <div>
            <ValidationObserver v-slot="{ invalid, handleSubmit }">
              <form @submit.prevent="handleSubmit(submitForm)">
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <div class="form-group">
                    <label for="username">收件人姓名<span class="text-danger ml-1 font-weight-bold">*</span></label>
                    <input id="username" type="text" name="姓名"
                      class="form-control rounded-0" v-model="form.user.name" :class="classes" placeholder="輸入姓名" >
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider rules="required|email" v-slot="{ errors, classes }">
                  <div class="form-group">
                    <label for="email">Email<span class="text-danger ml-1 font-weight-bold">*</span></label>
                    <input id="email" type="email" name="email"
                      class="form-control rounded-0" v-model="form.user.email" :class="classes" placeholder="請輸入信箱">
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <div class="form-group">
                    <label for="useraddress">收件人地址<span class="text-danger ml-1 font-weight-bold">*</span></label>
                    <input id="useraddress" type="text" name="地址"
                      class="form-control rounded-0" v-model="form.user.address" :class="classes" placeholder="請輸入地址" >
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ errors, classes }">
                  <div class="form-group">
                    <label for="usertel">收件人電話<span class="text-danger ml-1 font-weight-bold">*</span></label>
                    <input id="usertel" type="tel" name="電話"
                      class="form-control rounded-0" v-model="form.user.tel" :class="classes" placeholder="請輸入電話" >
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
                <ValidationProvider>
                  <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea name="" id="comment" class="form-control rounded-0" cols="30" rows="10" v-model="form.message"></textarea>
                  </div>
                </ValidationProvider>
                <div class="text-right">
                  <button class="btn btn-danger rounded-0" :disabled="invalid">送出訂單</button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
        <div class="col-lg-5">
          <h2 class="text-center bg-light py-2 cart_content_btn d-block d-lg-none" @click="openCartContent">購物車內容
            <font-awesome-icon v-if="carts.length!==0" :icon="['fas','chevron-down']" size="1x" class="arrow"></font-awesome-icon>
          </h2>
          <h2 class="text-center bg-light py-2 d-none d-lg-block">購物車內容</h2>
          <div v-if="carts.length!==0" class="cart_content d-none d-lg-block">
            <div v-for="(item, index) in carts" :key="index">
              <div class="d-flex">
                <img :src="item.product.imageUrl" width="150px" height="100px" :alt="item.product.title">
                <div class="ml-3 w-100">
                  <div class="d-flex mb-2 font-weight-bold">
                    <div>課程名稱</div>
                    <div class="ml-auto text-right" v-html="item.product.title"></div>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <div>單價</div>
                    <div class="ml-auto">{{ item.product.price| currency }}</div>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <div>數量</div>
                    <div>{{ item.qty }} /{{ item.product.unit }}</div>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <div>小計</div>
                    <div>{{ item.qty*item.product.price| currency }} </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between border-top border-dark">
              <div class="h5 mt-2">小計</div>
              <div class="h5 mt-2">{{ total| currency }}</div>
            </div>
            <div class="d-flex justify-content-between">
              <div class="h5 mt-2">運費</div>
              <div class="h5 mt-2">{{ 0| currency }}</div>
            </div>
            <div class="d-flex justify-content-between text-danger">
              <div class="h5 mt-2">總計</div>
              <div class="h5 mt-2">{{ total| currency }}</div>
            </div>

            <div class="d-flex justify-content-between" v-if="final_total!==total">
              <div class="h5 text-success">折扣價</div>
              <div class="h5 text-success">{{ final_total| currency }}</div>
            </div>

          </div>
          <div v-if="carts.length!==0" class="cart_content d-lg-none">
            <table class="table mt-4">
              <thead>
                <th class="border-bottom-0" width="200">商品名稱</th>
                <th class="d-none d-md-block border-bottom-0">商品圖片</th>
                <th class="border-bottom-0" width="100">數量</th>
                <th class="border-bottom-0" width="150">金額</th>
              </thead>
              <tbody>
                <tr v-for="(item, key) in carts" :key="key">
                  <td class="h5">
                    <div class="d-flex justify-content-between">
                      <span class="medium-text" v-html="item.product.title "></span>
                    </div>
                    <span class="text-muted h5">{{ item.product.price| currency }}
                    </span>
                  </td>
                  <td class="d-none d-md-block">
                    <img :src="item.product.imageUrl" width="70px" height="70px" :alt="item.product.title">
                  </td>
                  <td>{{ item.qty }}/{{ item.product.unit }}</td>
                  <td class="h5 text-right">
                    {{ item.qty*item.product.price| currency }}
                  </td>
                </tr>
                <tr class="table_total_display">
                  <td colspan="3" class="text-right h3">小計</td>
                  <td class="text-right h3 d-none d-sm-block">{{ total|currency }}</td>
                </tr>
                <tr class="table_total_displaySmall">
                  <td colspan="2" class="text-right h3">小計</td>
                  <td class="text-right h3">{{ total|currency }}</td>
                </tr>
                <tr class="table_total_display">
                  <td colspan="3" class="text-right h3 border-top-0 pt-0">運費</td>
                  <td class="text-right h3 d-none d-sm-block border-top-0 pt-0">{{ 0|currency }}</td>
                </tr>
                <tr class="table_total_displaySmall">
                  <td colspan="2" class="text-right h3 border-top-0 pt-0">運費</td>
                  <td class="text-right h3 border-top-0 pt-0">{{ 0|currency }}</td>
                </tr>
                <tr class="table_total_display">
                  <td colspan="3" class="text-right h3 border-top-0 pt-0">總計</td>
                  <td class="text-right h3 d-none d-sm-block border-top-0 pt-0 text-danger">{{ total|currency }}</td>
                </tr>
                <tr class="table_total_displaySmall">
                  <td colspan="2" class="text-right h3 border-top-0 pt-0">總計</td>
                  <td class="text-right h3 border-top-0 pt-0 text-danger">{{ total|currency }}</td>
                </tr>
                <tr class="table_total_display" v-if="final_total!==total">
                  <td colspan="3" class="text-right h3 border-top-0 pt-0">折扣價</td>
                  <td class="text-right h3 d-none d-sm-block border-top-0 pt-0 text-success">{{ final_total|currency }}</td>
                </tr>
                <tr class="table_total_displaySmall" v-if="final_total!==total">
                  <td colspan="2" class="text-right h3 border-top-0 pt-0">折扣價</td>
                  <td class="text-right h3 border-top-0 pt-0 text-success">{{ final_total|currency }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <h2 class="text-center">購物車裡面沒有商品喔~~</h2>
          </div>
          <div class="input-group mb-3 mt-3">
            <input type="text" class="form-control border border-warning rounded-0" v-model="coupon_code" placeholder="輸入1206折扣碼" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <div class="input-group-append">
              <button class="btn btn-warning rounded-0" type="button" @click="addCouponCode">套用優惠券</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import AlertMessage from '../../components/AlertMessage.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'Customer2',
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon_code: ''
    }
  },
  methods: {
    getList () {
      this.$store.dispatch('getCart')
    },
    openCartContent () {
      $('.cart_content').slideToggle(1000)
      $('.arrow').toggleClass('active')
    },
    createOrder () {
      const vm = this
      const order = vm.form
      vm.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.$http.post(api, { data: order }).then((response) => {
        vm.isLoading = false
      })
    },
    submitForm () {
      const vm = this
      const order = vm.form
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      vm.isLoading = true
      vm.$http.post(api, { data: order }).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/customerOrder/CustomerCheckout/${response.data.orderId}`) // 跳轉頁面
        }
      })
      vm.isLoading = false
    },
    addCouponCode () {
      const vm = this
      vm.$store.state.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$http.post(api, { data: coupon }).then((response) => {
        if (response.data.success) {
          vm.$store.state.isLoading = false
          vm.$store.dispatch('updatefinalTotal', response.data.data.final_total)
          vm.$bus.$emit('messsage:push', response.data.message, 'success')
        } else {
          vm.$store.state.isLoading = false
          vm.$bus.$emit('messsage:push', response.data.message, 'danger')
        }
      })
    }
  },
  created () {
    this.getList()
  },
  components: {
    AlertMessage,
    ValidationProvider,
    ValidationObserver
  },
  computed: {
    carts () {
      return this.$store.state.cart
    },
    total () {
      return this.$store.state.total
    },
    final_total () {
      return this.$store.state.final_total
    }
  }
}
</script>

<style scoped>
.cart_content_btn:hover{
  cursor:pointer;
}
.confirm_btn{
  width:50%;
}
.cart_content{
  display: none;
}
.arrow{
  transform: rotate(0deg);
  transition: all .5s;
}
.arrow.active{
  transform: rotate(180deg);
  transition: all .5s;
}
.progress_bar{
  height: 50px;
  z-index: 1;
}
.table_total_display{
  display:table-row;
}
.table_total_displaySmall{
  display:none;
}
.medium-text{
  font-size:16px;
}
.progress-connect{
  width:200px;
  height:3px;
  background-color:black;
}
@media(max-width:760px){
  .table_total_display{
    display:none;
  }
  .table_total_displaySmall{
    display:table-row;
  }
}
@media(max-width:680px){
  .confirm_btn{
    width:100%;
  }
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
