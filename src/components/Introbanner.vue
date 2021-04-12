<template>
  <div>
    <carousel :perPage="1" :paginationEnabled="false" :autoplay="true">
      <slide class="bg-cover intro_image d-flex align-items-center justify-content-center justify-content-md-end">
        <div class="text-light mr-0 mr-md-5" style="width:300px; height: 200px; background-color:rgba(0,0,0,0.6);">
          <h3 class="px-3 my-3 font-weight-bold">Berserker</h3>
          <p class="px-3 medium-text">幫你擁有更好的體態</p>
          <router-link to="/Lecture/LectureProduct">
            <button class="btn btn-warning btn-lg mx-3 rounded-0">來去逛逛</button>
          </router-link>
        </div>
      </slide>
      <slide class="bg-cover intro_image1 d-flex align-items-center justify-content-center justify-content-md-end">
        <div class="text-light mr-0 mr-md-5" style="width:300px; height: 200px; background-color:rgba(0,0,0,0.6);">
          <h3 class="px-3 my-3 font-weight-bold">Berserker</h3>
          <p class="px-3 medium-text">幫你擁有更好的體態</p>
          <router-link to="/Lecture/LectureProduct">
            <button class="btn btn-warning btn-lg mx-3 rounded-0">來去逛逛</button>
          </router-link>
        </div>
      </slide>
      <slide class="bg-cover intro_image2 d-flex align-items-center justify-content-center justify-content-md-end">
        <div class="text-light mr-0 mr-md-5" style="width:300px; height: 200px; background-color:rgba(0,0,0,0.6);">
          <h3 class="px-3 my-3 font-weight-bold">Berserker</h3>
          <p class="px-3 medium-text">幫你擁有更好的體態</p>
          <router-link to="/Lecture/LectureProduct">
            <button class="btn btn-warning btn-lg mx-3 rounded-0">來去逛逛</button>
          </router-link>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import $ from 'jquery'
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'Introbanner',
  props: ['introImage', 'introImage_1', 'introImage_2'],
  data () {
    return {

    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    const vm = this
    $('.intro_image').css('background-image', `url(${vm.introImage})`)
    $('.intro_image1').css('background-image', `url(${vm.introImage_1})`)
    $('.intro_image2').css('background-image', `url(${vm.introImage_2})`)
    $('.intro_image').css('height', `${window.innerHeight}px`)
    $(window).resize(function () {
      $('.intro_image').css('height', `${window.innerHeight}px`)
    })
  },
  components: {
    Carousel,
    Slide
  }
}
</script>

<style scoped>
.intro_content{
  background:rgba(255,255,255,0.8);
}
.medium-text{
  font-size: 16px;
}
</style>
