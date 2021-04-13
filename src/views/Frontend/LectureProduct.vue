<template>
  <div>
    <section>
      <div class="lecture_banner">
        <div class="lecture_cover d-flex align-items-center justify-content-center">
          <h2 class="lecture_slogon d-flex flex-column flex-md-row">
            <p class="text-center">挑選你愛的課程</p>
            <p class="text-center ml-0 ml-md-4">一起戰勝體脂肪</p>
          </h2>
        </div>
      </div>
    </section>
    <div class="h2 text-center Lecture_title py-4 border-bottom">{{ Lecture_title }}</div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12">
          <div class="d-flex mb-4 justify-content-center justify-content-sm-end">
            <form class="form-inline">
              <div class="input-group">
              <input class="form-control rounded-0" type="text" v-model="searchText" placeholder="Search" aria-label="Search">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary rounded-0" type="button" @click="clearSearch">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              </div>
            </form>
            </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-3">
          <div class="list-group d-flex flex-md-row flex-column" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action rounded-0 text-dark text-center" id="list-home-list" :class="{'active':searchText===''}" data-toggle="list" href="#list-home" role="tab" aria-controls="home" @click.prevent="changeSearchText('')">All</a>
            <a class="list-group-item list-group-item-action text-dark text-center" id="list-profile-list" :class="{'active':searchText==='重訓'}" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile" @click.prevent="changeSearchText('重訓')">重訓</a>
            <a class="list-group-item list-group-item-action text-dark text-center" id="list-messages-list" :class="{'active':searchText==='有氧'}" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages" @click.prevent="changeSearchText('有氧')">有氧</a>
            <a class="list-group-item list-group-item-action rounded-0 text-dark text-center" id="list-settings-list" :class="{'active':searchText==='飲食課程'}" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings" @click.prevent="changeSearchText('飲食課程')">飲食課程</a>
          </div>
        </div>
        <div class="col-12">
          <div class="row">
            <div class="col-12">
              <div class="row py-2 Recommended_class_frame">
                <div class="col-md-6 col-lg-4 Recommended_class mb-4" v-for="(item, index) in filterData" :key="index">
                  <a href="#" class="lecture_card d-block text-dark" @click.prevent="getSelfProduct(item.id)">
                    <div class="card h-100" >
                      <div class="card_image">
                        <img class="card-img-top rounded-0" :src="item.imageUrl" :alt="`${item.title}課程圖片`">
                      </div>
                      <div class="card-body p-0 pb-1">
                        <p class="card-text mb-0 pt-2 px-2 d-flex justify-content-between font-weight-bold h5" >
                          <span>{{ item.title }}</span>
                          <font-awesome-icon class="lecture_heart" :class="{'text-danger':item.like}" :icon="['far','heart']" size="lg" @click="getLike(item)"></font-awesome-icon>
                        </p>
                        <p class="card-text mb-2 px-2 text-muted" >
                          {{ item.description }}
                        </p>
                        <div class="d-flex justify-content-between align-items-end px-2">
                          <del class="text-muted">原價{{ item.origin_price }}元</del>
                          <strong class="h5 mb-0">現在只要<span class="text-danger">{{ item.price }}</span>元</strong>
                        </div>
                      </div>
                    </div>
                  </a>
                  <button type="button" class="btn btn-outline-dark d-block d-md-none rounded-0 w-100" @click="getSelfProduct(item.id)">前往課程一覽</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LectureProduct',
  data () {
    return {
      qty: 0,
      image_website: 'https://upload.cc/i1/2021/02/15/2cfRA4.jpg',
      image_website1: 'https://upload.cc/i1/2021/02/05/s3GHBq.jpg',
      image_website2: 'https://upload.cc/i1/2021/02/22/TI2sLB.jpg',
      product: [],
      Lecture_title: '所有課程',
      like: false,
      likeList: [],
      searchText: this.$store.state.selectLecture
    }
  },
  methods: {
    changeSearchText (selected) {
      this.searchText = selected
    },
    getProduct () {
      this.$store.dispatch('getProducts')
    },
    getCart () {
      this.$store.dispatch('getCartLocal')
    },
    getSelfProduct (id) {
      document.documentElement.scrollTop = 0
      this.$router.push(`/lecture/${id}`)
    },
    getCategory (str = 'All') {
      const vm = this
      vm.Lecture_title = str
    },
    getLike (item) {
      const vm = this
      item.like = !item.like
      vm.$store.dispatch('AddLikeProduct', item)
      vm.$bus.$emit('messsage:push', '已加入我的最愛清單', 'success')
    },
    getLikeList () {
      const vm = this
      const outputData = localStorage.getItem('LikeData')
      const outputArray = JSON.parse(outputData)
      vm.likeList = outputArray
    },
    clearSearch () {
      const vm = this
      vm.searchText = ''
    }
  },
  created () {
    const vm = this
    vm.getProduct()
    vm.getCart()
  },
  computed: {
    workoutArray () {
      return this.products.filter((item) => item.category === '重訓')
    },
    aerobicArray () {
      return this.products.filter((item) => item.category === '有氧')
    },
    dietArray () {
      return this.products.filter((item) => item.category === '飲食課程')
    },
    products () {
      const vm = this
      vm.product = vm.$store.state.products
      vm.product.forEach(item => {
        vm.$set(item, 'like', false)
      })
      vm.getLikeList()
      return vm.product
    },
    filterData () {
      const vm = this
      let tempArray = []
      if (vm.searchText !== '') {
        tempArray = vm.products.filter(item => item.title.toLowerCase().includes(vm.searchText.toLowerCase()))
        if (tempArray.length !== 0) {
          return tempArray
        } else {
          tempArray = vm.products.filter((item) => {
            const data = item.category.toLowerCase().includes(vm.searchText.toLowerCase())
            return data
          })
          if (tempArray.length !== 0) {
            return tempArray
          }
        }
      }
      return vm.products
    }
  }
}
</script>

<style scoped lang="scss">
.advance_image{
  border-radius:50px;
}
.lecture_banner {
  background-image: url(https://i.postimg.cc/52D5qwY1/dorhHq.jpg);
  height: 50vh;
  margin-top: 56px;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position:relative;
}
.lecture_cover {
   position:absolute;
   left:0;
   right:0;
   top:0;
   bottom:0;
   background-color:rgba(0, 0, 0, 0.3);
   .lecture_slogon {
      color:white;
      z-index:3;
   }
}
.card{
  border:0px;
  cursor:pointer;
}
.card_image{
  overflow:hidden;
  position:relative;
}
.card img{
  transform:scale(1);
  transition:all .5s;
}
.card:hover img{
  transition:all .5s;
  transform:scale(1.2);
}
.card_btn{
  position:absolute;
  bottom:-40px;
  left:0;
  z-index:3;
  transition:all .5s;
}
.card:hover .card_btn{
  transition:all .5s;
  bottom:0px;
}
.list-group-item{
  border:0px;
  border-right:1px solid grey;
}
.medium-text{
  font-size: 18px;
}
.lecture_card:hover{
  box-shadow: 12px 12px 7px rgba(0, 0, 0, 0.2);
  transition:all .5s;
}
.lecture_heart{
  color: #000;
}
@media(max-width:680px){
  .advance_image{
    border-radius:0px;
  }
  .list-group-item{
    border:0px;
    border-bottom:1px solid grey;
  }
}
</style>
