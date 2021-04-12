import Vue from 'vue'
import VueX from 'vuex'
import axios from 'axios'

Vue.use(VueX)
export default new VueX.Store({
  state: {
    isLoading: false,
    total: 0,
    final_total: 0,
    products: [],
    categories: [],
    assignProduct: {},
    cart: [],
    likeList: [],
    order: {
      user: ''
    },
    is_paid: false,
    cartlocal: [],
    cartTotallocal: 0,
    widthCoupon: false,
    couponCode: '1206',
    selectLecture: ''
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getProducts (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.commit('LOADING', true)
      axios.get(api).then((response) => {
        if (response.data.success) {
          context.commit('PRODUCTS', response.data.products)
          context.commit('LOADING', false)
        }
      })
    },
    getAssignedProduct (context, id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      context.commit('LOADING', true)
      axios.get(api).then((response) => {
        if (response.data.success) {
          vm.assignProduct = response.data.product
          context.commit('ASSIGNPRODUCT', vm.assignProduct);
          (function () { setTimeout(() => { context.commit('LOADING', false) }, 2000) })()
        }
      })
    },
    getCart (context) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true)
      axios.get(api).then((response) => {
        if (response.data.data.carts) {
          vm.cart = response.data.data.carts
          vm.total = response.data.data.total
          vm.final_total = response.data.data.final_total
          context.commit('TOTAL', vm.total)
          context.commit('FINALTOTAL', vm.final_total)
          context.commit('CART', vm.cart)
          context.commit('LOADING', false)
        }
      })
    },
    getCartCheckout (context) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true)
      axios.get(api).then((response) => {
        if (response.data.data.carts) {
          vm.cart = response.data.data.carts
          vm.total = response.data.data.total
          vm.final_total = response.data.data.final_total
          context.commit('TOTAL', vm.total)
          context.commit('FINALTOTAL', vm.final_total)
          context.commit('CART', vm.cart)
        }
      }).then(() => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
        vm.couponCode = '1206'
        if (vm.couponCode) {
          const coupon = {
            code: vm.couponCode
          }
          axios.post(api, { data: coupon }).then((response) => {
            if (response.data.success) {
              context.commit('LOADING', false)
              context.commit('FINALTOTAL', response.data.data.final_total)
            } else {
              context.commit('LOADING', false)
            }
          })
        }
      })
    },
    addtoCart (context, { id, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true)
      const item = {
        product_id: id,
        qty
      }
      axios.post(api, { data: item }).then((response) => {
        context.commit('LOADING', false)
        context.dispatch('getCart')
      })
    },
    updateCart (context, { sameItemID, sameProductID, updateQty }) {
      context.commit('LOADING', true)
      const delApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${sameItemID}`
      const addApi = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.delete(delApi).then(() => {
        console.log('購物車刪除成功')
      }).then(() => {
        const cache = {
          product_id: sameProductID,
          qty: updateQty
        }
        axios.post(addApi, { data: cache }).then(() => {
          context.dispatch('getCart')
          context.commit('LOADING', false)
        })
      })
    },
    delCart (context, id) {
      context.commit('LOADING', true)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      axios.delete(api).then((response) => {
        if (response.data.success) {
          context.dispatch('getCart')
          context.commit('LOADING', false)
        }
      })
    },
    AddLikeProduct (context, likedata) {
      const outputData = localStorage.getItem('LikeData')
      const outputArray = JSON.parse(outputData)
      if (outputArray === null) {
        const inputArray = []
        inputArray.push(likedata)
        const inputData = JSON.stringify(inputArray)
        localStorage.setItem('LikeData', inputData)
      } else {
        let hasElement = false
        if (outputArray.length !== 0) {
          outputArray.filter((obj, index) => {
            if (obj.title === likedata.title) {
              outputArray.splice(index, 1)
              hasElement = true
              return true
            }
          })
          if (!hasElement) {
            outputArray.push(likedata)
          }
        } else {
          outputArray.push(likedata)
        }
        const inputArray = outputArray
        const inputData = JSON.stringify(inputArray)
        localStorage.setItem('LikeData', inputData)
      }
      context.dispatch('getLikeList')
    },
    removeLikeProduct (context, likedata) {
      const outputData = localStorage.getItem('LikeData')
      const outputArray = JSON.parse(outputData)
      if (outputArray.length !== 0) {
        outputArray.filter((obj, index) => {
          if (obj.title === likedata.title) {
            outputArray.splice(index, 1)
          }
        })
      }
      const inputData = JSON.stringify(outputArray)
      localStorage.setItem('LikeData', inputData)
      context.dispatch('getLikeList')
    },
    getLikeList (context) {
      const vm = this
      const outputData = localStorage.getItem('LikeData')
      const outputArray = JSON.parse(outputData)
      if (outputArray === null) {
        vm.likeList = []
        context.commit('LIKELIST', vm.likeList)
      } else {
        vm.likeList = outputArray
        context.commit('LIKELIST', vm.likeList)
      }
    },
    getOrder (context, orderID) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${orderID}`
      context.commit('LOADING', true)
      axios.get(api).then((response) => {
        vm.order = response.data.order
        vm.is_paid = vm.order.is_paid
        context.commit('ORDER', vm.order)
        context.commit('LOADING', false)
        context.commit('ISPAID', vm.is_paid)
      })
    },
    getCartLocal (context) {
      const vm = this
      vm.cartlocal = JSON.parse(localStorage.getItem('cartData')) || []
      context.commit('CARTLOCAL', vm.cartlocal)
      context.dispatch('getCartLocalTotal')
    },
    addToCartLocal (context, { data, qty }) {
      const vm = this
      const cacheID = []
      vm.cartlocal.forEach(item => {
        cacheID.push(item.title)
      })
      if (cacheID.indexOf(data.title) === -1) {
        const cacheContent = {
          product_id: data.id,
          qty: qty,
          title: data.title,
          imageUrl: data.imageUrl,
          unit: data.unit,
          price: data.price,
          content: data.content
        }
        vm.cartlocal.push(cacheContent)
        localStorage.setItem('cartData', JSON.stringify(vm.cartlocal))
      } else {
        vm.cartlocal.forEach((item, index) => {
          const updateItemqty = item.qty + qty
          if (item.title === data.title) {
            item.qty = updateItemqty
            localStorage.setItem('cartData', JSON.stringify(vm.cartlocal))
          }
        })
      }
      context.dispatch('getCartLocalTotal')
    },
    getCartLocalTotal (context) {
      const vm = this
      vm.cartTotallocal = 0
      vm.cartlocal.forEach(item => {
        vm.cartTotallocal += item.price * item.qty
      })
      context.commit('CARTTOTALLOCAL', vm.cartTotallocal)
    },
    delCartLocal (context, id) {
      const vm = this
      vm.cartlocal.forEach((item, index) => {
        if (item.product_id === id) {
          vm.cartlocal.splice(index, 1)
          localStorage.setItem('cartData', JSON.stringify(vm.cartlocal))
        }
      })
      context.dispatch('getCartLocal')
    },
    chanegCoupon (context, coupon) {
      context.commit('COUPONCODE', coupon)
    },
    updatefinalTotal (context, finalTotal) {
      context.commit('FINALTOTAL', finalTotal)
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    PRODUCTS (state, payload) {
      state.products = payload
    },
    ASSIGNPRODUCT (state, payload) {
      state.assignProduct = payload
    },
    CART (state, payload) {
      state.cart = payload
    },
    TOTAL (state, payload) {
      state.total = payload
    },
    FINALTOTAL (state, payload) {
      state.final_total = payload
    },
    LIKELIST (state, payload) {
      state.likeList = payload
    },
    ORDER (state, payload) {
      state.order = payload
    },
    ISPAID (state, status) {
      state.is_paid = status
    },
    CARTLOCAL (state, payload) {
      state.cartlocal = payload
    },
    CARTTOTALLOCAL (state, payload) {
      state.cartTotallocal = payload
    },
    COUPONCODE (state, payload) {
      state.couponCode = payload
    }
  }
})
