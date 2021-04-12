<template>
  <div class="wrap">
    <div class="bg_finish bg-cover flex-grow-1 d-flex justify-content-center align-items-center flex-column">
      <div class="paid_content non_paid" :class="{'finish_paid':is_paid}">
        <font-awesome-icon class="paid_progress mr-2" :icon="['fas', 'flag']"/>
        <span v-if="!is_paid">訂單搜尋中...</span>
        <span v-else>已完成付款</span>
      </div>
      <router-link to="/">
        <button class="btn btn-warning mt-3 rounded-0">回去逛逛</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerFinish',
  data () {
    return {
      orderId: '',
      order: {
        user: {
          email: ''
        }
      }
    }
  },
  methods: {
    getList () {
      this.$store.dispatch('getOrder', this.orderId)
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getList()
  },
  computed: {
    is_paid () {
      return this.$store.state.is_paid
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
.CheckoutPicture{
  background-image: url(https://upload.cc/i1/2021/03/04/h9Ydmb.jpg);
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
.order-title {
  position:relative;
  width:30%;
  text-align:center;
  margin:0 auto 0 auto;
}
.order-title:before {
  content: "";
  display: block;
  height: 40%;
  width: 100%;
  background-color: rgba(236, 230, 64, .6);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
}
.bg_finish{
  background-color: rgba(0, 0, 0, 0.4);
  background-image: url(https://upload.cc/i1/2021/04/07/dWL856.jpg);
  background-blend-mode: overlay;
  min-height: 500px;
}
.paid_content{
  font-size:30px;
  padding:5px 20px 5px 20px;
  color: white;
  transition: all .5s;
}
.non_paid{
  color: black;
  background-color:pink;
}
.finish_paid{
  color: white;
  background-color:green;
}
@media(max-width:768px) {
  .order-title {
    width: 40%;
  }
}
@media(max-width:680px){
  .confirm_btn{
    width:100%;
  }
}
@media(max-width:360px){
  .order-title {
    width: 50%;
  }
}
</style>
