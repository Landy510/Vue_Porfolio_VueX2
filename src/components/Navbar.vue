<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-warning bg-warning navbar-to-top navbar-setting" :class="{'navbar-enter':isShowNavbar, 'navbar-leave':isHideNavbar}">
      <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon">
          <font-awesome-icon :icon="['fas','bars']" size="lg"></font-awesome-icon>
        </span>
      </button>
      <router-link to="/" class="mx-auto navbar-brand py-0 text-dark font-weight-bold d-flex bg-transparent shadow-none">
        <h1 class="h5 m-0 logo-btn">
          <img src="../assets/img/protectionshield.svg" width="30" height="30" class="d-inline-block align-top" alt="Berserker Fitness Logo">
          <span class="ml-1 my-auto Brand_logo">Berserker Fitness</span>
        </h1>
      </router-link>
      <div class="d-block d-lg-none" style="position:relative">
        <button type="button" class="btn btn-transparent text-dark d-block d-lg-none btn-cart" data-toggle="modal" data-target="#exampleModalLong">
          <font-awesome-icon :icon="['fas', 'cart-arrow-down']" />
        </button>
        <span class="badge badge-danger rounded-circle" style="position:absolute;top:0;left:25px" v-if="cart.length!==0">{{ cart.length }}</span>
      </div>
      <div class="collapse navbar-collapse bg-warning" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active hide-nav-btn">
            <router-link to="/" class="nav-link text-dark">首頁</router-link>
          </li>
          <li class="nav-item hide-nav-btn">
            <router-link to="/lecture/LectureProduct" class="nav-link text-dark">課程</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link text-dark" href="#" title="了解我們" data-toggle="dropdown">
              <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
            </a>
            <div class="dropdown-menu dropdown-menu-right location-dropdown" aria-labelledby="dropdownMenuReference">
            <div class="px-4">
              <div class="d-flex justify-content-around">
                <div class="card rounded-0 border-0 mr-3" style="width: 18rem;">
                  <img class="card-img-top rounded-0" src="https://upload.cc/i1/2021/02/16/XaFwDo.jpg" alt="了解Berserker Fitness圖片">
                  <div class="card-body p-0 text-center mt-3">
                    <font-awesome-icon :icon="['fas', 'caret-right']" />
                    <router-link to="/Company/CompanyDetail" class="location_search_btn ml-2">了解Berserker Fitness</router-link>
                  </div>
                </div>
                <div class="card rounded-0 border-0" style="width: 18rem;">
                  <img class="card-img-top location_part rounded-0" src="https://upload.cc/i1/2021/02/16/rcGXwH.jpg" alt="了解Berserker Fitness據點查詢圖片">
                  <div class="card-body p-0 text-center mt-3">
                    <font-awesome-icon :icon="['fas', 'caret-right']" />
                    <router-link to="/Company/LocationInfo" class="location_search_btn ml-2">Berserker Fitness據點查詢</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </li>
          <li class="nav-item active">
            <router-link to="/login" class="nav-link login_btn" title="管理者登入">
              <font-awesome-icon :icon="['fas', 'users-cog']" />
            </router-link>
          </li>
          <li class="nav-item active">
            <a class="nav-link likeButton" :class="{'text-danger':likeList.length!==0}" href="#" title="我的最愛" data-toggle="dropdown">
              <font-awesome-icon :icon="['far','heart']" size="lg"></font-awesome-icon>
            </a>
            <div class="dropdown-menu dropdown-menu-right like-modal" aria-labelledby="dropdownMenuReference">
              <div class="px-4">
                <table class="table">
                  <thead>
                    <tr>
                      <th class="border-0 px-0">收藏清單</th>
                    </tr>
                  </thead>
                  <tbody v-if="likeList.length!==0">
                    <tr v-for="(item, index) in likeList" :key="index" >
                      <td width="80">
                        <a href="#" @click.prevent="removeLike(item)">
                          <i class="fas fa-trash-alt text-danger rounded-0"></i>
                        </a>
                      </td>
                      <td width="120">{{ item.title }}</td>
                      <td width="80" class="text-right">
                        <a class="text-dark" href="#" @click.prevent="addToCart(item)">
                          <font-awesome-icon :icon="['fas', 'cart-arrow-down']"/>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else class="text-danger">
                    <p>我的最愛清單沒有商品喔~</p>
                    <router-link to="/">
                      <button class="btn btn-warning hide-nav-btn" @click="closeModal">回去逛逛~</button>
                    </router-link>
                  </tbody>
                </table>
              </div>
            </div>
          </li>
          <li class="nav-item active">
            <router-link to="/">
              <a class="nav-link text-dark" href="#" @click.prevent="signOut">登出</a>
            </router-link>
          </li>
          <li class="nav-item d-none d-lg-block" style="position:relative">
            <button type="button" class="btn btn-transparent" data-toggle="modal" data-target="#exampleModalLong">
              <font-awesome-icon :icon="['fas', 'cart-arrow-down']"/>
            </button>
            <span class="badge badge-danger rounded-circle" style="position:absolute;top:0;left:25px" v-if="cart.length!==0">{{ cart.length }}</span>
          </li>
        </ul>
      </div>
    </nav>
    <div class="lecture_hide p-4 bg-light">
      <div class="d-flex">
        <div class="card rounded-0 border-0 mr-3 bg-light" style="width: 18rem;">
          <img class="card-img-top rounded-0" src="https://upload.cc/i1/2021/02/16/XaFwDo.jpg" alt="了解Berserker Fitness圖片">
          <div class="card-body p-0 text-center mt-3">
            <font-awesome-icon :icon="['fas', 'caret-right']" />
            <router-link to="/Company/CompanyDetail" class="location_search_btn ml-2">了解Berserker Fitness</router-link>
          </div>
        </div>
        <div class="card rounded-0 border-0 bg-light" style="width: 18rem;">
          <img class="card-img-top location_part rounded-0" src="https://upload.cc/i1/2021/02/16/rcGXwH.jpg" alt="了解Berserker Fitness據點查詢圖片">
          <div class="card-body p-0 text-center mt-3">
            <font-awesome-icon :icon="['fas', 'caret-right']" />
            <router-link to="/Company/LocationInfo" class="location_search_btn ml-2">Berserker Fitness據點查詢</router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade modal-right pr-0" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div class="modal-dialog mr-md-0 mt-0" role="document" >
        <div class="modal-content">
          <div class="modal-header mr-0 bg-warning">
            <h4 class="modal-title font-weight-bold mx-auto" id="exampleModalLongTitle">購物車</h4>
            <button type="button" class="close p-0 m-0" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-0" v-if="cart.length!==0">
            <div class="card px-4 border-0" v-for="(item,index) in cart" :key="index">
              <img class="card-img-top rounded-0" :src="item.imageUrl" :alt="`${item.title}課程圖片`">
              <div class="card-body">
                <h3 class="card-title">{{ item.title }}</h3>
                <h3 class="card-text">{{ item.price| currency }} 元</h3>
                <div class="d-flex justify-content-between align-items-end">
                  <span class="card-text h5">{{ item.qty }} /{{ item.unit }}</span>
                  <button type="button" class="btn btn-outline-danger rounded-0" @click="delProduct(item.product_id)"><font-awesome-icon :icon="['fas', 'trash-alt']"/></button>
                </div>
              </div>
            </div>
            <div class="bg-light p-4 h3 d-sm-flex justify-content-between mb-0" style="position:sticky; bottom:0;">總金額 {{ total_price| currency }}
              <router-link to="/customerOrder/customer1">
                <button type="button" class="btn btn-warning px-5 w-100 rounded-0" @click="closeModal" :disabled="Status.isUploading">
                <font-awesome-icon :icon="['fas', 'spinner']" spin v-if="Status.isUploading"/>
                結帳去</button>
              </router-link>
            </div>
          </div>
          <div class="modal-body" v-else>
            <p class="text-danger mb-2 h5">購物車裡沒有商品喔~</p>
            <router-link to="/">
              <button class="btn btn-warning hide-nav-btn" @click="closeModal">回去逛逛~</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Navbar',
  data () {
    return {
      total_length: 0,
      Status: {
        isUploading: false
      },
      counter: 0,
      cartLength: 0,
      lastPageHeight: 0,
      isShowNavbar: true,
      isHideNavbar: false
    }
  },
  methods: {
    signOut: function () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login')
        }
      })
    },
    getLike () {
      this.$store.dispatch('getLikeList')
    },
    addToCart (data) {
      const vm = this
      const qty = 1
      vm.$store.dispatch('addToCartLocal', { data, qty })
      vm.$bus.$emit('messsage:push', '已加入購物車', 'success')
      vm.removeLike(data)
    },
    callCart () {
      $('.cart_list').addClass('cartOpen')
      $('.cart_list_cover').addClass('cartOpen')
    },
    delProduct (id) {
      this.$store.dispatch('delCartLocal', id)
      $('#exampleModalLong').modal('hide')
      this.$bus.$emit('messsage:push', '已刪除商品', 'danger')
    },
    closeModal () {
      $('#exampleModalLong').modal('hide')
    },
    getcartLength () {
      const vm = this
      vm.cartLength = vm.total_length
      vm.$emit('increment', Number(vm.cartLength))
    },
    removeLike (item) {
      this.$store.dispatch('removeLikeProduct', item)
    },
    navbarscrollFixed () {
      const vm = this
      window.addEventListener('scroll', function () {
        if (vm.$route.name === 'Home') {
          const scrollVal = window.pageYOffset
          const scrolldir = (vm.lastPageHeight - scrollVal) >= 0 ? 1 : -1
          vm.lastPageHeight = scrollVal
          if (scrolldir > 0) {
            vm.isShowNavbar = true
            vm.isHideNavbar = false
          } else {
            vm.isShowNavbar = false
            vm.isHideNavbar = true
          }
        } else {
          vm.isShowNavbar = true
          vm.isHideNavbar = false
        }
      })
    }
  },
  created: function () {
    this.getLike()
    this.navbarscrollFixed()
  },
  mounted () {
    $('.navbar-toggler').on('click', function () {
      $('#navbarNav').addClass('navbar-collapse-setting')
    })
    $('.hide-nav-btn').on('click', function () {
      $('#navbarNav').removeClass('show')
    })
    $('.location_search_btn').on('click', function () {
      $('#navbarNav').removeClass('show')
    })
    $('.btn-cart').on('click', function () {
      $('#navbarNav').removeClass('show')
    })
    $('.logo-btn').on('click', function () {
      $('#navbarNav').removeClass('show')
    })
    $(window).on('resize', function () {
      const w = $(window).width()
      if (w >= 1024) {
        $('#navbarNav').removeClass('navbar-collapse-setting')
      } else {
        $('#navbarNav').addClass('navbar-collapse-setting')
        $('.location-dropdown').removeClass('show')
      }
    })
  },
  computed: {
    cart () {
      return this.$store.state.cartlocal
    },
    total_price () {
      return this.$store.state.cartTotallocal
    },
    likeList () {
      return this.$store.state.likeList
    }
  }
}
</script>

<style scoped lang="scss">
.text-danger{
  color:black;
}
.lecture_hide{
  display:none;
}
.location_search{
  color:black;
}
.location_search:hover{
  color:red
}
.location_search_btn{
  color:#000;
}
.location_search_btn:hover{
  color:grey;
  transition:all .2s;
}
.location_part{
  height:162px;
}
.login_btn{
  color:#000;
}
.login_btn:hover{
  color:red;
}
.likeButton{
  color: black;
}
.modal.fade.modal-right .modal-dialog {
  transform: translate(125%, 0px);
}
.modal.show.modal-right .modal-dialog {
  transform: none;
}
.like-modal{
  min-width: 400px;
}
.navbar {
  transition: transform .5s ease;
  transform-origin: top;
}
.navbar-to-top {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
}
.navbar-setting {
  height: 56px;
}
.navbar-collapse-setting {
  position: fixed;
  top: 56px;
  right: 0;
  left: 0;
  padding: 0 1rem;
  background-color: yellow;
}
.navbar-enter {
  transform-origin: top;
  transform: scaleY(1);
}
.navbar-leave {
  transform: scaleY(0);
}
@media(max-width:680px){
  .Brand_logo{
    display:none;
  }
  .like-modal{
    min-width:100%;
  }
}
@media(max-width:380px){
  .location_part{
    height:87px;
  }
}
</style>
