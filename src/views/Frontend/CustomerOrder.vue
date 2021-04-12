<template>
  <div class="wrap">
    <div class="progress rounded-0">
      <div class="progress-content" :style="{width: `${progress}%`}"></div>
    </div>
    <div class="flex-grow-1">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  name: 'CustomerOrder',
  data () {
    return {

    }
  },
  computed: {
    progress () {
      if (this.$route.path === '/customerOrder/customer1') {
        return 25
      } else if (this.$route.path === '/customerOrder/customer2') {
        return 50
      } else if (this.$route.path.match(/\/customerOrder\/CustomerCheckout/)) {
        return 75
      } else {
        return 100
      }
    }
  },
  components: {
    Footer
  }
}
</script>
<style scoped lang="scss">
.progress {
  overflow: inherit;
  background-color: grey;
  margin-top: 56px;
}
.progress-content{
  background-color: yellow;
  transition: all .5s;
}
</style>
