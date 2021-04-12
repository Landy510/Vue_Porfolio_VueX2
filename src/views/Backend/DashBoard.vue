<template>
  <div class="wrap dashboard-setting">
    <AlertMessage/>
    <div class="content-flex">
      <div class="container-fluid">
        <div class="row">
        <div class="col-md-3 col-lg-2">
          <ul class="list-group">
          <li class="list-group-item border-0 text-muted">
          <font-awesome-icon :icon="['fas', 'users-cog']" />
              管理員頁面
          </li>
          <li class="list-group-item border-0 p-0">
            <router-link class="nav-link text-dark" to="/admin/orderList">
              <font-awesome-icon :icon="['fas', 'box-open']" />
              產品列表
            </router-link>
          </li>
          <li class="list-group-item border-0 p-0">
            <router-link class="nav-link text-dark" to="/admin/products">
              <font-awesome-icon :icon="['fas', 'list-alt']" />
              訂單列表
            </router-link>
          </li>
          <li class="list-group-item border-0 p-0">
            <router-link class="nav-link text-dark" to="/admin/Coupon">
              <font-awesome-icon :icon="['fas', 'ticket-alt']" />
              優惠券
            </router-link>
          </li>
        </ul>
        </div>
        <div class="col-md-9 ml-sm-auto col-lg-10">
          <router-view/>
        </div>
      </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import AlertMessage from '../../components/AlertMessage.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'DashBoard',
  data () {
    return {

    }
  },
  created () {
    const vm = this
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)Berserkertoken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    vm.$http.defaults.headers.common.Authorization = myCookie
  },
  components: {
    AlertMessage,
    Footer
  }
}
</script>
<style scoped lang="scss">
.content-flex {
  flex-grow: 1;
}
.dashboard-setting {
  margin-top: 56px;
}
</style>
