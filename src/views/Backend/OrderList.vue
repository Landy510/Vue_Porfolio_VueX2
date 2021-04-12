<template>
  <div>
    <div class="vld-parent">
      <loading :active.sync="isLoading"></loading>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">姓名</th>
          <th width="100">信箱</th>
          <th>購買商品</th>
          <th width="100">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in customer_order" :key="key">
          <td>{{ item.user.name }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <span v-for="(obj,index) in item.products" :key="index">{{ obj.product.title }} </span>
          </td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else class="text-danger">未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :author="pagination" v-on:increment="getProducts"></Pagination>
  </div>
</template>

<script>
import Pagination from '../../components/Pagination.vue'
export default {
  name: 'OrderList',
  data () {
    return {
      pagination: {},
      products: [],
      tempProduct: {},
      isNew: false,
      isLoading: false,
      Status: {
        isUploading: false
      },
      customer_order: []
    }
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.isLoading = false
        vm.customer_order = response.data.orders
        vm.pagination = response.data.pagination
      })
    }
  },
  created () {
    this.getProducts()
  },
  components: {
    Pagination
  }
}
</script>
