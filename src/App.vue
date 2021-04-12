<template>
  <div id="app">
    <Navbar/>
    <button class="btn scrollTop bg-transparent text-dark">
      <font-awesome-icon :icon="['fas','chevron-up']" size="3x"></font-awesome-icon>
      <p>Top</p>
    </button>
    <Loading :active.sync="isLoading" loader="dots"></Loading>
    <router-view/>
  </div>
</template>

<script>
import $ from 'jquery'
import Navbar from './components/Navbar.vue'
export default {
  name: 'App',
  data () {
    return {
      carts: []
    }
  },
  methods: {
    getCart () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.get(url).then((response) => {
        if (response.data.data.carts) {
          vm.carts = response.data.data.carts
        }
      })
    },
    removeCart (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.$http.delete(url).then((response) => {
        vm.getCart()
      })
    },
    callCart () {
      $('.cart_list').addClass('cartOpen')
      $('.cart_list_cover').addClass('cartOpen')
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import "./assets/helper/all.scss";
.scrollTop{
  display:none;
  position:fixed;
  right:10px;
  bottom:10px;
  z-index:9999;
}
</style>
