<template>
  <div>
    <div class="cart_list_cover" @click="closeCartCover">
      <div class="cart_list">
        <div class="card" v-for="(item, index) in cart_detail" :key="index">
          <img class="card-img-top" :src="item.imageUrl" :alt="item.title圖片">
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">數量{{ item.num }} {{ item.unit }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'CartModal',
  props: {
    cart_detail: {
      type: Array
    }
  },
  data () {
    return {
      cart_list: []
    }
  },
  methods: {
    closeCartCover () {
      $('.cart_list').removeClass('cartOpen')
      $('.cart_list_cover').removeClass('cartOpen')
    }
  }
}
</script>

<style scope>
.cart_list{
  position:fixed;
  top:0;
  left:0;
  width:40vw;
  height:100vh;
  background:#000;
  transform: translateX(-40vw);
  transition:all .5s;
}
.cart_list_cover{
  position:fixed;
  top:0;
  left:0;
  z-index:1040;
  width:100vw;
  height:100vh;
  background-color:rgba(0,0,0,0.5);
  transform: translateX(-100vw);
  opacity:1;
  transition:all .5s;
}
.cartOpen.cart_list{
  transform: translateX(0vw);
  display:block;
}
.cartOpen.cart_list_cover{
  transform: translateX(0vw);
  display:block;
}
</style>
